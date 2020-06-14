                    
import resolution         from '../../models/constant/resolution';
import BaseController     from './BaseController';
import View               from './View';
import Model              from './Model';
import modalEventUtil     from './modalEventUtil';
import eventUtil          from './eventUtil';
import {sendAjaxToServer} from '../utils';

let controller;                   

// let dataWatched = onChange(drawingData, (path, value, previousValue)=>{
//     // Update UI of drawing page

// })

class Controller extends BaseController{
    constructor(){
        super();
        this.view = {};
        
        this.model = Model;
    }

    async fetchListTag(){
        try{
            let gateways, plcs, tags, responseForm, results = [], tagPicker = $('#tagPicker tbody');
            responseForm = await sendAjaxToServer("/gateway/json/list/gateways");
            if (responseForm.success) gateways = responseForm.getData();
            responseForm = await sendAjaxToServer("/gateway/json/list/plcs");
            if (responseForm.success) plcs = responseForm.getData();
            responseForm  = await sendAjaxToServer("/gateway/json/list/tags");
            if (responseForm.success) tags = responseForm.getData();
            
            if (!gateways || !plcs || !tags) return;
            if (Array.isArray(tags)){
                tags.forEach(function(tag){
                    if (tag.type === 'internal'){
                        results.push(tag.name);
                    }else{
                        let tagName;
                        let gatewayIndex = gateways.findIndex(gw => gw.uniqueId == tag.gatewayId);
                        let plcIndex = plcs.findIndex(plc => plc._id == tag.plcId);
                        if (gatewayIndex == -1 || plcIndex == -1) return;
                        tagName = gateways[gatewayIndex].name + '_' + plcs[plcIndex].name + '_' + tag.name;
                        results.push(tagName);
                    }
                })

                results.forEach(function(tagName, index){
                    tagPicker.append(`
                        <tr>
                            <td ondblclick="onPickTag('${tagName}')">${index+1}/ ${tagName}</td>
                        </tr>`)
                })
            }
        }catch(e){
            console.log(e + '');
        }
    }


    async initDrawingBoard(){
        
        // Step 1. Set event button control
        this.setupAllControlBtnClickEvent(this);
        // Step 2: Fetch design data from server
        let designId = View.getDesignId();
        
        try {
            let pageList = await this.model.initDrawingFromServer(designId);  
            if (pageList.length > 0) this.setupAllEventSymbolButton();        
            // Loop in drawObject to re-render drawing page
            View.renderPageFromOldData(pageList, this);
            this.fetchListTag();
        }catch(e){
            console.log(e + '');
        }  
    }

    
    setupAllEventSymbolButton(){
        
        // Step 1: setup event handler function
        // Set cursor to pointer on white board
        //this.resetDrawingCursor("#" + whiteBoard.id());
        // Basic symbol
        this.setupAllBasicClickEvent(this);
        // Elements symbol
        this.setupAllElementsClickEvent(this);
        // Graph symbol
        this.setupAllGraphClickEvent(this);
        // Advanced symbol
        this.setupAllAdvancedClickEvent(this);
    }

    destroyAllEventSymbolButton(){
        // Step 2. destroy all event on all symbol buttons
        this.destroyAllBasicClickEvent();
        this.destroyAllElementsClickEvent();
        this.destroyAllGraphClickEvent();
        this.destroyAllAdvancedClickEvent();
    }
}


controller = new Controller();
controller.initDrawingBoard();
modalEventUtil.initEventApplyBtn();
eventUtil.addHandlerEventTagBtn();








