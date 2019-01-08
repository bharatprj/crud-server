
var nodemailer = require('nodemailer');
var model = require('../collections/user-model');

var sendResetMail = function (req, res, next) {
    model.find({ email: req.query.email }, function (err, data) {
        if (err) {
            res.status(400).send("user not exist");
        }
        else {

            let smtpTransport = nodemailer.createTransport({
                service :'gmail',
                auth: {
                    user: 'bprajapati@okruti.com',
                    pass: '9782258520'
                }
            }
            );
            // setup email data with unicode symbols
            let mailOptions = {
                from: 'bprajapati@okruti.com',     // sender address
                to: req.query.email,        // list of receivers
                subject: 'Reset Password', // Subject line
                // text: 'Hello world?', // plain text body
                html: "<h1> Hello #{user.username}!</h1>" +
                    "<p> Here is the link to reset your password </p>" +
                    "<a href=http://localhost:4200/profile/user_id/resetpassword>Reset</a>"
            };

            smtpTransport.sendMail(mailOptions, (err, res) => {
                // if (err) { next(err);}
                // else { next(res); }
                next();
            });

        }
    });
}

module.exports = sendResetMail;