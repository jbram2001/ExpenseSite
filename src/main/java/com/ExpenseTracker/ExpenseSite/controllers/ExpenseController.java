package com.ExpenseTracker.ExpenseSite.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ExpenseTracker.ExpenseSite.models.Category;
import com.ExpenseTracker.ExpenseSite.models.Expense;
import com.ExpenseTracker.ExpenseSite.repository.CategoryRepository;
import com.ExpenseTracker.ExpenseSite.repository.ExpenseRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test")
public class ExpenseController {
	@GetMapping("/home")
	public String home() {
		return "Welcome to Expense Tracking Site!";
	}
	
	CategoryRepository categoryRepository;

	public ExpenseController(CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
	}

	@Autowired
	ExpenseRepository expenseRepository;
	
	@GetMapping("/category")
	public List<Category> getCategory(){
		return categoryRepository.findAll();
	}
	
	@GetMapping("/expense/{userId}")
	public ResponseEntity<List<Expense>> getExpense(@PathVariable Long userId){
		return new ResponseEntity<List<Expense>>(expenseRepository.findByUserId(userId), HttpStatus.OK);
	}
	
	@PostMapping("/expense")
	public Expense createExpense(@RequestBody Expense expense) {
		return expenseRepository.save(expense);
	}
	
	@DeleteMapping("/expense/{id}")
	public ResponseEntity<?> deleteExpense(@PathVariable Long id){
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
