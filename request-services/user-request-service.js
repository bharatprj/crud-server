var express = require('express');
const router = express.Router();
var model = require('../collections/user-model');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/token.verifier');

// signing up user data
    router.post("/api/user/signup", function (req, res) {
        var mod = new userModel(req.body);
        mod.save(function (err, data) {
            if (err) {
               res.status(500).send(err);
            }
            else {
               res.status(200).send({ data: "record has been inserted..!!" });
            }
        });
    });

    //authorising user on signIn
    router.post("/api/user/signin", function (req, res) {
      model.find({ email: req.body.email, password: req.body.password }, function (err, data) {
          if (err) {
              res.status(400).send("invalid Credentials");
          }
          else {
            let payload = { subject: data[0]._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token: token, userinfo: data[0]});
        }
      });
  });

  //sending user data by id 
  router.get("/api/user/info", verifyToken, function (req, res) {
    userModel.findById(req.query._id, function (err, data) {
        if (err) {
            res.status(400).send("No data found");
        }
        else {
            res.status(200).send(data[0]);
        }
    });
});

module.exports = router;