package com.fullstack.moneyTracker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fullstack.moneyTracker.entity.Expense;
import com.fullstack.moneyTracker.repository.ExpenseRepository;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository repository;

    @GetMapping
    public List<Expense> getExpenses(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return repository.findByCategoryIgnoreCaseOrderByDateDesc(category);
        }
        return repository.findAllByOrderByDateDesc();
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }
}