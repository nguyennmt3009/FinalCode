var {buildSchema} = require('graphql');
var UserData = require('./data');

const schema = buildSchema(`
type Query {
    allUser : [User],
    login(username: String, password: String) : User,
    get(id: Int!) : User,
    find(fullname: String) : [User]
}

type User {
    id: Int
    fullname: String
    username: String
    password: String 
}
`);

const rootValue = {
    allUser: () => UserData,
    login: (args) => UserData.find(user => user.username === args.username && user.password === args.password),
    get: (args) => UserData.find(u => u.id === args.id),
    find: (args) => UserData.filter(u => u.fullname.includes(args.fullname))
    
}

module.exports = {
    schema,
    rootValue
}