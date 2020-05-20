const CommonResponseForm = require('../form/CommonResponseForm');

module.exports = class CommonReceiveForm{
    /**
     * Creates an instance of CommonReceiveForm.
     * @param {CommonResponseForm} responseForm
     */
    constructor(responseForm){
        this.success = responseForm.success;
        this.message = responseForm.message;
        this.data    = responseForm.data;
    }

    isSuccess(){
        return this.success;
    }

    getMessage(){
        return this.message;
    }

    getData(){
        return this.data;
    }
}