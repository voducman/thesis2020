
const TagForm = function(tag){

    this.gatewayId     = tag.gatewayId;
    this.plcId         = tag.plcId;
    this.name          = tag.name;
    this.type          = tag.type;
    this.plcAddress    = tag.plcAddress;
    this.scale         = tag.scale;
    this.offset        = tag.offset;
    this.minimum       = tag.minimum;
    this.maximum       = tag.maximum;
    this.dataType      = tag.dataType;
    this.unit          = tag.unit;
    this.readOnly      = tag.readOnly;
    this.memoryAddress = tag.memoryAddress;
    this.deadBand      = tag.deadBand;
    this.alarm         = tag.alarm;
    this.trend         = tag.trend;
    this.description   = tag.description;
}

TagForm.prototype.isValid = function(){
    let isValid = true;
    if (!this.gatewayId || !this.plcId || !this.name || !this.type){
        isValid = false;
    }

    if (!this.plcAddress || !this.dataType || !this.readOnly || !this.memoryAddress){
        isValid = false;
    }

    return isValid;
}

module.exports = TagForm;