function Gateway(email, uniqueId, name, address, scanTime, longitude, latitude, description){
    this.email = email;
    this.uniqueId = uniqueId;
    this.name = name;
    this.address = address;
    this.scanTime = scanTime;
    this.longitude = longitude;
    this.latitude = latitude;
    this.description = description;
}

Gateway.prototype.updateProperties = function(propertiesObj){
    for (let property in propertiesObj){
        if (this.hasOwnProperty(property) && propertiesObj[property]){
            this[property] = propertiesObj[property];
        }
    }
}

module.exports = Gateway;