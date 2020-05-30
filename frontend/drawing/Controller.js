let url              = require('url');
let onChange         = require('on-change');
                       
import resolution     from '../../models/constant/resolution';
import BaseController from './BaseController';
import View           from './View';
import Model          from './Model';
import modalEventUtil from './modalEventUtil';
import modalUtil from './modalUtil';

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

    


    async initDrawingBoard(){
        
        // Step 1. Set event button control
        this.setupAllControlBtnClickEvent(this);
        // Step 2: Fetch design data from server
        let designId = View.getDesignId();
        console.info(designId)
        
        try {
            let response = await this.model.initDrawingFromServer(designId);          

        }catch(e){
            console.log(e)
        }



        // Step x: Render previous drawing result
       
        
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









