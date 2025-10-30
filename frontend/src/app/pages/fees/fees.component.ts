import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Fee {
  id: string;
  className: string;
  admissionFeePerYear: number;
  hostelFeePerMonth: number;
  transportFee: number;
  tuitionFee: number;
  examFee: number;
  totalFee: number;
}

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent {
  fees: Fee[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {
    this.http.get<Fee[]>('http://localhost:8082/api/fees').subscribe({
      next: (data) => { this.fees = data || []; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  downloadCsv() {
    const headers = ['Class','Admission Fee/Year','Hostel Fee/Month','Transport Fee (Optional)','Tuition Fee','Exam Fee','Total Fee'];
    const rows = this.fees.map(f => [
      f.className,
      f.admissionFeePerYear,
      f.hostelFeePerMonth,
      f.transportFee,
      f.tuitionFee,
      f.examFee,
      f.totalFee
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fee-structure.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
