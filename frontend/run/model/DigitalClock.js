import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class DigitalClock extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} clockSVG 
     */
    constructor(id, clockSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;   
        this.height = undefined;
        this.theme = 'dark';
        this.SVG = clockSVG;
    }


    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateDigitalClockModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div.digital-clock').classList.remove('dark', 'light');
        this.SVG.node.querySelector('div.digital-clock').classList.add(this.theme);
        console.log(this);
    }
}