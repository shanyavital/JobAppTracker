package com.JobAppTracker.Model;

import org.bson.types.ObjectId;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class Job {
	
	@Id
	public ObjectId _id;
	
	public String company;
	public String title;
	public String description;
	public String url;
	public String date;
	public String location;
	public String contact;
	public String status;
	
	public Job() {
	}
	


	public Job(String company, String title, String description, String url, String date, String location,
			String contact, String status) {
		super();
		this.company = company;
		this.title = title;
		this.description = description;
		this.url = url;
		this.date = date;
		this.location = location;
		this.contact = contact;
		this.status = status;
	}



	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
