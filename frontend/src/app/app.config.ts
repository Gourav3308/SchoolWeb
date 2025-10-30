import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminLoginComponent } from './pages/admin/admin-login.component';
import { AdminPanelComponent } from './pages/admin/admin-panel.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FacilitiesComponent } from './pages/facilities/facilities.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticeComponent } from './pages/notice/notice.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { FeesComponent } from './pages/fees/fees.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'notice', component: NoticeComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'fees', component: FeesComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
