package com.fullstack.moneyTracker.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate; // Changed from LocalDateTime to LocalDate
import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Data
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    
    private BigDecimal amount;
    
    private String category;

    // LocalDate matches the "YYYY-MM-DD" string from React perfectly
    private LocalDate date;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}