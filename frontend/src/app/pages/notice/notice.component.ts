import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss'
})
export class NoticeComponent {
  notices: any[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {
    this.http.get<any[]>('/api/notices')
      .subscribe({
        next: (data) => { this.notices = data || []; this.isLoading = false; },
        error: () => { this.isLoading = false; }
      });
  }
}
