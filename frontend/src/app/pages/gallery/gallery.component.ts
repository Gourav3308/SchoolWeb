import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images: string[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {
    this.http.get<string[]>('assets/school/gallery/manifest.json')
      .subscribe({
        next: (files) => {
          this.images = (files || []).map(p => `assets/school/gallery/${p}`);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }
}
