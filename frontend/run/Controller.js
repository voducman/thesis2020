import {RunningExpressionCollection} from './form/RunningExpressionCollection';
import {initProcessingRuntime}       from './runtimeUtil';
import View           from './View';
import Model          from './Model';

let controller;                   

class Controller{
    constructor(){
        this.view = {};
        this.model = Model;
    }

    async initDrawingBoard(){
        
        // Step 2: Fetch design data from server
        let designId = View.getDesignId();
        
        try {
            let pageList = await this.model.initDrawingFromServer(designId);          
            // Loop in drawObject to re-render drawing page
            View.renderPageFromOldData(pageList, this);
        }catch(e){
            console.log(e + '');
        }
    }

    initProcessRuntime(){
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
            initProcessingRuntime(runningExpCollection);
    }

}


controller = new Controller();
controller.initDrawingBoard();
setTimeout(function(){
    controller.initProcessRuntime();
}, 1000)









