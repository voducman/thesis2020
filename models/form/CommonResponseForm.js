module.exports = class CommonResponseForm{

    /**
     *Creates an instance of CommonResponseForm.
     * @param {boolean} success
     * @param {string} message
     * @param {object} data
     */
    constructor(success, message, data){
        this.success = success;
        this.message = message || null;
        this.data = data || null;
    }

    setSuccess(success){
        this.success = success;
    }

    setMessage(message){
        this.message = message;
    }

    setData(data){
        this.data = data;
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