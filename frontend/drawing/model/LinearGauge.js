import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class LinearGauge extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} gaugeSVG 
     */
    constructor(id, gaugeSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.unit = "RPM";
        this.ticks = "0,10,20,30,40,50";
        this.backgroundColor = '#e4e4e4';
        this.assignTag = null;
        this.tagRange = {
            'min': 0,
            'max': 100
        }
        this.SVG = gaugeSVG;

        this.updateOptions = function(unit, ticks, min, max, width, height, bgColor){
            // Overwrite at runtime
            // check file chartUtil.js
        }

        this.setValue = function(value){
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
        modalUtil.updateLinearGaugeModal(this);
        
    }

    updateSymbol(){
        console.log(this);
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div:first-child').style.width = this.width + 'px';
        this.SVG.node.querySelector('div:first-child').style.height = this.height + 'px';
        this.SVG.node.querySelector('canvas').style.width = this.width + 'px';
        this.SVG.node.querySelector('canvas').style.height = this.height + 'px';
        
        this.updateOptions(this.unit, this.ticks, this.tagRange.min, this.tagRange.max, this.width, this.height, this.backgroundColor);

        
    }
}