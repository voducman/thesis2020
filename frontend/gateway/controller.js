import dataContainer   from './dataContainer';
import eventController from './globalEventController';


function initGatewayPage(){

    let eventHandler = eventController(dataContainer);
    dataContainer.initGatewayData();
    eventHandler.addEventGlobalFunction();
}

initGatewayPage();