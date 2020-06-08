import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class SymbolSet extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} symbolSVG 
     */
    constructor(id, symbolSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.onSymbolURL = null;
        this.offSymbolURL = null;
        this.booleanExp = null;
        this.SVG = symbolSVG;
    }

    switchOnSymbol(){
        this.SVG.node.querySelector('img.on').style.display = 'block';
        this.SVG.node.querySelector('img.off').style.display = 'none';
    }

    switchOffSymbol(){
        this.SVG.node.querySelector('img.on').style.display = 'none';
        this.SVG.node.querySelector('img.off').style.display = 'block';
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateSymbolSetModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('img.off').src = this.offSymbolURL;
        this.SVG.node.querySelector('img.on').src  = this.onSymbolURL;
        console.log(this); 
    }



}