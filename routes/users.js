const data = require('./data');

module.exports = {
    login : function (username, password) {
        let checker = data.find(u => u.username == username && password == password);
        return checker;
    },
}