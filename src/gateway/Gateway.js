function Gateway(id, name, long, lat, pos, des, scanTime){
    this.id = id;
    this.name = name;
    this.longitude = long;
    this.latitude = lat;
    this.position = pos;
    this.description = des;
    this.scanTime = scanTime;
    this.PLCnum = 0;
    this.Tagnum = 0;
    this.createdTime = Date.now();
    this.modified = Date.now();
    this.status = false;
    this.PLCs = [];

}

Gateway.prototype.updatePLCnTag = function(){
    let tagCount = 0;

    this.PLCnum = this.PLCs.length;

    if (this.PLCs.length > 0){
        this.Tagnum = this.PLCs.forEach(function(plc, index){
            tagCount += plc.Tags.length;
        });
    }
    
}

Gateway.prototype.getPLCByName = function(name){
    let index = this.PLCs.findIndex(function(plc){
        return plc.name == name;
    })

    return this.PLCs[index];
}

Gateway.prototype.getPLCList = function(){
    return this.PLCs.map((plc)=> plc.name);
}

Gateway.prototype.updateModifyTime = function(){
    this.modified = Date.now();
}

Gateway.prototype.updateName = function(name){
    this.name = name;
}

Gateway.prototype.updateLongitude = function(long){
    this.longitude = long;
}

Gateway.prototype.updateLatitude = function(lat){
    this.latitude = lat;
}

Gateway.prototype.updatePosition = function(address){
    this.position = address;
}

Gateway.prototype.updateDescription = function(des){
    this.description = des;
}

Gateway.prototype.updateScantime = function(scantime){
    this.scanTime = scantime;
}

module.exports = Gateway;