package com.praswkrit.school.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "fees")
public class Fee {
    @Id
    private String id;
    private String className; // e.g., Nursery, LKG, UKG, 1 .. 10

    private double admissionFeePerYear;
    private double hostelFeePerMonth;
    private double transportFee; // optional per month or per term
    private double tuitionFee;
    private double examFee;
    private double totalFee; // stored for convenience

    private LocalDateTime createdAt = LocalDateTime.now();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }
    public double getAdmissionFeePerYear() { return admissionFeePerYear; }
    public void setAdmissionFeePerYear(double admissionFeePerYear) { this.admissionFeePerYear = admissionFeePerYear; }
    public double getHostelFeePerMonth() { return hostelFeePerMonth; }
    public void setHostelFeePerMonth(double hostelFeePerMonth) { this.hostelFeePerMonth = hostelFeePerMonth; }
    public double getTransportFee() { return transportFee; }
    public void setTransportFee(double transportFee) { this.transportFee = transportFee; }
    public double getTuitionFee() { return tuitionFee; }
    public void setTuitionFee(double tuitionFee) { this.tuitionFee = tuitionFee; }
    public double getExamFee() { return examFee; }
    public void setExamFee(double examFee) { this.examFee = examFee; }
    public double getTotalFee() { return totalFee; }
    public void setTotalFee(double totalFee) { this.totalFee = totalFee; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}


