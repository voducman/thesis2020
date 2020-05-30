import {SYMBOLID}           from './constantUtil';
import {uploadCustomImage}  from '../../frontend/utils';

const modalUtil = (function(){

    function setTargetElement(modalId, targetId){
        $(`#${modalId} input[name=target-id]`).val(targetId);
    }

    function readPositionXY(modalId){
        let pos = {}
        pos.x = $(`#${modalId} input[name=pos-x]`).val();
        pos.y = $(`#${modalId} input[name=pos-y]`).val();
        return pos;
    }

    function writePositionXY(modalId, value){
        $(`#${modalId} input[name=pos-x]`).val(value.x);
        $(`#${modalId} input[name=pos-y]`).val(value.y);
    }

    function readPositionXYXY(modalId){
        let pos = {}
        pos.x1 = $(`#${modalId} input[name=pos-x1]`).val();
        pos.y1 = $(`#${modalId} input[name=pos-y1]`).val();
        pos.x2 = $(`#${modalId} input[name=pos-x2]`).val();
        pos.y2 = $(`#${modalId} input[name=pos-y2]`).val();
        return pos;
    }

    function writePositionXYXY(modalId, value){
        $(`#${modalId} input[name=pos-x1]`).val(value.x1);
        $(`#${modalId} input[name=pos-y1]`).val(value.y1);
        $(`#${modalId} input[name=pos-x2]`).val(value.x2);
        $(`#${modalId} input[name=pos-y2]`).val(value.y2);
    }

    function readSizeRadius(modalId){
        return $(`#${modalId} input[name=size-radius]`).val();
    }

    function writeSizeRadius(modalId, radius){
        $(`#${modalId} input[name=size-radius]`).val(radius);
    }


    function readEllipseRadius(modalId){
        let radius = {};
        radius.rx = $(`#${modalId} input[name=size-rx]`).val();
        radius.ry = $(`#${modalId} input[name=size-ry]`).val();
        return radius;
    }

    function writeEllipseRadius(modalId, radius){
        $(`#${modalId} input[name=size-rx]`).val(radius.rx);
        $(`#${modalId} input[name=size-ry]`).val(radius.ry);
    }

    function readSizeRectangle(modalId){
        let size = {};
        size.width  = $(`#${modalId} input[name=width]`).val();
        size.height = $(`#${modalId} input[name=height]`).val();
        return size;
    }

    function writeSizeRectangle(modalId, size){
       
        $(`#${modalId} input[name=width]`).val(size.width);
        $(`#${modalId} input[name=height]`).val(size.height);
    }

    function readRotation(modalId){   
         return $(`#${modalId} input[name=degree]`).val();
    }

    function writeRotation(modalId, degree){   
        $(`#${modalId} input[name=degree]`).val(degree);
   }

    function readOrderIndex(modalId){
        return $(`#${modalId} input[name=z-index]`).val();
    }

    function writeOrderIndex(modalId, order){
        $(`#${modalId} input[name=z-index]`).val(order);
    }

    function readLineWidth(modalId){
        return $(`#${modalId} input[name=line-width]`).val();
    }

    function writeLineWidth(modalId, width){
        $(`#${modalId} input[name=line-width]`).val(width);
    }

    function readLineStyle(modalId){
        return $(`#${modalId} select[name=line-style]`).val();
    }

    function writeLineStyle(modalId, style){
        $(`#${modalId} select[name=line-style]`).val(style);
    }

    function readLineColor(modalId){
        return $(`#${modalId} input[name=line-color]`).val();
    }

    function writeLineColor(modalId, color){
        $(`#${modalId} input[name=line-color]`).val(color);
    }

    function readLineCap(modalId){
        return $(`#${modalId} select[name=line-cap]`).val();
    }

    function writeLineCap(modalId, linecap){
        $(`#${modalId} select[name=line-cap]`).val(linecap);
    }

    function readIsDraggableOnDesign(modalId){
        let result = $(`#${modalId} input[name=has-draggable-design]`).prop('checked');
        return Boolean(result);
    }

    function writeIsDraggableOnDesign(modalId, value){
        $(`#${modalId} input[name=has-draggable-design]`).prop('checked', value);
    }

    function readIsDraggableOnRun(modalId){
        let result = $(`#${modalId} input[name=has-draggable-run]`).prop('checked');
        return Boolean(result);
    }

    function writeIsDraggableOnRun(modalId, value){
        $(`#${modalId} input[name=has-draggable-run]`).prop('checked', value);
    }

    function readMovementExp(modalId){
        return $(`#${modalId} textarea[name=move-exp]`).val();
    }

    function writeMovementExp(modalId, expression){
        $(`#${modalId} textarea[name=move-exp]`).val(expression);
    }

    function readMovementRange(modalId){
        let range = {};
        range.min = $(`#${modalId} input[name=move-min]`).val();
        range.max = $(`#${modalId} input[name=move-max]`).val();
        return range;
    }

    function writeMovementRange(modalId, range){
        $(`#${modalId} input[name=move-min]`).val(range.min);
        $(`#${modalId} input[name=move-max]`).val(range.max);
    }

    function readMovementOffsetHor(modalId){
        return $(`#${modalId} input[name=offset-x]`).val();
    }   

    function writeMovementOffsetHor(modalId, offset){
        $(`#${modalId} input[name=offset-x]`).val(offset);
    }   

    function readMovementOffsetVer(modalId){
        return $(`#${modalId} input[name=offset-y]`).val();
    }

    function writeMovementOffsetVer(modalId, offset){
        $(`#${modalId} input[name=offset-y]`).val(offset);
    }


    function readOncolorExp(modalId){
        return $(`#${modalId} textarea[name=oncolor-exp]`).val();
    }

    function writeOncolorExp(modalId, expression){
        $(`#${modalId} textarea[name=oncolor-exp]`).val(expression);
    }

    function readOnOffColor(modalId){
        let color = {};
        color.on =  $(`#${modalId} input[name=on-color]`).val();
        color.off =  $(`#${modalId} input[name=off-color]`).val();
        return color;
    }

    function writeOnOffColor(modalId, color){
        $(`#${modalId} input[name=on-color]`).val(color.on);
        $(`#${modalId} input[name=off-color]`).val(color.off);
    }

    function readHiddenExp(modalId){
        return $(`#${modalId} textarea[name=hidden-exp]`).val();
    }

    function writeHiddenExp(modalId, expression){
        $(`#${modalId} textarea[name=hidden-exp]`).val(expression);
    }

    function readFlashExp(modalId){
        return $(`#${modalId} textarea[name=flash-exp]`).val();
    }   

    function writeFlashExp(modalId, expression){
        $(`#${modalId} textarea[name=flash-exp]`).val(expression);
    }   

    function readFlashOnColor(modalId){
        return $(`#${modalId} input[name=flash-on]`).val();
    }

    function writeFlashOnColor(modalId, onColor){
        $(`#${modalId} input[name=flash-on]`).val(onColor);
    }

    function readDescription(modalId){
        return $(`#${modalId} textarea[name=description]`).val();
    }

    function writeDescription(modalId, description){
        $(`#${modalId} textarea[name=description]`).val(description);
    }

    function readTooltip(modalId){
        return $(`#${modalId} textarea[name=tooltip]`).val();
    }

    function writeTooltip(modalId, tooltip){
        $(`#${modalId} textarea[name=tooltip]`).val(tooltip);
    }

    function readSecurityLevel(modalId){
        let isNoPrivilege = $(`#${modalId} input[name=has-privilege]`).prop('checked');
        if (isNoPrivilege) return null;
        let level = $(`#${modalId} input[name=privilege-level]`).val();
        if (isNaN(level)) level = 0;
        return level;
    }

    function writeSecurityLevel(modalId, level){

        if (isNaN(level) || level == null){
            $(`#${modalId} input[name=has-privilege]`).prop('checked', true);
            $(`#${modalId} input[name=privilege-level]`).prop('disabled', true);
            $(`#${modalId} input[name=privilege-level]`).val(null)
            return;
        }

        $(`#${modalId} input[name=has-privilege]`).prop('checked', false);
        $(`#${modalId} input[name=privilege-level]`).prop('disabled', false);
        $(`#${modalId} input[name=privilege-level]`).val(level);
    }


    function readFillColor(modalId){
        let isFill = $(`#${modalId} input[name=has-fill]`).prop('checked');
        if (isFill){
            return $(`#${modalId} input[name=fill-color]`).val();
        }

        return 'none';
    }

    function writeFillColor(modalId, color){
        if (color == 'none'){
            $(`#${modalId} input[name=has-fill]`).prop('checked', false);
            return;
        }

        $(`#${modalId} input[name=has-fill]`).prop('checked', true);
        $(`#${modalId} input[name=fill-color]`).val(color);
    }

    function readFontProperties(modalId){
        let font = {};
        font.size =   $(`#${modalId} input[name=font-size]`).val();
        font.weight = $(`#${modalId} select[name=font-weight]`).val();
        font.family = $(`#${modalId} select[name=font-family]`).val();
        font.style =  $(`#${modalId} select[name=font-style]`).val();
        font.color =  $(`#${modalId} input[name=font-color]`).val();
        return font;
    }

    function writeFontProperties(modalId, font){
        $(`#${modalId} input[name=font-size]`).val(font.size);
        $(`#${modalId} select[name=font-weight]`).val(font.weight);
        $(`#${modalId} select[name=font-family]`).val(font.family);
        $(`#${modalId} select[name=font-style]`).val(font.style);
        $(`#${modalId} input[name=font-color]`).val(font.color);
    }

    function readTextContent(modalId){
        return $(`#${modalId} textarea[name=text-value]`).val();
    }

    function writeTextContent(modalId, text){
        $(`#${modalId} textarea[name=text-value]`).val(text);
    }

    function readDisplayFormat(modalId){
        return $(`#${modalId} select[name=format]`).val();
    }

    function writeDisplayFormat(modalId, format){
        $(`#${modalId} select[name=format]`).val(format);
    }

    function readNumericExp(modalId){
        return $(`#${modalId} textarea[name=numeric-exp]`).val();
    }

    function writeNumericExp(modalId, expression){
        $(`#${modalId} textarea[name=numeric-exp]`).val(expression);
    }

    function readRunExp(modalId){
        return $(`#${modalId} textarea[name=run-exp]`).val();
    }

    function writeRunExp(modalId, expression){
        $(`#${modalId} textarea[name=run-exp]`).val(expression);
    }

    function readButtonColor(modalId){
        return $(`#${modalId} input[name=button-color]`).val();
    }

    function writeButtonColor(modalId, color){
        $(`#${modalId} input[name=button-color]`).val(color);
    }

    function readSwitchLabel(modalId){
        let label = {};
        label.before = $(`#${modalId} input[name=label-before]`).val();
        label.after  = $(`#${modalId} input[name=label-after]`).val();
        return label;
    }

    function writeSwitchLabel(modalId, label){
        $(`#${modalId} input[name=label-before]`).val(label.before);
        $(`#${modalId} input[name=label-after]`).val(label.after);
    }

    function readRunOnOffExp(modalId){
        let exp = {};
        exp.on  = $(`#${modalId} textarea[name=run-on-exp]`).val();
        exp.off = $(`#${modalId} textarea[name=run-off-exp]`).val();
        return exp;
    }


    function writeRunOnOffExp(modalId, exp){
        $(`#${modalId} textarea[name=run-on-exp]`).val(exp.on);
        $(`#${modalId} textarea[name=run-off-exp]`).val(exp.off);
    }

    function readInputStyle(modalId){
        let style = {};
        style.borderWidth = $(`#${modalId} input[name=border-width]`).val();
        style.borderRadius = $(`#${modalId} input[name=border-radius]`).val();
        style.backgroundColor = $(`#${modalId} input[name=bg-color]`).val();
        return style;
    }

    function writeInputStyle(modalId, style){
        $(`#${modalId} input[name=border-width]`).val(style.borderWidth);
        $(`#${modalId} input[name=border-radius]`).val(style.borderRadius);
        $(`#${modalId} input[name=bg-color]`).val(style.backgroundColor);
    }

    function readAssignedTag(modalId){
        return $(`#${modalId} textarea[name=assign-tag]`).val();
    }

    function writeAssignedTag(modalId, tag){
        $(`#${modalId} textarea[name=assign-tag]`).val(tag);
    }

    function readTagRange(modalId){
        let range = {};
        range.min = $(`#${modalId} input[name=tag-min]`).val();  
        range.max = $(`#${modalId} input[name=tag-max]`).val();   
        return range;
    }

    function writeTagRange(modalId, range){
        $(`#${modalId} input[name=tag-min]`).val(range.min);  
        $(`#${modalId} input[name=tag-max]`).val(range.max);   
    }

    function readForegroundColor(modalId){
        return $(`#${modalId} input[name=fg-color]`).val();  
    }

    function readBackgroundColor(modalId){
        return $(`#${modalId} input[name=bg-color]`).val();  
    }


    function writeForegroundColor(modalId, color){
        $(`#${modalId} input[name=fg-color]`).val(color);  
    }

    function writeBackgroundColor(modalId, color){
        $(`#${modalId} input[name=bg-color]`).val(color);  
    }

    function writeIsShowPercent(modalId, isShowPercent){
        $(`#${modalId} input[name=has-show-percent]`).prop('checked', isShowPercent);
    }

    function readIsShowPercent(modalId){
        return  $(`#${modalId} input[name=has-show-percent]`).prop('checked');
    }

    function readBooleanExp(modalId){
        return $(`#${modalId} textarea[name=boolean-exp]`).val();  
    }

    function writeBooleanExp(modalId, expression){
        $(`#${modalId} textarea[name=boolean-exp]`).val(expression);  
    }

    function readOnOffSymbol(modalId){
        let symbol = {};
        symbol.on  = $(`#${modalId} input[name=on-symbol]`).val();  
        symbol.off = $(`#${modalId} input[name=off-symbol]`).val();  
        return symbol;
    }

    function writeOnOffSymbol(modalId, symbol){
        $(`#${modalId} input[name=on-symbol]`).val(symbol.on);  
        $(`#${modalId} input[name=off-symbol]`).val(symbol.off);  
    }

    function readByAttribute(modalId, tag, name){
        return $(`#${modalId} ${tag}[name=${name}]`).val(); 
    }

    function writeByAttribute(modalId, tag, name, value){
        $(`#${modalId} ${tag}[name=${name}]`).val(value); 
    }

    function readCheckboxByName(modalId, name){
        return $(`#${modalId} input[name=${name}]`).prop('checked'); 
    }

    function writeCheckboxByName(modalId, name, value){
        $(`#${modalId} input[name=${name}]`).prop('checked', value); 
    }

    function writeBaseModal(modalId, symbol) {
        setTargetElement(modalId, symbol.id);
        writeRotation(modalId, symbol.degree);
        writeOrderIndex(modalId, symbol.order);
        writeIsDraggableOnDesign(modalId, symbol.dragDesign);
        writeIsDraggableOnRun(modalId, symbol.dragRun);
        writeMovementExp(modalId, symbol.moveExp);
        writeMovementRange(modalId, symbol.range);
        writeMovementOffsetHor(modalId, symbol.offsetHor);
        writeMovementOffsetVer(modalId, symbol.offsetVer);
        writeHiddenExp(modalId, symbol.hiddenExp);
        writeDescription(modalId, symbol.description);
        writeTooltip(modalId, symbol.tooltip);
        writeSecurityLevel(modalId, symbol.security);
    }

    function updateBaseProperties(modalId, targetProperties){
        targetProperties.SVG.rotate(parseFloat(readRotation(modalId)) - targetProperties.degree);
        targetProperties.degree += parseFloat(readRotation(modalId)) - targetProperties.degree;
        targetProperties.order = readOrderIndex(modalId);
        targetProperties.dragDesign = readIsDraggableOnDesign(modalId);
        targetProperties.SVG.draggable(false);
        targetProperties.SVG.draggable(targetProperties.dragDesign);
        targetProperties.dragRun = readIsDraggableOnRun(modalId);
        targetProperties.moveExp = readMovementExp(modalId);
        targetProperties.range = readMovementRange(modalId);
        targetProperties.offsetHor = readMovementOffsetHor(modalId);
        targetProperties.offsetVer = readMovementOffsetVer(modalId);
        targetProperties.hiddenExp = readHiddenExp(modalId);
        targetProperties.description = readDescription(modalId);
        targetProperties.tooltip = readTooltip(modalId);
        targetProperties.security = readSecurityLevel(modalId);
    }

    function writeLineProperties(modalId, symbol) {
        writeLineWidth(modalId, symbol.lineWidth);
        writeLineStyle(modalId, symbol.lineStyle);
        writeLineColor(modalId, symbol.lineColor);
        writeLineCap(  modalId, symbol.lineCap);
    }

    function updateLineProperties(modalId, targetProperties){
        targetProperties.lineWidth = readLineWidth(modalId);
        targetProperties.lineCap   = readLineCap(modalId);
        targetProperties.lineColor = readLineColor(modalId);
        targetProperties.lineStyle = readLineStyle(modalId);
    }

    
    function getUploadSymbol(){
        const img = document.querySelector(`#${SYMBOLID.GRAPHVIEW} #graph-view-img`).files[0] || null;
        return img;
    }

    function updatChartistProperties(modalId, targetProperties){
        targetProperties.x = readPositionXY(modalId).x;
        targetProperties.y = readPositionXY(modalId).y;
        targetProperties.width  = readSizeRectangle(modalId).width;
        targetProperties.height = readSizeRectangle(modalId).height;
        targetProperties.low  = readByAttribute(modalId, 'input', 'low');
        targetProperties.high = readByAttribute(modalId, 'input', 'high');
        targetProperties.maxPoints = readByAttribute(modalId, 'input', 'max-points');
        targetProperties.backgroundColor = readByAttribute(modalId, 'input', 'bg-color');
        if (modalId == SYMBOLID.LINECHART) targetProperties.isSmooth = readCheckboxByName(modalId, 'has-show-smooth');
        if (modalId == SYMBOLID.LINECHART) targetProperties.isArea = readCheckboxByName(modalId, 'has-show-area');
        targetProperties.legend = readByAttribute(modalId, 'input', 'legend');
        targetProperties.assignTag1 = readByAttribute(modalId, 'textarea', 'assign-tag1');
        targetProperties.assignTag2 = readByAttribute(modalId, 'textarea', 'assign-tag2');
        targetProperties.assignTag3 = readByAttribute(modalId, 'textarea', 'assign-tag3');
    }

    function writeChartistProperties(modalId, chart){
        writePositionXY(modalId, {'x': chart.x, 'y': chart.y});
        writeSizeRectangle(modalId, {'width': chart.width, 'height': chart.height});
        writeByAttribute(modalId, 'input', 'low', chart.low);
        writeByAttribute(modalId, 'input', 'high', chart.high);
        writeByAttribute(modalId, 'input', 'max-points', chart.maxPoints);
        writeByAttribute(modalId, 'input', 'bg-color', chart.backgroundColor);
        if (modalId == SYMBOLID.LINECHART) writeCheckboxByName(modalId, 'has-show-smooth', chart.isSmooth);
        if (modalId == SYMBOLID.LINECHART) writeCheckboxByName(modalId, 'has-show-area', chart.isArea);
        writeByAttribute(modalId, 'textarea', 'assign-tag1', chart.assignTag1);
        writeByAttribute(modalId, 'textarea', 'assign-tag2', chart.assignTag2);
        writeByAttribute(modalId, 'textarea', 'assign-tag3', chart.assignTag3);
        writeByAttribute(modalId, 'input', 'legend', chart.legend);
    }


    return {

        calLineStyle: function(lineWidth, lineStyle){
            if (lineStyle === 'solid'){
                return "";
            }
    
            if (lineStyle === 'dash'){
                return `${3*lineWidth},${3*lineWidth}`;
            }
    
            if (lineStyle === 'dot'){
                return `${lineWidth}, ${lineWidth}`;
            }
        },

        /**
         * @param {Line} line - an instance of Line
         * read more at drawing/model/Line.js
         */
        updateLineModal: function(line){
            writeBaseModal(SYMBOLID.LINE, line);
            writePositionXYXY(SYMBOLID.LINE, {'x1': line.x1, 'y1': line.y1, 'x2': line.x2, 'y2': line.y2 });
            writeLineProperties(SYMBOLID.LINE, line);
            writeOncolorExp(SYMBOLID.LINE, line.onColorExp);
            writeOnOffColor(SYMBOLID.LINE, line.animationColor);
            writeFlashExp(SYMBOLID.LINE, line.flashExp);
            writeFlashOnColor(SYMBOLID.LINE, line.flashOnColor);
        },

        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateLineSymbol: function (targetId) {
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.LINE, targetProperties);
            updateLineProperties(SYMBOLID.LINE, targetProperties);
            const pos = readPositionXYXY(SYMBOLID.LINE);
            targetProperties.x1 = pos.x1;
            targetProperties.y1 = pos.y1;
            targetProperties.x2 = pos.x2;
            targetProperties.y2 = pos.y2;
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.LINE);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.LINE);
            targetProperties.flashExp = readFlashExp(SYMBOLID.LINE);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.LINE);
            targetProperties.updateSymbol();
        },


        /**
         * @param {Polyline} polyline - an instance of Polyline
         * read more at drawing/model/Polyline.js
         */
        updatePolylineModal: function(polyline){
            writeBaseModal(SYMBOLID.POLYLINE, polyline);
            writeLineProperties(SYMBOLID.POLYLINE, polyline);
            writeFillColor(SYMBOLID.POLYLINE, polyline.fill);
            writeOncolorExp(SYMBOLID.POLYLINE, polyline.onColorExp);
            writeOnOffColor(SYMBOLID.POLYLINE, polyline.animationColor);
            writeFlashExp(SYMBOLID.POLYLINE, polyline.flashExp);
            writeFlashOnColor(SYMBOLID.POLYLINE, polyline.flashOnColor);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updatePolylineSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.POLYLINE, targetProperties);
            updateLineProperties(SYMBOLID.POLYLINE, targetProperties);
            targetProperties.fill = readFillColor(SYMBOLID.POLYLINE);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.POLYLINE);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.POLYLINE);
            targetProperties.flashExp = readFlashExp(SYMBOLID.POLYLINE);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.POLYLINE);
            targetProperties.updateSymbol();

        },



         /**
         * @param {Ellipse} ellipse - an instance of Ellipse
         * read more at drawing/modal/Ellipse.js
         */
        updateEllipseModal: function(ellipse){
            writeBaseModal(SYMBOLID.ELLIPSE, ellipse);
            writeEllipseRadius(SYMBOLID.ELLIPSE, {'rx': ellipse.rx, 'ry': ellipse.ry});
            writePositionXY(SYMBOLID.ELLIPSE, {'x': ellipse.x, 'y': ellipse.y});
            writeLineProperties(SYMBOLID.ELLIPSE, ellipse);
            writeFillColor(SYMBOLID.ELLIPSE, ellipse.fill);
            writeOncolorExp(SYMBOLID.ELLIPSE, ellipse.onColorExp);
            writeOnOffColor(SYMBOLID.ELLIPSE, ellipse.animationColor);
            writeFlashExp(SYMBOLID.ELLIPSE, ellipse.flashExp);
            writeFlashOnColor(SYMBOLID.ELLIPSE, ellipse.flashOnColor);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateEllipseSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.ELLIPSE, targetProperties);
            updateLineProperties(SYMBOLID.ELLIPSE, targetProperties);
            const pos = readPositionXY(SYMBOLID.ELLIPSE);
            const radius = readEllipseRadius(SYMBOLID.ELLIPSE);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.rx = radius.rx;
            targetProperties.ry = radius.ry;
            targetProperties.fill = readFillColor(SYMBOLID.ELLIPSE);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.ELLIPSE);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.ELLIPSE);
            targetProperties.flashExp = readFlashExp(SYMBOLID.ELLIPSE);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.ELLIPSE);
            targetProperties.updateSymbol();
        },


         /**
         * @param {Circle} Circle - an instance of Circle
         * read more at drawing/model/Circle.js
         */
        updateCircleModal: function(circle){
            writeBaseModal(SYMBOLID.CIRCLE, circle);
            writeSizeRadius(SYMBOLID.CIRCLE, circle.r);
            writePositionXY(SYMBOLID.CIRCLE, {'x': circle.x, 'y': circle.y});
            writeLineProperties(SYMBOLID.CIRCLE, circle);
            writeFillColor(SYMBOLID.CIRCLE, circle.fill);
            writeOncolorExp(SYMBOLID.CIRCLE, circle.onColorExp);
            writeOnOffColor(SYMBOLID.CIRCLE, circle.animationColor);
            writeFlashExp(SYMBOLID.CIRCLE, circle.flashExp);
            writeFlashOnColor(SYMBOLID.CIRCLE, circle.flashOnColor);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateCircleSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.CIRCLE, targetProperties);
            updateLineProperties(SYMBOLID.CIRCLE, targetProperties);
            const pos = readPositionXY(SYMBOLID.CIRCLE);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.r = readSizeRadius(SYMBOLID.CIRCLE);
            targetProperties.fill = readFillColor(SYMBOLID.CIRCLE);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.CIRCLE);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.CIRCLE);
            targetProperties.flashExp = readFlashExp(SYMBOLID.CIRCLE);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.CIRCLE);
            targetProperties.updateSymbol();
        },



         /**
         * @param {Rectangle} polyline - an instance of Rectangle
         * read more at drawing/model/Rectangle.js
         */
        updateRectModal: function(rect){
            console.log("rect", rect)
            writeBaseModal(SYMBOLID.RECTANGLE, rect);
            writeSizeRadius(SYMBOLID.RECTANGLE, rect.radius);
            writePositionXY(SYMBOLID.RECTANGLE, {'x': rect.x, 'y': rect.y});
            writeSizeRectangle(SYMBOLID.RECTANGLE, {'width': rect.width, 'height': rect.height});
            writeLineProperties(SYMBOLID.RECTANGLE, rect);
            writeFillColor(SYMBOLID.RECTANGLE, rect.fill);
            writeOncolorExp(SYMBOLID.RECTANGLE, rect.onColorExp);
            writeOnOffColor(SYMBOLID.RECTANGLE, rect.animationColor);
            writeFlashExp(SYMBOLID.RECTANGLE, rect.flashExp);
            writeFlashOnColor(SYMBOLID.RECTANGLE, rect.flashOnColor);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateRectSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.RECTANGLE, targetProperties);
            updateLineProperties(SYMBOLID.RECTANGLE, targetProperties);
            const pos = readPositionXY(SYMBOLID.RECTANGLE);
            const size = readSizeRectangle(SYMBOLID.RECTANGLE);
        
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.radius = readSizeRadius(SYMBOLID.RECTANGLE);
            targetProperties.fill = readFillColor(SYMBOLID.RECTANGLE);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.RECTANGLE);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.RECTANGLE);
            targetProperties.flashExp = readFlashExp(SYMBOLID.RECTANGLE);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.RECTANGLE);
            targetProperties.updateSymbol();
        },


        /**
         * @param {Polygon} polygon - an instance of Polygib
         * read more at drawing/model/Polygon.js
         */
        updatePolygonModal: function(polygon){
            writeBaseModal(SYMBOLID.POLYGON, polygon);
            writeLineProperties(SYMBOLID.POLYGON, polygon);
            writeFillColor(SYMBOLID.POLYGON, polygon.fill);
            writeOncolorExp(SYMBOLID.POLYGON, polygon.onColorExp);
            writeOnOffColor(SYMBOLID.POLYGON, polygon.animationColor);
            writeFlashExp(SYMBOLID.POLYGON, polygon.flashExp);
            writeFlashOnColor(SYMBOLID.POLYGON, polygon.flashOnColor);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updatePolygonSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.POLYGON, targetProperties);
            updateLineProperties(SYMBOLID.POLYGON, targetProperties);
            targetProperties.fill = readFillColor(SYMBOLID.POLYGON);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.POLYGON);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.POLYGON);
            targetProperties.flashExp = readFlashExp(SYMBOLID.POLYGON);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.POLYGON);
            targetProperties.updateSymbol();

        },


         /**
         * @param {Textblock} textblock - an instance of Textblock
         * read more at drawing/model/Textblock.js
         */
        updateTextblockModal: function(textblock){
            writeBaseModal(SYMBOLID.TEXTBLOCK, textblock);
            writePositionXY(SYMBOLID.TEXTBLOCK, {'x': textblock.x, 'y': textblock.y});
            writeFontProperties(SYMBOLID.TEXTBLOCK, {
                'size':   textblock.fontSize,
                'weight': textblock.fontWeight,
                'family': textblock.fontFamily,
                'style':  textblock.fontStyle,
                'color':  textblock.fontColor
            })
            writeTextContent(SYMBOLID.TEXTBLOCK, textblock.textContent);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateTextblockSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.TEXTBLOCK, targetProperties);
            let font = readFontProperties(SYMBOLID.TEXTBLOCK);
            const pos = readPositionXY(SYMBOLID.TEXTBLOCK);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.fontSize =  font.size;
            targetProperties.fontWeight = font.weight;
            targetProperties.fontFamily = font.family;
            targetProperties.fontStyle = font.style;
            targetProperties.fontColor = font.color;
            targetProperties.textContent = readTextContent(SYMBOLID.TEXTBLOCK);
            console.log(readTextContent(SYMBOLID.TEXTBLOCK))
            targetProperties.updateSymbol();          
        },


         /**
         * @param {Pencil} pencil - an instance of Pencil
         * read more at drawing/model/Pencil.js
         */
        updatePencilModal: function (pencil) {
            writeBaseModal(SYMBOLID.PENCIL, pencil);
            writeLineProperties(SYMBOLID.PENCIL, pencil);
            writeOnOffColor(SYMBOLID.PENCIL, pencil.animationColor);
            writeOncolorExp(SYMBOLID.PENCIL, pencil.onColorExp);
            writeFlashOnColor(SYMBOLID.PENCIL, pencil.flashOnColor);
            writeFlashExp(SYMBOLID.PENCIL, pencil.flashExp);
        },


         /**
         * @param {string} targetId - id of symbol needed to update
         */
        updatePencilSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.PENCIL, targetProperties);
            updateLineProperties(SYMBOLID.PENCIL, targetProperties);
            targetProperties.onColorExp = readOncolorExp(SYMBOLID.PENCIL);
            targetProperties.animationColor = readOnOffColor(SYMBOLID.PENCIL);
            targetProperties.flashExp = readFlashExp(SYMBOLID.PENCIL);
            targetProperties.flashOnColor = readFlashOnColor(SYMBOLID.PENCIL);
            targetProperties.updateSymbol();          
        },


        /**
         * @param {Graphview} graphview - an instance of Graphview
         * read more at drawing/model/Graphview.js
         */
        updateGraphviewModal(graphview){
            writeBaseModal(SYMBOLID.GRAPHVIEW, graphview);
            writePositionXY(SYMBOLID.GRAPHVIEW, {'x': graphview.x, 'y': graphview.y});
            writeSizeRectangle(SYMBOLID.GRAPHVIEW, {'width': graphview.width, 'height': graphview.height});
        },


        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateGraphviewSymbol: function(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.GRAPHVIEW, targetProperties);
            const pos = readPositionXY(SYMBOLID.GRAPHVIEW);
            const size = readSizeRectangle(SYMBOLID.GRAPHVIEW);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            
            let imageData = getUploadSymbol();
            if (imageData == null || typeof imageData != 'object'){
                return;
            }

            if (targetProperties.symbolURL != null){
                targetProperties.updateSymbol();
                return;
            }

            uploadCustomImage(imageData)
            .then( data => {
                targetProperties.symbolURL = data;
                targetProperties.updateSymbol();
            })
            .catch( e => console.log(e))
        },

        /**
         * @param {DisplayValue} displayValue - an instance of DisplayValue
         * read more at drawing/model/DisplayValue.js
         */
        updateDisplayValueModal(displayValue){
            writeBaseModal(SYMBOLID.DISPLAYVALUE, displayValue);
            writePositionXY(SYMBOLID.DISPLAYVALUE, {'x': displayValue.x, 'y': displayValue.y});
            writeFontProperties(SYMBOLID.DISPLAYVALUE, {
                'size':   displayValue.fontSize,
                'weight': displayValue.fontWeight,
                'family': displayValue.fontFamily,
                'style':  displayValue.fontStyle,
                'color':  displayValue.fontColor
            })
            writeTextContent(SYMBOLID.DISPLAYVALUE, displayValue.format);
            writeDisplayFormat(SYMBOLID.DISPLAYVALUE, displayValue.format);
            writeNumericExp(SYMBOLID.DISPLAYVALUE, displayValue.numericExp);
        },


        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateDisplayValueSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.DISPLAYVALUE, targetProperties);
            let font  = readFontProperties(SYMBOLID.DISPLAYVALUE);
            const pos = readPositionXY(SYMBOLID.DISPLAYVALUE);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.fontSize =   font.size;
            targetProperties.fontWeight = font.weight;
            targetProperties.fontFamily = font.family;
            targetProperties.fontStyle =  font.style;
            targetProperties.fontColor =  font.color;
            targetProperties.format = readDisplayFormat(SYMBOLID.DISPLAYVALUE);
            targetProperties.numericExp = readNumericExp(SYMBOLID.DISPLAYVALUE);
            targetProperties.updateSymbol();          
        },


         /**
         * @param {Button} button - an instance of Button
         * read more at drawing/model/Button.js
         */
        updateButtonModal(button){
            writeBaseModal(SYMBOLID.BUTTON, button);
            writePositionXY(SYMBOLID.BUTTON, {'x': button.x, 'y': button.y});
            writeFontProperties(SYMBOLID.BUTTON, {
                'size':   button.fontSize,
                'weight': button.weight,
                'family': button.fontFamily,
                'style':  button.fontStyle,
                'color':  button.fontColor
            })
            writeRunExp(SYMBOLID.BUTTON, button.runExp);
            writeSizeRectangle(SYMBOLID.BUTTON, {'width': button.width, 'height': button.height});
            writeButtonColor(SYMBOLID.BUTTON, button.buttonColor);
            writeTextContent(SYMBOLID.BUTTON, button.textContent);
        },


        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateButtonSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.BUTTON, targetProperties);
            let font  = readFontProperties(SYMBOLID.BUTTON);
            const pos = readPositionXY(SYMBOLID.BUTTON);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.fontSize =   font.size;
            targetProperties.fontWeight = font.weight;
            targetProperties.fontFamily = font.family;
            targetProperties.fontStyle =  font.style;
            targetProperties.fontColor =  font.color;
            const size = readSizeRectangle(SYMBOLID.BUTTON);
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.buttonColor = readButtonColor(SYMBOLID.BUTTON);
            targetProperties.textContent = readTextContent(SYMBOLID.BUTTON);
            targetProperties.runExp = readRunExp(SYMBOLID.BUTTON);
            targetProperties.updateSymbol();          
        },


         /**
         * @param {Switch} switch - an instance of Switch
         * read more at drawing/model/Switch.js
         */
        updateSwitchModal(toggle){
            writeBaseModal(SYMBOLID.SWITCH, toggle);
            writePositionXY(SYMBOLID.SWITCH, {'x': toggle.x, 'y': toggle.y});
            writeSwitchLabel(SYMBOLID.SWITCH, {'before': toggle.labelBefore, 'after': toggle.labelAfter});
            writeRunOnOffExp(SYMBOLID.SWITCH, {'on': toggle.runOnExp, 'off': toggle.runOffExp});
        },


        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateSwitchSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.SWITCH, targetProperties);
            const pos = readPositionXY(SYMBOLID.SWITCH);
            const label = readSwitchLabel(SYMBOLID.SWITCH);
            console.log(label)
            const exp = readRunOnOffExp(SYMBOLID.SWITCH);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.labelBefore = label.before;
            targetProperties.labelAfter = label.after;
            targetProperties.runOnExp = exp.on;
            targetProperties.runOffExp = exp.off;
            targetProperties.updateSymbol();          
        },


        /**
         * @param {Input}} input - an instance of Input
         * read more at drawing/model/Input.js
         */
        updateInputModal(input){
            writeBaseModal(SYMBOLID.INPUT, input);
            writePositionXY(SYMBOLID.INPUT, {'x': input.x, 'y': input.y});
            writeFontProperties(SYMBOLID.INPUT, {
                'size':   input.fontSize,
                'weight': input.weight,
                'family': input.fontFamily,
                'style':  input.fontStyle,
                'color':  input.fontColor
            })
            writeSizeRectangle(SYMBOLID.INPUT, {'width': input.width, 'height': input.height});
            writeInputStyle(SYMBOLID.INPUT, {
                'borderWidth': input.borderWidth,
                'borderRadius': input.borderRadius,
                'backgroundColor': input.backgroundColor
            })
            writeAssignedTag(SYMBOLID.INPUT, input.assignTag);
        },


        /**
         * @param {string} targetId - id of symbol needed to update
         */
        updateInputSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.INPUT, targetProperties);
            const pos = readPositionXY(SYMBOLID.INPUT);
            const font = readFontProperties(SYMBOLID.INPUT);
            const style = readInputStyle(SYMBOLID.INPUT);
            const size = readSizeRectangle(SYMBOLID.INPUT);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.fontSize =   font.size;
            targetProperties.fontWeight = font.weight;
            targetProperties.fontFamily = font.family;
            targetProperties.fontStyle =  font.style;
            targetProperties.fontColor =  font.color;
            targetProperties.borderRadius = style.borderRadius;
            targetProperties.borderWidth = style.borderWidth;
            targetProperties.backgroundColor = style.backgroundColor;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.assignTag = readAssignedTag(SYMBOLID.INPUT);
            targetProperties.updateSymbol();          
        },

        updateHorSliderModal(hslider){
            writeBaseModal(SYMBOLID.HORISLIDER, hslider);
            writePositionXY(SYMBOLID.HORISLIDER, {'x': hslider.x, 'y': hslider.y});
            writeSizeRectangle(SYMBOLID.HORISLIDER, {'width': hslider.width, 'height': hslider.height});
            writeAssignedTag(SYMBOLID.HORISLIDER);
            writeTagRange(SYMBOLID.HORISLIDER, hslider.tagRange);
            writeForegroundColor(SYMBOLID.HORISLIDER, hslider.foregroundColor);
            writeBackgroundColor(SYMBOLID.HORISLIDER, hslider.backgroundColor);
        },

        updateHorSliderSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.HORISLIDER, targetProperties);
            const pos = readPositionXY(SYMBOLID.HORISLIDER);
            const size = readSizeRectangle(SYMBOLID.HORISLIDER);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.assignTag = readAssignedTag(SYMBOLID.HORISLIDER);
            const range = readTagRange(SYMBOLID.HORISLIDER);
            if (targetProperties.tagRange.min != range.min || targetProperties.tagRange.max != range.max){
                targetProperties.tagRange = range;
                targetProperties.changeSliderRange(0, parseInt(range.max) - parseInt(range.min));
            }
            targetProperties.foregroundColor = readForegroundColor(SYMBOLID.HORISLIDER);
            targetProperties.backgroundColor = readBackgroundColor(SYMBOLID.HORISLIDER);
            targetProperties.updateSymbol();
        },


        updateVerSliderModal(vslider){
            writeBaseModal(SYMBOLID.VERSLIDER, vslider);
            writePositionXY(SYMBOLID.VERSLIDER, {'x': vslider.x, 'y': vslider.y});
            writeSizeRectangle(SYMBOLID.VERSLIDER, {'width': vslider.width, 'height': vslider.height});
            writeAssignedTag(SYMBOLID.VERSLIDER);
            writeTagRange(SYMBOLID.VERSLIDER, vslider.tagRange);
            writeForegroundColor(SYMBOLID.VERSLIDER, vslider.foregroundColor);
            writeBackgroundColor(SYMBOLID.VERSLIDER, vslider.backgroundColor);
        },

        updateVerSliderSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.VERSLIDER, targetProperties);
            const pos = readPositionXY(SYMBOLID.VERSLIDER);
            const size = readSizeRectangle(SYMBOLID.VERSLIDER);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.assignTag = readAssignedTag(SYMBOLID.VERSLIDER);
            const range = readTagRange(SYMBOLID.VERSLIDER);
            if (targetProperties.tagRange.min != range.min || targetProperties.tagRange.max != range.max){
                targetProperties.tagRange = range;
                targetProperties.changeSliderRange(0, parseInt(range.max) - parseInt(range.min));
            }
            targetProperties.foregroundColor = readForegroundColor(SYMBOLID.VERSLIDER);
            targetProperties.backgroundColor = readBackgroundColor(SYMBOLID.VERSLIDER);
            targetProperties.updateSymbol();
        },

        updateProgressBarModal(progress){
            writeBaseModal(SYMBOLID.PROGRESSBAR, progress);
            writePositionXY(SYMBOLID.PROGRESSBAR, {'x': progress.x, 'y': progress.y});
            writeSizeRectangle(SYMBOLID.PROGRESSBAR, {'width': progress.width, 'height': progress.height});
            writeSizeRadius(SYMBOLID.PROGRESSBAR, progress.radius)
            writeBackgroundColor(SYMBOLID.PROGRESSBAR, progress.backgroundColor);
            writeForegroundColor(SYMBOLID.PROGRESSBAR, progress.foregroundColor);
            writeTagRange(SYMBOLID.PROGRESSBAR, progress.tagRange);
            writeAssignedTag(SYMBOLID.PROGRESSBAR, progress.assignTag);
            writeIsShowPercent(SYMBOLID.PROGRESSBAR, progress.showPercentage);
        },

        updateProgressBarSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.PROGRESSBAR, targetProperties);
            const pos = readPositionXY(SYMBOLID.PROGRESSBAR);
            const size = readSizeRectangle(SYMBOLID.PROGRESSBAR);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.radius = readSizeRadius(SYMBOLID.PROGRESSBAR);
            targetProperties.backgroundColor = readBackgroundColor(SYMBOLID.PROGRESSBAR);
            targetProperties.foregroundColor = readForegroundColor(SYMBOLID.PROGRESSBAR);
            targetProperties.tagRange = readTagRange(SYMBOLID.PROGRESSBAR);
            targetProperties.assignTag = readAssignedTag(SYMBOLID.PROGRESSBAR);
            targetProperties.showPercentage = readIsShowPercent(SYMBOLID.PROGRESSBAR);
            targetProperties.updateSymbol();
        },

        updateCheckboxModal(checkbox){
            writeBaseModal(SYMBOLID.CHECKBOX, checkbox);
            writePositionXY(SYMBOLID.CHECKBOX, {'x': checkbox.x, 'y': checkbox.y});
            writeSizeRectangle(SYMBOLID.CHECKBOX, {'width': checkbox.width, 'height': checkbox.height});
            writeRunOnOffExp(SYMBOLID.CHECKBOX, {'on': checkbox.runOnExp, 'off': checkbox.runOffExp});
        },

        updateCheckboxSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.CHECKBOX, targetProperties);
            const pos = readPositionXY(SYMBOLID.CHECKBOX);
            const size = readSizeRectangle(SYMBOLID.CHECKBOX);
            const onOffExp = readRunOnOffExp(SYMBOLID.CHECKBOX);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.runOnExp = onOffExp.on;
            targetProperties.runOffExp = onOffExp.off;
            targetProperties.updateSymbol();
        },

        updateSymbolSetModal(symbol){
            writeBaseModal(SYMBOLID.SYMBOLSET, symbol);
            writePositionXY(SYMBOLID.SYMBOLSET, {'x': symbol.x, 'y': symbol.y});
            writeSizeRectangle(SYMBOLID.SYMBOLSET, {'width': symbol.width, 'height': symbol.height});
            writeOnOffSymbol(SYMBOLID.SYMBOLSET, {'on': symbol.onSymbolURL, 'off': symbol.offSymbolURL});
            writeBooleanExp(SYMBOLID.SYMBOLSET, symbol.booleanExp);
        },

        updateSymbolSetSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.SYMBOLSET, targetProperties);
            const pos = readPositionXY(SYMBOLID.SYMBOLSET);
            const size = readSizeRectangle(SYMBOLID.SYMBOLSET);
            const symbol = readOnOffSymbol(SYMBOLID.SYMBOLSET);
            targetProperties.x = pos.x;
            targetProperties.y = pos.y;
            targetProperties.width = size.width;
            targetProperties.height = size.height;
            targetProperties.onSymbolURL = symbol.on;
            targetProperties.offSymbolURL = symbol.off;
            targetProperties.booleanExp = readBooleanExp(SYMBOLID.SYMBOLSET);
            targetProperties.updateSymbol();
        },

        updateLineChartModal(chart){
            writeBaseModal(SYMBOLID.LINECHART, chart);
            writeChartistProperties(SYMBOLID.LINECHART, chart);
        },

        updateLineChartSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.LINECHART, targetProperties);
            updatChartistProperties(SYMBOLID.LINECHART, targetProperties);
            targetProperties.updateSymbol();
        },

        updateBarChartModal(chart){
            writeBaseModal(SYMBOLID.BARCHART, chart);
            writeChartistProperties(SYMBOLID.BARCHART, chart);

        },

        updateBarChartSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.BARCHART, targetProperties);
            updatChartistProperties(SYMBOLID.BARCHART, targetProperties);
            targetProperties.updateSymbol();
        },


        updatePieChartModal(chart) {
            writeBaseModal(SYMBOLID.PIECHART, chart);
            writePositionXY(SYMBOLID.PIECHART, {'x': chart.x, 'y': chart.y});
            writeSizeRadius(SYMBOLID.PIECHART, chart.radius);
            writeByAttribute(SYMBOLID.PIECHART, 'input', 'label', chart.stringLabels);
            writeByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag1', chart.assignTag1);
            writeByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag2', chart.assignTag2);
            writeByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag3', chart.assignTag3);
            writeByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag4', chart.assignTag4);
            writeByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag5', chart.assignTag5);
        },

        updatePieChartSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.PIECHART, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.PIECHART).x;
            targetProperties.y = readPositionXY(SYMBOLID.PIECHART).y;
            targetProperties.radius = readSizeRadius(SYMBOLID.PIECHART);
            targetProperties.stringLabels = readByAttribute(SYMBOLID.PIECHART, 'input', 'label');
            targetProperties.assignTag1 = readByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag1');
            targetProperties.assignTag2 = readByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag2');
            targetProperties.assignTag3 = readByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag3');
            targetProperties.assignTag4 = readByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag4');
            targetProperties.assignTag5 = readByAttribute(SYMBOLID.PIECHART, 'textarea', 'assign-tag5');
            targetProperties.updateSymbol();
        },


        updateDonutChartModal(chart){
            writeBaseModal(SYMBOLID.DONUTCHART, chart);
            writePositionXY(SYMBOLID.DONUTCHART, {'x': chart.x, 'y': chart.y});
            writeSizeRadius(SYMBOLID.DONUTCHART, chart.radius);
            writeByAttribute(SYMBOLID.DONUTCHART, 'input', 'donut-width', chart.donutWidth);
            writeByAttribute(SYMBOLID.DONUTCHART, 'input', 'label', chart.stringLabels);
            writeByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag1', chart.assignTag1);
            writeByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag2', chart.assignTag2);
            writeByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag3', chart.assignTag3);
            writeByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag4', chart.assignTag4);
            writeByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag5', chart.assignTag5);
        },

        updateDonutChartSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.DONUTCHART, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.DONUTCHART).x;
            targetProperties.y = readPositionXY(SYMBOLID.DONUTCHART).y;
            targetProperties.radius = readSizeRadius(SYMBOLID.DONUTCHART);
            targetProperties.donutWidth = readByAttribute(SYMBOLID.DONUTCHART, 'input', 'donut-width');
            targetProperties.stringLabels = readByAttribute(SYMBOLID.DONUTCHART, 'input', 'label');
            targetProperties.assignTag1 = readByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag1');
            targetProperties.assignTag2 = readByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag2');
            targetProperties.assignTag3 = readByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag3');
            targetProperties.assignTag4 = readByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag4');
            targetProperties.assignTag5 = readByAttribute(SYMBOLID.DONUTCHART, 'textarea', 'assign-tag5');
            targetProperties.updateSymbol();
        },


        updateRadialGaugeModal(gauge){

            writeBaseModal(SYMBOLID.RADIALGAUGE, gauge);
            writePositionXY(SYMBOLID.RADIALGAUGE, {'x': gauge.x, 'y': gauge.y});
            writeSizeRectangle(SYMBOLID.RADIALGAUGE, {'width': gauge.width, 'height': gauge.height});
            writeByAttribute(SYMBOLID.RADIALGAUGE, 'input', 'scale', gauge.scale);
            writeByAttribute(SYMBOLID.RADIALGAUGE, 'input', 'label', gauge.label);
            writeBackgroundColor(SYMBOLID.RADIALGAUGE, gauge.backgroundColor);
            writeForegroundColor(SYMBOLID.RADIALGAUGE, gauge.foregroundColor);
            writeByAttribute(SYMBOLID.RADIALGAUGE, 'textarea', 'assign-tag', gauge.assignTag);
            writeTagRange(SYMBOLID.RADIALGAUGE, gauge.tagRange);
        },

        updateRadialGaugeSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.RADIALGAUGE, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.RADIALGAUGE).x;
            targetProperties.y = readPositionXY(SYMBOLID.RADIALGAUGE).y;
            targetProperties.width = readSizeRectangle(SYMBOLID.RADIALGAUGE).width;
            targetProperties.height = readSizeRectangle(SYMBOLID.RADIALGAUGE).height;
            targetProperties.scale = readByAttribute(SYMBOLID.RADIALGAUGE, 'input', 'scale');
            targetProperties.label = readByAttribute(SYMBOLID.RADIALGAUGE, 'input', 'label');
            targetProperties.backgroundColor = readBackgroundColor(SYMBOLID.RADIALGAUGE);
            targetProperties.foregroundColor = readForegroundColor(SYMBOLID.RADIALGAUGE);
            targetProperties.assignTag = readByAttribute(SYMBOLID.RADIALGAUGE, 'textarea', 'assign-tag');
            targetProperties.tagRange = readTagRange(SYMBOLID.RADIALGAUGE);
            targetProperties.updateSymbol();
        },



        updateSpeedometerModal(ometer){
            writeBaseModal(SYMBOLID.SPEEDOMETER, ometer);
            writePositionXY(SYMBOLID.SPEEDOMETER, {'x': ometer.x, 'y': ometer.y});
            writeSizeRadius(SYMBOLID.SPEEDOMETER, ometer.radius);
            writeByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'title', ometer.title);
            writeByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'unit', ometer.unit);
            writeByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'ticks', ometer.ticks);
            writeByAttribute(SYMBOLID.SPEEDOMETER, 'textarea', 'assign-tag', ometer.assignTag);
            writeTagRange(SYMBOLID.SPEEDOMETER, ometer.tagRange);
        },

        updateSpeedometerSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.SPEEDOMETER, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.SPEEDOMETER).x;
            targetProperties.y = readPositionXY(SYMBOLID.SPEEDOMETER).y;
            targetProperties.radius = readSizeRadius(SYMBOLID.SPEEDOMETER);
            targetProperties.title = readByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'title');
            targetProperties.unit = readByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'unit');
            targetProperties.ticks = readByAttribute(SYMBOLID.SPEEDOMETER, 'input', 'ticks');
            targetProperties.assignTag = readByAttribute(SYMBOLID.SPEEDOMETER, 'textarea', 'assign-tag');
            targetProperties.tagRange = readTagRange(SYMBOLID.SPEEDOMETER);
            targetProperties.updateSymbol();
        },


        updateLinearGaugeModal(gauge){
            writeBaseModal(SYMBOLID.LINEARGAUGE, gauge);
            writePositionXY(SYMBOLID.LINEARGAUGE, {'x': gauge.x, 'y': gauge.y});
            writeSizeRectangle(SYMBOLID.LINEARGAUGE, {'width': gauge.width, 'height': gauge.height});
            writeBackgroundColor(SYMBOLID.LINEARGAUGE, gauge.backgroundColor);
            writeByAttribute(SYMBOLID.LINEARGAUGE, 'input', 'unit', gauge.unit);
            writeByAttribute(SYMBOLID.LINEARGAUGE, 'input', 'ticks', gauge.ticks);
            writeByAttribute(SYMBOLID.LINEARGAUGE, 'textarea', 'assign-tag', gauge.assignTag);
            writeTagRange(SYMBOLID.LINEARGAUGE, gauge.tagRange);
        },

        updateLinearGaugeSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.LINEARGAUGE, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.LINEARGAUGE).x;
            targetProperties.y = readPositionXY(SYMBOLID.LINEARGAUGE).y;
            targetProperties.width = readSizeRectangle(SYMBOLID.LINEARGAUGE).width;
            targetProperties.height = readSizeRectangle(SYMBOLID.LINEARGAUGE).height;
            targetProperties.backgroundColor = readBackgroundColor(SYMBOLID.LINEARGAUGE);
            targetProperties.unit = readByAttribute(SYMBOLID.LINEARGAUGE, 'input', 'unit');
            targetProperties.ticks = readByAttribute(SYMBOLID.LINEARGAUGE, 'input', 'ticks');
            targetProperties.assignTag = readByAttribute(SYMBOLID.LINEARGAUGE, 'textarea', 'assign-tag');
            targetProperties.tagRange = readTagRange(SYMBOLID.LINEARGAUGE);
            targetProperties.updateSymbol();
        },



        updateRadialClockModal(clock){
            writeBaseModal(SYMBOLID.RADIALCLOCK, clock);
            writePositionXY(SYMBOLID.RADIALCLOCK, {'x': clock.x, 'y': clock.y});
            writeSizeRadius(SYMBOLID.RADIALCLOCK, clock.radius);
        },

        updateRadialClockSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.RADIALCLOCK, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.RADIALCLOCK).x;
            targetProperties.y = readPositionXY(SYMBOLID.RADIALCLOCK).y;
            targetProperties.radius = readSizeRadius(SYMBOLID.RADIALCLOCK);
            targetProperties.updateSymbol();
        },




        updateDigitalClockModal(clock){
            writeBaseModal(SYMBOLID.DIGITALCLOCK, clock);
            writePositionXY(SYMBOLID.DIGITALCLOCK, {'x': clock.x, 'y': clock.y});
            writeSizeRectangle(SYMBOLID.DIGITALCLOCK, {'width': clock.width, 'height': clock.height});
            writeByAttribute(SYMBOLID.DIGITALCLOCK, 'select', 'theme', clock.theme);
        },

        updateDigitalClockSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.DIGITALCLOCK, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.DIGITALCLOCK).x;
            targetProperties.y = readPositionXY(SYMBOLID.DIGITALCLOCK).y;
            targetProperties.width = readSizeRectangle(SYMBOLID.DIGITALCLOCK).width;
            targetProperties.height = readSizeRectangle(SYMBOLID.DIGITALCLOCK).height;
            targetProperties.theme = readByAttribute(SYMBOLID.DIGITALCLOCK, 'select', 'theme');
            targetProperties.updateSymbol();
        },



        updateCameraModal(camera){
            writeBaseModal(SYMBOLID.CAMERA, camera);
            writePositionXY(SYMBOLID.CAMERA, {'x': camera.x, 'y': camera.y});
            writeSizeRectangle(SYMBOLID.CAMERA, {'width': camera.width, 'height': camera.height});
            writeSizeRadius(SYMBOLID.CAMERA, camera.radius);
            writeByAttribute(SYMBOLID.CAMERA, 'textarea', 'rtsp-url', camera.rtspURL);
        },

        updateCameraSymbol(targetId){
            let targetProperties = document.getElementById(targetId).properties;
            updateBaseProperties(SYMBOLID.CAMERA, targetProperties);
            targetProperties.x = readPositionXY(SYMBOLID.CAMERA).x;
            targetProperties.y = readPositionXY(SYMBOLID.CAMERA).y;
            targetProperties.width = readSizeRectangle(SYMBOLID.CAMERA).width;
            targetProperties.height = readSizeRectangle(SYMBOLID.CAMERA).height;
            targetProperties.radius = readSizeRadius(SYMBOLID.CAMERA);
            targetProperties.rtspURL = readByAttribute(SYMBOLID.CAMERA, 'textarea', 'rtsp-url');
            targetProperties.updateSymbol();
        }








    }
})()


export default modalUtil;

