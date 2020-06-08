import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Camera extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} cameraVG 
     */
    constructor(id, cameraVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;   
        this.height = undefined;
        this.radius = 5;
        this.rtspURL = null;
        this.SVG = cameraVG;
    }


    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateCameraModal(this);
    }

    updateSymbol(){
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('video').style.borderRadius = this.radius + 'px';
        console.log(this);
    }
}