import htmlSymbolUtil   from './htmlSymbolUtil';
import chartUtil        from './chartUtil';
import elementsUtil     from './elementsUtil';
import clockUtil        from './clockUtil';
import eventUtil        from './eventUtil';

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


class PositionHandlerUtil {

    setDrawingCursor(id) {
        $(id).off();
        $(id).css('cursor', 'crosshair');
    }

    setTextCursor(id) {
        $(id).off();
        $(id).css('cursor', 'inherit');
    }

    setDefaultCursor(id) {
        $(id).css('cursor', 'default');
    }

    setPencilCursor(id) {
        $(id).off();
        $(id).css('cursor', 'url(/static/images/pencil-cursor.png), default');
    }

    resetDrawingCursor(id) {
        if (!id) {
            id = '#whiteBoard';
        }
        $(id).css('cursor', 'pointer');
    }


    /**
     * Return ralative position compared with left corner 
     * of SVG whiteboard element
     * @param {string} id - Id of SVG whiteboard element
     * @param {float} x - Current left mouse position
     * @param {float} y - Current top mouse position
     */
    getMousePosition(id, x, y) {
        let pos = $(id).position();
        return {
            "x": x - pos.left,
            "y": y - pos.top
        }
    }

    /**
     * Draw a rectangle for purpose of placeholder for other elements to use
     * @param {object} wbRef - a reference of Whiteboard SVG object
     * @param {function} callback - {width, height, pos: {x, y}}
     */
    drawRectPlaceholder(wbRef, callback){

        let id = `#${wbRef.id()}`;
        this.setDrawingCursor(id);
        let width, height;
        let pos = {
            x: null,
            y: null
        }

        $(id).mousedown((e) => {
            
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            let tempRect = wbRef.rect(0, 0).move(firstPos.x, firstPos.y).fill("#444").id("rect-temp");
            tempRect.stroke({ width: 5, color: '#333' });
            tempRect.opacity('0.3');

            $(id).mousemove((evt) => {
                pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                width = pos.x - firstPos.x;
                height = pos.y - firstPos.y;

                if (width >= 0 && height >= 0) {
                    tempRect.size(width, height);
                    pos = firstPos;
                } else if (width < 0 && height > 0) {
                    tempRect.move(pos.x, firstPos.y);
                    tempRect.size(Math.abs(width), height);
                    pos.x = pos.x;
                    pos.y = firstPos.y;
                } else if (width < 0 && height <= 0) {
                    tempRect.move(pos.x, pos.y);
                    tempRect.size(Math.abs(width), Math.abs(height));
                    pos = pos;
                } else {
                    tempRect.move(firstPos.x, pos.y);
                    tempRect.size(width, Math.abs(height));
                    pos.x = firstPos.x;
                    pos.y = pos.y;
                }
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            this.resetDrawingCursor(id);
            $('#rect-temp').remove();
            
            callback(Math.abs(width), Math.abs(height), pos);
        })
    }

     /**
     * Draw a circle for purpose of placeholder for other elements to use
     * @param {object} wbRef - a reference of Whiteboard SVG object
     * @param {function} callback - {radius, pos: {x, y}}
     */
    drawCirclePlaceholder(wbRef, callback){
        let id = `#${wbRef.id()}`;
        let firstPos, _radius;
        this.setDrawingCursor(id);

        $(id).mousedown((e) => {
            firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            let circle = wbRef.circle(0).move(firstPos.x, firstPos.y).fill('#333').stroke({ width: 5, color: '#333' });
            circle.opacity(0.3).id('circle-temp');

            $(id).mousemove((evt) => {
                let pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                let width = Math.abs(pos.x - firstPos.x);
                let height = Math.abs(pos.y - firstPos.y);
                _radius = Math.sqrt(width ** 2 + height ** 2);
                circle.radius(_radius);
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            $('#circle-temp').remove();
            this.resetDrawingCursor(id);

            callback(_radius, firstPos);
        })
    }

    /** 
     * Drawing a line by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawLineShape(wb) {
        let id = `#${wb.id()}`;
        let line, lineId, firstPos, pos;
        this.setDrawingCursor(id);
        $(id).mousedown((e) => {

            firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            lineId = elementsUtil.getElementId('line');
            line = wb.line(firstPos.x, firstPos.y, firstPos.x, firstPos.y).draggable();
            line.id(lineId).stroke({ color: '#111', width: 2, linecap: 'round'})
            eventUtil.assignDbclickToLine(line);

            $(id).mousemove((evt) => {
                pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                line.plot(firstPos.x, firstPos.y, pos.x, pos.y);
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            this.resetDrawingCursor(id);
            let lineProperties = new Line(lineId, line);
            document.getElementById(lineId).properties = lineProperties;
        })
    }

    /** 
     * Drawing a polyline by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawPolylineShap(wb) {
        let id = `#${wb.id()}`;
        let isFirst = true, polyline, polyId;
        let polyArray = [];

        this.setDrawingCursor(id);
        polyId = elementsUtil.getElementId('polyline');
        $(id).click((e) => {
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            polyArray.push(firstPos.x, firstPos.y);
            if (isFirst) {
                isFirst = false;
                polyline = wb.polyline(polyArray).fill('none').stroke({ width: 2, color: '#111' })
                polyline.id(polyId).draggable();
                
            } else {
                polyline.plot(polyArray);
            }
        })

        $(id).mousemove((e) => {
            if (polyArray.length == 0) return;
            let pos = this.getMousePosition(id, e.pageX, e.pageY);
            polyArray.push(pos.x);
            polyArray.push(pos.y);
            polyline.plot(polyArray);
            polyArray.pop();
            polyArray.pop();

        })

        $(id).dblclick((e) => {
            $(id).off();
            eventUtil.assingDbclickToPolyline(polyline);
            this.resetDrawingCursor(id);
            let polylineProperties = new Polyline(polyId, polyline);
            document.getElementById(polyId).properties = polylineProperties;
        })
    }

    /** 
     * Drawing a ellipse by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawEllipseShape(wb) {
        let id = `#${wb.id()}`;
        let ellipseId, ellipse;
        this.setDrawingCursor(id);

        $(id).mousedown((e) => {
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            ellipseId = elementsUtil.getElementId('ellipse');
            ellipse = wb.ellipse(0, 0).move(firstPos.x, firstPos.y).fill('none').stroke({ width: 2, color: '#111' });
            ellipse.id(ellipseId).draggable();
            eventUtil.assignDbclickToEllipse(ellipse);

            $(id).mousemove((evt) => {
                let pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                let width = Math.abs(pos.x - firstPos.x);
                let height = Math.abs(pos.y - firstPos.y);
                ellipse.radius(width, height);
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            this.resetDrawingCursor(id);
            let ellipseProperties = new Ellipse(ellipseId, ellipse);
            document.getElementById(ellipseId).properties = ellipseProperties;
        })
    }

    /** 
     * Drawing a circle by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawCircleShape(wb) {
     
        this.drawCirclePlaceholder(wb, function(radius, pos){
            let circleId = elementsUtil.getElementId('circle');
            let circle = wb.circle(0).move(pos.x, pos.y).fill('none').stroke({ width: 2, color: '#111' });
            circle.radius(radius).id(circleId).draggable();
            eventUtil.assignDbclickToCircle(circle);
            let circleProperties = new Circle(circleId, circle);
            document.getElementById(circleId).properties = circleProperties;
        })
    }




    /** 
     * Drawing a rectangle shape by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawRectShape(wb) {
        
        this.drawRectPlaceholder(wb, function (width, height, pos) {
            let rectId = elementsUtil.getElementId('rectangle');
            let rect = wb.rect(width, height).move(pos.x, pos.y).fill("none").stroke({ width: 2, color: '#111' });
            rect.id(rectId).draggable();
            eventUtil.assignDbclickToRectangle(rect);
            let rectProperties = new Rectangle(rectId, rect);
            document.getElementById(rectId).properties = rectProperties;
        }) 
    }

    /** 
     * Drawing a polygone shape by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawPolygonShape(wb) {
        let id = `#${wb.id()}`;
        let isFirst = true, polygon, polyId;
        let polyArray = [];

        this.setDrawingCursor(id);
        polyId = elementsUtil.getElementId('polygon');
        $(id).click((e) => {
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            polyArray.push(firstPos.x, firstPos.y);
            if (isFirst) {
                polygon = wb.polygon(polyArray).fill('none').stroke({ width: 2, color: '#111' })
                polygon.id(polyId).draggable();
                isFirst = false;
            } else {
                polygon.plot(polyArray);
            }
        })

        $(id).mousemove((e) => {
            if (polyArray.length == 0) return;
            let pos = this.getMousePosition(id, e.pageX, e.pageY);
            polyArray.push(pos.x);
            polyArray.push(pos.y);
            polygon.plot(polyArray);
            polyArray.pop();
            polyArray.pop();

        })

        $(id).dblclick((e) => {
            $(id).off();
            eventUtil.assignDbclickToPolygon(polygon);
            this.resetDrawingCursor(id);
            let polygonProperties = new Polygon(polyId, polygon);
            document.getElementById(polyId).properties = polygonProperties;
        })
    }

    /** 
    * Drawing a textblock shape by using @svd.js lib & mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawTextBlock(wb) {
        let id = `#${wb.id()}`;
        let textId, textblock;
        this.setTextCursor(id);

        $(id).mousedown((e) => {
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            textId = elementsUtil.getElementId('textblock');
            textblock = wb.text("Textblock").move(firstPos.x, firstPos.y)
            textblock.id(textId).font('size', 20).draggable();
            eventUtil.assignDbclickToTextblock(textblock);

            $(id).mousemove((evt) => {
                let pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                let height = Math.abs(pos.y - firstPos.y);
                textblock.font('size', height);
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            this.resetDrawingCursor(id);
            let textblockProperties = new Textblock(textId, textblock);
            document.getElementById(textId).properties = textblockProperties;
        })
    }

    /** 
     * Drawing a graph view shape by using @svd.js lib & mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawPencilHandler(wb) {
        let id = `#${wb.id()}`;
        let polyArray = [], customLine, pencilId;
        this.setPencilCursor(id);

        $(id).mousedown((e) => {
            let firstPos = this.getMousePosition(id, e.pageX, e.pageY);
            polyArray.push(firstPos.x, firstPos.y + 16);
            pencilId = elementsUtil.getElementId('pencil');
            customLine = wb.polyline(polyArray).fill('none').stroke({ width: 2, color: '#111' });
            customLine.id(pencilId).draggable();
            eventUtil.assignDbclickToPencil(customLine);

            $(id).mousemove((evt) => {
                let pos = this.getMousePosition(id, evt.pageX, evt.pageY);
                polyArray.push(pos.x, pos.y + 16);
                customLine.plot(polyArray);
            })
        })

        $(id).mouseup((e) => {
            $(id).off();
            this.resetDrawingCursor(id);
            let customLineProperties = new Pencil(pencilId, customLine);
            document.getElementById(pencilId).properties = customLineProperties;
        })
    }

    /** 
    * Drawing a graph view shape by using @svd.js lib & mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawGraphView(wb) {
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let imageId = elementsUtil.getElementId('graph-view');
            let image = wb.image("/static/images/default-image.jpg").size(width, height);
            image.move(pos.x, pos.y).addClass("container-fluid");
            image.id(imageId).draggable();
            eventUtil.assignDbclickToGraphView(image);
            let graphviewProperties = new Graphview(imageId, image);
            document.getElementById(imageId).properties = graphviewProperties;
        })
    }

    /** 
     * Drawing a disply value by using @svd.js lib + bootstrap framework
     * and mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawDisplayValue(wb) {
        let id = `#${wb.id()}`;
        this.setDefaultCursor(id);

        $(id).click((e) => {
            let pos = this.getMousePosition(id, e.pageX, e.pageY);
            const displayId = elementsUtil.getElementId('display-value');
            let displayValue = wb.text("####.##").move(pos.x, pos.y).fill('#111');
            displayValue.font('size', 20).id(displayId).draggable();
            eventUtil.assignDbclickToDisplayValue(displayValue);
            $(id).off();
            this.resetDrawingCursor(id);
            let displayProperties = new DisplayValue(displayId, displayValue);
            document.getElementById(displayId).properties = displayProperties;
        })

    }

    /** 
    * Drawing a button by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawButton(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){

            let buttonId = elementsUtil.getElementId('button');
            let button = wb.foreignObject(Math.abs(width), Math.abs(height)).move(pos.x, pos.y);
            button.id(buttonId).draggable();
            eventUtil.assignDbclickToButton(button);
            elementsUtil.renderButton(buttonId, Math.abs(width), Math.abs(height));
            let buttonProperties = new Button(buttonId, button);
            document.getElementById(buttonId).properties = buttonProperties;
        })

    }

    /** 
    * Drawing a switch by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawSwitch(wb) {
        let id = `#${wb.id()}`;
        this.setDefaultCursor(id);

        $(id).click((e) => {
            let pos = this.getMousePosition(id, e.pageX, e.pageY);
            const switchId = elementsUtil.getElementId('switch');
            let $switch = wb.foreignObject(200, 30).move(pos.x, pos.y);
            $switch.id(switchId).draggable();
            eventUtil.assignDbclickToSwitch($switch);
            elementsUtil.renderSwitch(switchId);
            $(id).off();
            this.resetDrawingCursor(id);
            let switchProperties = new Switch(switchId, $switch);
            document.getElementById(switchId).properties = switchProperties;
        })

    }

    /** 
    * Drawing a input by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawInput(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){

            const inputId = elementsUtil.getElementId('input');
            let input = wb.foreignObject(width, height).move(pos.x, pos.y);
            input.id(inputId).draggable(    ).addClass('disabled');
            elementsUtil.renderInput(inputId, width, height);
            eventUtil.assignDbclickToInput(input);
            let inputProperties = new Input(inputId, input);
            document.getElementById(inputId).properties = inputProperties;
        })
    }

    /** 
    * Drawing a horizontal slider by using @svd.js lib + rSlider.js lib
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawHorizontalSlider(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){

            const sliderId = elementsUtil.getElementId('h-slider');
            let html = htmlSymbolUtil.generateSliderHtml(sliderId);
            let slider = wb.foreignObject(width, height+10).move(pos.x, pos.y);
            slider.add(html).id(sliderId).draggable(false);
            
            let hslider = new HorizontalSlider(sliderId, slider);
            document.getElementById(sliderId).properties = hslider;

            elementsUtil.renderHorizontalSlider(`child-${sliderId}`, width, height);
            eventUtil.assignDbclickToHoriSlider(slider);
            
        })
    }

    /** 
    * Drawing a  vertical slider by using @svd.js lib + noUiSlider.js lib
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawVerticalSlider(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){
            const sliderId = elementsUtil.getElementId('v-slider');
            const html = htmlSymbolUtil.generateSliderHtml(sliderId);
            let slider = wb.foreignObject(width, height).move(pos.x, pos.y);
            slider.add(html).id(sliderId).draggable(false);

            let vslider = new VerticalSlider(sliderId, slider);
            document.getElementById(sliderId).properties = vslider;

            elementsUtil.renderVerticalSlider(`child-${sliderId}`, width, height);
            eventUtil.assignDbclickToVerSlider(slider);
        })

    }

    /** 
    * Drawing a progress bar by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawProgressBar(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){

            const progressId = elementsUtil.getElementId('progress-bar');
            let progressBar = wb.foreignObject(width, height).move(pos.x, pos.y);
            progressBar.id(progressId).draggable(true);
            elementsUtil.renderProgressBar(progressId, width, height);
            eventUtil.assignDbclickToProgressBar(progressBar);
            let progressProperties = new ProgressBar(progressId, progressBar);
            document.getElementById(progressId).properties = progressProperties;
        })

    }

    /** 
    * Drawing a checkbox by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawCheckBox(wb) {
        let id = `#${wb.id()}`;
        this.setDefaultCursor(id);

        $(id).click((e) => {
            let pos = this.getMousePosition(id, e.pageX, e.pageY);
            const checkboxId = elementsUtil.getElementId('checkbox');
            let checkbox = wb.foreignObject(20, 20).move(pos.x, pos.y);
            checkbox.id(checkboxId).draggable();
            elementsUtil.renderCheckbox(checkboxId);
            $(id).off();
            this.resetDrawingCursor(id);
            eventUtil.assignDbclickToCheckbox(checkbox);
            let checkboxProperties = new Checkbox(checkboxId, checkbox);
            document.getElementById(checkboxId).properties = checkboxProperties;

        })

    }

    /** 
    * Drawing a symbol set by using @svd.js lib + bootstrap framework
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawSymbolSet(wb) {

        this.drawRectPlaceholder(wb, function(width, height, pos){
            const symbolId = elementsUtil.getElementId('symbol-set');
            let symbol = wb.foreignObject(width, height).move(pos.x, pos.y);
            symbol.id(symbolId).draggable();
            elementsUtil.renderSymbol(symbolId);
            eventUtil.assignDbclickToSymbolSet(symbol);
            let symbolSetPros = new SymbolSet(symbolId, symbol);
            document.getElementById(symbolId).properties = symbolSetPros;
        })
    }



    /** 
     * Drawing a line chart by using @svd.js lib + chartjs library 
     * and mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawLineChart(wb) {
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let chartId = elementsUtil.getElementId('line-chart');
            let lineChart = wb.foreignObject(width, height).move(pos.x, pos.y);
            let htmlLineChart = htmlSymbolUtil.generateLineChartHtml(chartId, width, height);
            lineChart.add(htmlLineChart).id(chartId).draggable();

            let lineChartPros = new LineChart(chartId, lineChart);
            document.getElementById(chartId).properties = lineChartPros;

            chartUtil.renderLineChart(`child-${chartId}`);
            eventUtil.assignDbclickToLineChart(lineChart);
            
        })
    }

    /** 
     * Drawing a bar chart by using @svd.js lib + chartjs library 
     * and mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawBarChart(wb) {
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let barChart = wb.foreignObject(width, height).move(pos.x, pos.y);
            let barChartId = elementsUtil.getElementId("bar-chart");
            let htmlBarChart = htmlSymbolUtil.generateBarChartHtml(barChartId, width, height);
            barChart.add(htmlBarChart).id(barChartId).draggable();

            let barChartPros = new BarChart(barChartId, barChart);
            document.getElementById(barChartId).properties = barChartPros;

            chartUtil.renderBarChart(`child-${barChartId}`, width, height);
            eventUtil.assignDbclickToBarChart(barChart);
        })

    }


    /** 
     * Drawing a pie chart by using @svd.js lib + chartjs library 
     * and mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawPieChart(wb) {

        this.drawCirclePlaceholder(wb, function(radius, pos){
            
            let pieChart = wb.foreignObject(radius*2 , radius*2);
            pieChart.move(pos.x - radius,pos.y - radius);
            let pieChartId = elementsUtil.getElementId("pie-chart");
            let htmlPiechart = htmlSymbolUtil.generateBarChartHtml(pieChartId, radius*2, radius*2);
            pieChart.add(htmlPiechart).id(pieChartId).draggable();

            let pieChartPros = new PieChart(pieChartId, pieChart);
            document.getElementById(pieChartId).properties = pieChartPros;

            chartUtil.renderPieChart(`child-${pieChartId}`);
            eventUtil.assignDbclickToPieChart(pieChart);
        })

    }


    /** 
     * Drawing a donut chart by using @svd.js lib + chartjs library 
     * and mouse event position hanle
     * @param {object} wb - White board object generated by SVG library
    */
    drawDonutChart(wb) {

        this.drawCirclePlaceholder(wb, function(radius, pos){

            let donutChart = wb.foreignObject(radius*2, radius*2);
            donutChart.move(pos.x - radius, pos.y - radius);
            let donutChartId = elementsUtil.getElementId("donut-chart");
            let htmlDonutchart = htmlSymbolUtil.generatePieChartHtml(donutChartId, radius*2, radius*2);
            donutChart.add(htmlDonutchart).id(donutChartId).draggable();

            let donutPros = new DonutChart(donutChartId, donutChart);
            document.getElementById(donutChartId).properties = donutPros;

            chartUtil.renderDonutChart(`child-${donutChartId}`);
            eventUtil.assignDbclickToDonutChart(donutChart);
        })
    }


    /** 
    * Drawing a radial gauge chart by using @svd.js lib + chartjs library 
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawRadialGaugeChart(wb) {
       
        this.drawCirclePlaceholder(wb, function(radius, pos){
        
            let width = radius*2, height = radius;
            let gauge = wb.foreignObject(width, height);
            gauge.move(pos.x - radius, pos.y - radius);
            let gaugeId = elementsUtil.getElementId('radial-gauge')
            let htmlGaugechart = htmlSymbolUtil.generateRadialGaugeChartHtml(gaugeId, width, height);
            gauge.add(htmlGaugechart).id(gaugeId).draggable();

            let gaugePros = new RadialGauge(gaugeId, gauge);
            document.getElementById(gaugeId).properties = gaugePros;

            chartUtil.renderRadialGaugeChart(`child-${gaugeId}`);
            eventUtil.assignDbclickToRadialGauge(gauge);
        })
    }


    /** 
   * Drawing a linear gauge chart by using @svd.js lib + chartjs library 
   * and mouse event position hanle
   * @param {object} wb - White board object generated by SVG library
  */
    drawSpeedometer(wb) {
        
        this.drawCirclePlaceholder(wb, function(radius, pos){

            let width = radius*2, height = radius*2;
            let ometer = wb.foreignObject(width, height);
            ometer.move(pos.x - radius, pos.y - radius);
            let ometerId = elementsUtil.getElementId('speedometer');
            let htmlOmeterChart = htmlSymbolUtil.generateSpeedometerHtml(ometerId, width, height);
            ometer.add(htmlOmeterChart).id(ometerId).draggable();

            let speedPros = new Speedometer(ometerId, ometer);
            document.getElementById(ometerId).properties = speedPros;

            chartUtil.renderSpeedometer(`child-${ometerId}`);
            eventUtil.assignDbclickToSpeedometer(ometer);
        })
    }

    /** 
    * Drawing a linear gauge chart by using @svd.js lib + chartjs library 
    * and mouse event position hanle
    * @param {object} wb - White board object generated by SVG library
   */
    drawLinearGaugeChart(wb) {
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let linearGauge = wb.foreignObject(width, height).move(pos.x, pos.y);
            let gaugeId = elementsUtil.getElementId("linear-gauge");
            let htmlgaugeChart = htmlSymbolUtil.generateLinearGaugeHtml(gaugeId, width, height);
            linearGauge.add(htmlgaugeChart).id(gaugeId).draggable();

            let gaugePros = new LinearGauge(gaugeId, linearGauge);
            document.getElementById(gaugeId).properties = gaugePros;

            chartUtil.renderLinearGaugeChart(`child-${gaugeId}`);
            eventUtil.assignDbclickToLinearGauge(linearGauge);
        })
    }



    /** 
     * Drawing a radial clock by using @svd.js lib & a clock example on W3school.com
     * @param {object} wb - White board object generated by SVG library
    */
    drawRadialClock(wb) {
       
        this.drawCirclePlaceholder(wb, function(radius, pos){

            let clockId = elementsUtil.getElementId('radial-clock');
            let radialClock = wb.foreignObject(2*radius, 2*radius).move(pos.x - radius , pos.y - radius);
            radialClock.add(`<div></div>`).id(clockId).draggable();
            clockUtil.initRadialClock(radius, clockId);
            eventUtil.assignDbclickToRadialClock(radialClock);

            let clockPros = new RadialClock(clockId, radialClock);
            document.getElementById(clockId).properties = clockPros;
        })

    }

    /** 
     * Drawing a digital clock by using @svd.js lib & mouse event handler
     * @param {object} wb - White board object generated by SVG library
    */
    drawDigitalClock(wb){
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let clockId = elementsUtil.getElementId('digital-clock');
            let clock = wb.foreignObject(width, height).move(pos.x, pos.y);
            let htmlClock = htmlSymbolUtil.generateDigitalClock(clockId);
            clock.add(htmlClock).draggable().id(clockId);
            clockUtil.initDigitalClock(clockId);
            eventUtil.assignDbclickToDigitalClock(clock);

            let clockPros = new DigitalClock(clockId, clock);
            document.getElementById(clockId).properties = clockPros;
        })
    }



    /** 
     * Drawing a camera player  by using @svd.js lib & mouse event handler
     * @param {object} wb - White board object generated by SVG library
    */
    drawCameraPlayer(wb){
        
        this.drawRectPlaceholder(wb, function(width, height, pos){

            let cameraId = elementsUtil.getElementId('camera');
            let camera = wb.foreignObject(width, height).move(pos.x, pos.y);
            let htmlCamera = htmlSymbolUtil.generateCamera(cameraId);
            camera.add(htmlCamera).draggable().id(cameraId);
            clockUtil.renderCameraViewer(cameraId);
            eventUtil.assignDbclickToCamera(camera);

            let cameraPros = new Camera(cameraId, camera);
            document.getElementById(cameraId).properties = cameraPros;
        })
    }



}

export default PositionHandlerUtil;