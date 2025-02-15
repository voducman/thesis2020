import {RunningExpressionCollection} from './form/RunningExpressionCollection';
import {initProcessingRuntime}       from './runtimeUtil';
import {stopProcessingRuntime}       from './runtimeUtil';
import PositionHandlerUtil           from './PositionHandlerUtil';
import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import Controller from './Controller';
import View       from './View';
import Util       from '../utils';
import {sendAjaxToServer}  from '../utils';



class BaseController extends PositionHandlerUtil {

    // Control button - event hanler function
    setSaveBtnClickEvent(controllerRef) {
        $('#design-save').click(() => {
            let pageInfoList = [], designId = View.getDesignId();
            // TO-DO here 
            document.getElementById('whiteboard-management').children.forEach(function(page){
                let pageId = page.getAttribute('id');
                if ( pageId === 'alarm' || pageId === 'log') return;
                let pageObj = View.parseJsonPageById(page.getAttribute('id'));
                pageInfoList.push(pageObj);
            })

            console.log(JSON.stringify(pageInfoList));
            Util.sendAjaxToServer('/drawing/json/update/' + designId, 'POST', JSON.stringify(pageInfoList))
            .then(resonseForm => {
                console.log(resonseForm);
            })
            .catch(e => console.log(e));
        })
    }

    setRunBtnClickEvent(controllerRef) {
        $('#design-run').click(() => {
            let runningExpCollection = new RunningExpressionCollection();
            const whiteBoards = document.getElementById('whiteboard-management').querySelectorAll('svg[id|="wb"]');
            Array.from(whiteBoards).forEach(function(wb){
                
                Array.from(wb.children).forEach(function(symbol){
                    
                    try {
                        let properties = symbol.properties;
                        let symbolType = properties.id.replace(/-[0-9]+/i, '');

                        if (properties['moveExp'] && properties['moveExp'].trim()) {
                            runningExpCollection.pushMoveExp(properties);
                        }

                        if (properties['hiddenExp'] && properties['hiddenExp'].trim()) {
                            runningExpCollection.pushHiddenExp(properties);
                        }

                        if (symbolType === 'button' && properties['runExp']) {
                            runningExpCollection.pushRunExp(properties);
                        }

                        if (['checkbox', 'switch'].includes(symbolType)) {
                            if (properties['runOffExp']) runningExpCollection.pushRunOffExp(properties);
                            if (properties['runOnExp']) runningExpCollection.pushRunOnExp(properties);
                        }

                        if (symbolType === 'symbol-set' && properties['booleanExp']) {
                            runningExpCollection.pushBooleanExp(properties);
                        }

                        if (['circle', 'ellipse', 'line', 'pencil', 'polygon', 'polyline', 'rectangle'].includes(symbolType)) {
                            if (properties['onColorExp']) runningExpCollection.pushOnColorExp(properties);
                            if (properties['flashExp']) runningExpCollection.pushFlashExp(properties);
                        }

                        if (symbolType === 'display-value' && properties['numericExp']) {
                            runningExpCollection.pushNumericExp(properties);
                        }

                        if (['line-chart', 'bar-chart', 'pie-chart', 'donut-chart', 'speedometer'].includes(symbolType)) {
                            runningExpCollection.pushAssignTag(properties);
                        }
                        if (['h-slider', 'v-slider', 'input', 'linear-gauge', 'progress-bar', 'radial-gauge'].includes(symbolType)) {
                            runningExpCollection.pushAssignTag(properties);
                        }

                    } catch (e) {
                        return;
                    }
                    
                    return;
                })
            })
            View.disableWhenRun();
            initProcessingRuntime(runningExpCollection);
        })
    }

    setStopBtnClickEvent(controllerRef) {
        $('#design-stop').click(() =>{
            View.enableWhenStop();
            stopProcessingRuntime();
        })
    }

    setCustomizeClickEvent(controllerRef) {
        $('#design-config').click(() =>{
            
        })
    }

    setUndoClickEvent(controllerRef) {
        $('#design-undo').click(() =>{
            alert("undo")
        })
    }

    setReduClickEvent(controllerRef) {
        $('#design-redo').click(() =>{
            alert("redo")
        })
    }

    setCompileClickEvent(controllerRef) {
        const data = {'designId': View.getDesignId()};
        $('#design-compile').click(() =>{
            sendAjaxToServer("/drawing/compile", "POST", JSON.stringify(data))
            .then(responseForm => {
                console.log(responseForm);
            })
            .catch(e => console.log(e + ''));
            
        })
    }

    setAddPageClickEvent(controllerRef) {
        let isFirst = true;

        $('#design-add-page').click(() =>{

            // Step 1. Setup event for all symbol buttons if first click
            if (isFirst){
                isFirst = false;
                controllerRef.setupAllEventSymbolButton();

                $('#addNewPage button[name=save]').click(e => {
                    let pageName = $('#addNewPage input[name=name]').val();
                    if (pageName.length == 0){
                        pageName = View.genDefaultPageName();
                    }
                    
                    let pageId = View.genPageId();
                    let icon =  $('#addNewPage input[name=icon]').val() || "av_timer";

                    // Maximum page is 10
                    if (View.getTotalNumPage() >= 8){
                        Util.showFailNotification("Exceeded number of pages allowed");
                        $('#addNewPage').modal('hide');
                        return;
                    }

                    View.createNewPage2Drawing(pageId, pageName, icon);
                    // Create new instance of View class
                    controllerRef.view[pageId] = new View(pageId);
    
                    $('#addNewPage').modal('hide');
                })
            }

            // Step 2. Show modal add name & icon for page
            View.showAddPageModal();

            // Step 2.1. hide modal automatically after 20s
            setTimeout(function(){
                $('#addNewPage').modal('hide');
            }, 20000)

        })
    }

    // Basic symbol - event hanler function
    setLineClickEvent(controllerRef) {
        $('#symbol-line').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawLineShape(wb);
        })
    }

    setPolylineClickEvent(controllerRef) {
        $('#symbol-polyline').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawPolylineShap(wb);
        })
    }

    setEllipseClickEvent(controllerRef) {
        $('#symbol-ellipse').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawEllipseShape(wb);
        })
    }

    setCircleClickEvent(controllerRef) {
        $('#symbol-circle').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawCircleShape(wb);
        })
    }

    setRectangleClicEvent(controllerRef) {
        $('#symbol-rectangle').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawRectShape(wb);
        })
    }

    setPolygoneClickEvent(controllerRef) {
        $('#symbol-polygon').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawPolygonShape(wb);
        })
    }

    setTextblockClickEvent(controllerRef) {
        $('#symbol-textblock').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawTextBlock(wb);
        })
    }

    setPencilClickEvent(controllerRef) {
        $('#symbol-pencil').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawPencilHandler(wb);
        })
    }

    setGraphViewClickEvent(controllerRef) {
        $('#symbol-graph-view').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawGraphView(wb);
        })
    }



    // Elements symbol - event handler function
    setDisplayValueClickEvent(controllerRef) {
        $('#symbol-display-value').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawDisplayValue(wb);
        })
    }

    setButtonClickEvent(controllerRef) {
        $('#symbol-button').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawButton(wb);
        })
    }

    setToggleClickEvent(controllerRef) {
        $('#symbol-toggle').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawSwitch(wb);
        })
    }

    setInputClickEvent(controllerRef) {
        $('#symbol-input').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawInput(wb);
        })
    }

    setSliderClickEvent(controllerRef) {
        $('#symbol-horizontal-slider').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawHorizontalSlider(wb);
        })

        $('#symbol-vertical-slider').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawVerticalSlider(wb);
        })
    }

    setProcessBarClickEvent(controllerRef) {
        $('#symbol-process-bar').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawProgressBar(wb);
        })

        $('#symbol-ver-process-bar').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawProgressBar(wb, true);
        })
    }

    setCheckboxClickEvent(controllerRef) {
        $('#symbol-checkbox').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawCheckBox(wb);
        })
    }

    setSymbolClickEvent(controllerRef) {
        $('#symbol-symbol').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawSymbolSet(wb);
        })
    }

    // Graph symbol - event handler function
    setLineChartClickEvent(controllerRef) {
        $('#symbol-line-chart').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawLineChart(wb);
        })
    }

    setBarChartClickEvent(controllerRef) {
        $('#symbol-bar-chart').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawBarChart(wb);
        })
    }

    setPieChartClickEvent(controllerRef) {
        $('#symbol-pie-chart').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawPieChart(wb);
        })
    }

    setDonutChartClickEvent(controllerRef) {
        $('#symbol-donut-chart').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawDonutChart(wb);
        })
    }

    setRadialGaugeClickEvent(controllerRef) {
        $('#symbol-radial-gauge').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawRadialGaugeChart(wb);
        })
    }

    setSpeedometerClickEvent(controllerRef) {
        $('#symbol-speedometer').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawSpeedometer(wb);
        })
    }

    setLinearGaugeClickEvent(controllerRef) {
        $('#symbol-linear-gauge').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawLinearGaugeChart(wb);
        })
    }

    // Advanced symbol - event handler function
    setTableClickEvent(controllerRef) {
        $('#symbol-table').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawTable(wb);
        })
    }

    setRadialClockClickEvent(controllerRef) {
        $('#symbol-radial-clock').click(() => {

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawRadialClock(wb);
        })
    }

    setDigitalClockClickEvent(controllerRef){
        $('#symbol-digital-clock').click(()=>{

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawDigitalClock(wb);
        })
    }

    setCalendarClickEvent(controllerRef){
        $('#symbol-calendar').click(()=>{

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawCalendar(wb);
        })
    }

    setCameraViewerClickEvent(controllerRef){
        $('#symbol-camera').click(()=>{

            let currentActive = View.getCurrentActivePageId();
            let wb = controllerRef.view[currentActive].whiteBoard;
            this.drawCameraPlayer(wb);
        })
    }

    /**
     * @param {Controller} controllerRef
     * @memberof BaseController
     */
    setupAllControlBtnClickEvent(controllerRef) {; 

        this.setSaveBtnClickEvent(controllerRef);
        this.setRunBtnClickEvent(controllerRef);
        this.setStopBtnClickEvent(controllerRef);
        this.setCustomizeClickEvent(controllerRef);
        this.setReduClickEvent(controllerRef);
        this.setUndoClickEvent(controllerRef);
        this.setCompileClickEvent(controllerRef);
        this.setAddPageClickEvent(controllerRef);

    }

    destroyAllControlBtnClickEvent(){

        $('#design-save').off();
        $('#design-run').off();
        $('#design-stop').off();
        $('#design-config').off();
        $('#design-undo').off();
        $('#design-redo').off();
        $('#design-compile').off();
        $('#design-add-page').off();
    }

    setupAllBasicClickEvent(controllerRef) {

        this.setLineClickEvent(controllerRef);
        this.setPolylineClickEvent(controllerRef);
        this.setEllipseClickEvent(controllerRef);
        this.setCircleClickEvent(controllerRef);
        this.setRectangleClicEvent(controllerRef);
        this.setPolygoneClickEvent(controllerRef);
        this.setTextblockClickEvent(controllerRef);
        this.setPencilClickEvent(controllerRef);
        this.setGraphViewClickEvent(controllerRef);
    }

    destroyAllBasicClickEvent(){

        $('#symbol-line').off();
        $('#symbol-polyline').off();
        $('#symbol-ellipse').off();
        $('#symbol-circle').off();
        $('#symbol-rectangle').off();
        $('#symbol-polygon').off();
        $('#symbol-textblock').off();
        $('#symbol-pencil').off();
        $('#symbol-graph-view').off();
    }

    setupAllElementsClickEvent(controllerRef) {

        this.setDisplayValueClickEvent(controllerRef);
        this.setButtonClickEvent(controllerRef);
        this.setToggleClickEvent(controllerRef);
        this.setInputClickEvent(controllerRef);
        this.setSliderClickEvent(controllerRef);
        this.setProcessBarClickEvent(controllerRef);
        this.setCheckboxClickEvent(controllerRef);
        this.setSymbolClickEvent(controllerRef);

    }

    destroyAllElementsClickEvent(){

        $('#symbol-display-value').off();
        $('#symbol-button').off();
        $('#symbol-toggle').off();
        $('#symbol-input').off();
        $('#symbol-horizontal-slider').off();
        $('#symbol-vertical-slider').off();
        $('#symbol-process-bar').off();
        $('#symbol-checkbox').off();
        $('#symbol-symbol').off();
    }

    setupAllGraphClickEvent(controllerRef) {

        this.setLineChartClickEvent(controllerRef);
        this.setBarChartClickEvent(controllerRef);
        this.setPieChartClickEvent(controllerRef);
        this.setDonutChartClickEvent(controllerRef);
        this.setRadialGaugeClickEvent(controllerRef);
        this.setSpeedometerClickEvent(controllerRef);
        this.setLinearGaugeClickEvent(controllerRef);
    }

    destroyAllGraphClickEvent(){

        $('#symbol-line-chart').off();
        $('#symbol-bar-chart').off();
        $('#symbol-pie-chart').off();
        $('#symbol-donut-chart').off();
        $('#symbol-radial-gauge').off();
        $('#symbol-speedometer').off();
        $('#symbol-linear-gauge').off(); 
    }

    setupAllAdvancedClickEvent(controllerRef) {

        //this.setTableClickEvent(controllerRef);
        this.setRadialClockClickEvent(controllerRef);
        this.setDigitalClockClickEvent(controllerRef);
        // this.setCalendarClickEvent(controllerRef);
        this.setCameraViewerClickEvent(controllerRef);
    }

    destroyAllAdvancedClickEvent(){

        $('#symbol-table').off();
        $('#symbol-digital-clock').off();
        $('#symbol-radial-clock').off();
        $('#symbol-calendar').off();
        $('#symbol-camera').off();
    }


}

export default BaseController;