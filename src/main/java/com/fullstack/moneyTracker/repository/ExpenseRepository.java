package com.fullstack.moneyTracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstack.moneyTracker.entity.Expense;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // Requirements: Sort by date newest first and filter by category
    List<Expense> findByCategoryIgnoreCase(String category);
    List<Expense> findAllByOrderByDateDesc();
    List<Expense> findByCategoryIgnoreCaseOrderByDateDesc(String category);
}