import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class Input extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} sliderSVG 
     */
    constructor(id, sliderSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.foregroundColor = 'red';
        this.backgroundColor = 'white';
        this.assignTag = null;
        this.tagRange = {
            'min': 0,
            'max': 100
        }
        this.getValue = function(){

        };
        this.setValue = function(){

        };
        this.onChange = function(value){
            console.log('Value change: ', parseFloat(value) + parseFloat(this.tagRange.min));
        }

        this.changeSliderRange = function(min, max){
            // implemented in elementUtils.js
        }

        this.SVG = sliderSVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateHorSliderModal(this);
        
    }

    updateSymbol(){
        console.log(this);
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        
        this.SVG.node.querySelector('.rs-container .rs-bg').style.width = `${this.width}px`; //
        // Background color
        this.SVG.node.querySelector('.rs-container .rs-bg').style.backgroundColor = this.backgroundColor; //
        this.SVG.node.querySelector('.rs-container .rs-bg').style.height = `${this.height -10}px`; //
        this.SVG.node.querySelector('.rs-container .rs-selected').style.height = `${this.height - 10}px`; //
        // Foreground color
        this.SVG.node.querySelector('.rs-container .rs-selected').style.backgroundColor = this.foregroundColor; //
        this.SVG.node.querySelector('.rs-container .rs-pointer').style.height = `${this.height}px`; //
        this.SVG.node.querySelector('.rs-container').style.width = `${this.width}px`; //
        this.SVG.node.querySelector('.rs-container .rs-bg').style.borderWidth = 0;
        this.SVG.node.querySelector('.rs-container .rs-selected').style.borderWidth = 0;
        
    }

    
    
}