const BaseDAO = require("./BaseDAO");
const Tag     = require("../Tag");


module.exports = class TagDAO extends BaseDAO{
    constructor(){
        super(Tag);
    }

}