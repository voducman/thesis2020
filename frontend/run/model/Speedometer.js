import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Speedometer extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} gaugeSVG 
     */
    constructor(id, gaugeSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.radius = undefined;
        this.title = "Temperature";
        this.unit = "RPM";
        this.ticks = "-50,-40 ,-30,-20,-10,0,10,20,30,40,50"
        this.assignTag = null;
        this.tagRange = {
            'min': -50,
            'max': 50
        }
        this.SVG = gaugeSVG;

        this.updateOptions = function(title, unit, ticks, min, max, radius){
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
        this.radius = this.SVG.node.getAttribute('width')/2;
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateSpeedometerModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.radius*2, this.radius*2);
        this.SVG.node.querySelector('div:first-child').style.width = this.radius*2 + 'px';
        this.SVG.node.querySelector('div:first-child').style.height = this.radius*2 + 'px';
        this.SVG.node.querySelector('canvas').style.width = this.radius*2 + 'px';
        this.SVG.node.querySelector('canvas').style.height = this.radius*2 + 'px';
        this.updateOptions(this.title, this.unit, this.ticks, this.tagRange.min, this.tagRange.max, this.radius);

        console.log(this);
    }
}