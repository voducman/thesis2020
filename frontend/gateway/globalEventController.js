import {parseGatewayIdFromModal} from './gatewayUtil';
import {clearNewGatewayModal}    from './gatewayUtil';
import {clearNewPLCModal}        from './gatewayUtil';
import {clearNewTagModal}        from './gatewayUtil';
import {parseGatewayFromModal}   from './gatewayUtil';
import {parsePLCFromModal}       from './gatewayUtil';
import {parseTagFromModal}       from './gatewayUtil';
import {updateGatewayOnPopup}    from './gatewayUtil';
import {updatePLCOnPopup}        from './gatewayUtil';
import {updateTagOnPopup}        from './gatewayUtil';
import {showAddGatewayPopup}     from './gatewayUtil';
import {showEditGatewayPopup}    from './gatewayUtil';
import {onChangeProducer}        from './gatewayUtil';
import {onChangePLCType}         from './gatewayUtil';
import {onChangeTagType}         from './gatewayUtil';
import {onChangeAlarmEnable}     from './gatewayUtil';
import {showPLCTableOnPopup}     from './gatewayUtil';
import {showTagTableOnPopup}     from './gatewayUtil';
import {showCreatePLCButton}     from './gatewayUtil';
import {showCreateTagButton}     from './gatewayUtil';
import {showPLCOnSelectTag}      from './gatewayUtil';
import {sendAjaxToServer}        from '../utils';




const globalEventController = function(dataContainerRef){

    function addHandlerForCreateButton(){

        $('#addGateway').on('show.bs.modal', function(e){
            clearNewGatewayModal();
        })
        window.addPopupCreateNew =  function(){
            showAddGatewayPopup();
        }
    }

    function addHandlerForSaveNewGateway(){
        window.createGateway = function(){
            let gatewayObj = parseGatewayFromModal('addGateway');
            if (gatewayObj){
                dataContainerRef.createGateway(gatewayObj);
            }
            console.log(gatewayObj)
        }
    }

    function addHandlerForEditGatewayButton(){
        window.showEditGateway = function(gatewayId){
            let gateway = dataContainerRef.getGatewayByUniqueId(gatewayId);
            updateGatewayOnPopup(gateway, dataContainerRef);
            showEditGatewayPopup();
        }
    }

    function addHandlerForShowGatewayInfo(){
        window.countTotalPLCnTag = async function(gatewayId){
            let data = JSON.stringify({gatewayId});
            try{
                let isOpen = document.getElementById('row-' + gatewayId).classList.contains('in');
                if (isOpen) return;

                let responseForm = await sendAjaxToServer("/gateway/json/countPLCnTag", "POST", data);
                if (responseForm.success){
                    let totalPlc = responseForm.getData().totalPlc;
                    let totalTag = responseForm.getData().totalTag;
                    document.getElementById('row-' + gatewayId).querySelector('.totalPlc').textContent = totalPlc;
                    document.getElementById('row-' + gatewayId).querySelector('.totalTag').textContent = totalTag;
                }
            }catch(e){}
        
        }
    }

    function addHandlerForDeleteGatewayButton(){
        window.deleteGateway = async function (gatewayId) {
            try {
                console.log("Delete: ", gatewayId)
                dataContainerRef.deleteGateway(gatewayId);
            } catch (e) { console.log(e + '')}
        }
    }

    function addHandlerForonChangeTabOnPopup(){

        window.onActiveGatewayTab = function(){
            showPLCTableOnPopup(false);
            showTagTableOnPopup(false);
        }

        window.onActivePlcTab = function(){
            showPLCTableOnPopup(true);
            showTagTableOnPopup(false);
            clearNewPLCModal();
            showCreatePLCButton(true);
            const gatewayId = parseGatewayIdFromModal();
            dataContainerRef.fetchPLCData(gatewayId);
        }

        window.onActiveTagTab = function(){
            showPLCTableOnPopup(false);
            showTagTableOnPopup(true);
            const gatewayId = parseGatewayIdFromModal();
            dataContainerRef.fetchTagData(gatewayId);
            dataContainerRef.fetchPLCData(gatewayId)
            .then(plcs => {
                clearNewTagModal();
                onChangeAlarmEnable({target: {checked: false}});
                showPLCOnSelectTag(plcs);
                showCreateTagButton(true);
            })
            .catch(e => console.log(e + ''));
            
        }
    }

    function addHandlerForEditPLCTab(){
        $('#editGateway .plc select[name=producer]').change(onChangeProducer);
        $('#editGateway .plc select[name=type]').change(onChangePLCType);

        window.onEditPLC = function(plcId){
            showCreatePLCButton(false);
            let plc = dataContainerRef.getPLCById(plcId);
            onChangeProducer({target: {value: plc.producer}});
            updatePLCOnPopup(plc);
            onChangePLCType({target: {value: plc.type}});
            updatePLCOnPopup(plc);
            console.log(plc);
        }

        window.onDeletePLC = function(gatewayId, plcId){
            showCreatePLCButton(true);
            dataContainerRef.deletePLC(gatewayId, plcId);
        }

        window.onClickSavePLC = function(){
            let plcObj = parsePLCFromModal();
            if (plcObj){
                dataContainerRef.createPLC(plcObj);
            }
        }

        window.onClickUpdatePLC = function(){
            let plcObj = parsePLCFromModal();
            if (plcObj){
                console.log(plcObj)
                dataContainerRef.updatePLC(plcObj);
            }
        }

        window.onClickUpdateGateway = function(){
            let gatewayId = $('#editGateway .gateway input[name=uniqueId]').val();
            console.log(gatewayId);
        }
        
    }

    function addHandlerForEditTagTab(){
        $('#editGateway .tag select[name=tag-type]').change(onChangeTagType);
        $('#editGateway .tag input[name=alarm-checkbox]').change(onChangeAlarmEnable);

        window.onEditTag = function(tagId){
            showCreateTagButton(false);
            let tag = dataContainerRef.getTagById(tagId);
            updateTagOnPopup(tag);
            onChangeTagType({target: {value: tag.type}});
            onChangeAlarmEnable({target: {checked: tag.alarm}})
            console.log(tag);
        }

        window.onDeleteTag = function(gatewayId, tagId){
            showCreateTagButton(true);
            dataContainerRef.deleteTag(gatewayId, tagId);
        }

        window.onClickSaveTag = function(){
            let tagObj = parseTagFromModal();
            if (tagObj){
                dataContainerRef.createTag(tagObj);
                console.log(tagObj);
            }
        }

        window.onClickUpdateTag = function(){
            let tagObj = parseTagFromModal();
            if (tagObj){
                console.log(tagObj)
                dataContainerRef.updateTag(tagObj);
            }
        }
    }

    return {

        addEventGlobalFunction: function(){
            addHandlerForCreateButton();
            addHandlerForSaveNewGateway();
            addHandlerForShowGatewayInfo();
            addHandlerForonChangeTabOnPopup();
            addHandlerForEditGatewayButton();
            addHandlerForDeleteGatewayButton();
            addHandlerForEditPLCTab();
            addHandlerForEditTagTab();
        }
    }
}



export default globalEventController;