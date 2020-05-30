import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class BarChart extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} chartSVG 
     */
    constructor(id, chartSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.low = 0;
        this.high = 10;
        this.maxPoints = 10;
        this.backgroundColor = 'white';
        this.assignTag1 = null;
        this.assignTag2 = null;
        this.assignTag3 = null;
        this.SVG = chartSVG;

        this.changeOptions = function(isSmooth, isArea, low, high){
            // Overwrite at runtime
            // check file chartUtil.js
        };

        this.setMaxPoints = function(maxPoints){
            // Overwrite at runtime
            // check file chartUtil.js
        };

        this.pushDatas = function(tag1, tag2, tag3){
            // Overwrite at runtime
            // check file chartUtil.js
        }
    }


    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateBarChartModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div:first-child').style.width = parseInt(this.width)  + 'px';
        this.SVG.node.querySelector('div:first-child').style.height = parseInt(this.height) - 25 + 'px';
        this.SVG.node.querySelector('div:first-child').style.backgroundColor = this.backgroundColor;
        this.changeOptions(this.isSmooth, this.isArea, this.low, this.high);
       
        console.log(this);
    }
}