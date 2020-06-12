
function PLC(gatewayId, name, ipAddress, producer, type, protocol, description){
    this.gatewayId = gatewayId;
    this.name = name;
    this.ipAddress = ipAddress;
    this.producer = producer;
    this.type = type;
    this.protocol = protocol;
    this.description = description;
}


PLC.prototype.updateProperties = function(propertiesObj){
    for (let property in propertiesObj){
        if (this.hasOwnProperty(property) && propertiesObj[property]){
            this[property] = propertiesObj[property];
        }
    }
}

module.exports = PLC;