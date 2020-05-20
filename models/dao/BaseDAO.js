const Design = require('../Design');
const Drawing = require('../Drawing');
const Gateway = require('../Gateway');
const User = require('../User');

/** Created by ducman1998 [12/5/2020]
 * List of BaseDAO API:
 * 1. findOneByObject() *
 * 2. findOneByKeynValue() *
 * 3. findManyByObject() *
 * 4. findManyByKeynValue() *
 * 5. findOneById() *
 * 6. findOneAndDeleteByKeynValue() *
 * 7. isExistsByObject() *
 * 8. isExistsByKeynValue() *
 * 9. countDocumentsByObject() *
 * 10. countDocumentByKeynValue() *
 * 11. deleteOneByObject() *
 * 12. deleteOneByKeynValue() *
 * 13. deleteManyByObject() *
 * 14. deleteManyByKeynValue() *
 */
module.exports = class BaseDAO {

    constructor(model) {
        this.model = model;
    }


    /**
    * Function to find one document by object 
    * Ex: {key_1 : value, key_2 : value ...}
    * @param   {object} searchObj 
    * @returns {Promise} 
    * + doc: result of query in database if success
    * + error message: if fail
    */
    findOneByObject(searchObj) {

        if (typeof searchObj != 'object') {
            return Promise.reject(new Error("Invalid search object."));
        }

        return new Promise((resolve, reject) => {
            this.model.findOne(searchObj)
                .then(function (doc) {
                    return resolve(doc);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("FindOne get ERROR."));
                })
        })
    }



    /**
     * Function to find one document by {key: value}
     * @param {string} key
     * @param {string} value
     * @returns {Promise} doc - result of query in database
     */
    async findOneByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        try {
            const doc = await this.findOneByObject(searchObj);
            return Promise.resolve(doc);
        } catch (e) {
            return Promise.reject(e);
        }

    }


    /**
     * Function to find many document by search object
     * @param {Object} searchObj
     * @returns {Promise} Array[docs] - A list of document 
     * matching with search object
     */
    findManyByObject(searchObj) {

        return new Promise((resolve, reject) => {
            this.model.find(searchObj)
                .then(function (docs) {
                    return resolve(docs);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("Find get ERROR."));
                })
        })
    }

    /**
     * Function to find many document by {key: value}
     * @param {string} key
     * @param {string} value 
     * @returns {Promise} Array[docs] - A list of document 
     * matching with search object
     */
    async findManyByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        try {
            let docs = await this.findManyByObject(searchObj);
            return Promise.resolve(docs);
        } catch (e) {
            return Promise.reject(e);
        }
    }


    /**
     * Function to find one document by id (alt fijdOne({_id: id || null}))
     * @param {string} id
     * @returns {Promise} doc - result of query in database
     */
    findOneById(id) {

        return new Promise((resolve, reject) => {
            this.model.findById(id)
                .then(function (doc) {
                    return resolve(doc);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("FindById get ERROR."));
                })
        })
    }


    /**
    * Function to find one document by {key: value} and delete it
    * @param {string} key
    * @param {string} value
    * @returns {Promise} doc - which was returned after delete action
    */
    findOneAndDeleteByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        return new Promise((resolve, reject) => {
            this.model.findOneAndDelete(searchObj)
                .then(function (doc) {
                    return resolve(doc);

                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("findOneAndDelete get ERROR."));
                })
        })
    }


    /**
    * Function to find at least one document matching with search object
    * if at least one match return true, else return false
    * @param {object} searchObj
    * @returns {Promise<boolean>} true if document is exist, else return false
    */
    isExistsByObject(searchObj){

        return new Promise((resolve, reject) => {
            this.model.exists(searchObj)
                .then(function (isExist) {
                    return resolve(isExist);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("Exists get ERROR."))
                })
        })
    }

    /**
    * Function to find at least one document matching with {key: value}
    * if at least one match return true, else return false
    * @param {string} key
    * @param {string} value
    * @returns {Promise<boolean>} true if document is exist, else return false
    */
    async isExistsByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        try{
            let isExist = await this.isExistsByObject(searchObj);
            return Promise.resolve(isExist);
        }catch(e){
            return
        }
    }


    /**
   * Function to count number of document matching with searchObj
   * @param {Promise} searchObj
   * @returns {number} count - the number of document which was found in database
   */
    countDocumentsByObject(searchObj) {

        return new Promise((resolve, reject) => {
            this.model.countDocuments(searchObj)
                .then(function (count) {
                    return resolve(count);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("countDocuments get ERROR."))
                })
        })
    }


    /**
    * Function to count number of document matching with {key: value}
    * @param {string} key
    * @param {string} value
    * @returns {number} count - the number of document which was found in database
    */
    async countDocumentByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        try {
            let count = await this.countDocumentsByObject(searchObj);
            return Promise.resolve(count);
        } catch (e) {
            return Promise.reject(e);
        }
    }


    /**
  * Function to delete one document by search Object
  * @param {Promise} searchObj
  * @returns {number} deletedCount if success, instance of Error if fail
  */
    deleteOneByObject(searchObj) {

        return new Promise((resolve, reject) => {
            this.model.deleteOne(searchObj)
                .then(function (result) {
                    return resolve(result.deletedCount);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("deleteOne get ERROR."));
                })
        })
    }


    /**
   * Function to delete one document by {key: value}
   * @param {string} key
   * @param {string} value
   * @returns {number} deletedCount if success, instance of Error if fail
   */
    async deleteOneByKeynValue(key, value) {
        let searchObj = {};
        searchObj[key] = value;

        try {
            let deletedCount = await this.deleteOneByObject(searchObj);
            return Promise.resolve(deletedCount);
        } catch (e) {
            return Promise.reject(e);
        }
    }


    /**
    * Function to delete many document by search Object
    * @param {object} searchObj
    * @returns {number} deletedCount if success, instance of Error if fail
    */
    deleteManyByObject(searchObj){

        return new Promise((resolve, reject) => {
            this.model.deleteMany(searchObj)
                .then(function (result) {
                    return resolve(result.deletedCount);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject(new Error("deleteMany get ERRROR."))
                })
        })
    }


     /**
    * Function to delete many document by {key: value}
    * @param {string} key
    * @param {string} value
    * @returns deletedCount if success, instance of Error if fail
    */
    async deleteManyByKeynValue(key, value){
        let searchObj = {};
        searchObj[key] = value;

        try{
            let deletedCount = await this.deleteManyByObject(searchObj);
            return Promise.resolve(deletedCount);
        }catch(e){
            return Promise.reject(e);
        }
    }

}