import BaseView from './BaseView';
import {SVG}    from '@svgdotjs/svg.js';
import interact from 'interactjs';
import '@svgdotjs/svg.draggable.js'

class View extends BaseView{
    constructor(width, height){
        super();
        this.whiteBoard = SVG().addTo('#page-1 .col-md-12').size(width, height).id("whiteBoard").css({position: "relative", zIndex: 0})
        //let line = this.whiteBoard.line(0,0,100,100);
        // var foreignObject = this.whiteBoard.foreignObject(100, 20)
        // foreignObject.add(SVG('<input type="text" value="Hello world">')).front();
        
        
    }
}

export default View;