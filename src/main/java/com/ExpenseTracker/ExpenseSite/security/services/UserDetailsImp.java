package com.ExpenseTracker.ExpenseSite.security.services;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ExpenseTracker.ExpenseSite.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImp implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;

	private String username;

	private String email;
	
	private String address;
	
	private String phone;

	@JsonIgnore
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	
	public UserDetailsImp(Long id, String username, String email, String address, String phone, String password) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.address = address;
		this.phone = phone;
		this.password = password;
	}

	public static UserDetailsImp build(User user) {
		return new UserDetailsImp(
		        user.getId(), 
		        user.getUsername(), 
		        user.getEmail(),
		        user.getAddress(),
		        user.getPhone(),
		        user.getPassword());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}
	
	

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getAddress() {
		return address;
	}

	public String getPhone() {
		return phone;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	  public boolean equals(Object o) {
	    if (this == o)
	      return true;
	    if (o == null || getClass() != o.getClass())
	      return false;
	    UserDetailsImp user = (UserDetailsImp) o;
	    return Objects.equals(id, user.id);
	  }

}
