
const eventUtil = (function(){

    // For basic component
    function showLineProperties(e){

        let line = e.target.closest('line').properties;
        line.updateModal();
        line = null;
        $('#symbolLine').modal('show');
    };
    
    function showPolylineProperties(e){
        let polyline = e.target.closest('polyline').properties;
        polyline.updateModal();
        polyline = null;
        $('#symbolPolyline').modal('show');
    };

    function showEllipseProperties(e){
        let ellipse = e.target.closest('ellipse').properties;
        ellipse.updateModal();
        ellipse = null;
        $('#symbolEllipse').modal('show');
    }

    function showCircleProperties(e){
        let circle = e.target.closest('circle').properties;
        circle.updateModal();
        circle = null;
        $('#symbolCircle').modal('show');
    }

    function showRectangleProperties(e){
        let rect = e.target.closest('rect').properties;
        rect.updateModal();
        rect = null;
        $('#symbolRectangle').modal('show');
    }

    function showPolygonProperties(e){
        let polygon = e.target.closest('polygon').properties;
        polygon.updateModal();
        polygon = null;
        $('#symbolPolygon').modal('show');
    }

    function showTextblockProperties(e){
        let textblock = e.target.closest('text').properties;
        textblock.updateModal();
        textblock = null;
        $('#symbolTextblock').modal('show');
    }

    function showPencilProperties(e){
        let pencil = e.target.closest('polyline').properties;
        pencil.updateModal();
        pencil = null;
        $('#symbolPencil').modal('show');
    }

    function showGraphViewProperties(e){
        let graphview = e.target.closest('image').properties;
        graphview.updateModal();
        graphview = null;
        $('#symbolGraphView').modal('show');
    }

    // For elements components
    function showDisplayValueProperties(e){
        let display = e.target.closest('text').properties;
        display.updateModal();
        display = null;
        $('#symbolDisplayValue').modal('show');
    }

    function showButtonProperties(e){
        let button = e.target.closest('foreignObject').properties;
        button.updateModal();
        button = null;
        $('#symbolButton').modal('show');
    }

    function showSwitchProperties(e){
        let $switch = e.target.closest('foreignObject').properties;
        $switch.updateModal();
        $switch = null;
        $('#symbolSwitch').modal('show');
    }

    function showInputProperties(e){
        let input = e.target.closest('foreignObject').properties;
        input.updateModal();
        input = null;
        $('#symbolInput').modal('show');
    }

    function showHorizontalSliderProperties(e){
        let hslider = e.target.closest('foreignObject').properties;
        hslider.updateModal();
        hslider = null;
        $('#symbolHorizontalSlider').modal('show');
    }

    function showVerticalSliderProperties(e){
        let vslider = e.target.closest('foreignObject').properties;
        vslider.updateModal();
        vslider = null;
        $('#symbolVerticalSlider').modal('show');
    }

    function showProgressBarProperties(e){
        let progress = e.target.closest('foreignObject').properties;
        progress.updateModal();
        progress = null;
        $('#symbolProgressBar').modal('show');
    }

    function showCheckboxProperties(e){
        let checkbox = e.target.closest('foreignObject').properties;
        checkbox.updateModal();
        checkbox = null;
        $('#symbolCheckbox').modal('show');
    }

    function showSymbolSetProperties(e){
        let symbolSet = e.target.closest('foreignObject').properties;
        symbolSet.updateModal();
        symbolSet = null;
        $('#symbolSet').modal('show');
    }

    function showLineChartProperties(e){
        let lineChart = e.target.closest('foreignObject').properties;
        lineChart.updateModal();
        lineChart = null;
        $('#symbolLineChart').modal('show');
    }

    function showBarChartProperties(e){
        let barChart = e.target.closest('foreignObject').properties;
        barChart.updateModal();
        barChart = null;
        $('#symbolBarChart').modal('show');
    }

    function showPieChartProperties(e){
        let pieChart = e.target.closest('foreignObject').properties;
        pieChart.updateModal();
        pieChart = null;
        $('#symbolPieChart').modal('show');
    }

    function showDonutChartProperties(e){
        let donutChart = e.target.closest('foreignObject').properties;
        donutChart.updateModal();
        donutChart = null;
        $('#symbolDonutChart').modal('show');
    }

    function showRadialGaugeProperties(e){
        let radialGauge = e.target.closest('foreignObject').properties;
        radialGauge.updateModal();
        radialGauge = null;
        $('#symbolRadialGauge').modal('show');
    }

    function showSpeedometerProperties(e){
        let speedometer = e.target.closest('foreignObject').properties;
        speedometer.updateModal();
        speedometer = null;
        $('#symbolSpeedometer').modal('show');
    }

    function showLinearGaugeProperties(e){
        let linearGauge = e.target.closest('foreignObject').properties;
        linearGauge.updateModal();
        linearGauge = null;
        $('#symbolLinearGauge').modal('show');
    }


    function showRadialClockProperties(e){
        let clock = e.target.closest('foreignObject').properties;
        clock.updateModal();
        clock = null;
        $('#symbolRadialClock').modal('show');
    }

    function showDigitalClockProperties(e){
        let clock = e.target.closest('foreignObject').properties;
        clock.updateModal();
        clock = null;
        $('#symbolDigitalClock').modal('show');
    }

    function showCameraProperties(e){
        let camera = e.target.closest('foreignObject').properties;
        camera.updateModal();
        camera = null;
        $('#symbolCamera').modal('show');
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
        },

        assignDbclickToInput(inputRef){
            inputRef.on('dblclick', showInputProperties);
        },

        assignDbclickToHoriSlider(hSliderRef){
            hSliderRef.on('dblclick', showHorizontalSliderProperties);
        },

        assignDbclickToVerSlider(vSliderRef){
            vSliderRef.on('dblclick', showVerticalSliderProperties);
        },

        assignDbclickToProgressBar(progressBarRef){
            progressBarRef.on('dblclick', showProgressBarProperties);
        },

        assignDbclickToCheckbox(checkboxRef){
            checkboxRef.on('dblclick', showCheckboxProperties);
        },

        assignDbclickToSymbolSet(symbolRef){
            symbolRef.on('dblclick', showSymbolSetProperties);
        },

        assignDbclickToLineChart(lineChartRef){
            lineChartRef.on('dblclick', showLineChartProperties);
        },

        assignDbclickToBarChart(barChartRef){
            barChartRef.on('dblclick', showBarChartProperties);
        },

        assignDbclickToPieChart(pieChartRef){
            pieChartRef.on('dblclick', showPieChartProperties);
        },

        assignDbclickToDonutChart(donutChartRef){
            donutChartRef.on('dblclick', showDonutChartProperties);
        },

        assignDbclickToRadialGauge(radialGaugeRef){
            radialGaugeRef.on('dblclick', showRadialGaugeProperties);
        },

        assignDbclickToSpeedometer(speedRef){
            speedRef.on('dblclick', showSpeedometerProperties);
        },

        assignDbclickToLinearGauge(linearGaugeRef){
            linearGaugeRef.on('dblclick', showLinearGaugeProperties);
        },

        assignDbclickToTable(tableRef){
            tableRef.on('dblclick', showTableProperties);
        },

        assignDbclickToRadialClock(clockRef){
            clockRef.on('dblclick', showRadialClockProperties);
        },

        assignDbclickToDigitalClock(clockRef){
            clockRef.on('dblclick', showDigitalClockProperties);
        },

        assignDbclockToCalendar(calendarRef){
            calendarRef.on('dblclock', showCalendarProperties);
        },

        assignDbclickToCamera(cameraRef){
            cameraRef.on('dblclick', showCameraProperties);
        }


    }
})()

export default eventUtil;