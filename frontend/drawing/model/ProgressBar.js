import BaseSymbol from './BaseSymbol';
import modalUtil  from '../modalUtil';


export default class ProgressBar extends BaseSymbol{

    /**
     * @param {string} id 
     * @param {object} progressSVG 
     */
    constructor(id, progressSVG){
        super(id);
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.radius = 0;
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
            console.log(percent)
            this.SVG.node.querySelector('div.progress-bar').style.width = percent*100 + '%';

            if (this.showPercentage){
                this.SVG.node.querySelector('span').textContent = parseFloat(percent*100).toFixed(2) + '%';
            }else{
                this.SVG.node.querySelector('span').textContent = parseFloat(value).toFixed(2);
            }
        };

        this.SVG = progressSVG;
    }

    updatePosition() {
        this.x = this.SVG.node.getAttribute('x');
        this.y = this.SVG.node.getAttribute('y');
        this.width = this.SVG.node.getAttribute('width');
        this.height = this.SVG.node.getAttribute('height');
    }

    updateModal(){
        this.updatePosition();
        modalUtil.updateProgressBarModal(this);
        
    }

    updateSymbol(){
        
        this.SVG.move(this.x, this.y);
        this.SVG.size(this.width, this.height);
        this.SVG.node.querySelector('div.progress').style.borderRadius = this.radius + 'px';
        this.SVG.node.querySelector('div.progress').style.width = this.width + 'px';
        this.SVG.node.querySelector('div.progress').style.height = this.height + 'px';
        this.SVG.node.querySelector('div.progress').style.backgroundColor = this.backgroundColor;
        this.SVG.node.querySelector('div.progress-bar').style.backgroundColor = this.foregroundColor;
        this.SVG.node.querySelector('span').style.lineHeight = this.height + 'px';

        console.log(this);
    }



}