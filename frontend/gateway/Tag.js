
function Tag(gatewayId, plcId, name, type, plcAddress, scale, offset, minimum, maximum, 
             dataType, unit, readOnly, memoryAddress, deadBand, alarm, trend, description ){
   this.gatewayId = gatewayId;
   this.plcId = plcId;
   this.name = name;
   this.type = type;
   this.plcAddress = plcAddress;
   this.scale = scale;
   this.offset = offset;
   this.minimum = minimum;
   this.maximum = maximum;
   this.dataType = dataType;
   this.unit = unit;
   this.readOnly = readOnly;
   this.memoryAddress = memoryAddress;
   this.deadBand = deadBand;
   this.alarm = alarm;
   this.trend = trend;
   this.description = description;

}

Tag.prototype.updateProperties = function(propertiesObj){
    for (let property in propertiesObj){
        if (this.hasOwnProperty(property) && propertiesObj[property]){
            this[property] = propertiesObj[property];
        }
    }
}

module.exports = Tag;