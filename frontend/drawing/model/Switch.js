import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Switch extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} switchSVG 
     */
    constructor(id, switchSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.labelBefore = "OFF";
        this.labelAfter = "ON";
        this.runOnExp = null;
        this.runOffExp = null;
        this.SVG = switchSVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateSwitchModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.node.querySelector('span.before-text').textContent = this.labelBefore;
        this.SVG.node.querySelector('span.after-text').textContent = this.labelAfter;
        
        console.log(this);
    }


    
}