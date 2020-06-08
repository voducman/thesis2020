export const RunningExpressionCollection = function(){

    this.moveExp =    []; // all symbols x
    this.hiddenExp =  []; // all synbols x
    this.runExp =     []; // [Button] c.
    this.runOnExp =   []; // [Checkbox | Switch] c.
    this.runOffExp =  []; // [Checkbox | Switch] c.
    this.booleanExp = []; // [SymbolSet] x
    this.onColorExp = []; // [Circle | Ellipse | Line | Pencil | Polygon | Polyline | Rectangele] x
    this.flashExp =   []; // [Circle | Ellipse | Line | Pencil | Polygon | Polyline | Rectangele] x
    this.numericExp = []; // [DisplayValue] x

    this.assignTag =  []; // [BarChart(1-3)| DonutChart(1-5)| HorSlider| Input|
                          // LinearGauge| LineChart(1-3)| PieChart(1-5)| ProgressBar|
                          // RadialGauge| Speedometer| VerSlider]
}

RunningExpressionCollection.prototype.pushMoveExp = function(symbol){
    this.moveExp.push(symbol);
}

RunningExpressionCollection.prototype.pushHiddenExp = function(symbol){
    this.hiddenExp.push(symbol);
}

RunningExpressionCollection.prototype.pushRunExp = function(symbol){
    this.runExp.push(symbol);
}

RunningExpressionCollection.prototype.pushRunOnExp = function(symbol){
    this.runOnExp.push(symbol);
}

RunningExpressionCollection.prototype.pushRunOffExp = function(symbol){
    this.runOffExp.push(symbol);
}

RunningExpressionCollection.prototype.pushBooleanExp = function(symbol){
    this.booleanExp.push(symbol);
}

RunningExpressionCollection.prototype.pushOnColorExp = function(symbol){
    this.onColorExp.push(symbol);
}

RunningExpressionCollection.prototype.pushFlashExp = function(symbol){
    this.flashExp.push(symbol);
}

RunningExpressionCollection.prototype.pushNumericExp = function(symbol){
    this.numericExp.push(symbol);
}

RunningExpressionCollection.prototype.pushAssignTag = function(symbol){
    this.assignTag.push(symbol);
}