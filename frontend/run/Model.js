import util from '../utils';

export default (function(){

    return {
        initDrawingFromServer: function (designId) {
            return new Promise((resolve, reject) => {

                util.sendAjaxToServer("/running/json/fetch/" + designId)
                    .then(function (receiveForm) {
                        let drawJson = receiveForm.getData().drawing;

                        console.log(JSON.parse(drawJson));
                        return resolve(JSON.parse(drawJson));
                    })
                    .catch(function (e) {
                        return reject(false);
                    })
            })
        },

        
    }
})()
