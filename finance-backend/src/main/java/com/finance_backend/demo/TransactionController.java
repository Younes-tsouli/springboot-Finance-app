package com.finance_backend.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173") // 👈 this is the default Vite/React port
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("{id}")
    public Optional<Transaction> getTransactionById(@PathVariable Integer id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) { // 👈 return the saved object
        return transactionService.createTransaction(transaction);
    }

    @DeleteMapping ("{id}")
    public void deleteTransactionById(@PathVariable Integer id) {
        transactionService.deleteTransactionById(id);
    }

    @PutMapping("{id}")
    public Transaction updateTransaction(@PathVariable Integer id, @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }
}
