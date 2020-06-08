import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';

export default class Rectangle extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} rectSVG 
     */
    constructor(id, rectSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.radius = 0;
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
        this.SVG = rectSVG;
    }

    setPosition(x, y, rx, ry){
        this.x = x;
        this.y = y;
    }

    setSize(width, height, radius){
        this.width = width;
        this.height = height;
        this.radius = radius;
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
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width  = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateRectModal(this);
    }

    updateSymbol(){

        this.SVG.stroke({
            'width': this.lineWidth,
            'color': this.lineColor,
            'linecap':   this.lineCap,
            'dasharray': modalUtil.calLineStyle(this.lineWidth, this.lineStyle)
        })
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.fill(this.fill);
        this.SVG.radius(this.radius);
        console.log(this)
    }


    
}