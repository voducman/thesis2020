import {sendAjaxToServer}      from '../utils';
import {updateTableOnMainPage} from './gatewayUtil';
import {updatePLCTableOnPopup} from './gatewayUtil';
import {updateTagTableOnPopup} from './gatewayUtil';
import {renderVectorMap}       from './vectorMap';

const dataContainer = (function(){

    let gateways = [];
    let plcs     = [];
    let tags     = [];

    async function fetchGatewayDataFromServer(){
        let responseForm;
        try {
            responseForm = await sendAjaxToServer("/gateway/json/fetch/gateways");
            gateways = responseForm.getData();
            renderVectorMap(gateways);
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
            updatePLCTableOnPopup(plcs);
            return plcs;
        }catch(e){
            console.log(e + '');
        };
    }

    async function fetchTagDataFromServer(gatewayId){
        let responseForm;
        try {
            let data = JSON.stringify({gatewayId});
            responseForm = await sendAjaxToServer("/gateway/json/fetch/tags", "POST", data);
            tags = responseForm.getData();
            console.log(tags);
            updateTagTableOnPopup(tags);
        }catch(e){
            console.log(e + '');
        };
    }

    return {

        initGatewayData: function(){
            fetchGatewayDataFromServer();
        },

        fetchPLCData: async function(gatewayId){
            try{
               let plcs = await fetchPLCDataFromServer(gatewayId);
               return plcs;
            }catch(e){
                console.log(e + '');
            }
        },

        fetchTagData: function(gatewayId){
            fetchTagDataFromServer(gatewayId);
        },

        createGateway: async function(gatewayObj){
            try{
                let data = JSON.stringify(gatewayObj);
                let responseForm = await sendAjaxToServer("/gateway/json/create/gateway", "PUT", data);
                if (responseForm.success){
                    gateways = responseForm.getData();
                    renderVectorMap(gateways);
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
                    renderVectorMap(gateways);
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
                    renderVectorMap(gateways);
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
                    updatePLCTableOnPopup(plcs);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        updatePLC: async function(plcObj){
            try{
                let data = JSON.stringify(plcObj);
                let responseForm = await sendAjaxToServer("/gateway/json/update/plc", "PUT", data);
                if (responseForm.success){
                    plcs = responseForm.getData();
                    updatePLCTableOnPopup(plcs);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        deletePLC: async function(gatewayId, plcId){
            try{
                let data = JSON.stringify({gatewayId, plcId});
                let responseForm = await sendAjaxToServer("/gateway/json/delete/plc", "DELETE", data);
                if (responseForm.success){
                    plcs = responseForm.getData();
                    updatePLCTableOnPopup(plcs);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        getPLCById: function(plcId){
            let index = plcs.findIndex((plc) => plc._id == plcId);
            if (index == -1) return null;
            return plcs[index];
        },

        createTag: async function(tagObj){
            try{
                let data = JSON.stringify(tagObj);
                let responseForm = await sendAjaxToServer("/gateway/json/create/tag", "PUT", data);
                if (responseForm.success){
                    tags = responseForm.getData();
                    updateTagTableOnPopup(tags);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        updateTag: async function(tagObj){
            try{
                let data = JSON.stringify(tagObj);
                let responseForm = await sendAjaxToServer("/gateway/json/update/tag", "PUT", data);
                if (responseForm.success){
                    tags = responseForm.getData();
                    updateTagTableOnPopup(tags);
                }
            }catch(e){
                console.log(e + '');
            }
        },

        getTagById: function(tagId){
            let index = tags.findIndex((tag) => tag._id == tagId);
            if (index == -1) return null;
            return tags[index];
        },

        deleteTag: async function(gatewayId, tagId){
            try{
                let data = JSON.stringify({gatewayId, tagId});
                let responseForm = await sendAjaxToServer("/gateway/json/delete/tag", "DELETE", data);
                if (responseForm.success){
                    tags = responseForm.getData();
                    updateTagTableOnPopup(tags);
                }
            }catch(e){
                console.log(e + '');
            }
        },

    }
})()

export default dataContainer;