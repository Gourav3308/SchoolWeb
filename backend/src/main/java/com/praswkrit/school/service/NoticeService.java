package com.praswkrit.school.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.praswkrit.school.model.Notice;
import com.praswkrit.school.repository.NoticeRepository;

@Service
public class NoticeService {
    
    @Autowired
    private NoticeRepository noticeRepository;

    public Notice createNotice(String message) {
        Notice notice = new Notice();
        notice.setMessage(message);
        notice.setActive(true);
        return noticeRepository.save(notice);
    }

    public List<Notice> getAllNotices() {
        return noticeRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Notice> getActiveNotices() {
        return noticeRepository.findByActiveTrue(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Notice updateNotice(String id, String message, Boolean active) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notice not found"));
        if (message != null && !message.trim().isEmpty()) {
            notice.setMessage(message.trim());
        }
        if (active != null) {
            notice.setActive(active.booleanValue());
        }
        return noticeRepository.save(notice);
    }

    public void deleteNotice(String id) {
        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("Notice not found");
        }
        noticeRepository.deleteById(id);
    }

    // Multiple active notices are allowed; no global deactivation
}


