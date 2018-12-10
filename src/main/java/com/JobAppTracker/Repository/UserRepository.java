package com.JobAppTracker.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.JobAppTracker.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
 User findBy_id(String _id);
 
 @Query("{'email':?0, 'password':?1}")
 User findByEmailAndPassword(String email, String password);
}
