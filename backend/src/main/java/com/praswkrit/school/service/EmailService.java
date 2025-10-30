package com.praswkrit.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendApprovalEmail(String studentEmail, String studentName, String className) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("pkm85973@gmail.com");
            message.setTo(studentEmail);
            message.setSubject("🎉 Seat Confirmed - PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR");
            
            String emailBody = String.format(
                "Dear %s,\n\n" +
                "Congratulations! Your seat reservation has been approved.\n\n" +
                "Your seat is confirmed for Class: %s\n\n" +
                "School Details:\n" +
                "PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR\n" +
                "Bhathiya FORBESGANJ ARARIA, Bihar, 854316\n" +
                "Phone: 7903354776, 9771744779\n\n" +
                "Please visit the school office to complete the admission process.\n\n" +
                "Best regards,\n" +
                "Admission Office\n" +
                "PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR",
                studentName, className
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
            // Don't throw - allow registration to continue even if email fails
        }
    }

    public void sendRejectionEmail(String studentEmail, String studentName, String className) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("pkm85973@gmail.com");
            message.setTo(studentEmail);
            message.setSubject("Application Update - PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR");

            String emailBody = String.format(
                "Dear %s,\n\n" +
                "Thank you for applying to PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR.\n\n" +
                "We regret to inform you that your application for Class: %s could not be approved at this time.\n\n" +
                "You are welcome to reapply in the future. For any queries, please contact the school office.\n\n" +
                "School Details:\n" +
                "PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR\n" +
                "Bhathiya FORBESGANJ ARARIA, Bihar, 854316\n" +
                "Phone: 7903354776, 9771744779\n\n" +
                "Best regards,\n" +
                "Admission Office\n" +
                "PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR",
                studentName, className
            );

            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Error sending rejection email: " + e.getMessage());
        }
    }
}

