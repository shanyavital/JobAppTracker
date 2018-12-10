package com.JobAppTracker.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JobAppTracker.Model.User;
import com.JobAppTracker.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public void addUser(User user) {
		userRepository.save(user);
	}
	
	public void updateUser(User user) {
		userRepository.save(user);
	}
	
	public User getById(String _id) {
		return userRepository.findBy_id(_id);
	}
	
	public User login(String email,String password) {
		return userRepository.findByEmailAndPassword(email, password);
	}
}
