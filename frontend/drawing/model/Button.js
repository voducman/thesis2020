import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Button extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} buttonSVG 
     */
    constructor(id, buttonSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.fontSize = 15;
        this.fontWeight = 'normal';
        this.fontFamily = "inherit";
        this.fontStyle = "normal";
        this.fontColor = 'red';
        this.buttonColor = '#999';
        this.textContent = "button";
        this.runExp = null;
        this.SVG = buttonSVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width  = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateButtonModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        let childBtn = this.SVG.node.querySelector('button').style;
        childBtn.width = this.width + 'px';
        childBtn.height = this.height + 'px';
        childBtn.backgroundColor = this.buttonColor;
        childBtn.fontSize = this.fontSize + 'px';
        childBtn.fontWeight = this.fontWeight;
        childBtn.fontFamily = this.fontFamily;
        childBtn.fontStyle = this.fontStyle;
        childBtn.color = this.fontColor;
        this.SVG.node.querySelector('button').textContent = this.textContent;
        console.log(this);
    }


    
}