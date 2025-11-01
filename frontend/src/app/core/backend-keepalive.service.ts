import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { interval, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Backend Keepalive Service
 * 
 * Aggressively prevents Render backend from going to sleep by:
 * - Pinging every 30 seconds (very frequent)
 * - Sending burst pings on startup (5 rapid pings to wake cold backend)
 * - Pinging when browser tab becomes visible
 * - Retrying failed pings immediately
 * 
 * This ensures the backend stays awake and database operations work reliably.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendKeepaliveService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private readonly HEALTH_ENDPOINT = '/api/health/detailed';
  private readonly PING_INTERVAL_MS = 30000; // 30 seconds (very aggressive)
  private readonly BURST_PINGS = 5; // Number of rapid pings on startup
  private readonly BURST_INTERVAL_MS = 2000; // 2 seconds between burst pings
  
  private pingSubscription: any = null;
  private visibilitySubscription: any = null;
  private isActive = false;

  /**
   * Start the keepalive service
   * This begins aggressive periodic pinging of the backend
   */
  start(): void {
    if (this.isActive) {
      console.log('BackendKeepaliveService: Already active, skipping start');
      return;
    }

    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isActive = true;
    console.log('BackendKeepaliveService: Starting AGGRESSIVE keepalive pings every', this.PING_INTERVAL_MS / 1000, 'seconds');

    // BURST MODE: Send multiple rapid pings immediately to wake up cold backend
    this.sendBurstPings();

    // Then ping at regular intervals (every 30 seconds)
    this.pingSubscription = interval(this.PING_INTERVAL_MS).subscribe(() => {
      this.pingBackend();
    });

    // Ping when browser tab becomes visible (user returns to page)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.isActive) {
          console.log('BackendKeepaliveService: Tab visible, sending wake-up ping');
          this.sendBurstPings();
        }
      });
    }
  }

  /**
   * Send multiple rapid pings to wake up a cold backend
   * Render sometimes needs multiple requests to fully wake up
   */
  private sendBurstPings(): void {
    console.log(`BackendKeepaliveService: Sending ${this.BURST_PINGS} burst pings to wake backend`);
    
    for (let i = 0; i < this.BURST_PINGS; i++) {
      setTimeout(() => {
        this.pingBackend();
      }, i * this.BURST_INTERVAL_MS);
    }
  }

  /**
   * Stop the keepalive service
   */
  stop(): void {
    if (this.pingSubscription) {
      this.pingSubscription.unsubscribe();
      this.pingSubscription = null;
    }
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe();
      this.visibilitySubscription = null;
    }
    this.isActive = false;
    console.log('BackendKeepaliveService: Stopped');
  }

  /**
   * Ping the backend health endpoint
   * This keeps the backend service awake on Render
   * On failure, automatically sends burst pings to wake up sleeping backend
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
          
          // If backend appears to be sleeping, send burst pings to wake it
          if (error.status === 0 || error.status >= 500 || error.status === undefined) {
            console.log('BackendKeepaliveService: Backend may be sleeping, sending wake-up burst');
            setTimeout(() => this.sendBurstPings(), 1000);
          }
          
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

