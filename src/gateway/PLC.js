
function PLC(producer, type, name, IPaddrr, protocol, des){
    this.producer = producer;
    this.type = type;
    this.name = name;
    this.IPaddrress = IPaddrr;
    this.protocol = protocol;
    this.description = des;
    this.Tags = [];
    this.modified = Date.now();
    this.createdTime = Date.now();
}

PLC.prototype.getTagByName = function(tagName){
    let index = this.Tags.findIndex((tag) => tag.name == tagName);
    if (index == -1) return false;
    return this.Tags[index];
}

module.exports = PLC;