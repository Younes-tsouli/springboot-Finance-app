package com.finance_backend.demo;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name = "category")
    private String category;

    @Enumerated(EnumType.STRING)   // 👈 stores "INCOME" or "EXPENSE" in DB, not a number
    @Column(name = "type", nullable = false)
    private Type type;

    @Column(name = "date")
    private LocalDate date;

    public Transaction() {}

    public Transaction(String title, double amount, String category, Type type, LocalDate date) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.date = date;
    }
}