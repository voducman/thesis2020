import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class RadialGauge extends BaseSymbol{

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
        this.backgroundColor = 'white';
        this.foregroundColor = 'red';
        this.scale = 1;
        this.label = "RPM";
        this.assignTag = null;
        this.tagRange = {
            'min': 0,
            'max': 100
        }
        this.SVG = gaugeSVG;

        this.updateOptions = function(scale, label, bgColor, fgColor, min, max){
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
        modalUtil.updateRadialGaugeModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div.ct-chart').style.width = this.width + 'px';
        this.SVG.node.querySelector('div.ct-chart').style.height = this.height + 'px';
        this.updateOptions(this.scale, this.label, this.backgroundColor, this.foregroundColor, this.tagRange.min, this.tagRange.max)

        console.log(this);
    }
}