const Util        = require('../utils');
const designUtil  = require('./designUtil');
const ReceiveForm = require('../../models/form/CommonReceiveForm');
const AddDesignForm  = require('../../models/form/AddDesignForm');



// Design List data for create new Design action
let designList = {
    data: [],

    getData: function(){
        return this.data;
    },

    setData: function(data){
        this.data = data;
    },

    initProjectFromServer: function(){
        let receiveForm;

        return new Promise((resolve, reject) => {

            Util.sendAjaxToServer("/design/json/fetch/designList", "GET")
                .then(function (receiveForm) {
                   
                    if (receiveForm.isSuccess()) {
        
                        designList.setData(receiveForm.getData());
                        console.log("Data: ", designList.getData());
                        return resolve(true);
                    } else {

                        this.data = [];
                        return reject(false);
                    }
                })
                .catch(function (error) {
                    return reject(false);
                })

        })

    },

    createNewProject: function(project){
        this.data.push(project);
    },

    deleteDesign: function(designId){

        return new Promise((resolve, reject) => {
            
            Util.sendAjaxToServer("/design/json/delete/" + designId, "DELETE")
                .then(function(receiveForm){
                   
                    if (receiveForm.isSuccess()){
                        designList.setData(receiveForm.getData());
                        designUtil.renderDesignTable(designList);
                    }
                })
                .catch((e) => console.error(e));
        })

    }
}

module.exports = designList;