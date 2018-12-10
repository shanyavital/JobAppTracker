package com.JobAppTracker.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.JobAppTracker.Model.Job;
import com.JobAppTracker.Model.User;
import com.JobAppTracker.Repository.JobRepository;
import com.JobAppTracker.Repository.UserRepository;

@Service
public class JobService {
	
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private UserRepository userRepository;
	
	public void addJob(Job job, String _id) {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate localDate = LocalDate.now();
		job.setDate(dtf.format(localDate));
		jobRepository.save(job);
		User temp = userRepository.findBy_id(_id);
		temp.addJob(job.get_id());
		userRepository.save(temp);
	}
	
	public void deleteJob(Job job, String _id) {
		User temp = userRepository.findBy_id(_id);
		temp.deleteJob(job.get_id());
		userRepository.save(temp);
		jobRepository.delete(job);
	}
	
	public void updateJob(Job job) {
		jobRepository.save(job);
	}
	
	public List<Job> viewAllJobs(String _id){
		User temp = userRepository.findBy_id(_id);
		List<Job> jobs = new ArrayList<>();
		if(temp.getListjob()==null) {
			Job job = new Job("Company name","Job rule","descriptipn","url","date","Location","Contact","Wishlist");
			addJob(job, _id);
			temp = userRepository.findBy_id(_id);
		}
		for( ObjectId job : temp.getListjob()) {
			jobs.add(jobRepository.findBy_id(job));
		}
		return jobs;
	}
}
