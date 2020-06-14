import {sendAjaxToServer}   from '../utils';
import {renderGatewayTable} from './tableUtil';
import {renderPLCTable}     from './tableUtil';
import {renderTagTable}     from './tableUtil';
import {paginationSetup}    from './tableUtil';
import {getTagFilter}       from './tableUtil';
import {setupFilter}        from './tableUtil';

let tags;

export const fetchGateways = function(gatewayURL){
    sendAjaxToServer(gatewayURL)
    .then(responseForm => {
        if (responseForm.success){
            let gateways = responseForm.getData();
            renderGatewayTable(gateways);
            paginationSetup(gateways.length);
        }
    })
    .catch(e => console.log(e + ''))
}

export const fetchPLCs = function(plcURL){
    sendAjaxToServer(plcURL)
    .then(responseForm => {
        if (responseForm.success){
            let plcs = responseForm.getData();
            renderPLCTable(plcs);
            paginationSetup(plcs.length);
        }
    })
    .catch(e => console.log(e + ''))
}

export const fetchTags = function(tagURL){
    sendAjaxToServer(tagURL)
    .then(responseForm => {
        if (responseForm.success){
            tags = responseForm.getData();
            renderTagTable(tags);
            paginationSetup(tags.length);
            setupFilter(tags);
        }
    })
    .catch(e => console.log(e + ''))
}

export const filterTagTable = function(){
    if (tags){
        let tagAfterFilter, filter = getTagFilter();
        tagAfterFilter = tags.filter((tag) => {
            if (filter.gateway.includes('-1') && filter.plc.includes('-1') && filter.tag.includes('-1')){
                return true;
            }
            else if (filter.gateway.includes('-1') && filter.plc.includes(tag.plcId) && filter.tag.includes('EXTERNAL')){
                return true;
            }
            else if (filter.gateway.includes(tag.gatewayId) && filter.plc.includes('-1') && filter.tag.includes('EXTERNAL')){
                return true
            }
            else if (filter.gateway.includes(tag.gatewayId) && filter.plc.includes(tag.plcId) && filter.tag.includes('-1')){
                return true;
            }
            else if (filter.gateway.includes(tag.gatewayId) && filter.plc.includes(tag.plcId) && filter.tag.includes('-1')){
                return true;
            }
            else if(filter.gateway.includes('-1') && filter.plc.includes('-1') && filter.tag.includes('EXTERNAL')){
                return true;
            }
            else if (filter.gateway.includes('-1') && filter.plc.includes(tag.plcId) && filter.tag.includes('-1')){
                return true;
            }
            else if(filter.gateway.includes(tag.gatewayId) && filter.plc.includes('-1') && filter.tag.includes('-1')){
                return true;
            }
            else if(filter.gateway.includes(tag.gatewayId) && filter.plc.includes(tag.plcId) && filter.tag.includes('EXTERNAL')){
                return true;
            }else if (tag.type == 'internal' && filter.tag.includes('INTERNAL')){
                return true;
            }
            return false;
        })

        return tagAfterFilter;
    }
    return [];
}