import PositionHandlerUtil from './PositionHandlerUtil';
import {SVG} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';



class BaseController extends PositionHandlerUtil{
        // Control button - event hanler function
        setSaveBtnClickEvent(){
            $('#design-save').click(function(){
                alert("save");
        
            })
        }
    
        setRunBtnClickEvent(){
            $('#design-run').click(function(){
                alert("run")
            })
        }
    
        setStopBtnClickEvent(){
            $('#design-stop').click(function(){
                alert("stop")
            })
        }
    
        setCustomizeClickEvent(){
            $('#design-config').click(function(){
                alert("customize")
            })
        }
    
        setUndoClickEvent(){
            $('#design-undo').click(function(){
                alert("undo")
            })
        }
    
        setReduClickEvent(){
            $('#design-redo').click(function(){
                alert("redo")
            })
        }
    
        setCompileClickEvent(){
            $('#design-compile').click(function(){
                alert("compile")
            })
        }
    
        setAddPageClickEvent(){
            $('#design-add-page').click(function(){
                alert("add page")
            })
        }
    
        // Basic symbol - event hanler function
        setLineClickEvent(wb){     
        
            $('#symbol-line').click(()=>{
                this.drawLineShape(wb);
            })
        }
    
        setPolylineClickEvent(wb){
            $('#symbol-polyline').click(()=>{
                this.drawPolylineShap(wb);                
            })
        }
    
        setEllipseClickEvent(wb){
            $('#symbol-ellipse').click(()=>{
                this.drawEllipseShape(wb);
            })
        }
    
        setCircleClickEvent(wb){
            $('#symbol-circle').click(()=>{
                this.drawCircleShape(wb);
            })
        }
    
        setRectangleClicEvent(wb){
            $('#symbol-rectangle').click(()=>{
                this.drawRectShape(wb, "#whiteBoard");
            })
        }
    
        setPolygoneClickEvent(wb){
            $('#symbol-polygone').click(()=>{
                this.drawPolygonShape(wb);
            })
        }
    
        setTextblockClickEvent(wb){
            $('#symbol-textblock').click(()=>{
                this.drawTextBlock(wb);
            })
        }
    
        setGraphViewClickEvent(wb){
            $('#symbol-graph-view').click(()=>{
                this.drawGraphView(wb);
            })
        }
    
        setTableClickEvent(wb){
            $('#symbol-table').click(()=>{
                this.drawTable(wb);
            })
        }
    
        // Elements symbol - event handler function
        setDisplayValueClickEvent(){
            $('#symbol-display-value').click(function(){
                alert("display value")
            })
        }
    
        setButtonClickEvent(){
            $('#symbol-button').click(function(){
                alert("button")
            })
        }
    
        setToggleClickEvent(){
            $('#symbol-toggle').click(function(){
                alert("toggle")
            })
        }
    
        setInputClickEvent(){
            $('#symbol-input').click(function(){
                alert("input")
            })
        }
    
        setSliderClickEvent(){
            $('#symbol-slider').click(function(){
                alert("slider")
            })
        }
    
        setProcessBarClickEvent(){
            $('#symbol-process-bar').click(function(){
                alert("process bar")
            })
        }
    
        setCheckboxClickEvent(){
            $('#symbol-checkbox').click(function(){
                alert("checkbox")
            })
        }
    
        setSymbolClickEvent(){
            $('#symbol-symbol').click(function(){
                alert("symbol")
            })
        }
    
        // Graph symbol - event handler function
        setLineChartClickEvent(){
            $('#symbol-line-chart').click(function(){
                alert("line chart")
            })
        }
    
        setBarChartClickEvent(){
            $('#symbol-bar-chart').click(function(){
                alert("bar chart")
            })
        }
    
        setPieChartClickEvent(){
            $('#symbol-pie-chart').click(function(){
                alert("pie chart")
            })
        }
    
        setGaugeClickEvent(){
            $('#symbol-gauge').click(function(){
                alert("gauge")
            })
        }
    
        setupAllControlBtnClickEvent(){
            this.setSaveBtnClickEvent();
            this.setRunBtnClickEvent();
            this.setStopBtnClickEvent();
            this.setCustomizeClickEvent();
            this.setReduClickEvent();
            this.setUndoClickEvent();
            this.setCompileClickEvent();
            this.setAddPageClickEvent();
    
        }
    
        setupAllBasicClickEvent(whiteBoard){
            this.setLineClickEvent(whiteBoard);
            this.setPolylineClickEvent(whiteBoard);
            this.setEllipseClickEvent(whiteBoard);
            this.setCircleClickEvent(whiteBoard);
            this.setRectangleClicEvent(whiteBoard);
            this.setPolygoneClickEvent(whiteBoard);
            this.setTextblockClickEvent(whiteBoard);
            this.setGraphViewClickEvent(whiteBoard);
            this.setTableClickEvent(whiteBoard);
    
        }
    
        setupAllElementsClickEvent(){
            this.setDisplayValueClickEvent();
            this.setButtonClickEvent();
            this.setToggleClickEvent();
            this.setInputClickEvent();
            this.setSliderClickEvent();
            this.setProcessBarClickEvent();
            this.setCheckboxClickEvent();
            this.setSymbolClickEvent();
    
        }
    
        setupAllGraphClickEvent(){
            this.setLineChartClickEvent();
            this.setBarChartClickEvent();
            this.setPieChartClickEvent();
            this.setGaugeClickEvent();
        }
    
        setupAllAdvancedClickEvent(){
    
    
        }

        
}

export default BaseController;