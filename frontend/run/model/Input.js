import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Input extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} inputSVG 
     */
    constructor(id, inputSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.fontSize = '10';
        this.fontWeight = 'normal';
        this.fontFamily = 'inherit';
        this.fontStyle = 'normal';
        this.fontColor = "#111";
        this.borderWidth = 0;
        this.borderRadius = 0;
        this.backgroundColor = 'white';
        this.assignTag = null;
        this.SVG = inputSVG;
    }

    setValue(value){
        this.SVG.node.querySelector('input').value = value;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateInputModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        let input = this.SVG.node.querySelector('input').style;
        input.width = this.width + 'px';
        input.height = this.height + 'px';
        input.borderWidth = this.borderWidth + 'px';
        input.borderRadius = this.borderRadius + 'px';
        input.backgroundColor = this.backgroundColor;
        input.fontSize = this.fontSize + 'px';
        input.fontFamily = this.fontFamily;
        input.fontStyle = this.fontStyle;
        input.fontWeight = this.fontWeight;
        input.color = this.fontColor;
        
        console.log(this);
    }


    
}