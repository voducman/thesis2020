import JustGage from 'justgage';
import CanvasGauge from 'canvas-gauges';
import moment from 'moment';
import Chartist from 'chartist';
import 'chartist-plugin-legend';
import 'chartist/dist/chartist.css'

const chartUtil = (function () {

  function genIdByCountedElement(_id) {
    let eNum = document.querySelectorAll(`[id|=${_id}]`).length;
    eNum++;
    return `${_id}-${eNum}`;
  }

  /** 
   * @param {array} input - Array needed to caculate sum
   */
  function computeArraySum(input) {
    let sum = input.reduce(function (acc, current) {
      return acc + current;
    })

    return sum;
  }


  return {

    getChartId: function (id) {
      return genIdByCountedElement(id);
    },

    getShapeId: function (id) {
      return genIdByCountedElement(id);
    },

    renderLineChart: function (id) {
      let data = {
        labels: [0],
        series: [
          [0],
          [0],
          [0]
        ],
      };

      let options = {
        low: 0,
        high: 10,
        showArea: false,
        lineSmooth: false,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        plugins: [
          Chartist.plugins.legend({
            legendNames: ['Line 1', 'Line 2', 'Line 3'],
          })
        ],
      }

      let chartist = new Chartist.Line(`#${id}`, data, options);

      let chartProperties = document.getElementById(id).parentElement.properties;
      chartProperties.changeOptions = function (isSmooth, isArea, low, high) {
        options.low = low;
        options.high = high;
        options.lineSmooth = isSmooth;
        options.showArea = isArea;
        chartist.update(null, options, true);
      }

      chartProperties.setMaxPoints = function (maxPoints) {
        while (chartist.data.series[0].length > maxPoints) {
          chartist.data.series[0].shift();
          chartist.data.series[1].shift();
          chartist.data.series[2].shift();
          chartist.data.labels.shift();
        }
      }

      chartProperties.pushDatas = function (tag1, tag2, tag3) {
        chartist.data.labels.push(moment().format('h:mm:ss'));
        chartist.data.series[0].push(tag1);
        chartist.data.series[1].push(tag2);
        chartist.data.series[2].push(tag3);
        chartProperties.setMaxPoints(chartProperties.maxPoints);
        chartist.update();
      }
    },

    renderBarChart: function (id) {

      let data = {
        labels: [0],
        series: [
          [0],
          [0],
          [0]
        ],
      };

      let options = {
        low: 0,
        high: 10,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        plugins: [
          Chartist.plugins.legend({
            legendNames: ['Bar 1', 'Bar 2', 'Bar 3'],
          })
        ]
      };

      let chartist = new Chartist.Bar(`#${id}`, data, options);

      let chartProperties = document.getElementById(id).parentElement.properties;
      chartProperties.changeOptions = function (isSmooth, isArea, low, high) {
        options.low = low;
        options.high = high;
        options.lineSmooth = isSmooth;
        options.showArea = isArea;
        chartist.update(null, options, true);
      }

      chartProperties.setMaxPoints = function (maxPoints) {
        while (chartist.data.series[0].length > maxPoints) {
          chartist.data.series[0].shift();
          chartist.data.series[1].shift();
          chartist.data.series[2].shift();
          chartist.data.labels.shift();
        }
      }

      chartProperties.pushDatas = function (tag1, tag2, tag3) {
        chartist.data.labels.push(moment().format('h:mm:ss'));
        chartist.data.series[0].push(tag1);
        chartist.data.series[1].push(tag2);
        chartist.data.series[2].push(tag3);
        chartProperties.setMaxPoints(chartProperties.maxPoints);
        chartist.update();
      }

      // setInterval(function () {
      //   chartProperties.pushDatas(Math.random() * 10, Math.random() * 10, null);
      // }, 1000)

    },



    renderPieChart: function (id) {
      let data = {
        series: [1, 1, 1, 1, 1, 1]
      };

      let chartist = new Chartist.Pie(`#${id}`, data);

      let chartProperties = document.getElementById(id).parentElement.properties;
      chartProperties.updateLabel = function(labels){
        let arrayLabel = labels.split(',');
        chartist.data.labels = arrayLabel;
      }

      chartProperties.pushDatas = function(tag1, tag2, tag3, tag4, tag5){
        chartist.data.series = [];
        chartist.data.series.push(tag1);
        chartist.data.series.push(tag2);
        chartist.data.series.push(tag3);
        chartist.data.series.push(tag4);
        chartist.data.series.push(tag5);
        chartist.update();
      }

      // setInterval(function(){
      //   chartProperties.pushDatas(Math.random()*10, Math.random()*10, Math.random()*10, Math.random()*10, Math.random()*10);
      // }, 2500)

    },

    renderDonutChart: function (id) {
      let data = {
        series: [1, 1, 1, 1, 1]
      };

      let chartist = new Chartist.Pie(`#${id}`, data, {
        donut: true,
        donutWidth: 50,
        donutSolid: true,
        showLabel: true,
      });

      let chartProperties = document.getElementById(id).parentElement.properties;
      chartProperties.updateLabel = function(labels){
        let arrayLabel = labels.split(',');
        chartist.data.labels = arrayLabel;
      }

      chartProperties.setDonutWidth = function(width){
        chartist.update(null, {
          donutWidth: width
        }, true);
      }

      chartProperties.pushDatas = function(tag1, tag2, tag3, tag4, tag5){
        chartist.data.series = [];
        chartist.data.series.push(tag1);
        chartist.data.series.push(tag2);
        chartist.data.series.push(tag3);
        chartist.data.series.push(tag4);
        chartist.data.series.push(tag5);
        chartist.update();
      }

      // setInterval(function(){
      //   chartProperties.pushDatas(Math.random()*10, Math.random()*10, Math.random()*10, Math.random()*10, Math.random()*10);
      // }, 2500)
    },


    renderRadialGaugeChart: function (id) {

      const options = {
        id,
        value: 0,
        min: 0,
        max: 100,
        decimals: 2,
        gaugeWidthScale: 1,
        label: "RPM",
        gaugeColor: 'white',
        levelColors: ['red'],
        pointer: true,
        labelFontColor: '#222'
      }

      let gauge = new JustGage(options);

      let gaugeProperties = document.getElementById(id).parentElement.properties;

      gaugeProperties.updateOptions = function(scale, label, bgColor, fgColor, min, max){
        options.gaugeWidthScale = scale || 1;
        options.label = label;
        options.min = min || 0;
        options.max = max || 100;
        options.gaugeColor = fgColor;
        options.levelColors = [bgColor];
        options.value = (parseInt(max) - parseInt(min))/2;
        gauge.destroy();
        gauge = new JustGage(options);
        
      }

      gaugeProperties.setValue = function(value){
        gauge.refresh(value);
      }

      // setInterval(function(){
      //   gaugeProperties.setValue(Math.random()*100);
      // }, 1000)

    },


    renderSpeedometer: function (id) {
      const size = document.getElementById(id).parentElement.parentElement.style.width;

      const options = {
        renderTo: id,
        width: size,
        height: size,
        units: "°C",
        title: "Temperature",
        minValue: -50,
        maxValue: 50,
        majorTicks: [-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50],
        minorTicks: 2,
        strokeTicks: true,
        highlights: [
          {
            "from": null,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
          },
          {
            "from": 0,
            "to": null,
            "color": "rgba(255, 0, 0, .3)"
          }
        ],
        ticksAngle: 225,
        startAngle: 67.5,
        colorMajorTicks: "#ddd",
        colorMinorTicks: "#ddd",
        colorTitle: "#eee",
        colorUnits: "#ccc",
        colorNumbers: "#eee",
        colorPlate: "#222",
        borderShadowWidth: 0,
        borders: true,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        colorBorderOuter: "#333",
        colorBorderOuterEnd: "#111",
        colorBorderMiddle: "#222",
        colorBorderMiddleEnd: "#111",
        colorBorderInner: "#111",
        colorBorderInnerEnd: "#333",
        colorNeedleShadowDown: "#333",
        colorNeedleCircleOuter: "#333",
        colorNeedleCircleOuterEnd: "#111",
        colorNeedleCircleInner: "#111",
        colorNeedleCircleInnerEnd: "#222",
        valueBoxBorderRadius: 0,
        colorValueBoxRect: "#222",
        colorValueBoxRectEnd: "#333"
      }

      let speedometer = new CanvasGauge.RadialGauge(options).draw();

      let ometerProperties = document.getElementById(id).parentElement.parentElement.properties;
      ometerProperties.updateOptions = function(title, unit, ticks, min, max, radius){
        speedometer.update({
          width: radius*2,
          height: radius*2,
          title: title,
          majorTicks: ticks.split(','),
          units: unit,
          minValue: min,
          maxValue: max
        })
      }

      ometerProperties.setValue = function(value){
        speedometer.update({value});
      }

      setInterval(function () {
        ometerProperties.setValue(Math.random()*100 - 50);
      }, 1000)
    },


    renderLinearGaugeChart: function (id) {
      let width = document.getElementById(id).style.width;
      let height = document.getElementById(id).style.height;

      const options = {
        renderTo: id,
        width,
        height,
        units: "°C",
        minValue: 0,
        startAngle: 90,
        ticksAngle: 180,
        valueBox: false,
        maxValue: 100,
        majorTicks: [
          "0",
          "20",
          "40",
          "60",
          "80",
          "100",
          "120",
          "140",
          "160",
          "180",
          "200",
          "220"
        ],
        minorTicks: 2,
        strokeTicks: true,
        colorPlate: "white",
        borderShadowWidth: 0,
        borders: false,
        needleType: "arrow",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 1500,
        animationRule: "linear",
        barWidth: 10,
        value: 60
      }

      let linearGauge = new CanvasGauge.LinearGauge(options).draw();
      
      let gaugeProperties = document.getElementById(id).parentElement.parentElement.properties;
      gaugeProperties.updateOptions = function(unit, ticks, min, max, width, height, bgColor){
        console.log('update gauge', {
          width: width,
          height: height,
          majorTicks: ticks.split(','),
          units: unit,
          colorPlate: bgColor,
          minValue: min,
          maxValue: max
        });
        linearGauge.update({
          width: width,
          height: height,
          majorTicks: ticks.split(','),
          units: unit,
          colorPlate: bgColor,
          minValue: parseInt(min),
          maxValue: parseInt(max)
        })
        console.log('done')
      }

      gaugeProperties.setValue = function(value){
        linearGauge.update({value});
      }

      setInterval(function () {
        gaugeProperties.setValue(Math.random()*1000);
      }, 1000)

    },



  }
})()

export default chartUtil;