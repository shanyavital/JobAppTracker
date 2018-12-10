package com.JobAppTracker.Model;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
	
	@Id
	public String _id;
	
	public String name;
	public String last;
	public String email;
	public String password;
	public List<ObjectId> listjob;
	
	public User() {
	}
	
	public User(String _id,String name,String last, String email,String password,List<ObjectId> listjob) {
		this._id = _id;
		this.name = name;
		this.last = last;
		this.email = email;
		this.password = password;
		this.listjob = listjob;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLast() {
		return last;
	}

	public void setLast(String last) {
		this.last = last;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<ObjectId> getListjob() {
		return listjob;
	}

	public void setListjob(List<ObjectId> listjob) {
		this.listjob = listjob;
	}
	
	public void addJob(ObjectId _id) {
		if(this.listjob == null) {
			this.listjob = new ArrayList<>();
		}
		this.listjob.add(_id);  
	}
	
	public void deleteJob(ObjectId _id) {
		this.listjob.remove(_id);
	}
}
