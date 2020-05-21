
const eventUtil = (function(){

    // For basic component
    function showLineProperties(e){
        $('#symbolLine').modal('show');
    };
    
    function showPolylineProperties(e){
        $('#symbolPolyline').modal('show');
    };

    function showEllipseProperties(e){
        $('#symbolEllipse').modal('show');
    }

    function showCircleProperties(e){
        $('#symbolCircle').modal('show');
    }

    function showRectangleProperties(e){
        $('#symbolRectangle').modal('show');
    }

    function showPolygonProperties(e){
        $('#symbolPolygon').modal('show');
    }

    function showTextblockProperties(e){
        $('#symbolTextblock').modal('show');
    }

    function showPencilProperties(e){
        $('#symbolPencil').modal('show');
    }

    function showGraphViewProperties(e){
        $('#symbolGraphView').modal('show');
    }

    // For elements components
    function showDisplayValueProperties(e){
        $('#symbolDisplayValue').modal('show');
    }

    function showButtonProperties(e){
        $('#symbolButton').modal('show');
    }

    function showSwitchProperties(e){
        $('#symbolSwitch').modal('show');
    }


    return {
        assignDbclickToLine(lineRef){
            lineRef.on('dblclick', showLineProperties);
        },

        assingDbclickToPolyline(polylineRef){
            polylineRef.on('dblclick', showPolylineProperties);
        },

        assignDbclickToEllipse(ellipseRef){
            ellipseRef.on('dblclick', showEllipseProperties);
        },

        assignDbclickToCircle(circleRef){
            circleRef.on('dblclick', showCircleProperties);
        },

        assignDbclickToRectangle(rectangleRef){
            rectangleRef.on('dblclick', showRectangleProperties);
        },

        assignDbclickToPolygon(polygonRef){
            polygonRef.on('dblclick', showPolygonProperties);
        },

        assignDbclickToTextblock(textblockRef){
            textblockRef.on('dblclick', showTextblockProperties);
        },

        assignDbclickToPencil(pencilRef){
            pencilRef.on('dblclick', showPencilProperties);
        },

        assignDbclickToGraphView(graphViewRef){
            graphViewRef.on('dblclick', showGraphViewProperties);
        },

        assignDbclickToDisplayValue(displayValueRef){
            displayValueRef.on('dblclick', showDisplayValueProperties);
        },

        assignDbclickToButton(buttonRef){
            buttonRef.on('dblclick', showButtonProperties);
        },

        assignDbclickToSwitch(switchRef){
            switchRef.on('dblclick', showSwitchProperties);
        }
    }
})()

export default eventUtil;