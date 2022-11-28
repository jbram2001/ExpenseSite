package com.ExpenseTracker.ExpenseSite.controllers;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ExpenseTracker.ExpenseSite.models.User;
import com.ExpenseTracker.ExpenseSite.payload.request.LoginRequest;
import com.ExpenseTracker.ExpenseSite.payload.request.SignupRequest;
import com.ExpenseTracker.ExpenseSite.payload.response.LoginResponse;
import com.ExpenseTracker.ExpenseSite.payload.response.MessageResponse;
import com.ExpenseTracker.ExpenseSite.repository.UserRepository;
import com.ExpenseTracker.ExpenseSite.security.services.UserDetailsImp;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
		return ResponseEntity.ok(new LoginResponse( 
				 userDetails.getId(), 
				 userDetails.getUsername(), 
				 userDetails.getEmail(),
				 userDetails.getAddress(),
				 userDetails.getPhone()));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		
		// Create new user's account
		User user = new User(signupRequest.getUsername(), 
							 signupRequest.getEmail(),
							 signupRequest.getAddress(),
							 signupRequest.getPhone(),
							 encoder.encode(signupRequest.getPassword()));
		
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

	}

}
