const BaseDAO = require("./BaseDAO");
const Gateway = require("../Gateway");

module.exports = class GatewayDAO extends BaseDAO{
    constructor(){
        super(Gateway);
    }

    
}