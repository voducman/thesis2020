import util from '../utils';

export default (function(){
    let source = {};

    return {
        initDrawingFromServer: function (designId) {
            return new Promise((resolve, reject) => {

                util.sendAjaxToServer("/drawing/json/fetch/" + designId)
                    .then(function (receiveForm) {
                        console.debug({receiveForm})
                        source = receiveForm.getData();
                        return resolve(true);
                    })
                    .catch(function (e) {
                        return reject(false);
                    })
            })
        },

        
    }
})()
