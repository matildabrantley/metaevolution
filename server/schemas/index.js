const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

class Name {
    constructor (param1, param2, param3) {
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
    }
    
}
class Name {
    constructor (param) {
        this.param = param;
    }
    
}