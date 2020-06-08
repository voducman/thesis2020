import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Graphview extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} graphSVG 
     */
    constructor(id, graphSVG){
        super(id);
        this.x = undefined,
        this.y = undefined;
        this.width  = undefined;
        this.height = undefined;
        this.symbolURL = null;
        this.SVG = graphSVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateGraphviewModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        
        if (this.symbolURL == null){
            this.SVG.load('/static/images/default-image.jpg')
        }else{
            this.SVG.load(this.symbolURL);
        } 
    }


    
}