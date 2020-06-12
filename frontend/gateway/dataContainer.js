import Gateway from './Gateway';
import PLC     from './PLC';
import Tag     from './Tag';
import {sendAjaxToServer}      from '../utils';
import {updateTableOnMainPage} from './gatewayUtil';
import {updatePLCTableOnPupup} from './gatewayUtil';

const dataContainer = (function(){

    let gateways = [];
    let plcs     = [];
    let tags     = [];

    async function fetchGatewayDataFromServer(){
        let responseForm;
        try {
            responseForm = await sendAjaxToServer("/gateway/json/fetch/gateways");
            gateways = responseForm.getData();
            updateTableOnMainPage(gateways);

        }catch(e){
            console.log(e + '');
        };
    }

    async function fetchPLCDataFromServer(gatewayId){
        let responseForm;
        try {
            let data = JSON.stringify({gatewayId});
            responseForm = await sendAjaxToServer("/gateway/json/fetch/plcs", "POST", data);
            plcs = responseForm.getData();
            updatePLCTableOnPupup(plcs);

        }catch(e){
            console.log(e + '');
        };
    }

    return {

        initGatewayData: function(){
            fetchGatewayDataFromServer();
        },

        fetchPLCData: function(gatewayId){
            fetchPLCDataFromServer(gatewayId);
        },

        initTagData: function(plcId){

        },

        createGateway: async function(gatewayObj){
            try{
                let data = JSON.stringify(gatewayObj);
                let responseForm = await sendAjaxToServer("/gateway/json/create/gateway", "PUT", data);
                if (responseForm.success){
                    gateways = responseForm.getData();
                    updateTableOnMainPage(gateways);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        updateGateway: async function(gatewayObj){
            try{
                let data = JSON.stringify(gatewayObj);
                let responseForm = await sendAjaxToServer("/gateway/json/update/gateway", "PUT", data);
                if (responseForm.success){
                    gateways = responseForm.getData();
                    updateTableOnMainPage(gateways);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        deleteGateway: async function(gatewayId){
            try{
                let data = JSON.stringify({'uniqueId': gatewayId});
                let responseForm = await sendAjaxToServer("/gateway/json/delete/gateway", "DELETE", data);
                console.log(responseForm);
                if (responseForm.success){
                    gateways = responseForm.getData();
                    updateTableOnMainPage(gateways);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        getGatewayByUniqueId: function(gatewayId){
            let index = gateways.findIndex((gw) => gw.uniqueId == gatewayId);
            if (index == -1) return null;
            return gateways[index];
        },

        createPLC: async function(plcObj){
            try{
                let data = JSON.stringify(plcObj);
                let responseForm = await sendAjaxToServer("/gateway/json/create/plc", "PUT", data);
                if (responseForm.success){
                    plcs = responseForm.getData();
                    updatePLCTableOnPupup(plcs);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        getPLCById: function(plcId){
            let index = plcs.findIndex((plc) => plc._id == plcId);
            if (index == -1) return null;
            return plcs[index];
        }
    }
})()

export default dataContainer;