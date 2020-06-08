import numeral from 'numeral';

export default class BaseSymbol{
    constructor(id){
        this.id = id;
        this.degree = 0;
        this.order = 1;
        this.dragDesign = true;
        this.dragRun = false;
        this.moveExp = null;
        this.range = {min: 0, max: 100};
        this.offsetHor = 0;
        this.offsetVer = 0;
        this.hiddenExp = null;
        this.description = "";
        this.tooltip = "";
        this.security = null;
    }

    /**
     * Get only properties of symbols and push them
     * onto a object to parse by JSON.stringify after
     */
    parseOnlyProperties(){
        let result = {};
        Object.getOwnPropertyNames(this).forEach((key) => {
            if (key == 'SVG') return;
            result[key] = Object.getOwnPropertyDescriptor(this, key).value;
        })

        return result;
    }

    /**
     * Parse data from Json format and initital all symbol objects
     * @param {object} symbolData - only properties data of each symbol
     */
    initOnlyProperties(symbolData){
        Object.getOwnPropertyNames(symbolData).forEach((key) => {
            if (this.hasOwnProperty(key)){
                this[key] = symbolData[key];
            }
        })

    }

    /**
     * Do movement action when receive value change
     * Difference for Line | Polyline | other symbols
     * @param {number} valueAfterValidate 
     */
    moveAfterValidateExp(valueAfterValidate){
        if (parseFloat(this.range.max) - parseFloat(this.range.min) == 0) return;
        if (this.SVG){

            let value = valueAfterValidate;
            if (valueAfterValidate > this.range.max) value = this.range.max;
            if (valueAfterValidate < this.range.min) value = this.range.min;
            // offsetX = kx*value + ax; offsetY = ky*value + ay;
            const kx = (parseFloat(this.offsetHor) - 0) / (parseFloat(this.range.max) - parseFloat(this.range.min));
            const ky = (parseFloat(this.offsetVer) - 0) / (parseFloat(this.range.max) - parseFloat(this.range.min));
            const ax = -kx * this.range.min, ay = -ky * this.range.min;

            if (this.hasOwnProperty('x')) { // Common symbols
                // Caculate position offset of x & y
                let x = kx * value + ax + parseFloat(this.x);
                let y = ky * value + ay + parseFloat(this.y);
 
                if (!isNaN(x)) this.SVG.x(x);
                if (!isNaN(y)) this.SVG.y(y);
                console.log('call common move')
                return;
            }
        

            if (this.hasOwnProperty('x1')){  // Line symbol
                let x1 = kx * value + ax + parseFloat(this.x1);
                let x2 = kx * value + ax + parseFloat(this.x2);
                let y1 = ky * value + ay + parseFloat(this.y1);
                let y2 = ky * value + ay + parseFloat(this.y2);
                if (!isNaN(x1) && !isNaN(x2)) this.SVG.attr({x1, x2});
                if (!isNaN(y1) && !isNaN(y2)) this.SVG.attr({y1, y2});
                console.log('call line move')
                return;
            }

            if (this.hasOwnProperty('points')){  // Polyline, Polygon & Pencil
                let points = this.points.replace(/\s/g, ',').split(',');

                for (let i = 0; i < points.length; i += 2){
                    points[i]   = kx * value + ax + parseFloat(points[i]);
                    points[i+1] = ky * value + ay + parseFloat(points[i+1]);
                }

                this.SVG.node.setAttribute('points', points.join(','));
                console.log('call polyline move')
                return;
            }

            
        }
    }

    /**
     * Do hidden action when receive result of
     * validate hidden expression
     * @param {boolean} valueAfterValidate 
     */
    hiddenAfterValidateExp(valueAfterValidate){
        const value = Boolean(valueAfterValidate);
        if (value){
            this.SVG.css('display', 'none');
        }else{
            this.SVG.css('display', 'initial');
        }
    }

    /**
     *  Do change action (show on/off symbol) 
     * when receive result of validate boolean expression
     * @param {boolean} valueAfterValidate 
     */
    chageSymbolSetAfterValidateExp(valueAfterValidate){
        const value = Boolean(valueAfterValidate);
        if (value){
            this.switchOnSymbol();
        }else{
            this.switchOffSymbol();
        }
    }

    /**
     *  Do change color action (show on/off color) 
     * when receive result of validate onColor expression
     * @param {boolean} valueAfterValidate 
     */
    changeColorAfterValidateExp(valueAfterValidate){
        const value = Boolean(valueAfterValidate);
        if (value){
            this.SVG.stroke({color: this.animationColor.on}).fill(this.animationColor.on);
        }else{
            this.SVG.stroke({color: this.animationColor.off}).fill(this.animationColor.off);
        }
    }

     /**
     *  Do change color action (show on/off color) 
     * when receive result of validate onColor expression
     * @param {boolean} valueAfterValidate 
     */
    flashAfterValidateExp(valueAfterValidate){
        const value = Boolean(valueAfterValidate);
        let intervalId;
        if (value){
            this.SVG.stroke({color: '#5ee44b'}).fill('#5ee44b');
            setTimeout(() => {
                this.SVG.stroke({color: this.lineColor}).fill(this.fill);
            }, 500)
           
        }else{
            this.SVG.stroke({color: this.lineColor}).fill(this.fill);
        }
    }

    showValueAfterValidateExp(valueAfterValidateNumeric){
        
        let format = this.format.replace(/#/g,'0');
        let num = numeral(valueAfterValidateNumeric).format(format);
        this.SVG.text(num);
    }

    /**
     * @param {number} degree - rang [-180, 180]
     * @param {number} order - rane [1, 10]
     * @param {boolean} dragDesign 
     * @param {boolean} dragRun 
     */
    setBaseAppearance(degree, order, dragDesign, dragRun){
        this.degree = degree;
        this.order = order;
        this.dragDesign = dragDesign;
        this.dragRun = dragRun;
    }

    /** 
     * @param {string} moveExp 
     * @param {object} rang - {min, max}
     * @param {number} offsetHor - offset horizontal of symbol when tag get max value in rang
     * @param {number} offsetVer - offset vertical of symbol when tag get max value in rang
     */
    setBaseMovement(moveExp, rang, offsetHor, offsetVer){
        this.moveExp = moveExp;
        this.rang = rang;
        this.offsetHor = offsetHor;
        this.offsetVer = offsetVer;
    }


    /**
     * @param {string} hiddenExp 
     */
    setBaseAnimation(hiddenExp){
        this.hiddenExp = hiddenExp;
    }

    /**
     * @param {string} description 
     * @param {string} tooltip 
     * @param {number} security - rang [0 - 8]
     */
    setBaseAccess(description, tooltip, security){
        this.description = description;
        this.tooltip = tooltip;
        this.security = security;
    }
}