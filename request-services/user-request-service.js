var express = require('express');
var fs = require('fs');
const router = express.Router();
var model = require('../collections/user-model');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/token.verifier');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname + '-' + Date.now())
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });
// var upload = multer({ dest: 'uploads' })

// signing up user data
router.post("/api/user/signup", upload.single('image'), function (req, res) {
    var mod = new userModel(req.body);
    mod.image = req.file.path;
    mod.save(function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send({ data: "record has been inserted..!!" });
        }
    });
});


// update Info
router.put('/api/user/update', verifyToken, upload.single('image'), function (req, res) {
    userModel.findByIdAndUpdate(req.query._id, req.body, { new: false }, function (err, data) {
        if (err) {
            res.status(400).send("No data found");
        }
        else {
            let file = data.image;
                fs.readFile(process.cwd() + "\\" + file, 'base64', (err, base64Image) => {
                    var bitmap = `data:image/jpeg;base64, ${base64Image}`;
                    response = { ...data };
                    response._doc.image = bitmap;
                    res.status(200).send(response._doc);
                });
        }
    });
});

//authorising user on signIn
router.get("/api/user/signin", function (req, res) {
    model.find(req.query, function (err, data) {
        if (err) {
            res.status(400).send("invalid Credentials");
        }
        else if (data && data.length > 0) {
            let payload = { subject: data[0]._id };
            let token = jwt.sign(payload, 'secretKey');
            let file = data[0].image;
            fs.readFile(process.cwd() + "\\" + file, 'base64', (err, base64Image) => {
                var bitmap = `data:image/jpeg;base64, ${base64Image}`;
                response = { ...data[0] };
                response._doc.image = bitmap;
                res.status(200).send({ token: token, userinfo: response._doc });
            }
            );
            // var bitmap = fs.readFileSync(process.cwd()+"\\"+file);
            // let s = new Buffer(bitmap).toString('base64');

            // let s = fs.createReadStream(ex+"\\"+file);
            // s.pipe(res);
        }
    });
});

//sending user data by id 
router.get("/api/user/info", verifyToken, function (req, res) {
    if (req.query._id) {
        userModel.findById(req.query._id, function (err, data) {
            if (err) {
                res.status(400).send("No data found");
            }
            else {
                let file = data.image;
                fs.readFile(process.cwd() + "\\" + file, 'base64', (err, base64Image) => {
                    var bitmap = `data:image/jpeg;base64, ${base64Image}`;
                    response = { ...data };
                    response._doc.image = bitmap;
                    res.status(200).send(response._doc);
                });
            }
        });
    } else {
        res.status(500).send("id can not be null");
    }
});

//removing user data
router.delete('/api/user/remove', verifyToken, function (req, res) {
    userModel.findByIdAndRemove(req.query._id, function (err, data) {
        if (err) {
            res.status(400).send("No data found");
        }
        else {
            res.status(200).send("Account Removed Successfully");
        }
    });
});


router.post("/api/user/uploadimage", upload.single('image'), function (req, res, next) {
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


module.exports = router;