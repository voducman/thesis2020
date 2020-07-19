const BaseDAO = require("./BaseDAO");
const PlcDAO  = require("./PlcDAO");
const TagDAO  = require("./TagDAO");
const Gateway = require("../Gateway");
const PLC     = require("../PLC");
const Tag     = require("../Tag");

module.exports = class GatewayDAO extends BaseDAO{
    
    constructor(){
        super(Gateway);
        this.plcDAO = new PlcDAO();
        this.tagDAO = new TagDAO();
    }

    async getGatewayByEmailnUniqueId(email, uniqueId){
        
        let searchObj = {email, uniqueId};
        try{
            return await this.findOneByObject(searchObj);
        }catch(e){
            return Promise.reject(null);
        }
    }

    async getPlcById(plcId){

        try{
            return await this.plcDAO.findOneById(plcId);
        }catch(e){
            return Promise.reject(null);
        }
    }

    async getPlcByIpAddress(ipAddress){
        try{
            return await this.plcDAO.findOneByObject({ipAddress})
        }catch(e){
            return Promise.reject(null);
        }
    }

    async getTagByGatewayIdnPlcIdnTagName(gatewayId, plcId, name){
        try{
            let searchObj
            if (plcId){
                // External tag
                searchObj = {gatewayId, plcId, name}; 
            }else{
                // Internal tag
                searchObj = {gatewayId, name, 'type': 'internal'};
            }
            return await this.tagDAO.findOneByObject(searchObj);
        }catch(e){
            return Promise.reject(null);
        }
       
    }

    async getTagById(tagId){
        try{
            return await this.tagDAO.findOneById(tagId);
        }catch(e){
            return Promise.reject(null);
        }
    }

    createNewGateway(gatewayForm){
        let gateway = new Gateway({
            'email':       gatewayForm.email,
            'uniqueId':    gatewayForm.uniqueId,
            'name':        gatewayForm.name,
            'address':     gatewayForm.address,
            'scanTime':    gatewayForm.scanTime,
            'longitude':  gatewayForm.longitude,
            'latitude':    gatewayForm.latitude,
            'description': gatewayForm.description,
        })

        return new Promise((resolve, reject) => {
            gateway.save()
            .then(() => {
                return Gateway.find({'email': gatewayForm.email})
            })
            .then(gateways => {
                return resolve(gateways);
            })
            .catch(e => reject(null))
        })
    }

    createNewPlc(plcForm){
        let plc = new PLC({
            'gatewayId':   plcForm.gatewayId,
            'name':        plcForm.name,
            'ipAddress':   plcForm.ipAddress,
            'producer':    plcForm.producer,
            'type':        plcForm.type,
            'protocol':    plcForm.protocol,
            'description': plcForm.description
        })

        return new Promise((resolve, reject) => {
            plc.save()
            .then(() => {
                return PLC.find({'gatewayId': plcForm.gatewayId})
            })
            .then(plcs => {
                return resolve(plcs);
            })
            .catch(e => reject(null))
        })
    }

    createNewTag(tagForm) {
        let tag = new Tag({
            'gatewayId':     tagForm.gatewayId,
            'plcId':         tagForm.plcId,
            'name':          tagForm.name,
            'type':          tagForm.type,
            'plcAddress':    tagForm.plcAddress,
            'scale':         tagForm.scale,
            'offset':        tagForm.offset,
            'minimum':       tagForm.minimum,
            'maximum':       tagForm.maximum,
            'dataType':      tagForm.dataType,
            'unit':          tagForm.unit,
            'readOnly':      tagForm.readOnly,
            'memoryAddress': tagForm.memoryAddress,
            'deadBand':      tagForm.deadBand,
            'alarm':         tagForm.alarm,
            'log':           tagForm.log,
            'description':   tagForm.description
        })

        return new Promise((resolve, reject) => {
            tag.save()
            .then(() => {
                return Tag.find({'gatewayId': tagForm.gatewayId})
            })
            .then(tags => {
                return resolve(tags);
            })
            .catch(e => reject(null))
        })
    }

    updateGateway(gateway, gatewayForm){
        gateway.name         = gatewayForm.name;
        gateway.address      = gatewayForm.address;
        gateway.scanTime     = gatewayForm.scanTime;
        gateway.longitude    = gatewayForm.longitude;
        gateway.latitude     = gatewayForm.latitude;
        gateway.description  = gatewayForm.description;
        gateway.lastModified = Date.now();

        return new Promise((resolve, reject) => {
            gateway.save()
            .then(() => {
                return Gateway.find({'email': gatewayForm.email})
            })
            .then(gateways => {
                return resolve(gateways);
            })
            .catch(e => reject(null))
        })
    }

    updatePlc(plc, plcForm){
        plc.gatewayId    = plcForm.gatewayId;
        plc.name         = plcForm.name;
        plc.ipAddress    = plcForm.ipAddress;
        plc.producer     = plcForm.producer;
        plc.type         = plcForm.type;
        plc.protocol     = plcForm.protocol;
        plc.description  = plcForm.description;
        plc.lastModified = Date.now();

        return new Promise((resolve, reject) => {
            plc.save()
            .then(() => {
                return PLC.find({'gatewayId': plcForm.gatewayId});
            })
            .then(plcs => {
                return resolve(plcs);
            })
            .catch(e => reject(null))
        })
    }

    updateTag(tag, tagForm){
        tag.gatewayId     = tagForm.gatewayId;
        tag.plcId         = tagForm.plcId;
        tag.name          = tagForm.name;
        tag.type          = tagForm.type;
        tag.plcAddress    = tagForm.plcAddress;
        tag.scale         = tagForm.scale;
        tag.offset        = tagForm.offset;
        tag.minimum       = tagForm.minimum;
        tag.maximum       = tagForm.maximum;
        tag.dataType      = tagForm.dataType;
        tag.unit          = tagForm.unit;
        tag.readOnly      = tagForm.readOnly;
        tag.memoryAddress = tagForm.memoryAddress;
        tag.deadBand      = tagForm.deadBand;
        tag.alarm         = tagForm.alarm;
        tag.log           = tagForm.log;
        tag.description   = tagForm.description;
        tag.lastModified  = Date.now();
        
        return new Promise((resolve, reject) => {
            tag.save()
            .then(() => {
                return Tag.find({'gatewayId': tagForm.gatewayId})
            })
            .then(tags => {
                return resolve(tags);
            })
            .catch(e => reject(null))
        })
    }

    async deleteGatewayByUniqueId(uniqueId, email){

       try{
        await this.deleteOneByKeynValue('uniqueId', uniqueId);
        await this.plcDAO.deleteManyByKeynValue('gatewayId', uniqueId);
        await this.tagDAO.deleteManyByKeynValue('gatewayId', uniqueId);

        let gateways = await Gateway.find({'email': email});
        console.log(gateways)
        return gateways;
       }catch(e){
           return Promise.reject(null);
       }
        
    }

    async deletePLCById(gatewayId, plcId){
        
        try{
            await this.plcDAO.deleteOneByKeynValue('_id', plcId);
            await this.tagDAO.deleteManyByObject({plcId});

            let plcs =  await PLC.find({gatewayId});
            return plcs;
           }catch(e){
               return Promise.reject(false);
           }
    }

    async deleteTagById(gatewayId, tagId){

        try{
            await this.tagDAO.deleteOneByKeynValue('_id', tagId);
            
            let tags = await Tag.find({gatewayId});
            return tags;
           }catch(e){
               return Promise.reject(false);
           }
    }

    async countTotalPLCnTag(gatewayId){
        try {
            let totalPlc = await this.plcDAO.countDocumentsByObject({ gatewayId });
            let totalTag = await this.tagDAO.countDocumentsByObject({ gatewayId });
            return {totalPlc, totalTag};
        }catch(e){
            return Promise.reject(null);
        }
    }

   async getAllPLCofUser(email){
       try{
            let plcs = [];
            let gateways = await this.findManyByObject({email});
            for (let i = 0; i < gateways.length; i++){
                let gateway = gateways[i];
                let plc = await this.plcDAO.findManyByObject({'gatewayId': gateway.uniqueId});
                plcs.push(...plc);
            }
            return plcs;
       }catch(e){
            return Promise.reject(null);
        }
   }

    async getAllTagofUser(email) {
        try {
            let tags = [];
            let gateways = await this.findManyByObject({ email });
            for (let i = 0; i < gateways.length; i++) {
                let gateway = gateways[i];
                let tag = await this.tagDAO.findManyByObject({ 'gatewayId': gateway.uniqueId });
                tags.push(...tag);
            }
            return tags;
        } catch (e) {
            return Promise.reject(null);
        }

    }


    async getAllTagofUserV2(email) {
        try {
            let totalTags = [];
            let gateways = await this.findManyByObject({ email });

            for (let i = 0; i < gateways.length; i++) {
                let gateway = gateways[i];
                let plcs = await this.plcDAO.findManyByObject({'gatewayId': gateway.uniqueId});

                for (let k = 0; k < plcs.length; k++){
                    let plc = plcs[k], tag;
                    let tags = await this.tagDAO.findManyByObject({ 'plcId': plc['_id'] });

                    for (let m = 0; m < tags.length; m++){
                       tag = tags[m];
                       tag.name = gateway.name + '_' + plc.name + '_' + tag.name;
                       totalTags.push(tag);
                    }
                }
            }

            return totalTags;
        } catch (e) {
            return Promise.reject(null);
        }

    }

    async fetchGatewayConfig(gatewayId){
        try{
            let gateway = await this.findOneByKeynValue('uniqueId', gatewayId);
            let plcs    = await this.plcDAO.findManyByObject({gatewayId});
            let tags    = await this.tagDAO.findManyByObject({gatewayId});
            return {gateway, plcs, tags};
        }catch(e){
            return Promise.reject(null);
        }
    }

}
