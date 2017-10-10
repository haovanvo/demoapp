'use strict';

var UserRepository = require('./userRepository');
var userRepo = new UserRepository();

class UserController {
    SignIn(req, res) {
        var signInUser = req.body;
        userRepo.FindUserAsync(signInUser.userName).then((user) => {
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
        });
    }

    SignUp(req, res) {
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

        userRepo.FindUserAsync(user.UserName).then((existedUser) => {
            if (existedUser) {
                res.end('Username was used!');
                return;
            }

            userRepo.FindUserAsync(user.Email).then((existedUser) => {
                if (existedUser) {
                    res.end('Username was used!');
                    return;
                }

                //set registered date to current date
                user.RegisteredDate = new Date();

                userRepo.AddNewAsync(user).then((newUser) => {
                    if (newUser._id) {
                        res.end('Registered new user successful!');
                    }
                    else {
                        res.end('Registered new user failed!');
                    }
                });
            });
        });
    }

    UserProfile(req, res) {
        var userId = req.headers['authorization'];
        if (!userId) {
            res.statusCode = 403;
            res.end('Failed to connect!');
            return null;
        };

        userRepo.GetOneAsync(userId).then((profile) => {
            res.end(JSON.stringify(profile));
        });
    }

    DeleteUser(req, res) {
        var userId = req.headers['authorization'];
        if (!userId) {
            res.statusCode = 403;
            res.end('Failed to connect!');
            return null;
        };

        var deleteUser = req.params.userName;
        if (!deleteUser) {
            res.statusCode = 400;//bad request
            res.end('Delete User is not found!');
            return;
        }

        userRepo.FindUserAsync(deleteUser).then((user) => {
            if (!user) {
                res.statusCode = 400;//bad request
                res.end("Delete User is not found!");
                return;
            };

            userRepo.DeleteAsync(user._id).then((result) => {
                if (result === true) {
                    res.statusCode = 200;//OK
                    res.end("User is deleted successful!");
                    return;
                }
                else {
                    res.statusCode = 500;//internal server error
                    res.end("There is a problem while the system attemps to delete user!");
                    return;
                }
            });
        });
    }
}

module.exports = UserController;