const GatewayForm = function(gw){
  
    this.email       = gw.email;
    this.uniqueId    = gw.uniqueId;
    this.name        = gw.name;
    this.address     = gw.address;
    this.scanTime    = gw.scanTime;
    this.longitude   = gw.longitude;
    this.latitude    = gw.latitude;
    this.description = gw.description;
  
}

GatewayForm.prototype.isValid = function(){
    let isValid = true;
    if (!this.uniqueId || !this.name || !this.scanTime){
        isValid = false;
    }
    return isValid;
}

module.exports = GatewayForm;