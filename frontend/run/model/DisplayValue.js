import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class DisplayValue extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} displaySVG 
     */
    constructor(id, displaySVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.fontSize = 20;
        this.fontWeight = 'normal';
        this.fontFamily = "inherit";
        this.fontStyle = "normal";
        this.fontColor = '#111';
        this.format = '####.##';
        this.numericExp = null;
        this.SVG = displaySVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateDisplayValueModal(this);
    }

    updateSymbol(){
        this.SVG.font({
            'size':   this.fontSize,
            'style':  this.fontStyle,
            'weight': this.fontWeight,
            'family': this.fontFamily
        })
        this.SVG.fill(this.fontColor);
        this.SVG.node.setAttribute('x', this.x);
        this.SVG.node.setAttribute('y', this.y);
        this.SVG.text(this.format);
        console.log(this);
    }


    
}