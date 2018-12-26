var {buildSchema} = require('graphql');
var UserData = require('./data');

const schema = buildSchema(`
type Query {
    allUser : [User],
    login(username: String, password: String) : User,
    get(id: Int!) : User,
    find(fullname: String) : [User]
}

type Mutation {
    createUser(input: UserInput) : User,
    updateUser(id: Int!, input: UserInput) : User
    deleteUser(id: Int!) : User
}

input UserInput {
    fullname: String
    username: String
    password: String 
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
    find: (args) => UserData.filter(u => u.fullname.includes(args.fullname)),
    createUser: (args) => {
        let u = {
                id: UserData.length + 1, 
                fullname: args.input.fullname,
                username: args.input.username,
                password: args.input.password
            }
        UserData.push(u);
    return u;
    },
    updateUser: (args) => {
        let u = UserData.findIndex(user => user.id === args.id);
        if (u < 0) {
            return null;
        } else {
            UserData[u] = {
                id: args.id,
                fullname: args.input.fullname,
                username: args.input.username,
                password: args.input.password
            }
            return UserData[u];
        }
    },
    deleteUser: (args) => {
        let index = UserData.findIndex(user => user.id === args.id);
        if(index >= 0) {
            UserData.splice(index, 1);
        }
        return null;
    }
    
}

module.exports = {
    schema,
    rootValue
}