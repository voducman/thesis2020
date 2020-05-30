import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Checkbox extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} checkboxSVG 
     */
    constructor(id, checkboxSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.runOnExp = null;
        this.runOffExp = null;
        this.SVG = checkboxSVG;
    }

    setCheck(isCheck){
        if (isCheck){
            this.SVG.node.querySelector('input').checked = true;
        }else{
            this.SVG.node.querySelector('input').checked = false;
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
        modalUtil.updateCheckboxModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('input').style.width = this.width + 'px';
        this.SVG.node.querySelector('input').style.height = this.height + 'px';
        
        console.log(this);
    }



}