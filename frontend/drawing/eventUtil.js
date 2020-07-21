import cloneDeep from 'lodash.clonedeep';

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
            lineRef.on('contextmenu', openContextMenu);
        },

        assingDbclickToPolyline(polylineRef){
            polylineRef.on('dblclick', showPolylineProperties);
            polylineRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToEllipse(ellipseRef){
            ellipseRef.on('dblclick', showEllipseProperties);
            ellipseRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToCircle(circleRef){
            circleRef.on('dblclick', showCircleProperties);
            circleRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToRectangle(rectangleRef){
            rectangleRef.on('dblclick', showRectangleProperties);
            rectangleRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToPolygon(polygonRef){
            polygonRef.on('dblclick', showPolygonProperties);
            polygonRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToTextblock(textblockRef){
            textblockRef.on('dblclick', showTextblockProperties);
            textblockRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToPencil(pencilRef){
            pencilRef.on('dblclick', showPencilProperties);
            pencilRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToGraphView(graphViewRef){
            graphViewRef.on('dblclick', showGraphViewProperties);
            graphViewRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToDisplayValue(displayValueRef){
            displayValueRef.on('dblclick', showDisplayValueProperties);
            displayValueRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToButton(buttonRef){
            buttonRef.on('dblclick', showButtonProperties);
            buttonRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToSwitch(switchRef){
            switchRef.on('dblclick', showSwitchProperties);
            switchRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToInput(inputRef){
            inputRef.on('dblclick', showInputProperties);
            inputRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToHoriSlider(hSliderRef){
            hSliderRef.on('dblclick', showHorizontalSliderProperties);
            hSliderRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToVerSlider(vSliderRef){
            vSliderRef.on('dblclick', showVerticalSliderProperties);
            vSliderRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToProgressBar(progressBarRef){
            progressBarRef.on('dblclick', showProgressBarProperties);
            progressBarRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToCheckbox(checkboxRef){
            checkboxRef.on('dblclick', showCheckboxProperties);
            checkboxRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToSymbolSet(symbolRef){
            symbolRef.on('dblclick', showSymbolSetProperties);
            symbolRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToLineChart(lineChartRef){
            lineChartRef.on('dblclick', showLineChartProperties);
            lineChartRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToBarChart(barChartRef){
            barChartRef.on('dblclick', showBarChartProperties);
            barChartRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToPieChart(pieChartRef){
            pieChartRef.on('dblclick', showPieChartProperties);
            pieChartRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToDonutChart(donutChartRef){
            donutChartRef.on('dblclick', showDonutChartProperties);
            donutChartRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToRadialGauge(radialGaugeRef){
            radialGaugeRef.on('dblclick', showRadialGaugeProperties);
            radialGaugeRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToSpeedometer(speedRef){
            speedRef.on('dblclick', showSpeedometerProperties);
            speedRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToLinearGauge(linearGaugeRef){
            linearGaugeRef.on('dblclick', showLinearGaugeProperties);
            linearGaugeRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToRadialClock(clockRef){
            clockRef.on('dblclick', showRadialClockProperties);
            clockRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToDigitalClock(clockRef){
            clockRef.on('dblclick', showDigitalClockProperties);
            clockRef.on('contextmenu', openContextMenu);
        },

        assignDbclickToCamera(cameraRef){
            cameraRef.on('dblclick', showCameraProperties);
            cameraRef.on('contextmenu', openContextMenu);
        },

        addHandlerEventTagBtn(){
            $('.browse-tag').each(function(){
                $(this).click(function(){
                    // Show Select Tags modal
                    $('#tagPicker').modal('show');
                    document.getElementById('tagPicker').textareaRef = $(this).prev('textarea');
        
                })
            })

            window.onPickTag = function(tagName){
                $('#tagPicker').modal('hide');
                const textarea = document.getElementById('tagPicker').textareaRef;
                textarea.val(textarea.val() + tagName);
            }
        }


    }
})()

export default eventUtil;


function openContextMenu(evt){
    const elementId = evt.target.closest('.symbol').getAttribute('id');
    document.getElementById(elementId).properties.SVG.opacity(0.3);

    let menu = createNewMenu(elementId);
    function hideContextMenu(evt){
        // hide the menu
        menu.hide();
        // remove the listener from the document
        document.removeEventListener('click', hideContextMenu);
        if (document.getElementById(elementId)) {
            document.getElementById(elementId).properties.SVG.opacity(1);
        }
    }

    // prevent default event
    evt.preventDefault();
    // open the menu with a delay
    const time = menu.isOpen() ? 100 : 0;
    // hide the current menu (if any)
    menu.hide();
    // display menu at mouse click position
    setTimeout(() => { menu.show(evt.pageX, evt.pageY) }, time);
    // close the menu if the user clicks anywhere on the screen
    document.addEventListener('click', hideContextMenu, false);
    
  }

  

  function createNewMenu(elementId){
    const menu = new ContextMenu({
        'theme': 'default',
          'items': [
              { 'icon': 'trash', 'name': 'Delete',           action: () => deleteSymbol(elementId) },
            //   { 'icon': 'clone', 'name': 'Duplicate ',       action: () => cloneSymbol(elementId) },
              { 'icon': 'backward', 'name': 'To Back',       action: () => moveSymbolToBack(elementId) },
              { 'icon': 'step-backward', 'name': 'Backward', action: () => moveSymbolBackward(elementId) }, 
              { 'icon': 'step-forward', 'name': 'Forward',   action: () => moveSymbolForward(elementId) },
              { 'icon': 'forward', 'name': 'To Font',        action: () => moveSymbolToFont(elementId) },

          ]
      });

    return menu;
  }

  function deleteSymbol(elementId){
      document.getElementById(elementId).remove();
  }

  function cloneSymbol(elementId){
    const elementRef = document.getElementById(elementId);
    const elementClone = elementRef.cloneNode(true);
    let otherId = elementId.replace(/[0-9]+/g, new Date().getTime());
    elementClone.setAttribute('id', otherId);
    elementClone.properties = cloneDeep(elementRef.properties);
    elementClone.properties.id = otherId;
    elementClone.properties.SVG.node = elementClone;
    elementRef.parentElement.appendChild(elementClone);
    document.getElementById(otherId).properties.SVG.dmove(20, 20);
    document.getElementById(otherId).properties.SVG.draggable();
    document.getElementById(otherId).properties.updatePosition();
    document.getElementById(otherId).properties.updateSymbol();
    document.getElementById(otherId).style.opacity = 1;
    console.log(elementRef.properties);
    console.log(elementClone.properties);
  }

  function moveSymbolBackward(elementId){
    document.getElementById(elementId).properties.SVG.backward();
  }

  function moveSymbolToBack(elementId){
    document.getElementById(elementId).properties.SVG.back();
  }

  function moveSymbolForward(elementId){
    document.getElementById(elementId).properties.SVG.forward();
  }

  function moveSymbolToFont(elementId){
    document.getElementById(elementId).properties.SVG.front();
  }

  