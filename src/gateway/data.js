import Gateway from './Gateway';
import PLC     from './PLC';
import Tag     from './Tag';

window.data = {
    external: [],
    internal: [],

    getGatewayById: function(id){
        let gateway;
        this.external.forEach(function(ele, index){
            if (ele.id == id) gateway = ele;
        });
        
        return gateway;
    },

    isDuplicateGateway: function(name, id){
        let status = false;
        if (data.external.length == 0){
            return false;
        }
    
        data.external.forEach(function(ele, index){
            if (ele.id == id) status = true;
        })
    
        return status; 
    },

    updateGatewayById: function(id, newGateway){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        })
        // id, name, long, lat, addrr, des, scanTime
        this.external[index].updateName(newGateway.name);
        this.external[index].updateLongitude(newGateway.longitude);
        this.external[index].updateLatitude(newGateway.latitude);
        this.external[index].updatePosition(newGateway.position);
        this.external[index].updateDescription(newGateway.description);
        this.external[index].updateScantime(newGateway.scanTime);
        this.external[index].updateModifyTime();

        return [this.external[index], index];
    },

    deleteGatewayById: function(id){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        })
        // Remove element at index
        this.external.splice(index, 1);
        console.log(this.external);
    },

    getListGateway: function(){
        let list = this.external.map((gateway) => {
            gateway.updatePLCnTag();
            return {
                name: `GW: ${gateway.name} [PLC: ${gateway.PLCnum} | Tag: ${gateway.Tagnum}]`,
                latLng: [gateway.latitude, gateway.longitude]      
            }
        })
        console.log(list)
        return list;
    },

    isDuplicatePLC: function(id, newPLC){
        let result = false;

        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        this.external[index].PLCs.forEach(function(plc){
            if (plc.IPaddrress.trim() == newPLC.IPaddrress.trim() || plc.name.trim() == newPLC.name.trim()) result = true;
        })
         
        return result;
    },

    addPLC2GatewayById: function(id, newPLC){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        if (this.isDuplicatePLC(id, newPLC)) return false;
        else {
            this.external[index].PLCs.push(newPLC);
            return true;
        }
        
    },

    updatePLCByNamenId: function(id, name, newPLC){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == name;
        })
  
        this.external[index].PLCs[indexPLC].producer    = newPLC.producer;
        this.external[index].PLCs[indexPLC].type        = newPLC.type;
        this.external[index].PLCs[indexPLC].IPaddrress  = newPLC.IPaddrress;
        this.external[index].PLCs[indexPLC].protocol    = newPLC.protocol;
        this.external[index].PLCs[indexPLC].description = newPLC.description;
        this.external[index].PLCs[indexPLC].modified    = Date.now();

    },

    deletePLCByNamenId: function(id, name){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == id;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == name;
        });

        this.external[index].PLCs.splice(indexPLC, 1);
        return true;
    },

     /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC which include Tag to add
     */
    isDuplicateExternalTag: function(gwId, plcName, tagName){
        console.log(arguments)
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });
        console.log('index: ' + index)
        
        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        console.log('indexPLC: ' + indexPLC)

        if (indexPLC == -1) return false;

        let resutl = data.external[index].PLCs[indexPLC].Tags.findIndex((tag) => tag.name == tagName);
        if (resutl == -1) return false;
        return true;
    },

    addTag2PLCByIdName: function(gwId, plcName, tag){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        if (this.isDuplicateExternalTag(gwId, plcName, tag.name)){
            return false;
        }

        data.external[index].PLCs[indexPLC].Tags.push(tag);
        return true;
    },
    /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC to add tag
     */
    updateTag2PLCByIdName: function(gwId, plcName, newTag){
        let indexGw  = this.external.findIndex((gateway) => gateway.id == gwId);
        let indexPLC = this.external[indexGw].PLCs.findIndex((plc) => plc.name == plcName);
        let indexTag = this.external[indexGw].PLCs[indexPLC].Tags.findIndex((tag) => tag.name == newTag.name);

        if (indexTag == -1) return false;

        let oldTag = this.external[indexGw].PLCs[indexPLC].Tags[indexTag];
        newTag.createdTime = oldTag.createdTime;
        this.external[indexGw].PLCs[indexPLC].Tags.splice(indexTag, 1, newTag);
        return true;
    },

     /**
     * @param {string} gwId: id of gateway which include PLC' name
     * @param {string} plcName: name of PLC to add tag
     * @param {string} tagName: name of Tag to delete
     */
    deleteTagByIdName: function(gwId, plcName, tagName){
        let index = this.external.findIndex(function(gateway){
            return gateway.id == gwId;
        });

        let indexPLC = this.external[index].PLCs.findIndex(function(plc){
            return plc.name == plcName;
        })

        let indexTag = data.external[index].PLCs[indexPLC].Tags.findIndex((tag) => tag.name == tagName);
        data.external[index].PLCs[indexPLC].Tags.splice(indexTag, 1);
    },

    isDuplicateInternalTag: function(tagName){
        if (typeof data.internal.find((tag) => tag.name == tagName) == 'undefined'){
            return false;
        }
        return true;
    },

    addInternalTag: function(tagName, scale, offset, dataType, unit, description){
        if (this.isDuplicateInternalTag()){
            return false;
        }
        data.internal.push({
            name: tagName, scale, offset, dataType, unit, description
        })
        return true;
    },

    updateInternalTag: function(tagName, scale, offset, dataType, unit, description){
        if (!this.isDuplicateInternalTag()) return false;
        let index = data.internal.findIndex((tag)=> tag.name == tagName);
        data.internal.splice(index, 1, {
            tagName, scale, offset, dataType, unit 
        });
    },

    deleteInteralTag: function(tagName){
        let index = data.internal.findIndex((tag)=> tag.name == tagName);
        if (index == -1) return false;
    
        data.internal.splice(index, 1);
        return true;
    },

    getInternalTagByName: function(tagName){
        let index = data.internal.findIndex((tag) => tag.name == tagName);
        if (index == -1) return false;
        return data.internal[index];
    }

};

