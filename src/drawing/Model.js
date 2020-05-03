const notify = require('../utils');

export default (function(){
    let source = {};

    return {
        initDrawingFromServer: function(designId){
            return new Promise((resolve, reject) => {
                $.get('/design/fetch/drawing/' + designId)
                    .then((result) => {
                        console.log(result)
                        if (typeof result != "object") {
                            return reject(new Error("Init data fail"))                            
                        }
                        source = result;
                        notify.showSuccessNotification("Init data success.")
                        return resolve(true); 
                    })
                    .catch((error) => {
                        notify.showErrorNotification("Init data error.")
                        return reject(error)
                    })
            })
        },

        
    }
})()
