var express = require('express');
var handlebars = require('express-handlebars');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 8000;

handlebars = handlebars.create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//mongoose and mongodb database
var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hackdata');

var donarSchema = mongoose.Schema({

	firstname:String,
	lastname:String,
	email:String,
	password:String,
	phone:Number,
	address:String,
	city:String,
	pincode:Number,

});
var volunteerSchema = mongoose.Schema({

	firstname:String,
	lastname:String,
	email:String,
	password:String,
	phone:Number,
	address:String,
	city:String,
	volunteer_type:String,
	area:String,

});
var doctorSchema = mongoose.Schema({

	firstname:String,
	lastname:String,
	email:String,
	password:String,
	phone:Number,
	address:String,
	city:String,
	specialist:String,
	frequently_visited_areas:String,

});

var donor = mongoose.model('donor',donarSchema);
var volunteer = mongoose.model('volunteer',volunteerSchema);
var doctor = mongoose.model('doctor',doctorSchema);


//morgan
//middleware setup
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){

	res.render('home');
});





app.get('/medicinedetails',function(req,res){

	res.render('medicinedetails');
});

app.post('/medicinedetails',function(req,res){

	var newdonor = new donor();
	newdonor.firstname = req.body.firstname;
	newdonor.lastname = req.body.lastname;
	newdonor.email = req.body.email;
	newdonor.password = req.body.password;
	newdonor.phone = req.body.phone;
	newdonor.address = req.body.address;
	newdonor.city = req.body.city;
	newdonor.pincode  = req.body.zip;

	newdonor.save(function(err){

		if(err)
			console.log(err);
		else
			res.render('home');
	});
});


app.get('/service',function(req,res){

	res.render('service');
});


app.post('/service',function(req,res){

	var newdoctor = new doctor();
	newdoctor.firstname = req.body.firstname;
	newdoctor.lastname = req.body.lastname;
	newdoctor.email = req.body.email;
	newdoctor.password = req.body.password;
	newdoctor.phone = req.body.phone;
	newdoctor.address = req.body.address;
	newdoctor.city = req.body.city;
	newdoctor.Specialist = req.body.Specialist;
	newdoctor.frequently_visited_areas = req.body.frequently_visited_areas;
	

	newdoctor.save(function(err){

		if(err)
			console.log(err);
		else
			res.render('home');
	});


});


app.get('/volunteer',function(req,res){

	res.render('volunteer');
});


app.post('/volunteer',function(req,res){

	var newvolunteer = new volunteer();
	newvolunteer.firstname = req.body.first_name;
	newvolunteer.lastname = req.body.last_name;
	newvolunteer.email = req.body.email;
	newvolunteer.password = req.body.password;
	newvolunteer.phone = req.body.phone;
	newvolunteer.address = req.body.address;
	newvolunteer.city = req.body.city;
	newvolunteer.volunteer_type = req.body.VolunteeringType;
	newvolunteer.area  = req.body.area;


	newvolunteer.save(function(err){

		if(err)
			console.log(err);
		else
			res.render('home');
			console.log(req.body);

	});




});

app.get('/login',function(req,res){

	res.render('login');
})

app.post('/login',function(req,res){

	var password = req.body.password;
	console.log(req.body);

	doctor.findOne({email:req.body.email},function(err,user){

		console.log(user);
		if(err) throw err;
		if(!user){	

					console.log(req.body.email);
					console.log(user);
					return res.render('login');

				}
		else if(user)
			{
				 if(password==user.password){
						

				 	console.log('user');
					return res.render('doctor');

						
					}

				else{

				 	console.log(user);
				 	console.log(password);
						
						console.log('user password wrong');
				
					return res.render('login');	
				}
			}
	});
});

app.get('/doctor',function(req,res){

	res.render('doctor')
})

app.get('/donor',function(req,res){

	res.render('donor')
})
app.get('/volunteerfinal',function(req,res){

	res.render('volunteerfinal')
})

app.use(express.static(__dirname+'/public'));

app.listen(port,function(){

	console.log('server is running....');
})
