
function Tag(name, scale, offset, min, max, des, unit, memAddrr, dataType, dband, trend, log, alarm){
    this.name = name;
    this.scale = scale;
    this.offset = offset;
    this.minimum = min;
    this.maximum = max;
    this.description = des;
    this.unit = unit; 
    this.memoryAdd = memAddrr;
    this.dataType = dataType;
    this.deadband = (!isNaN(dband))? dband:0;
    this.createdTime = Date.now();

    this.trend = trend;
    this.log = log;
    // Put alarm object here
    this.alarm = alarm;

    this.value = 0;
    this.timeStamp = null;
    // UNCERTAIN, GOOD or BAD
    this.quality = null;

}

module.exports = Tag;