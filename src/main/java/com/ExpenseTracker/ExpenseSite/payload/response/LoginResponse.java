package com.ExpenseTracker.ExpenseSite.payload.response;

public class LoginResponse {
	
	private Long id;
	private String username;
	private String email;
	private String address;
	private String phone;

	public LoginResponse( Long id, String username, String email, String address, String phone) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.address = address;
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	

}
