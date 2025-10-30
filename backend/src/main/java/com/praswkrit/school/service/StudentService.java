package com.praswkrit.school.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.praswkrit.school.dto.StudentRegistrationDTO;
import com.praswkrit.school.model.Student;
import com.praswkrit.school.repository.StudentRepository;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private EmailService emailService;
    
    public Student registerStudent(StudentRegistrationDTO dto) {
        // Check if email or Aadhar already exists
        List<Student> existingByEmail = studentRepository.findByEmail(dto.getEmail());
        List<Student> existingByAadhar = studentRepository.findByAadharNumber(dto.getAadharNumber());
        
        if (!existingByEmail.isEmpty()) {
            throw new RuntimeException("Email already registered");
        }
        if (!existingByAadhar.isEmpty()) {
            throw new RuntimeException("Aadhar number already registered");
        }
        
        Student student = new Student();
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setDateOfBirth(dto.getDateOfBirth());
        student.setGender(dto.getGender());
        student.setAadharNumber(dto.getAadharNumber());
        student.setApplyingForClass(dto.getApplyingForClass());
        student.setFatherName(dto.getFatherName());
        student.setMotherName(dto.getMotherName());
        student.setFatherOccupation(dto.getFatherOccupation());
        student.setMotherOccupation(dto.getMotherOccupation());
        student.setPreviousSchoolName(dto.getPreviousSchoolName());
        student.setAddress(dto.getAddress());
        student.setCity(dto.getCity());
        student.setState(dto.getState());
        student.setPinCode(dto.getPinCode());
        student.setPhoneNumber(dto.getPhoneNumber());
        student.setEmail(dto.getEmail());
        student.setProfilePictureUrl(dto.getProfilePictureUrl());
        student.setStatus("PENDING");
        student.setSubmittedAt(LocalDateTime.now());
        
        return studentRepository.save(student);
    }
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public List<Student> getStudentsByStatus(String status) {
        return studentRepository.findByStatus(status);
    }
    
    public Student approveStudent(String studentId) {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setStatus("APPROVED");
        student.setApprovedAt(LocalDateTime.now());
        student = studentRepository.save(student);
        
        // Send approval email
        String studentName = student.getFirstName() + " " + student.getLastName();
        emailService.sendApprovalEmail(student.getEmail(), studentName, student.getApplyingForClass());
        
        return student;
    }
    
    public Student rejectStudent(String studentId) {
        Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        
        student.setStatus("REJECTED");
        student.setApprovedAt(null);
        student.setRejectedAt(LocalDateTime.now());
        student = studentRepository.save(student);
        
        String studentName = student.getFirstName() + " " + student.getLastName();
        emailService.sendRejectionEmail(student.getEmail(), studentName, student.getApplyingForClass());
        
        return student;
    }

    public void deleteStudent(String studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new RuntimeException("Student not found");
        }
        studentRepository.deleteById(studentId);
    }
}

