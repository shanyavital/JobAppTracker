package com.JobAppTracker.Controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.JobAppTracker.Model.Job;
import com.JobAppTracker.Model.User;
import com.JobAppTracker.Service.JobService;

@RestController
@RequestMapping("/job")
public class JobController {
	
	@Autowired
	private JobService jobService;
	
	@RequestMapping(value = "/{_id}", method = RequestMethod.POST)
	public void addJob(@RequestBody Job job,@PathVariable String _id) {
		jobService.addJob(job,_id);
	}
	
	@RequestMapping(value = "/{_id}", method = RequestMethod.DELETE)
	public void deleteJob(@RequestBody Job job,@PathVariable String _id) {
		jobService.deleteJob(job,_id);
	}
	
	@RequestMapping(value = "/", method = RequestMethod.PUT)
	public void updateJob(@RequestBody Job job) {
		
		jobService.updateJob(job);
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public List<Job> viewAllJobs(@RequestBody User user) {
		return jobService.viewAllJobs(user.get_id());
	}
}
