import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';

export default class Line extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} lineSVG 
     */
    constructor(id, lineSVG){
        super(id);
        this.x1 = undefined;
        this.y1 = undefined;
        this.x2 = undefined;
        this.y2 = undefined;
        this.lineWidth = 2;
        this.lineStyle = 'solid';
        this.lineColor = '#111';
        this.lineCap = 'butt';
        this.onColorExp = null;
        this.animationColor = {
            on: '#8fce00',
            off: '#444'
        };
        this.flashExp = null;
        this.flashOnColor = '#8fce00';
        this.SVG = lineSVG;
    }


    setPosition(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
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
        this.x1 = this.SVG.node.getAttribute('x1');
        this.y1 = this.SVG.node.getAttribute('y1');
        this.x2 = this.SVG.node.getAttribute('x2');
        this.y2 = this.SVG.node.getAttribute('y2');
    }

    updateModal(){
        this.updatePosition();
    }

    updateSymbol(){
        this.SVG.node.setAttribute('x1', this.x1);
        this.SVG.node.setAttribute('y1', this.y1);
        this.SVG.node.setAttribute('x2', this.x2);
        this.SVG.node.setAttribute('y2', this.y2);
        this.SVG.stroke({
            'width': this.lineWidth,
            'color': this.lineColor,
            'linecap':   this.lineCap,
            'dasharray': modalUtil.calLineStyle(this.lineWidth, this.lineStyle)
        })
    }


    
}