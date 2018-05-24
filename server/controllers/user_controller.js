const users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

module.exports = {
  registerUser: function(req, res){
    let role = 'user'
    users.findOne({
      username: req.body.username
    })
    .then(function(userData){
      if (userData != null) {
        res.status(400).json({
            message: "username has been taken!",
        })
      } else {
        let password = req.body.password
        let salt = bcrypt.genSaltSync(saltRounds)
        let hash = bcrypt.hashSync(password, salt);
            users
            .create({
                username: req.body.username,
                password: hash,
                role: role,
            })
            .then(function(result){
                res.status(200).json({
                    message: "success register a new user",
                    result: result
                })
            })
        }
      })
    .catch(function(err){
      res.status(500).json({
          message: err
      })
    })
  },
  loginUser: function(req, res){
    users.findOne({
        username: req.body.username
    })
    .then(function(userData){
      if (!userData) {
          res.status(400).json({
              message: 'incorrect username or password'
          })
      } else {
        bcrypt.compare(req.body.password, userData.password, function(err, result){
          if(!result) {
              res.json({
                  message: 'incorrect username or password'
              })
          } else {
            let token = jwt.sign({id: userData._id}, process.env.SECRET)
            res.json({
                message: 'Success login',
                token: token,
                username: userData.username,
                role: userData.role
            })
          }
        })
      }
    })
  },
}
