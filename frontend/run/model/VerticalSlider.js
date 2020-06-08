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
        this.isRun = false;
        this.assignTag = null;
        this.tagRange = {
            'min': 0,
            'max': 100
        }
        this.getValue = function(){
             // Implemented in elementUtils.js
        };
        this.setValue = function(){
             // Implemented in elementUtils.js
        };
        this.onChange = function(value){
             // Implemented in elementUtils.js
             if (this.isRun){
                try{
                    eval(`_pre_${this.assignTag.trim()} = ${this.assignTag.trim()}`);
                    eval(`${this.assignTag.trim()} = parseFloat(value) + parseFloat(this.tagRange.min)`);

                    eval(`
                        if (_pre_${this.assignTag.trim()} !=  ${this.assignTag.trim()}) 
                            tagChanges['${this.assignTag.trim()}'] = ${this.assignTag.trim()};
                        else tagChanges['${this.assignTag.trim()}'] = null;
                    `);
                    
                }catch(e){
                    console.log(e + '');
                }
            }
        }

        this.changeSliderRange = function(min, max){
            // Implemented in elementUtils.js
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
        modalUtil.updateVerSliderModal(this);
        
    }

    updateSymbol(){
        console.log(this);
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        
        this.SVG.node.querySelector(`#child-${this.id}`).style.width = this.width + 'px';
        this.SVG.node.querySelector(`#child-${this.id}`).style.height = this.height + 'px';
        this.SVG.node.querySelector('.noUi-handle').style.width = this.width + 6 + 'px';
        // Foreground color
        this.SVG.node.querySelector('.noUi-connect').style.backgroundColor = this.foregroundColor;
        this.SVG.node.querySelector('.noUi-connect').style.width = this.width + 'px';
        // Background color
        this.SVG.node.querySelector('.noUi-connects').style.backgroundColor = this.backgroundColor;
        this.SVG.node.querySelector('.noUi-connects').style.width = this.width + 'px';
        this.setValue(parseFloat(this.getValue()) + 1)
    }



}