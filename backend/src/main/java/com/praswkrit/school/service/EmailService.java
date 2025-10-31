package com.praswkrit.school.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${email.from:${SENDGRID_FROM_EMAIL:${EMAIL_FROM:noreply@schoolweb.app}}}")
    private String fromEmail;

    @Value("${sendgrid.api.key:${SENDGRID_API_KEY:}}")
    private String sendgridApiKey;

    @Value("${resend.api.key:${RESEND_API_KEY:}}")
    private String resendApiKey;

    private static final String SENDGRID_ENDPOINT = "https://api.sendgrid.com/v3/mail/send";

    public void sendApprovalEmail(String studentEmail, String studentName, String className) {
        String subject = "\uD83C\uDF89 Seat Confirmed - PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR";
        String body = String.format(
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
        sendViaSendGrid(studentEmail, subject, body);
    }

    public void sendRejectionEmail(String studentEmail, String studentName, String className) {
        String subject = "Application Update - PRASWIKRIT KANYA MDHYA VIDYALAYA KOSHI SIWIR";
        String body = String.format(
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
        sendViaSendGrid(studentEmail, subject, body);
    }

    private void sendViaSendGrid(String toEmail, String subject, String textBody) {
        try {
            if (sendgridApiKey == null || sendgridApiKey.isBlank()) {
                // Try Resend directly if SendGrid not configured
                sendViaResend(toEmail, subject, textBody);
                return;
            }

            // Minimal JSON payload for SendGrid API
            String json = "{" +
                "\"personalizations\":[{\"to\":[{\"email\":\"" + escape(toEmail) + "\"}]}]," +
                "\"from\":{\"email\":\"" + escape(fromEmail) + "\"}," +
                "\"subject\":\"" + escape(subject) + "\"," +
                "\"content\":[{\"type\":\"text/plain\",\"value\":\"" + escape(textBody) + "\"}]" +
            "}";

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SENDGRID_ENDPOINT))
                .header("Authorization", "Bearer " + sendgridApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                return; // success
            }
            System.err.println("Error sending email via SendGrid: status=" + response.statusCode() + ", body=" + response.body());
            // Fallback to Resend if configured
            if (resendApiKey != null && !resendApiKey.isBlank()) {
                sendViaResend(toEmail, subject, textBody);
            }
        } catch (Exception e) {
            System.err.println("Error sending email via SendGrid: " + e.getMessage());
            if (resendApiKey != null && !resendApiKey.isBlank()) {
                sendViaResend(toEmail, subject, textBody);
            }
        }
    }

    private void sendViaResend(String toEmail, String subject, String textBody) {
        try {
            if (resendApiKey == null || resendApiKey.isBlank()) {
                System.err.println("Error sending email: RESEND_API_KEY not configured");
                return;
            }

            String json = "{" +
                "\"from\":\"" + escape(fromEmail) + "\"," +
                "\"to\":[\"" + escape(toEmail) + "\"]," +
                "\"subject\":\"" + escape(subject) + "\"," +
                "\"text\":\"" + escape(textBody) + "\"" +
            "}";

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.resend.com/emails"))
                .header("Authorization", "Bearer " + resendApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                return; // success
            }
            System.err.println("Error sending email via Resend: status=" + response.statusCode() + ", body=" + response.body());
        } catch (Exception e) {
            System.err.println("Error sending email via Resend: " + e.getMessage());
        }
    }

    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
    }
}

