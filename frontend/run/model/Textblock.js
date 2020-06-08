import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';

export default class Textblock extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} textblockSVG 
     */
    constructor(id,textblockSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.fontSize = 20;
        this.fontWeight = 'normal';
        this.fontFamily = "inherit";
        this.fontStyle = "normal";
        this.fontColor = '#111';
        this.textContent = 'Textblock';
        this.SVG = textblockSVG;
    }


    updatePosition(){
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.fontSize = this.SVG.node.getAttribute('font-size');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateTextblockModal(this);
    }

    updateSymbol(){ 
        this.SVG.font({
            'size': this.fontSize,
            'style': this.fontStyle,
            'weight': this.fontWeight,
            'family': this.fontFamily
        })
        this.SVG.fill(this.fontColor);
        this.SVG.node.setAttribute('x', this.x);
        this.SVG.node.setAttribute('y', this.y);
        this.SVG.text(this.textContent);
        console.log(this);
    }


    
}