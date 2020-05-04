import chartist from 'chartist';

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

        

        renderRadialGaugeChart: function(id){
            
        },

        renderLinearGaugeChart: function(id){
            
        },



    }
})()

export default chartUtil;