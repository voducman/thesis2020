
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