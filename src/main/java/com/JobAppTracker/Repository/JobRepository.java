package com.JobAppTracker.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JobAppTracker.Model.Job;

@Repository
public interface JobRepository extends MongoRepository<Job, String>{
	Job findBy_id(ObjectId _id);
}
