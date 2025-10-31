import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isAdmin = false;
  isHome = false;
  notices: { message: string }[] = [];
  mobileMenuOpen = false;
  isLoading = true;

  constructor(private router: Router, private http: HttpClient) {
    this.updateAdminFlag(router.url);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.updateAdminFlag(e.urlAfterRedirects);
        this.mobileMenuOpen = false; // Close mobile menu on navigation
        if (this.isHome) {
          this.loadActiveNotices();
        }
      }
    });
    this.loadActiveNotices();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private updateAdminFlag(url: string) {
    const normalized = url.split('?')[0];
    this.isAdmin = normalized.startsWith('/admin') && !normalized.startsWith('/admin/login');
    this.isHome = normalized === '/' || normalized === '';
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  private loadActiveNotices() {
    this.isLoading = true;
    this.http.get<any[]>('/api/notices/active')
      .subscribe({ next: (data) => {
        // Show all active notices in the ticker
        this.notices = Array.isArray(data) ? data : [];
        this.isLoading = false;
      }, error: () => { this.isLoading = false; } });
  }
}
