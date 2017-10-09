'use strict';

var UserRepository = require('./userRepository');
var userRepo = new UserRepository();

class UserController {
    async SignIn(req, res) {
        var signInUser = req.body;
        var user = await userRepo.FindUserAsync(signInUser.userName);
        if (user === null) {
            res.end('User is not found!');
            return false;
        }

        if (user.Password !== signInUser.password) {
            res.end('Username or Password is not correct!');
            return false;
        }

        res.setHeader('Authorization', user._id);
        res.end('Logged in successful!');

        return true;
    }

    async SignUp(req, res) {
        var user = req.body;
        if (!user) {
            res.statusCode = 404;
            res.end('User information is required!');
            return;
        }

        if (!user.UserName) {
            res.statusCode = 404;
            res.end('Username is required!');
            return;
        }

        if (!user.Password) {
            res.statusCode = 404;
            res.end('Password is required!');
            return;
        }

        if (!user.Email) {
            res.statusCode = 404;
            res.end('Email is required!');
            return;
        }

        var existedUser = await userRepo.FindUserAsync(user.UserName);
        if (!existedUser) existedUser = await userRepo.FindUserAsync(user.Email);
        if (existedUser) {
            res.end('Username or Email was used!');
            return;
        }

        //set registered date to current date
        user.RegisteredDate = new Date();

        var newUser = await userRepo.AddNewAsync(user);
        res.end('Registered new user successful!');
    }

    async UserProfile(req, res) {
        var userId = req.headers['authorization'];
        if (!userId) {
            res.statusCode = 403;
            res.end('Failed to connect!');
            return null;
        };

        var profile = await userRepo.GetOneAsync(userId);
        res.end(JSON.stringify(profile));
    }
}

module.exports = UserController;