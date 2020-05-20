const BaseDAO = require("./BaseDAO");
const Design  = require("../Design");

module.exports = class DesignDAO extends BaseDAO{
    constructor(){
        super(Design);
    }

    /**
     * create new model and save to drawing collection
     * @param {string} designId - Id of design created in design page
     * @param {string} email
     * @param {string} drawing - Drawing data from drawing page
     * saved to re-render when run or design
     * @returns {Promise<object>} New Design if create & save success,
     *  else return null if exceed 10 or not success
     */
    async createAndSaveNewDesign(email, name, description, resolution) {
        try {
            const count = await this.countDocumentByKeynValue("email", email);
            if (count >= 10) {
                return Promise.resolve(null);
            }
            
            let designId = Design.getDesignIDBasedUNIXTime();
            const newDesign = new Design({ 
                "email": email, 
                "designId": designId, 
                "name": name, 
                "description": description, 
                "resolution": resolution,
                "compiled": false,
                "runLink": null    
            })

            return await newDesign.save();

        } catch (e) {
            return Promise.reject(e);
        }

    }

    async countTotalDesignByEmail(email){
        try{
            let count = await this.countDocumentByKeynValue("email", email);
            return Promise.resolve(count);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async getDesignByIdAndEmail(designId, email){

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

    async getListDesignByEmail(email){
        try{
            let docs = await this.findManyByKeynValue("email", email);
            return Promise.resolve(docs);
        }catch(e){
            return Promise.reject(e);
        }
      
    }

    async deleteDesignByDesignId(designId){
        try{
            let deletedCount = await this.deleteOneByKeynValue("designId", designId);
            return Promise.resolve(deletedCount);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async deleteAllDesignByEmail(email){
        try{
            let detetedCount = await this.deleteManyByKeynValue("email", email);
        }catch(e){
            return Promise.reject(e); 
        }
    }
    
}