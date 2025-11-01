import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BackendKeepaliveService } from './core/backend-keepalive.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <div class="floating">
      <a class="fab wa" href="https://wa.me/917903354776" target="_blank" rel="noopener" aria-label="WhatsApp chat">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.112.552 4.094 1.515 5.82L4 29l8.383-1.477C14.047 28.5 15.004 29 16 29c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 22.5c-.82 0-1.617-.139-2.363-.403l-.17-.061-4.9.864.87-4.787-.089-.147A9.444 9.444 0 0 1 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5Zm5.235-6.965c-.287-.143-1.7-.838-1.964-.933-.264-.096-.456-.143-.649.143-.192.287-.744.933-.912 1.125-.168.192-.336.216-.623.072-.287-.144-1.211-.446-2.31-1.42-.853-.761-1.428-1.7-1.596-1.987-.168-.287-.018-.442.126-.585.129-.129.287-.336.431-.504.144-.168.192-.287.288-.479.096-.192.048-.36-.024-.504-.072-.144-.649-1.562-.889-2.136-.234-.563-.471-.487-.649-.495l-.553-.01c-.192 0-.504.072-.768.36-.264.287-1.009.984-1.009 2.4s1.033 2.784 1.176 2.976c.144.192 2.034 3.108 4.928 4.356.689.297 1.227.474 1.647.607.692.22 1.322.189 1.82.115.555-.082 1.7-.695 1.941-1.368.24-.673.24-1.249.168-1.368-.072-.12-.264-.192-.551-.335Z"/>
        </svg>
      </a>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR';
  private keepaliveService = inject(BackendKeepaliveService);

  ngOnInit(): void {
    // Start aggressive backend keepalive service to prevent Render from sleeping
    // This sends burst pings on startup and pings every 30 seconds to keep backend awake
    // No manual intervention needed - backend stays awake automatically
    this.keepaliveService.start();
  }
}
