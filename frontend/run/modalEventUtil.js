import {SYMBOLID} from './constantUtil';
import modalUtil  from './modalUtil';

const modalEventUtil = (function(){

    function baseInitModalFunc(modalId, updateFunc){

        $(`#${modalId} button[name=save]`).click(function(e){
            let targetId = $(`#${modalId} input[name=target-id]`).val();
            updateFunc(targetId);
        })
    }


    return {

        initEventApplyBtn: function(){
            // Basic symbols
            baseInitModalFunc(SYMBOLID.LINE, modalUtil.updateLineSymbol);
            baseInitModalFunc(SYMBOLID.POLYLINE, modalUtil.updatePolylineSymbol);
            baseInitModalFunc(SYMBOLID.ELLIPSE, modalUtil.updateEllipseSymbol);
            baseInitModalFunc(SYMBOLID.CIRCLE, modalUtil.updateCircleSymbol);
            baseInitModalFunc(SYMBOLID.RECTANGLE, modalUtil.updateRectSymbol);
            baseInitModalFunc(SYMBOLID.POLYGON, modalUtil.updatePolygonSymbol);
            baseInitModalFunc(SYMBOLID.TEXTBLOCK, modalUtil.updateTextblockSymbol);
            baseInitModalFunc(SYMBOLID.PENCIL, modalUtil.updatePencilSymbol);
            baseInitModalFunc(SYMBOLID.GRAPHVIEW, modalUtil.updateGraphviewSymbol);

            // Element symbols
            baseInitModalFunc(SYMBOLID.DISPLAYVALUE, modalUtil.updateDisplayValueSymbol);
            baseInitModalFunc(SYMBOLID.BUTTON, modalUtil.updateButtonSymbol);
            baseInitModalFunc(SYMBOLID.SWITCH, modalUtil.updateSwitchSymbol);
            baseInitModalFunc(SYMBOLID.INPUT, modalUtil.updateInputSymbol);
            baseInitModalFunc(SYMBOLID.HORISLIDER, modalUtil.updateHorSliderSymbol);
            baseInitModalFunc(SYMBOLID.VERSLIDER, modalUtil.updateVerSliderSymbol)
            baseInitModalFunc(SYMBOLID.PROGRESSBAR, modalUtil.updateProgressBarSymbol);
            baseInitModalFunc(SYMBOLID.CHECKBOX, modalUtil.updateCheckboxSymbol);
            baseInitModalFunc(SYMBOLID.SYMBOLSET, modalUtil.updateSymbolSetSymbol);

            // Chart symbols
            baseInitModalFunc(SYMBOLID.LINECHART, modalUtil.updateLineChartSymbol);
            baseInitModalFunc(SYMBOLID.BARCHART, modalUtil.updateBarChartSymbol);
            baseInitModalFunc(SYMBOLID.PIECHART, modalUtil.updatePieChartSymbol);
            baseInitModalFunc(SYMBOLID.DONUTCHART, modalUtil.updateDonutChartSymbol);
            baseInitModalFunc(SYMBOLID.RADIALGAUGE, modalUtil.updateRadialGaugeSymbol);
            baseInitModalFunc(SYMBOLID.SPEEDOMETER, modalUtil.updateSpeedometerSymbol);
            baseInitModalFunc(SYMBOLID.LINEARGAUGE, modalUtil.updateLinearGaugeSymbol);

            // Advanced symbols
            baseInitModalFunc(SYMBOLID.RADIALCLOCK, modalUtil.updateRadialClockSymbol);
            baseInitModalFunc(SYMBOLID.DIGITALCLOCK, modalUtil.updateDigitalClockSymbol);
            baseInitModalFunc(SYMBOLID.CAMERA, modalUtil.updateCameraSymbol);
        }
    }
})()

export default modalEventUtil;