var app = angular.module('myApp', ['ui.router','ui.bootstrap']);

	app.run(function($rootScope, $location, $state, LoginService) {
	    $rootScope.$on('$stateChangeStart', 
	      function(event, toState, toParams, fromState, fromParams){ 
	          console.log('Changed state to: ' + toState);  
	      });
	    
	      if(!LoginService.isAuthenticated()) {
	        $state.transitionTo('login');
	      }
	  });
	
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/login');
	    
	    $stateProvider
	      .state('login', {
	        url : '/login',
	        templateUrl : 'pages/login.html',
	        controller : 'LoginController'
	      })
	      .state('signup', {
	        url : '/signup',
	        templateUrl : 'pages/signup.html',
	        controller : 'LoginController'
	      })
	      .state('addjob', {
	        url : '/addjob',
	        templateUrl : 'pages/addjob.html',
	        controller : 'HomeController'
	      })
	      .state('updatejob', {
	        url : '/updatejob',
	        templateUrl : 'pages/updatejob.html',
	        controller : 'HomeController'
	      })
	      .state('home', {
	        url : '/home',
	        templateUrl : 'pages/home.html',
	        controller : 'HomeController'
	      });
	  }]);
	
	app.controller('LoginController', function($scope, $rootScope, $stateParams, $state,$http, LoginService) {
	    $rootScope.title = "Login";
	    
	    $scope.signup = function(){
	    	$http({
		        method: "POST",
		        url: "/user/",
		        data: angular.toJson($scope.user),
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    }).then(
			        function(res) { // success
			        	console.log("Success");
			        	$state.transitionTo('login');
			        },
			        function(res) { // error
			            console.log("Error: " + res.status + " : " + res.data);
			        }
			    );		
	    };
	    
	    $scope.login = function(){	
	    	$http({
	  	        method: 'GET',
	  	        url: '/user/login',
	  	        params: {email:$scope.username,password:$scope.password}
	  	    }).then(
	  	        function(res) { // success
	  	        	var dat = res.data;
	  	        	if(dat.email == $scope.username) {
		    	        $scope.error = '';
		    	        $scope.username = '';
		    	        $scope.password = '';
		    	        LoginService.setUser(res.data);
		    	        //LoginService.joblist(); 
		    	        
		    	        $http({
		    		        method: 'POST',
		    		        url: '/job/',
		    		        data: angular.toJson(LoginService.getUser()),
		    		        headers: {
		    		            'Content-Type': 'application/json'
		    		        }
		    		    }).then(
		    		        function(res) { // success
		    		        	console.log("Success");
		    		        	LoginService.setJobs(res.data);
		    		        	$state.transitionTo('home');
		    		        },
		    		        function(res) { // error
		    		            console.log("Error: " + res.status + " : " + res.data);
		    		        }
		    		    );
		    	        
		    	        //$scope.getJobs();
		    	        
		    	        
		    	        
		    	      } else {
		    	        $scope.error = "Incorrect username/password !";
		    	      }
	  	        },
	  	        function(res) { // error
	  	            console.log("Error: " + res.status + " : " );
	  	        }
	  	    );
	    };
	    
	    
	    
	     
	  });
	

	
	app.controller('HomeController', function($scope, $q, $rootScope, $stateParams, $state,$http,$window, LoginService) {
		$rootScope.title = "dash";
		$scope.message = LoginService.isAuthenticated();
		$rootScope.user = LoginService.getUser();
		//LoginService.joblist();
		$scope.jobs = LoginService.getJobs();
		$scope.by_status;
		
		$scope.status = function(data){
			if(data == 1) $scope.by_status = "Wishlist";
			if(data == 2) $scope.by_status = "Applied";
			if(data == 3) $scope.by_status = "Interview";
			if(data == 4) $scope.by_status = "Rejected";
			if(data == 5) $window.location.reload();
			
		}
		
	    $scope.addModal = function(){
	    	$('.ui.add.modal')
		      .modal('show')
		    ;
	    }
	    
	    $scope.updateModal = function(data){
	    	$scope.updatedjob = data;
	    	$('.ui.update.modal')
		      .modal('show')
		    ;
	    }
	    
	    $scope.profile = function(){
	    	$('.ui.profile.modal')
		      .modal('show')
		    ;
	    }
	    
	    
	    //$scope.updatedjob = LoginService.getUpdatedJob();

	    
	    $scope.call = function(data){
	    	$scope.job1 = data;
	    	$('.ui.small.job.modal')
		      .modal('show')
		    ;
	    }
	    
	    
	    
	    $scope.logout = function(){
	    	LoginService.logout();
	    	$state.transitionTo('login');
	    }
	    
	    
	    $scope.updateuser = function(){
	    	LoginService.setUser($rootScope.user);
	    	$http({
		        method: "PUT",
		        url: "/user/" ,
		        data: angular.toJson($rootScope.user),
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    }).then(
			        function(res) { // success
			        	console.log("Success update user");
			        	
		    		        	$window.location.reload();
		    		        
			        },
			        function(res) { // error
			            console.log("Error: " + res.status + " : " + res.data);
			            $scope.error = "Error";
			        }
			    );
	    }
	    
	    
	    $scope.updatejob = function(uj){
	    	
	    	$http({
		        method: "PUT",
		        url: "/job/" ,
		        data: angular.toJson(uj),
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    }).then(
			        function(res) { // success
			        	console.log("Success update job");
			        	$http({
		    		        method: 'POST',
		    		        url: '/job/',
		    		        data: angular.toJson(LoginService.getUser()),
		    		        headers: {
		    		            'Content-Type': 'application/json'
		    		        }
		    		    }).then(
		    		        function(res) { // success
		    		        	console.log("Success bring jobs");
		    		        	LoginService.setJobs(res.data);
		    		        	//$state.transitionTo('home');
		    		        	$window.location.reload();
		    		        },
		    		        function(res) { // error
		    		            console.log("Error: " + res.status + " : " + res.data);
		    		        }
		    		    );	    
			        },
			        function(res) { // error
			            console.log("Error: " + res.status + " : " + res.data);
			        }
			    );
	    	
	    }
	    
	    $scope.updatepage = function(job){
	    	LoginService.setUpdatedJob(job);
	    	$state.transitionTo('updatejob');
	    	
	    	
	    }
	    $scope.deletejob = function(job){
	    	$('.ui.modal')
		      .modal('hide')
		    ;
	    	$http({
		        method: "DELETE",
		        url: "/job/" + LoginService.getUser()._id ,
		        data: angular.toJson(job),
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    }).then(
			        function(res) { // success
			        	console.log("Success Delete job");
			        	$http({
		    		        method: 'POST',
		    		        url: '/job/',
		    		        data: angular.toJson(LoginService.getUser()),
		    		        headers: {
		    		            'Content-Type': 'application/json'
		    		        }
		    		    }).then(
		    		        function(res) { // success
		    		        	console.log("Success");
		    		        	LoginService.setJobs(res.data);
		    		        	$window.location.reload();
		    		        },
		    		        function(res) { // error
		    		            console.log("Error: " + res.status + " : " + res.data);
		    		        }
		    		    );	    
			        },
			        function(res) { // error
			            console.log("Error: " + res.status + " : " + res.data);
			        }
			    );
	    	
	    };
	    
	    $scope.addjob = function(){
	    	$scope.job.description.replace(/\n/g,'<br>');
	    	$http({
		        method: "POST",
		        url: "/job/" + LoginService.getUser()._id  ,
		        data: angular.toJson($scope.job),
		        headers: {
		            'Content-Type': 'application/json'
		        }
		    }).then(
			        function(res) { // success
			        	console.log("Success");
			        	
			        	$http({
		    		        method: 'POST',
		    		        url: '/job/',
		    		        data: angular.toJson(LoginService.getUser()),
		    		        headers: {
		    		            'Content-Type': 'application/json'
		    		        }
		    		    }).then(
		    		        function(res) { // success
		    		        	console.log("Success");
		    		        	LoginService.setJobs(res.data);
		    		        	//$state.transitionTo('home');
		    		        	$window.location.reload();
		    		        },
		    		        function(res) { // error
		    		            console.log("Error: " + res.status + " : " + res.data);
		    		        }
		    		    );	     
			        },
			        function(res) { // error
			            console.log("Error: " + res.status + " : " + res.data);
			        }
			    );		
	    };
	  });
	
	app.factory('LoginService', function($http,$window) {
	    
	    var isAuthenticated = false;
	    var user = null;
	    var jobs = null;
	    var updatedJob = null; 
	    
	    return {
	      joblist : function() {
	    			$http({
	    		        method: 'POST',
	    		        url: '/job/',
	    		        data: angular.toJson(user),
	    		        headers: {
	    		            'Content-Type': 'application/json'
	    		        }
	    		    }).then(
	    		        function(res) { // success
	    		        	console.log("Success joblist");
	    		        	jobs = res.data;
	    		        },
	    		        function(res) { // error
	    		            console.log("Error: " + res.status + " : " + res.data); 
	    		        }
	    		    );
	      },
	      getJobs : function() {
	    	  if(jobs == null){
	    		  jobs = JSON.parse($window.localStorage.getItem('jobs'));
	    	  }
	        return jobs;
	      },
	      setJobs : function(data) {
	    	  	$window.localStorage.setItem('jobs',JSON.stringify(data));
		        jobs = data;
		  },
		  setUpdatedJob : function(data) {
		        updatedJob = data;
		  },
		  getUpdatedJob : function() {
		        return updatedJob;
		  },
	      isAuthenticated : function() {
	        return isAuthenticated;
	      },
	      getUser : function() {
	    	  if(user == null){
	    		  user = JSON.parse($window.localStorage.getItem('user'));
	    		  isAuthenticated = true;
	    		  console.log("user:" + user.name);
	    	  }
	    	  return user;
	      },
	      setUser : function(data) {
	    	  $window.localStorage.setItem('user',JSON.stringify(data));
	    	  isAuthenticated = true;
	    	  user = data;
	      },
	      logout : function(){
	    	  $window.localStorage.clear();
	    	  user = null;
	    	  jobs = null;
	    	  isAuthenticated = false;
	      }
	    };
	    
	  });
	