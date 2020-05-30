import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class DonutChart extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} chartSVG 
     */
    constructor(id, chartSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.radius = undefined;
        this.stringLabels = "Pie 1, Pie 2, Pie 3, Pie 4, Pie 5";
        this.donutWidth = 50;
        this.assignTag1 = null;
        this.assignTag2 = null;
        this.assignTag3 = null;
        this.assignTag4 = null;
        this.assignTag5 = null;
        this.SVG = chartSVG;

        this.updateLabel = function(){
            // Overwrite at runtime
            // check file chartUtil.js
        }

        this.setDonutWidth = function(widht){
            // Overwrite at runtime
            // check file chartUtil.js
        }

        this.pushDatas = function(tag1, tag2, tag3){
            // Overwrite at runtime
            // check file chartUtil.js
        }
    }


    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.radius = this.SVG.node.getAttribute('width')/2;
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateDonutChartModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.radius*2, this.radius*2);
        this.SVG.node.querySelector('div.ct-chart').style.width = this.radius*2 + 'px';
        this.SVG.node.querySelector('div.ct-chart').style.height = this.radius*2 + 'px';
        this.setDonutWidth(this.donutWidth);
        this.updateLabel(this.stringLabels);

        console.log(this);
    }
}