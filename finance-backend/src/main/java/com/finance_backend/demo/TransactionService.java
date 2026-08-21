package com.finance_backend.demo;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository; // 👈 add final

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Integer id) {
        return transactionRepository.findById(id);
    }

    public Transaction createTransaction(Transaction transaction) { // 👈 return the saved object
        return transactionRepository.save(transaction);
    }

    public void deleteTransactionById(Integer id) {
        transactionRepository.deleteById(id);
    }

    public Transaction updateTransaction(Integer id, Transaction updatedData) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

        existing.setTitle(updatedData.getTitle());
        existing.setAmount(updatedData.getAmount());
        existing.setCategory(updatedData.getCategory());
        existing.setType(updatedData.getType());
        existing.setDate(updatedData.getDate());

        return transactionRepository.save(existing);
    }
}