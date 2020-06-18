import {sendAjaxToServer} from '../utils';

const textarea = $('#history-text');
const saveBtn  = $('#history-save');

export const showHistoryOnSidebar = function(){
    $('.history').show();
    $('.history').addClass('active');
}

export const setEventForSaveBtn = function(){
    
    saveBtn.click(function(e){
        let history   = textarea.val();
        let gatewayId = location.pathname.split('/').pop();
        let data = { history, gatewayId };
        sendAjaxToServer("/history/setup/log", "POST", JSON.stringify(data))
        .then(function(responseForm){
            console.log("Setup log success.");
        })
        .catch(function(e){
            console.log(e + '');
        })
    })
}