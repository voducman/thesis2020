import PositionHandlerUtil from './PositionHandlerUtil';
import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';



class BaseController extends PositionHandlerUtil {
    // Control button - event hanler function
    setSaveBtnClickEvent() {
        $('#design-save').click(function () {
            alert("save");

        })
    }

    setRunBtnClickEvent() {
        $('#design-run').click(function () {
            alert("run")
        })
    }

    setStopBtnClickEvent() {
        $('#design-stop').click(function () {
            alert("stop")
        })
    }

    setCustomizeClickEvent() {
        $('#design-config').click(function () {
            alert("customize")
        })
    }

    setUndoClickEvent() {
        $('#design-undo').click(function () {
            alert("undo")
        })
    }

    setReduClickEvent() {
        $('#design-redo').click(function () {
            alert("redo")
        })
    }

    setCompileClickEvent() {
        $('#design-compile').click(function () {
            alert("compile")
        })
    }

    setAddPageClickEvent() {
        $('#design-add-page').click(function () {
            alert("add page")
        })
    }

    // Basic symbol - event hanler function
    setLineClickEvent(wb) {

        $('#symbol-line').click(() => {
            this.drawLineShape(wb);
        })
    }

    setPolylineClickEvent(wb) {
        $('#symbol-polyline').click(() => {
            this.drawPolylineShap(wb);
        })
    }

    setEllipseClickEvent(wb) {
        $('#symbol-ellipse').click(() => {
            this.drawEllipseShape(wb);
        })
    }

    setCircleClickEvent(wb) {
        $('#symbol-circle').click(() => {
            this.drawCircleShape(wb);
        })
    }

    setRectangleClicEvent(wb) {
        $('#symbol-rectangle').click(() => {
            this.drawRectShape(wb, "#whiteBoard");
        })
    }

    setPolygoneClickEvent(wb) {
        $('#symbol-polygone').click(() => {
            this.drawPolygonShape(wb);
        })
    }

    setTextblockClickEvent(wb) {
        $('#symbol-textblock').click(() => {
            this.drawTextBlock(wb);
        })
    }

    setPencilClickEvent(wb){
        $('#symbol-pencil').click(()=>{
            this.drawPencilHandler(wb);
        })
    }

    setGraphViewClickEvent(wb) {
        $('#symbol-graph-view').click(() => {
            this.drawGraphView(wb);
        })
    }



    // Elements symbol - event handler function
    setDisplayValueClickEvent(wb) {
        $('#symbol-display-value').click(function () {
            alert("display value")
        })
    }

    setButtonClickEvent(wb) {
        $('#symbol-button').click(function () {
            alert("button")
        })
    }

    setToggleClickEvent(wb) {
        $('#symbol-toggle').click(function () {
            alert("toggle")
        })
    }

    setInputClickEvent(wb) {
        $('#symbol-input').click(function () {
            alert("input")
        })
    }

    setSliderClickEvent(wb) {
        $('#symbol-slider').click(function () {
            alert("slider")
        })
    }

    setProcessBarClickEvent(wb) {
        $('#symbol-process-bar').click(function () {
            alert("process bar")
        })
    }

    setCheckboxClickEvent(wb) {
        $('#symbol-checkbox').click(function () {
            alert("checkbox")
        })
    }

    setSymbolClickEvent(wb) {
        $('#symbol-symbol').click(function () {
            alert("symbol")
        })
    }

    // Graph symbol - event handler function
    setLineChartClickEvent(wb) {
        $('#symbol-line-chart').click(()=>{
            this.drawLineChart(wb);
        })
    }

    setBarChartClickEvent(wb) {
        $('#symbol-bar-chart').click(()=>{
            this.drawBarChart(wb);
        })
    }

    setPieChartClickEvent(wb) {
        $('#symbol-pie-chart').click(()=>{
            this.drawPieChart(wb);
        })
    }

    setDonutChartClickEvent(wb) {
        $('#symbol-donut-chart').click(()=>{
            this.drawDonutChart(wb);
        })
    }

    setRadialGaugeClickEvent(wb) {
        $('#symbol-radial-gauge').click(()=>{
            this.drawRadialGaugeChart(wb);
        })
    }

    setSpeedometerClickEvent(wb){
        $('#symbol-speedometer').click(()=>{
            this.drawSpeedometer(wb);
        })
    }

    setLinearGaugeClickEvent(wb) {
        $('#symbol-linear-gauge').click(()=>{
            this.drawLinearGaugeChart(wb);
        })
    }

    // Advanced symbol - event handler function
    setTableClickEvent(wb) {
        $('#symbol-table').click(() => {
            this.drawTable(wb);
        })
    }



    setupAllControlBtnClickEvent() {
        this.setSaveBtnClickEvent();
        this.setRunBtnClickEvent();
        this.setStopBtnClickEvent();
        this.setCustomizeClickEvent();
        this.setReduClickEvent();
        this.setUndoClickEvent();
        this.setCompileClickEvent();
        this.setAddPageClickEvent();

    }

    setupAllBasicClickEvent(whiteBoard) {
        this.setLineClickEvent(whiteBoard);
        this.setPolylineClickEvent(whiteBoard);
        this.setEllipseClickEvent(whiteBoard);
        this.setCircleClickEvent(whiteBoard);
        this.setRectangleClicEvent(whiteBoard);
        this.setPolygoneClickEvent(whiteBoard);
        this.setTextblockClickEvent(whiteBoard);
        this.setPencilClickEvent(whiteBoard);
        this.setGraphViewClickEvent(whiteBoard);
        

    }

    setupAllElementsClickEvent(whiteBoard) {
        this.setDisplayValueClickEvent(whiteBoard);
        this.setButtonClickEvent(whiteBoard);
        this.setToggleClickEvent(whiteBoard);
        this.setInputClickEvent(whiteBoard);
        this.setSliderClickEvent(whiteBoard);
        this.setProcessBarClickEvent(whiteBoard);
        this.setCheckboxClickEvent(whiteBoard);
        this.setSymbolClickEvent(whiteBoard);

    }

    setupAllGraphClickEvent(whiteBoard) {
        this.setLineChartClickEvent(whiteBoard);
        this.setBarChartClickEvent(whiteBoard);
        this.setPieChartClickEvent(whiteBoard);
        this.setDonutChartClickEvent(whiteBoard);
        this.setRadialGaugeClickEvent(whiteBoard);
        this.setSpeedometerClickEvent(whiteBoard);
        this.setLinearGaugeClickEvent(whiteBoard);
    }

    setupAllAdvancedClickEvent(whiteBoard) {
        this.setTableClickEvent(whiteBoard);

    }


}

export default BaseController;