package com.fullstack.moneyTracker.entity;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data // Generates Getters/Setters via Lombok
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    
    // Using BigDecimal for money handling as required
    private BigDecimal amount;
    
    private String category;

    private LocalDateTime date;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
