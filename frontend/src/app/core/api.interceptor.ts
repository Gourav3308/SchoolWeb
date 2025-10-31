import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retryWhen, mergeMap, delay, scan } from 'rxjs/operators';

// Functional interceptor (Angular 15+)
export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  const shouldRetryStatus = (status: number | undefined) => {
    if (status == null) return true; // network errors
    return status === 0 || status === 429 || status === 502 || status === 503 || status === 504;
  };

  let warmedUp = false;

  return next(req).pipe(
    retryWhen((errors) =>
      errors.pipe(
        scan((acc: number, error: unknown) => {
          const err = error as HttpErrorResponse;
          if (!shouldRetryStatus(err.status)) {
            throw error;
          }
          return acc + 1;
        }, 0),
        mergeMap((attempt: number, index) => {
          if (attempt > 6) {
            // ~ up to ~32s total backoff
            return throwError(() => new Error('Max retries reached'));
          }
          // warm up backend on first retry only
          if (!warmedUp) {
            warmedUp = true;
            // Fire-and-forget health ping to wake backend while we backoff
            try { fetch('/api/health', { cache: 'no-store' }).catch(() => {}); } catch { /* no-op */ }
          }
          const backoffMs = Math.min(32000, 500 * Math.pow(2, attempt));
          return of(attempt).pipe(delay(backoffMs));
        })
      )
    )
  );
};


