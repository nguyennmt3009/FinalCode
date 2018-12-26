const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');

// const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, 'routes/public')));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.use('/', indexRouter);

/*****
 * GRAPHQL
 */

const express_graphql = require('express-graphql');
const {schema, rootValue} = require('./routes/schema');

app.use('/graphql', express_graphql({
    schema,
    rootValue,
    graphiql: true
}));

app.listen(3000, () => console.log("Listening at port 3000..."));