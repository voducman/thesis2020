import Gateway from './Gateway';
import PLC     from './PLC';
import Tag     from './Tag';
import initPagigation from './pagigation';
/**
 * @summary function will self-call when render page
 */
const initData = function(){

    $.get({
        url: '/gateway/fetch',
    }).done(function(result){
        console.log('Fetch Success: ', result);
        if (result == false){
            console.log('Fetch error at server');
            return;
        }

        // Update remote data to current data structure
        result.data.external.forEach(function(gw){

            let gateway = new Gateway(gw.id, gw.name, gw.longitude, gw.latitude, gw.position, gw.description, gw.scanTime);
            gateway.createdTime = gw.createdTime;
            gateway.modified    = gw.modified;

            gw.PLCs.forEach(function(plc){
                let plc_ = new PLC(plc.producer, plc.type, plc.name, plc.IPaddrress, plc.protocol, plc.description);
                plc_.createdTime = plc.createdTime;
                plc_.modified    = plc.modified;

                plc.Tags.forEach(function(tg){
                    let tag = new Tag(tg.name, tg.scale, tg.offset, tg.minimum, 
                        tg.maximum, tg.description, tg.unit, tg.memoryAdd,
                        tg.dataType, tg.deadband, tg.trend, tg.log, tg.alarm);
                    tag.createdTime = tg.createdTime;

                    plc_.Tags.push(tag);
                })

                gateway.PLCs.push(plc_);
            })
            data.external.push(gateway);
        })

        result.data.internal.forEach(function(internalTag, index){
            data.internal.push(internalTag);
        })

        console.log('Data is: ', data);
        //function renderRow(gateway, index)
        data.external.forEach(function(gatew, index){
            renderRow(gatew, index+1);
        })

        initPagigation(data.external.length, 'gateway');

    }).fail(function(error){
        console.log('Fetch Fail: ', error);
    })
}


export default initData;