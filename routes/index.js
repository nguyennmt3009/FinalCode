const express = require('express');
const router = express.Router();
const userDAO = require('./users');

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/home');
  } else {
      next();
  }    
};

router.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


router.get('/home', function(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + '/public/manage.html');
} else {
    res.redirect('/login');
}
})


router.get('/login', sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/public/login.html');
});
router.post('/login', (req, res) => {
    var username = req.body.username,
        password = req.body.password;
    console.log(`Log in: ${username} ${password}`);
    let user = userDAO.login(username, password);
    if (user) {
        req.session.user = user.fullname;
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});


module.exports = router;
