import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEACHERS, TeacherProfile } from './teachers.data';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  principal: TeacherProfile | undefined = TEACHERS.find(t => t.isPrincipal);
  others: TeacherProfile[] = TEACHERS.filter(t => !t.isPrincipal);

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) { img.style.display = 'none'; }
  }
}
