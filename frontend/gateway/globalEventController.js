import {clearNewGatewayModal, clearNewPLCModal}  from './gatewayUtil';
import {parseGatewayFromModal} from './gatewayUtil';
import {parsePLCFromModal}     from './gatewayUtil';
import {updateGatewayOnPopup}  from './gatewayUtil';
import {showAddGatewayPopup}   from './gatewayUtil';
import {showEditGatewayPopup}  from './gatewayUtil';
import {onChangeProducer}      from './gatewayUtil';
import {onChangePLCType}       from './gatewayUtil';
import {onChangeTagType}       from './gatewayUtil';
import {onChangeAlarmEnable}   from './gatewayUtil';
import {showPLCTableOnPopup}   from './gatewayUtil';
import {showTagTableOnPopup}   from './gatewayUtil';
import {showCreatePLCButton}   from './gatewayUtil';
import {parseGatewayIdFromModal} from './gatewayUtil';
import {sendAjaxToServer}      from '../utils';




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

    function addHandlerForEditPLCTab(){
        $('#editGateway .plc select[name=producer]').change(onChangeProducer);
        $('#editGateway .plc select[name=type]').change(onChangePLCType);

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
        }

        window.onEditPLC = function(plcId){
            showCreatePLCButton(false);
            let plc = dataContainerRef.getPLCById(plcId);
            console.log(plc);
        }

        window.onDeletePLC = function(plcId){
            showCreatePLCButton(true);
            let plc = dataContainerRef.getPLCById(plcId);
            console.log(plc);
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
                //dataContainerRef.createPLC(plcObj);
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
    }

    return {

        addEventGlobalFunction: function(){
            addHandlerForCreateButton();
            addHandlerForSaveNewGateway();
            addHandlerForShowGatewayInfo();
            addHandlerForEditGatewayButton();
            addHandlerForDeleteGatewayButton();
            addHandlerForEditPLCTab();
            addHandlerForEditTagTab();
        }
    }
}



export default globalEventController;