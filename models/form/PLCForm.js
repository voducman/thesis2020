const PLCForm = function(plc){
  
    this.gatewayId   = plc.gatewayId;
    this.name        = plc.name;
    this.ipAddress   = plc.ipAddress;
    this.producer    = plc.producer;
    this.type        = plc.type;
    this.protocol    = plc.protocol;
    this.description = plc.description;
}

PLCForm.prototype.isValid = function(){
    let isValid = true;
    if (!this.gatewayId || !this.name || !this.ipAddress){
        isValid = false;
    }

    if (!this.producer || !this.type || !this.protocol){
        isValid = false;
    }

    return isValid;
}

module.exports = PLCForm;