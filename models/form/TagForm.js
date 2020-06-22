
const TagForm = function(tag){

    this.gatewayId     = tag.gatewayId;
    this.plcId         = tag.plcId;
    this.tagId         = tag.tagId;
    this.name          = tag.name;
    this.type          = tag.type;
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
    this.log           = tag.log;
    this.description   = tag.description;
}

TagForm.prototype.isValid = function(){
    let isValid = true;
    if (!this.gatewayId || (!this.plcId && this.type === 'external') || !this.name){
        isValid = false;
        console.log("invalid here 1");
    }

    if (!this.dataType || (!this.memoryAddress && this.type === 'external')){
        isValid = false;
        console.log("invalid here 2");
    }

    return isValid;
}

module.exports = TagForm;