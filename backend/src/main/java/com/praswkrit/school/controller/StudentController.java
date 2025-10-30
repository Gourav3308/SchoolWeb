package com.praswkrit.school.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.praswkrit.school.dto.StudentRegistrationDTO;
import com.praswkrit.school.model.Student;
import com.praswkrit.school.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS })
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    @PostMapping("/students/register")
    public ResponseEntity<Map<String, String>> registerStudent(@Valid @RequestBody StudentRegistrationDTO dto) {
        try {
            Student student = studentService.registerStudent(dto);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Application submitted successfully. Please wait for approval.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/students/status/{status}")
    public ResponseEntity<List<Student>> getStudentsByStatus(@PathVariable String status) {
        List<Student> students = studentService.getStudentsByStatus(status);
        return ResponseEntity.ok(students);
    }
    
    @PostMapping("/students/{id}/approve")
    public ResponseEntity<Map<String, String>> approveStudent(@PathVariable String id) {
        try {
            Student student = studentService.approveStudent(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Student approved successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/students/{id}/reject")
    public ResponseEntity<Map<String, String>> rejectStudent(@PathVariable String id) {
        try {
            studentService.rejectStudent(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Student rejected");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable String id) {
        try {
            studentService.deleteStudent(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Student deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}

