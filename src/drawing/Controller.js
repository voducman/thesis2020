let Line        = require('./model/Line');
let Polyline    = require('./model/Polyline');
let Ellipse     = require('./model/Ellipse');
let Circle      = require('./model/Rectangle');
let Polygone    = require('./model/Polygone');
let Textblock   = require('./model/Textblock');
let Graphview   = require('./model/Graphview');
let Table       = require('./model/Table');
let Display     = require('./model/DisplayValue');
let Button      = require('./model/Button');
let Switch      = require('./model/Switch');
let Input       = require('./model/Input');
let Slider      = require('./model/Slider');
let Progress    = require('./model/ProgressBar');
let Checkbox    = require('./model/Checkbox');
let SymbolSet   = require('./model/SymbolSet');
let LineChart   = require('./model/LineChart');
let BarChart    = require('./model/BarChart');
let PieChart    = require('./model/PieChart');
let GaugeChart  = require('./model/GaugeChart');

let url              = require('url');
let onChange         = require('on-change');
                       
import resolution     from '../../models/constant/resolution';
import BaseController from './BaseController';
import View           from './View';
import Model          from './Model';
require('./design.config.js');

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








