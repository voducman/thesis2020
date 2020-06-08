import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class ProgressBar extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} progressSVG 
     */
    constructor(id, progressSVG, isVertical = false){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.radius = 0;
        this.isVertical = isVertical;
        this.showPercentage = true;
        this.foregroundColor = 'green';
        this.backgroundColor = 'white';
        this.assignTag = null;
        this.tagRange = {
            'min': 0,
            'max': 100
        }
        
        this.setValue = function(value){
            value = parseFloat(value);
            let percent;
            if (value <= this.tagRange.min) {
                percent = 0;
            }else if(value >= this.tagRange.max){
                percent = 100;
            }else{
                percent = (value - parseFloat(this.tagRange.min))/(parseFloat(this.tagRange.max) - parseFloat(this.tagRange.min));
            }
          
            if (this.isVertical){
                this.SVG.node.querySelector('div.progress-bar').style.height = percent*100 + '%';
            }else{
                this.SVG.node.querySelector('div.progress-bar').style.width = percent*100 + '%';
            }

            if (this.showPercentage){
                this.SVG.node.querySelector('span').textContent = parseFloat(percent*100).toFixed(1) + '%';
            }else{
                this.SVG.node.querySelector('span').textContent = parseFloat(value).toFixed(1);
            }
        };

        this.SVG = progressSVG;
    }

    updatePosition() {
        this.x = this.SVG.x()
        this.y = this.SVG.y();
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateProgressBarModal(this);
        
    }

    updateSymbol(){

        this.SVG.x(this.x).y(this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div.progress').style.borderRadius = this.radius + 'px';
        this.SVG.node.querySelector('div.progress').style.width = this.width + 'px';
        this.SVG.node.querySelector('div.progress').style.height = this.height + 'px';
        this.SVG.node.querySelector('div.progress').style.backgroundColor = this.backgroundColor;
        this.SVG.node.querySelector('div.progress').style.margin = 0;
        this.SVG.node.querySelector('div.progress-bar').style.backgroundColor = this.foregroundColor;

        console.log(this);
    }



}