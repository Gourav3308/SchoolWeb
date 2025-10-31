import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  aadharNumber: string;
  applyingForClass: string;
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  previousSchoolName: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl?: string;
  status: string;
  submittedAt: string;
  approvedAt?: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  template: `
    <section class="page admin-panel">
      <div class="container">
        <nav class="admin-nav">
          <div class="left">
            <h1>Dashboard</h1>
          </div>
          <div class="right">
            <button 
              *ngFor="let tab of tabs" 
              class="pill"
              [class.active]="selectedTab === tab"
              (click)="filterByStatus(tab)">
              {{ tab }} ({{ getCountByStatus(tab) }})
            </button>
          </div>
        </nav>

        <div class="notice-form">
          <h3>Publish Current Notice</h3>
          <form (ngSubmit)="publishNotice()">
            <textarea [(ngModel)]="newNotice" name="notice" rows="3" placeholder="Type notice message..." required></textarea>
            <button type="submit" [disabled]="isPublishing || !newNotice.trim()">{{ isPublishing ? 'Publishing...' : 'Publish Notice' }}</button>
          </form>
        </div>

        <div class="notice-manage">
          <h3>Manage Notices</h3>
          <div class="list" *ngIf="notices.length; else noNoticesTpl">
            <div class="item" *ngFor="let n of notices">
              <textarea [(ngModel)]="n.editMessage" rows="2"></textarea>
              <label class="active-toggle">
                <input type="checkbox" [(ngModel)]="n.active" /> Active
              </label>
              <div class="actions">
                <button class="btn save" (click)="saveNotice(n)" [disabled]="n._saving">{{ n._saving ? 'Saving...' : 'Save' }}</button>
                <button class="btn delete" (click)="deleteNotice(n)" [disabled]="n._deleting">{{ n._deleting ? 'Deleting...' : 'Delete' }}</button>
              </div>
              <div class="meta">{{ n.createdAt | date:'short' }}</div>
            </div>
          </div>
          <ng-template #noNoticesTpl>
            <div class="empty">No notices yet.</div>
          </ng-template>
        </div>

        <div class="notice-manage">
          <h3>Manage Fee Structure</h3>
          <div class="list">
            <div class="item">
              <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; align-items: end;">
                <div>
                  <label>Class</label>
                  <select [(ngModel)]="newFee.className">
                    <option>Nursery</option><option>LKG</option><option>UKG</option>
                    <option *ngFor="let c of ['1','2','3','4','5','6','7','8','9','10']">{{c}}</option>
                  </select>
                </div>
                <div><label>Admission/Year</label><input type="number" [(ngModel)]="newFee.admissionFeePerYear"></div>
                <div><label>Hostel/Month</label><input type="number" [(ngModel)]="newFee.hostelFeePerMonth"></div>
                <div><label>Transport</label><input type="number" [(ngModel)]="newFee.transportFee"></div>
                <div><label>Tuition</label><input type="number" [(ngModel)]="newFee.tuitionFee"></div>
                <div><label>Exam</label><input type="number" [(ngModel)]="newFee.examFee"></div>
                <div><button class="btn save" (click)="addFee()">Add</button></div>
              </div>
            </div>
            <div class="item" *ngFor="let f of fees">
              <div style="display:grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem; align-items: end;">
                <div><strong>{{ f.className }}</strong></div>
                <div><input type="number" [(ngModel)]="f.admissionFeePerYear"></div>
                <div><input type="number" [(ngModel)]="f.hostelFeePerMonth"></div>
                <div><input type="number" [(ngModel)]="f.transportFee"></div>
                <div><input type="number" [(ngModel)]="f.tuitionFee"></div>
                <div><input type="number" [(ngModel)]="f.examFee"></div>
                <div><input type="number" [(ngModel)]="f.totalFee"></div>
                <div class="actions">
                  <button class="btn save" (click)="saveFee(f)">Save</button>
                  <button class="btn delete" (click)="deleteFee(f)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="isLoading" class="loading">Loading...</div>

        <div *ngIf="!isLoading && filteredStudents.length === 0" class="no-data">
          No students found.
        </div>

        <div class="students-grid">
          <div *ngFor="let student of filteredStudents" class="student-card">
            <div class="card-header">
              <h3>{{ student.firstName }} {{ student.lastName }}</h3>
              <span class="badge" [class.pending]="student.status === 'PENDING'"
                               [class.approved]="student.status === 'APPROVED'"
                               [class.rejected]="student.status === 'REJECTED'">
                {{ student.status }}
              </span>
            </div>

            <div class="card-body">
              <div class="info-row">
                <span class="label">Class:</span>
                <span>{{ student.applyingForClass }}</span>
              </div>
              <div class="info-row">
                <span class="label">DOB:</span>
                <span>{{ student.dateOfBirth | date }}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span>{{ student.email }}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span>{{ student.phoneNumber }}</span>
              </div>
              <div class="info-row">
                <span class="label">Father:</span>
                <span>{{ student.fatherName }}</span>
              </div>
              <div class="info-row">
                <span class="label">Mother:</span>
                <span>{{ student.motherName }}</span>
              </div>
              <div class="info-row">
                <span class="label">Previous School:</span>
                <span>{{ student.previousSchoolName }}</span>
              </div>
              <div class="info-row">
                <span class="label">Address:</span>
                <span>{{ student.address }}, {{ student.city }}, {{ student.state }} - {{ student.pinCode }}</span>
              </div>
              <div class="info-row">
                <span class="label">Submitted:</span>
                <span>{{ student.submittedAt | date:'short' }}</span>
              </div>
            </div>

            <div class="card-actions" *ngIf="student.status === 'PENDING'">
              <button class="btn-approve" (click)="approveStudent(student.id)">
                Approve
              </button>
              <button class="btn-reject" (click)="rejectStudent(student.id)">
                Reject
              </button>
            </div>
            <div class="card-actions">
              <button class="btn-delete" (click)="deleteStudent(student.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .admin-panel {
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .admin-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #e2e8f0;

      h1 { margin: 0; color: #0f172a; font-size: 1.25rem; }

      .right { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .pill {
        padding: 0.5rem 0.9rem;
        border: 2px solid #cbd5e1;
        background: #fff;
        border-radius: 999px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.2s;
      }
      .pill:hover { border-color: #ff8c00; }
      .pill.active { background: #ff8c00; color: #fff; border-color: #ff8c00; }
    }

    .notice-form {
      margin-bottom: 1.25rem;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #fff;
      h3 { margin: 0 0 0.75rem 0; color: #0f172a; }
      form { display: grid; gap: 0.5rem; }
      textarea {
        width: 100%;
        padding: 0.75rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        font-family: inherit;
      }
      button {
        align-self: start;
        background: #0ea5e9;
        color: #fff;
        border: none;
        padding: 0.5rem 0.9rem;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
      }
      button:disabled { opacity: 0.6; cursor: not-allowed; }
    }

    .notice-manage {
      margin-bottom: 1.5rem;
      h3 { margin: 0 0 0.75rem 0; }
      .list { display: grid; gap: 0.75rem; }
      .item {
        border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem; background: #fff;
        display: grid; gap: 0.5rem;
      }
      textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.5rem; font-family: inherit; }
      .actions { display: flex; gap: 0.5rem; }
      .btn { border: none; border-radius: 8px; padding: 0.4rem 0.75rem; font-weight: 700; cursor: pointer; }
      .btn.save { background: #10b981; color: #fff; }
      .btn.delete { background: #ef4444; color: #fff; }
      .active-toggle { color: #0f172a; font-weight: 600; }
      .meta { color: #64748b; font-size: 0.8rem; }
    }

    .loading, .no-data {
      text-align: center;
      padding: 3rem;
      color: #64748b;
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .student-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #e2e8f0;

      h3 {
        margin: 0;
        color: #0f172a;
      }
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;

      &.pending {
        background: #fef3c7;
        color: #92400e;
      }

      &.approved {
        background: #d1fae5;
        color: #065f46;
      }

      &.rejected {
        background: #fee2e2;
        color: #991b1b;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .info-row {
      display: flex;
      gap: 0.5rem;
      font-size: 0.9rem;

      .label {
        font-weight: 600;
        color: #64748b;
        min-width: 120px;
      }

      span:not(.label) {
        color: #0f172a;
      }
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .btn-approve, .btn-reject {
      flex: 1;
      padding: 0.625rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-approve {
      background: #10b981;
      color: #fff;

      &:hover {
        background: #059669;
      }
    }

    .btn-reject {
      background: #ef4444;
      color: #fff;

      &:hover {
        background: #dc2626;
      }
    }

    .btn-delete {
      width: 100%;
      background: #ef4444;
      color: #fff;
      border: none;
      padding: 0.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #dc2626;
      }
    }

    @media (max-width: 768px) {
      .students-grid {
        grid-template-columns: 1fr;
      }

      .admin-nav {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  selectedTab = 'ALL';
  tabs = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];
  isLoading = false;
  newNotice = '';
  isPublishing = false;
  notices: any[] = [];
  fees: any[] = [];
  newFee: any = { className: 'Nursery', admissionFeePerYear: 0, hostelFeePerMonth: 0, transportFee: 0, tuitionFee: 0, examFee: 0, totalFee: 0 };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      this.router.navigate(['/admin/login']);
      return;
    }
    this.loadStudents();
    this.loadNotices();
    this.loadFees();
  }

  loadStudents() {
    this.isLoading = true;
    this.http.get<Student[]>('/api/students')
      .subscribe({
        next: (data) => {
          this.students = data;
          this.filterByStatus(this.selectedTab);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  loadNotices() {
    this.http.get<any[]>('/api/notices')
      .subscribe({
        next: (data) => {
          this.notices = (data || []).map(n => ({ ...n, editMessage: n.message }));
        },
        error: () => {}
      });
  }

  loadFees() {
    this.http.get<any[]>('/api/fees')
      .subscribe({ next: (data) => { this.fees = data || []; }, error: () => {} });
  }

  addFee() {
    const body = { ...this.newFee };
    this.http.post<any>('/api/fees', body, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({ next: () => { this.newFee = { className: 'Nursery', admissionFeePerYear: 0, hostelFeePerMonth: 0, transportFee: 0, tuitionFee: 0, examFee: 0, totalFee: 0 }; this.loadFees(); }, error: () => { alert('Error adding fee'); } });
  }

  saveFee(f: any) {
    const body = { ...f };
    this.http.put<any>(`/api/fees/${f.id}`, body, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({ next: () => { alert('Fee updated'); this.loadFees(); }, error: () => { alert('Error updating fee'); } });
  }

  deleteFee(f: any) {
    if (!confirm('Delete this fee row?')) return;
    this.http.delete<any>(`/api/fees/${f.id}`)
      .subscribe({ next: () => { this.loadFees(); }, error: () => { alert('Error deleting fee'); } });
  }

  publishNotice() {
    const msg = this.newNotice?.trim();
    if (!msg) return;
    this.isPublishing = true;
    this.http.post<any>('/api/notices', { message: msg }, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe({
        next: () => {
          this.newNotice = '';
          this.isPublishing = false;
          alert('Notice published');
          this.loadNotices();
        },
        error: (err) => {
          this.isPublishing = false;
          console.error('Notice publish error:', err);
          alert('Error publishing notice');
        }
      });
  }

  saveNotice(n: any) {
    n._saving = true;
    this.http.put<any>(`/api/notices/${n.id}`, { message: n.editMessage, active: n.active }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: () => { n._saving = false; n.message = n.editMessage; alert('Updated'); },
      error: (err) => { n._saving = false; console.error('Update error', err); alert('Error updating'); }
    });
  }

  deleteNotice(n: any) {
    if (!confirm('Delete this notice?')) return;
    n._deleting = true;
    this.http.delete<any>(`/api/notices/${n.id}`)
      .subscribe({
        next: () => { n._deleting = false; this.loadNotices(); },
        error: (err) => { n._deleting = false; console.error('Delete error', err); alert('Error deleting'); }
      });
  }

  filterByStatus(status: string) {
    this.selectedTab = status;
    if (status === 'ALL') {
      this.filteredStudents = this.students;
    } else {
      this.filteredStudents = this.students.filter(s => s.status === status);
    }
  }

  getCountByStatus(status: string): number {
    if (status === 'ALL') return this.students.length;
    return this.students.filter(s => s.status === status).length;
  }

  approveStudent(id: string) {
    this.http.post<any>(`/api/students/${id}/approve`, {})
      .subscribe({
        next: () => {
          this.loadStudents();
        },
        error: () => {
          alert('Error approving student');
        }
      });
  }

  rejectStudent(id: string) {
    if (!confirm('Are you sure you want to reject this application?')) {
      return;
    }
    this.http.post<any>(`/api/students/${id}/reject`, {})
      .subscribe({
        next: () => {
          this.loadStudents();
        },
        error: () => {
          alert('Error rejecting student');
        }
      });
  }

  deleteStudent(id: string) {
    if (!confirm('This will permanently delete the student record. Continue?')) {
      return;
    }
    this.http.delete<any>(`/api/students/${id}`)
      .subscribe({
        next: () => {
          this.loadStudents();
        },
        error: () => {
          alert('Error deleting student');
        }
      });
  }

  logout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['/admin/login']);
  }
}

