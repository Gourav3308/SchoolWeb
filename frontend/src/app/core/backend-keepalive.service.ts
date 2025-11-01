import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Backend Keepalive Service
 * 
 * Prevents Render backend from going to sleep by periodically pinging
 * the health endpoint. This ensures the backend stays awake and database
 * connections remain active.
 * 
 * Pings every 2 minutes (120 seconds) - Render free tier typically
 * sleeps after ~15 minutes of inactivity, so this keeps it active.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendKeepaliveService {
  private http = inject(HttpClient);
  private readonly HEALTH_ENDPOINT = '/api/health/detailed';
  private readonly PING_INTERVAL_MS = 120000; // 2 minutes (120 seconds)
  
  private pingSubscription: any = null;
  private isActive = false;

  /**
   * Start the keepalive service
   * This begins periodic pinging of the backend
   */
  start(): void {
    if (this.isActive) {
      console.log('BackendKeepaliveService: Already active, skipping start');
      return;
    }

    this.isActive = true;
    console.log('BackendKeepaliveService: Starting keepalive pings every', this.PING_INTERVAL_MS / 1000, 'seconds');

    // Ping immediately on start
    this.pingBackend();

    // Then ping at regular intervals
    this.pingSubscription = interval(this.PING_INTERVAL_MS).subscribe(() => {
      this.pingBackend();
    });
  }

  /**
   * Stop the keepalive service
   */
  stop(): void {
    if (this.pingSubscription) {
      this.pingSubscription.unsubscribe();
      this.pingSubscription = null;
    }
    this.isActive = false;
    console.log('BackendKeepaliveService: Stopped');
  }

  /**
   * Ping the backend health endpoint
   * This keeps the backend service awake on Render
   */
  private pingBackend(): void {
    this.http.get<any>(this.HEALTH_ENDPOINT)
      .pipe(
        tap((response) => {
          // Success - backend is awake
          const timestamp = new Date().toLocaleTimeString();
          console.log(`[${timestamp}] Backend keepalive: Success - Database: ${response.database || 'UNKNOWN'}`);
        }),
        catchError((error) => {
          // Error - log but don't fail, try again on next interval
          const timestamp = new Date().toLocaleTimeString();
          console.warn(`[${timestamp}] Backend keepalive: Failed - ${error.message || 'Unknown error'}`);
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * Get service status
   */
  getStatus(): { active: boolean; interval: number } {
    return {
      active: this.isActive,
      interval: this.PING_INTERVAL_MS
    };
  }
}

