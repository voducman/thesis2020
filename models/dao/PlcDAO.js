const BaseDAO = require("./BaseDAO");
const PLC     = require("../PLC");


module.exports = class PlcDAO extends BaseDAO{
    constructor(){
        super(PLC);
    }

}