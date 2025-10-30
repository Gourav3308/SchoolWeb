package com.praswkrit.school.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.praswkrit.school.model.Fee;
import com.praswkrit.school.repository.FeeRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class FeeController {

    @Autowired
    private FeeRepository feeRepository;

    @GetMapping("/fees")
    public ResponseEntity<List<Fee>> getAll() {
        List<Fee> all = feeRepository.findAll();
        all.sort((a, b) -> Integer.compare(orderOf(a.getClassName()), orderOf(b.getClassName())));
        return ResponseEntity.ok(all);
    }

    private int orderOf(String className) {
        if (className == null) return Integer.MAX_VALUE;
        String c = className.trim();
        if (c.equalsIgnoreCase("Nursery")) return 0;
        if (c.equalsIgnoreCase("LKG")) return 1;
        if (c.equalsIgnoreCase("UKG")) return 2;
        try {
            int n = Integer.parseInt(c);
            // Shift numbers after the first three
            return 3 + n - 1; // 1 -> 3, 10 -> 12
        } catch (NumberFormatException e) {
            // Unknown labels go to the end but stable
            return Integer.MAX_VALUE - 1;
        }
    }

    @PostMapping("/fees")
    public ResponseEntity<Fee> create(@RequestBody Fee fee) {
        if (fee.getTotalFee() == 0) {
            double total = fee.getAdmissionFeePerYear() + fee.getTuitionFee() + fee.getExamFee();
            // hostel and transport are optional; not included in base total by default
            fee.setTotalFee(total);
        }
        return ResponseEntity.ok(feeRepository.save(fee));
    }

    @PutMapping("/fees/{id}")
    public ResponseEntity<Fee> update(@PathVariable String id, @RequestBody Fee body) {
        Fee fee = feeRepository.findById(id).orElseThrow(() -> new RuntimeException("Fee not found"));
        if (body.getClassName() != null) fee.setClassName(body.getClassName());
        fee.setAdmissionFeePerYear(body.getAdmissionFeePerYear());
        fee.setHostelFeePerMonth(body.getHostelFeePerMonth());
        fee.setTransportFee(body.getTransportFee());
        fee.setTuitionFee(body.getTuitionFee());
        fee.setExamFee(body.getExamFee());
        double total = body.getTotalFee();
        if (total == 0) {
            total = fee.getAdmissionFeePerYear() + fee.getTuitionFee() + fee.getExamFee();
        }
        fee.setTotalFee(total);
        return ResponseEntity.ok(feeRepository.save(fee));
    }

    @DeleteMapping("/fees/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        feeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


