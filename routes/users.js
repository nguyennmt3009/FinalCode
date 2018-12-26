const data = require('./data');

module.exports = {
    login : function (username, password) {
        let checker = data.find(u => u.username == username && password == password);
        return checker;
    },

    create : function(fullname, username, password) {
        data.push({
            id: data.length + 1,
            fullname,
            username,
            password
        })
    }
}