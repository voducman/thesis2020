const BaseDAO = require("./BaseDAO");
const User    = require("../User");

module.exports = class UserDAO extends BaseDAO{
    constructor(){
        super(User);
    }
}