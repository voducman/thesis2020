import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';

export default class Polyline extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} polylineSVG 
     */
    constructor(id, polylineSVG){
        super(id);
        this.points = null;
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
        this.SVG = polylineSVG;
    }

    setArrayPosition(points){
        this.points = points;
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
        this.points = this.SVG.node.getAttribute('points');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updatePolylineModal(this);
    }

    updateSymbol(){

        this.SVG.stroke({
            'width': this.lineWidth,
            'color': this.lineColor,
            'linecap':   this.lineCap,
            'dasharray': modalUtil.calLineStyle(this.lineWidth, this.lineStyle)
        })
        this.SVG.node.setAttribute('points', this.points);
        this.SVG.fill(this.fill);
    }


    
}