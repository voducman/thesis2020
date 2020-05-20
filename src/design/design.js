const Util       = require('../utils');
const designList = require('./designListData');
const designUtil = require('./designUtil');
const AddDesignForm  = require('../../models/form/AddDesignForm');


designList.initProjectFromServer()
    .then(() => {

        designUtil.renderDesignTable(designList);
    })
    .catch((e) => console.error(e));


designUtil.setupEventCreateNewBtn();


$('#save-design').click(function () {
    let newDesignForm = designUtil.parseDataCreateForm();
    if (newDesignForm == null) {
        return false;
    }

    const sendData = JSON.stringify(newDesignForm);
    Util.sendAjaxToServer("/design/json/create", "POST", sendData)
        .then(function (receiveForm) {
         
            if (receiveForm.isSuccess()) {

                designList.createNewProject(receiveForm.getData());
                designUtil.renderDesignTable(designList);
            }
        })
        .catch((e) => console.error(e));
})










