import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {
  images: { src: string; name: string }[] = [];

  constructor(private http: HttpClient) {
    this.http.get<string[]>('assets/school/gallery/manifest.json')
      .subscribe({
        next: (files) => {
          const list = Array.isArray(files) ? files : [];
          this.images = list
            .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f))
            .map(f => ({ src: `assets/school/gallery/${f}`, name: this.prettyName(f) }));
          if (this.images.length === 0) {
            this.useFallback();
          }
        },
        error: () => {
          this.useFallback();
        }
      });
  }

  private prettyName(file: string): string {
    const base = file.replace(/\.[^.]+$/, '').replace(/[._-]+/g, ' ').trim();
    return base.replace(/\b\w/g, c => c.toUpperCase());
  }

  private useFallback() {
    const fallback = [
      'school library.jpg',
      'School Science Lab.jpg',
      'computer.jpg',
      'sports.jpg',
      'School Arts and Music Room.jpg',
      'School Cafeteria.jpg',
      'transport.jpg',
      'classroom.jpg',
      'student getting prize.jpg',
      'principals.jpg',
      'principal spending time with student.jpg',
      'principal profile pic.jpg',
      'occasions.jpg'
    ];
    this.images = fallback.map(f => ({ src: `assets/school/gallery/${f}`, name: this.prettyName(f) }));
  }
}
