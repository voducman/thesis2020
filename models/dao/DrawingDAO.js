const BaseDAO = require("./BaseDAO");
const Drawing = require("../Drawing");

module.exports = class DrawingDAO extends BaseDAO{
    constructor(){
        super(Drawing);
    }

    /**
     * create new model and save to drawing collection
     * @param {string} designId - Id of design created in design page
     * @param {string} email
     * @param {string} drawing - Drawing data from drawing page
     * saved to re-render when run or design
     * @returns {boolean} True if save success, else return False
     * return value of an async function is implicitly wrapped in Promise.resolve
     */
    async createAndSaveNewDrawing(designId, email, drawing = "[]"){
        try{
            const newDrawing = new Drawing({email, designId, drawing});
            console.debug(newDrawing);
            return await newDrawing.save();
        }catch(e){
            return Promise.reject(e);
        } 
    }

    async countTotalDrawingByEmail(email){
        try{
            let count = await this.countDocumentByKeynValue("email", email);
            return Promise.resolve(count);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async getDrawingByIdAndEmail(designId, email){

        const searchObj = {
            "designId": designId,
            "email"   : email
        }

        try{
            let drawing = await this.findOneByObject(searchObj);
            return Promise.resolve(drawing);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async getListDrawingByEmail(email){
        try{
            let docs = await this.findManyByKeynValue("email", email);
            return Promise.resolve(docs);
        }catch(e){
            return Promise.reject(e);
        }
      
    }

    async deleteDrawingByEmail(email){
        try{
            let deletedCount = await this.deleteOneByKeynValue("email", email);
            return Promise.resolve(deletedCount);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async deleteAllDrawingByEmail(email){
        try{
            let detetedCount = await this.deleteManyByKeynValue("email", email);
        }catch(e){
            return Promise.reject(e); 
        }
    }

    

    
}