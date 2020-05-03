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
                       
import BaseController from './BaseController';
import View           from './View';
import Model          from './Model';
require('./design.config.js');

                   

// let dataWatched = onChange(drawingData, (path, value, previousValue)=>{
//     // Update UI of drawing page

// })

class Controller extends BaseController{
    constructor(screenW, screenH){
        super();
        this.view = new View(screenW, screenH);

        this.model = Model;
    }




    async initDrawingBoard(){
        // Step 1: setup event handler function
        // 1.1. Button control
        this.setupAllControlBtnClickEvent(this.view.whiteBoard);
        // 1.2. Basic symbol
        this.setupAllBasicClickEvent(this.view.whiteBoard);
        // 1.3. Elements symbol
        this.setupAllElementsClickEvent(this.view.whiteBoard);
        // 1.4. Graph symbol
        this.setupAllGraphClickEvent(this.view.whiteBoard);
        // 1.5. Advanced symbol
        this.setupAllAdvancedClickEvent(this.view.whiteBoard);

        // Step 2: Fetch design data from server
        let designId = this.view.getDesignId();
        try {
            let response = await this.model.initDrawingFromServer(designId);
            console.log(response + "");

            

        }catch(e){
            console.log(e)
        }


        // Step x: Render previous drawing result
       
        
    }
}

let controller = new Controller(1280, 720);
controller.initDrawingBoard();








