const http = require('http');
const Router = require('router');
var finalhandler = require('finalhandler')
var bodyParser = require('body-parser')

const UserController = require('./userAPI');
const CourseController = require('./courseAPI');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

var opts = { mergeParams: true }

var router = new Router(opts);
var api = new Router();

var userapi = new Router();
var courseapi = new Router();

var userService = new UserController();
var courseService = new CourseController();

router.use('/api/', api);
api.use('/user/', userapi);
api.use('/course/', courseapi);

api.use(bodyParser.json());
userapi.use(bodyParser.json());
courseapi.use(bodyParser.json());

/*---------------------------------------------------
DEFINE APIs OF USER
---------------------------------------------------*/
//sign in api
//POST /api/signin
//POST DATA: { "userName": "", "password": "" }
api.post('/signin', function (req, res) {
  userService.SignIn(req, res);
});

//get user profile
//GET /api/user
userapi.get('/', function (req, res) {
  userService.UserProfile(req, res);
});

//sign up user
//POST /api/user
//POST DATA: { "UserName": "", "Password": "", "FullName": "", "Email": "" }
userapi.post('/', function (req, res) {
  userService.SignUp(req, res);
});

//delete user
//DELETE /api/user/<userName>
userapi.delete('/:userName', function (req, res) {
  userService.DeleteUser(req, res);
});

/*---------------------------------------------------
DEFINE APIs OF COURSE
---------------------------------------------------*/
//get all courses
//GET /api/course
courseapi.get('/', function (req, res) {
  courseService.GetAll(req, res);
});

//get course by name
//GET /api/course/<courseName>
courseapi.get('/:courseName', function (req, res) {
  courseService.GetOne(req, res);
});

//add new course
//POST /api/course
//POST DATA: { "name": "", "price": 0.00 }
courseapi.post('/', function (req, res) {
  courseService.AddNew(req, res);
});

//delete course
//DELETE /api/course/<courseName>
courseapi.delete('/:courseName', function (req, res) {
  courseService.Delete(req, res);
});

const server = http.createServer((req, res) => {

  req.on('error', (err) => {
    console.error(err);
  });

  res.on('error', (err) => {
    console.error(err);
  });

  router(req, res, finalhandler(req, res));
});


server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });