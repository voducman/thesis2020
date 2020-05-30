import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';

export default class Circle extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} circleSVG 
     */
    constructor(id, circleSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.r = undefined;
        this.lineWidth = 2;
        this.lineStyle = 'solid';
        this.lineColor = '#111';
        this.lineCap = 'butt';
        this.fill = 'none';
        this.onColorExp = null;
        this.animationColor = {
            on: '#8fce00',
            off: '#444'
        };
        this.flashExp = null;
        this.flashOnColor = '#8fce00';
        this.SVG = circleSVG;
    }

    setPosition(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    setLineStyle(width, style, color, cap){
        this.lineWidth = width;
        this.lineStyle = style;
        this.lineColor = color;
        this.lineCap = cap;
    }

    setOnOffColor(onColorExp, onColor, offColor){
        this.onColorExp = onColorExp;
        this.onColor = onColor;
        this.offColor = offColor;
    }

    setFlash(flashExp, flashOnColor){
        this.flashExp = flashExp;
        this.flashOnColor = flashOnColor;
    }

    updatePosition(){
        this.x = this.SVG.node.getAttribute('cx');
        this.y = this.SVG.node.getAttribute('cy');
        this.r = this.SVG.node.getAttribute('r');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateCircleModal(this);
    }

    updateSymbol(){

        this.SVG.stroke({
            'width': this.lineWidth,
            'color': this.lineColor,
            'linecap':   this.lineCap,
            'dasharray': modalUtil.calLineStyle(this.lineWidth, this.lineStyle)
        })
        this.SVG.cx(this.x).cy(this.y);
        console.log(this);
        this.SVG.radius(this.r);
        this.SVG.fill(this.fill);
    }


    
}