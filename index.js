const app = require('./crud-server');
var mongo = require("mongoose");
var userRequest = require('./request-services/user-request-service')

mongo.connect("mongodb://user:user12@ds141633.mlab.com:41633/crud-database-server",{ useNewUrlParser: true }, function (err, response) {
   if (err) { console.log(err); }
   else { console.log('Connected to database'); }
});

app.listen(8080, function (error, response) {
   if (error) {
      response.end("server connection failed")
   } else { console.log('Connected to Express Server'); }
});

//for handling user data based request
app.use(userRequest);

