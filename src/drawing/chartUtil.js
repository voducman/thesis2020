import JustGage from 'justgage';
import CanvasGauge from 'canvas-gauges';

const chartUtil = (function(){

    function genIdByCountedElement(_id){
        let eNum = document.querySelectorAll(`[id|=${_id}]`).length;
        eNum++;
        return `${_id}-${eNum}`;
    }

    /** 
     * @param {array} input - Array needed to caculate sum
     */
    function computeArraySum(input){
        let sum = input.reduce(function(acc, current){
            return acc + current;
        })

        return sum;
    }
   

    return {

        getChartId: function(id){
            return genIdByCountedElement(id);
        },

        getShapeId: function(id){
            return genIdByCountedElement(id);
        },

        renderLineChart: function(id){
            let data = {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [
                  [5, 9, 7, 8, 5, 3, 5, 4]
                ]
              };

            let chartist = new Chartist.Line(`#${id}`, data);
        },

        renderBarChart: function(id){
            let data = {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
                series: [
                  [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
                ]
              };

            let options = {
                high: 10,
                low: -10,
                axisX: {
                  labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                  }
                }
              };

            let barChart = new Chartist.Bar(`#${id}`, data, options);
            
        },

        renderPieChart: function(id){
            let data = {
                series: [1, 2, 4, 8, 6]
              };
            
            
            let sum = function(a, b) { return a + b };

            let pieChart = new Chartist.Pie(`#${id}`, data, {
                 labelInterpolationFnc: function(value) {
                   return Math.round(value / data.series.reduce(sum) * 100) + '%';
                 },
              });

            // Fix: incorrect in radius and position of pie chart
            let height = $(`#${id}`).parent().height();
            $(`#${id}`).height(height);
        },

        renderDonutChart: function(id){
            let data = {
                series: [1, 2, 4, 8, 6]
              };
            
            let sum = function(a, b) { return a + b };
            
            let pieChart = new Chartist.Pie(`#${id}`, data, {
                donut: true,
                donutWidth: 60,
                donutSolid: true,
                // startAngle: 270,
                total: computeArraySum(data.series),
                showLabel: true,

                labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(sum) * 100) + '%';
                  },
              });

            // Fix: incorrect in radius and position of pie chart
            //let width = $(`#${id}`).parent().width();
            let height = $(`#${id}`).parent().height();
            $(`#${id}`).height(height);
        },

        

        renderRadialGaugeChart: function(_id){

          let gauge = new JustGage({
            id: _id,
            value: 50,
            min: 0,
            max: 100,
            decimals: 2,
            gaugeWidthScale: 0.5,
            label: "RPM",
          })

          // update the value randomly
          let intervalId = setInterval(() => {
            gauge.refresh(Math.random() * 100);
          }, 2000)

          // Fix: incorrect in radius and position of pie chart
          //let width = $(`#${id}`).parent().width();
          let height = $(`#${_id}`).parent().height();
          $(`#${_id}`).height(height);
 
        },


      renderSpeedometer: function (id) {
        let width = $(`#${id}`).parent().parent().width();
        let height = $(`#${id}`).parent().parent().height();

        let speedometer = new CanvasGauge.RadialGauge({
          renderTo: id,
          width,
          height,
          units: "°C",
          title: "Temperature",
          minValue: -50,
          maxValue: 50,
          majorTicks: [
            -50,
            -40,
            -30,
            -20,
            -10,
            0,
            10,
            20,
            30,
            40,
            50
          ],
          minorTicks: 2,
          strokeTicks: true,
          highlights: [
            {
              "from": -50,
              "to": 0,
              "color": "rgba(0,0, 255, .3)"
            },
            {
              "from": 0,
              "to": 50,
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
        }).draw();
      },


      renderLinearGaugeChart: function (id) {
        let width = $(`#${id}`).parent().parent().width();
        let height = $(`#${id}`).parent().parent().height();

        let linearGauge = new CanvasGauge.LinearGauge({
          renderTo: id,
          width,
          height,
          units: "°C",
          minValue: 0,
          startAngle: 90,
          ticksAngle: 180,
          valueBox: false,
          maxValue: 220,
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
          highlights: [
              {
                  "from": 100,
                  "to": 220,
                  "color": "rgba(200, 50, 50, .75)"
              }
          ],
          colorPlate: "#e4e4e4",
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
      }).draw();
      },



    }
})()

export default chartUtil;