package com.praswkrit.school.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.praswkrit.school.model.Notice;
import com.praswkrit.school.service.NoticeService;

@RestController
@RequestMapping("/api")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    static class NoticeRequest { public String message; }

    @PostMapping(value = "/notices", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> createNotice(@RequestBody NoticeRequest body) {
        if (body == null || body.message == null || body.message.trim().isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", "Message is required");
            return ResponseEntity.badRequest().body(response);
        }
        noticeService.createNotice(body.message.trim());
        Map<String, String> response = new HashMap<>();
        response.put("message", "success");
        response.put("status", "Notice published");
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/notices", produces = "application/json")
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @GetMapping(value = "/notices/active", produces = "application/json")
    public ResponseEntity<List<Notice>> getActiveNotices() {
        return ResponseEntity.ok(noticeService.getActiveNotices());
    }

    static class NoticeUpdate { public String message; public Boolean active; }

    @PutMapping(value = "/notices/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> updateNotice(@PathVariable String id, @RequestBody NoticeUpdate body) {
        try {
            noticeService.updateNotice(id, body != null ? body.message : null, body != null ? body.active : null);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Notice updated");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping(value = "/notices/{id}", produces = "application/json")
    public ResponseEntity<Map<String, String>> deleteNotice(@PathVariable String id) {
        try {
            noticeService.deleteNotice(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "success");
            response.put("status", "Notice deleted");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "error");
            response.put("status", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}


