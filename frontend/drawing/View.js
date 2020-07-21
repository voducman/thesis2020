import BaseView from './BaseView';
import PageInfo from './form/PageInfo';
import {SVG}    from '@svgdotjs/svg.js';
import interact from 'interactjs';
import '@svgdotjs/svg.draggable.js'
import eventUtil from './eventUtil';
import elementsUtil from './elementsUtil';
import htmlSymbolUtil from './htmlSymbolUtil';
import chartUtil from './chartUtil';
import clockUtil from './clockUtil';



import Line             from './model/Line';
import Polyline         from './model/Polyline';
import Ellipse          from './model/Ellipse';
import Circle           from './model/Circle';
import Rectangle        from './model/Rectangle';
import Polygon          from './model/Polygone';
import Textblock        from './model/Textblock';
import Pencil           from './model/Pencil';
import Graphview        from './model/Graphview';
import DisplayValue     from './model/DisplayValue';
import Button           from './model/Button';
import Switch           from './model/Switch';
import Input            from './model/Input';
import HorizontalSlider from './model/HorizontalSlider';
import VerticalSlider   from './model/VerticalSlider';
import ProgressBar      from './model/ProgressBar';
import Checkbox         from './model/Checkbox';
import SymbolSet        from './model/SymbolSet';
import LineChart        from './model/LineChart';
import BarChart         from './model/BarChart';
import PieChart         from './model/PieChart';
import DonutChart       from './model/DonutChart';
import RadialGauge      from './model/RadialGauge';
import Speedometer      from './model/Speedometer';
import LinearGauge      from './model/LinearGauge';
import RadialClock      from './model/RadialClock';
import DigitalClock     from './model/DigitalClock';
import Camera           from './model/Camera';


class View extends BaseView{
    /**
     *Creates an instance of View.
     * @param {string} pageId - Id of page where set whiteboard
     * @memberof View
     */
    constructor(pageId){
        super();
        let timeId = pageId.split('-')[1];
        let [width, height] = View.getResolution();
        this.whiteBoard = SVG().addTo(`#${pageId} .col-md-12`).size(width, height)
            .id(`wb-${timeId}`);

    }

    static getResolution(){
        const width = $('#whiteboard-management').data("width");
        const height = $('#whiteboard-management').data("height");
        return [width, height];
    }

    static getCurrentActivePageId(){
        let pageId;
        $('#whiteboard-management > div').each(function(){
    
            if ($(this).hasClass("active")){
                pageId = $(this).attr('id');
                return;
            }
        })

        return pageId;
    }

    static genPageId(){
        const time = new Date().getTime();
        return `page-${time}`;
    }

    static genDefaultPageName(){
        const pageLength = $('#tab-management li').length;
        return `page ${pageLength}`;
    }

    static getTotalNumPage(){
        const pageLength = $('#tab-management li').length - 1;
        return pageLength;
    }

    static showAddPageModal(){
        $('#addNewPage').modal('show');
    }

    static createNewPage2Drawing(pageId, pageName, icon){
        let [width, height] = View.getResolution();
        // De-active other pages
        $('#tab-management > li').each(function(){
            $(this).removeClass("active");
        })

        $("#tab-management li a[href='#alarm']").parent().before(`
            <li class="active"><a data-toggle="tab" href="#${pageId}"><i class="material-icons" style="color: blue;">${icon}</i><span>${pageName}<span></a></li>
        `);

        $('#whiteboard-management').append(`
            <div id="${pageId}" class="tab-pane fade in active drawing-page">
                <div class="col-md-12" style="width: ${width}px; height: ${height}px; z-index: 0; background-color: #e4e4e4; position: absolute; padding:0">
                                        
                </div>
            </div>
        `);
    }

    static deletePageByPageId(pageId){
        $(`#tab-management li a[href=#${pageId}]`).parent().remove();
        $(`#${pageId}`).remove();
    }

    static parseJsonPageById(pageId){
        let pageObj, pageName, icon, width, height;
        const whiteboard = document.getElementById(pageId).querySelector('svg');
        const tabTag =  document.getElementById('tab-management').querySelector(`a[href='#${pageId}']`);

        pageName = tabTag.querySelector('span').textContent;
        icon = tabTag.querySelector('i').textContent;
        width = whiteboard.getAttribute('width');
        height = whiteboard.getAttribute('height');
        
        pageObj = new PageInfo(pageId, pageName, icon, width, height);

        Array.from(whiteboard.children).forEach(function(symbol){
            if (symbol.properties){
                symbol.properties.updatePosition();
                const symbolData = symbol.properties.parseOnlyProperties();
                pageObj.addComponent(symbolData);
            }else{
                symbol.remove();
            }
           
        })

        return pageObj;
    }



    static renderPageFromOldData(pageList, controllerRef){
       
        pageList.forEach(function(pageInfo){
            
            let {pageId, name, icon} = pageInfo;
            View.createNewPage2Drawing(pageId, name, icon);
            controllerRef.view[pageId] = new View(pageId);
            let wb = controllerRef.view[pageId].whiteBoard;

   
            // Draw old data into new page
            pageInfo.components.forEach(function(symbol){
                let symbolType = symbol.id.replace(/-[0-9]+/i, '');
                let symbolId = symbol.id;
                if (symbolType === 'line') {
                    let symbolRender = wb.line(0, 0, 1, 1).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Line(symbolId, symbolRender);  
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToLine(symbolRender);
                    return;
                }

                if (symbolType === 'polyline'){
                    let symbolRender = wb.polyline(symbol.points).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Polyline(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assingDbclickToPolyline(symbolRender);
                    return;
                }

                if (symbolType === 'ellipse'){
                    let symbolRender = wb.ellipse(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Ellipse(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToEllipse(symbolRender);
                    return;
                }

                if (symbolType === 'circle'){
                    let symbolRender = wb.circle(0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Circle(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToCircle(symbolRender);
                    return;
                }

                if (symbolType === 'rectangle'){
                    let symbolRender = wb.rect(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Rectangle(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToRectangle(symbolRender);
                    return;
                }

                if (symbolType === 'polygon'){
                    let symbolRender = wb.polygon(symbol.points).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Polygon(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToPolygon(symbolRender);
                    return;
                }

                if (symbolType === 'textblock'){
                    let symbolRender = wb.text(symbol.textContent).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Textblock(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToTextblock(symbolRender);
                    return;
                }


                if (symbolType === 'pencil'){
                    let symbolRender = wb.polyline(symbol.points).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Pencil(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToPencil(symbolRender);
                    return;
                }


                if (symbolType === 'graph-view'){
                    let symbolRender = wb.image(symbol.symbolURL).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new Graphview(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToGraphView(symbolRender);
                    return;
                }

                if (symbolType === 'display-value'){
                    let symbolRender = wb.text(symbol.format).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    let symbolPros = new DisplayValue(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToDisplayValue(symbolRender);
                    return;
                }

                if (symbolType === 'button'){
                    let symbolRender = wb.foreignObject(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    elementsUtil.renderButton(symbolId, 0, 0);
                    let symbolPros = new Button(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToButton(symbolRender);
                    return;
                }

                if (symbolType === 'switch'){
                    let symbolRender = wb.foreignObject(200,30).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    elementsUtil.renderSwitch(symbolId);
                    let symbolPros = new Switch(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToSwitch(symbolRender);
                    return;
                }

                if (symbolType === 'input'){
                    let symbolRender = wb.foreignObject(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    elementsUtil.renderInput(symbolId, 0, 0);
                    let symbolPros = new Input(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToInput(symbolRender);
                    return;
                }

                if (symbolType === 'h-slider'){
                    let symbolRender = wb.foreignObject(symbol.width,symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateSliderHtml(symbolId);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
                    let symbolPros = new HorizontalSlider(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;

                    elementsUtil.renderHorizontalSlider(`child-${symbolId}`, symbol.width, symbol.height);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    eventUtil.assignDbclickToHoriSlider(symbolRender);
                    return;
                }

                if (symbolType === 'v-slider'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateSliderHtml(symbolId);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
                   
                    let symbolPros = new VerticalSlider(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    elementsUtil.renderVerticalSlider(`child-${symbolId}`, symbol.width, symbol.height)
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    eventUtil.assignDbclickToVerSlider(symbolRender);
                    return;
                }

                if (symbolType === 'progress-bar'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    if (symbol.isVertical){
                        elementsUtil.renderVerProgressBar(symbolId,  symbol.width, symbol.height);
                    }else{
                        elementsUtil.renderHorProgressBar(symbolId,  symbol.width, symbol.height);
                    }
                    
                    let symbolPros = new ProgressBar(symbolId, symbolRender, symbol.isVertical);
                    symbolPros.initOnlyProperties(symbol);
                    
                    symbolRender.rotate(symbol.degree);
                    symbolPros.updateSymbol();
                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToProgressBar(symbolRender);
                    return;
                }

                if (symbolType === 'checkbox'){
                    let symbolRender = wb.foreignObject(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    elementsUtil.renderCheckbox(symbolId);
                    let symbolPros = new Checkbox(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToCheckbox(symbolRender);
                    return;
                }

                if (symbolType === 'symbol-set'){
                    let symbolRender = wb.foreignObject(0,0).draggable(symbol.dragDesign);
                    symbolRender.id(symbolId).addClass('symbol');
                    elementsUtil.renderSymbol(symbolId);
                    let symbolPros = new SymbolSet(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    document.getElementById(symbolId).properties = symbolPros;
                    eventUtil.assignDbclickToSymbolSet(symbolRender);
                    return;
                }

                if (symbolType === 'line-chart'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateLineChartHtml(symbolId, symbol.width, symbol.height);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new LineChart(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderLineChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToLineChart(symbolRender);
                    return;
                }

                if (symbolType === 'bar-chart'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateBarChartHtml(symbolId, symbol.width, symbol.height);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new BarChart(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderBarChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToBarChart(symbolRender);
                    return;
                }

                if (symbolType === 'pie-chart') {
                    let width = symbol.radius * 2;
                    let symbolRender = wb.foreignObject(width, width).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generatePieChartHtml(symbolId, width, width);
                    symbolRender.add(html).id(symbolId).addClass('symbol');

                    let symbolPros = new PieChart(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    console.log('test pie chart: ', symbolPros);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderPieChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    eventUtil.assignDbclickToPieChart(symbolRender);

                    return;
                }

                if (symbolType === 'donut-chart'){
                    let symbolRender = wb.foreignObject(symbol.radius*2, symbol.radius*2).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generatePieChartHtml(symbolId, symbol.radius*2, symbol.radius*2);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new DonutChart(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderDonutChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToDonutChart(symbolRender);
                    return;
                }

                if (symbolType === 'radial-gauge'){
                    let symbolRender = wb.foreignObject(0,0).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateRadialGaugeChartHtml(symbolId, symbol.radius*2, symbol.radius*2);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new RadialGauge(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderRadialGaugeChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToRadialGauge(symbolRender);
                    return;
                }

                if (symbolType === 'speedometer'){
                    let symbolRender = wb.foreignObject(symbol.radius*2, symbol.radius*2).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateSpeedometerHtml(symbolId, symbol.radius*2, symbol.radius*2);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new Speedometer(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderSpeedometer(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToSpeedometer(symbolRender);
                    return;
                }

                if (symbolType === 'linear-gauge'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    console.log(symbol.width, symbol.height)
                    let html = htmlSymbolUtil.generateLinearGaugeHtml(symbolId, symbol.width, symbol.height);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
          
                    let symbolPros = new LinearGauge(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    chartUtil.renderLinearGaugeChart(`child-${symbolId}`);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                   
                    eventUtil.assignDbclickToLinearGauge(symbolRender);
                    return;
                }

                if (symbolType === 'radial-clock'){
                    let symbolRender = wb.foreignObject(symbol.radius*2, symbol.radius*2).draggable(symbol.dragDesign);
                    symbolRender.add('<div></div>').id(symbolId).addClass('symbol');
                    clockUtil.initRadialClock(symbol.radius, symbolId);

                    let symbolPros = new RadialClock(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;

                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                    eventUtil.assignDbclickToRadialClock(symbolRender);
                    return;
                }

                if (symbolType === 'digital-clock'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateDigitalClock(symbolId);
                    symbolRender.add(html).id(symbolId).addClass('symbol');

                    clockUtil.initDigitalClock(symbolId);
                    let symbolPros = new DigitalClock(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);

                    eventUtil.assignDbclickToDigitalClock(symbolRender);
                    return;
                }

                if (symbolType === 'camera'){
                    let symbolRender = wb.foreignObject(symbol.width, symbol.height).draggable(symbol.dragDesign);
                    let html = htmlSymbolUtil.generateCamera(symbolId);
                    symbolRender.add(html).id(symbolId).addClass('symbol');
                    
                    let symbolPros = new Camera(symbolId, symbolRender);
                    symbolPros.initOnlyProperties(symbol);
                    document.getElementById(symbolId).properties = symbolPros;

                    clockUtil.renderCameraViewer(symbolId);
                    symbolPros.updateSymbol();
                    symbolRender.rotate(symbol.degree);
                    eventUtil.assignDbclickToCamera(symbolRender);
                    return;
                }

            })
        })
    }
}

export default View;