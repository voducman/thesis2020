import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class RadialClock extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} clockSVG 
     */
    constructor(id, clockSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.radius = undefined;   
        this.SVG = clockSVG;
    }


    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.radius = this.SVG.node.getAttribute('width')/2;
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateRadialClockModal(this);
        
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.radius*2, this.radius*2);
        this.SVG.node.querySelector('canvas').style.width = this.radius*2 + 'px';
        this.SVG.node.querySelector('canvas').style.height = this.radius*2 + 'px';
        
        console.log(this);
    }
}