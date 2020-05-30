const htmlSymbolUtil = {


    // Generate html of line chart
    generateLineChartHtml: function(id, width, height){
        return `
        <div class="ct-chart" id="child-${id}" style="width: ${width}px; height: ${height}px;"></div>`.trim()
    },

    // Generate html of bar chart
    generateBarChartHtml: function(id, width, height){
        return `
        <div class="ct-chart" id="child-${id}" style="width: ${width}px; height: ${height}px;"></div>`.trim()
    },

    // Generate html of pie chart
    generatePieChartHtml: function(id, width, height){
        return `
        <div class="ct-chart" id="child-${id}" style="width: ${width}px; height: ${height}px;"></div>`.trim()
    },

    // Generate html of radial gauge chart
    generateRadialGaugeChartHtml: function(id, width, height){
        return `
        <div class="ct-chart" id="child-${id}" style="width: ${width}px; height: ${height}px; padding: 0;"></div>`.trim()
    },

    // Generage htmlof speedometer
    generateSpeedometerHtml: function(id, width, height){
        return `
        <div style="width: ${width}px; height: ${height}px;">
            <canvas data-type="radial-gauge" id="child-${id}" style="width: ${width}px; height: ${height}px;"></canvas>
        </div>`.trim()
    },

    // Generate html of linear gauge
    generateLinearGaugeHtml: function(id, width, height){
        return `
        <div style="width: ${width}px; height: ${height}px;">
            <canvas data-type="linear-gauge"id="child-${id}" style="width: ${width}px; height: ${height}px;"></canvas>
        </div>`.trim()
    },

     // Generate html of slider
     generateSliderHtml: function(id){
        return `
        <div id="child-${id}"></div>`.trim()
    },

    // Generate html of digital clock
    generateDigitalClock: function(id){
        return `
        <div id="child-${id}" class="dark digital-clock">
            <div class="display">
                <div class="weekdays"></div>
                <div class="ampm"></div>
                <div class="alarm"></div>
                <div class="digits"></div>
            </div>
        </div>
        `.trim()
    },

    // Generate html of calendar
    generateCalendar: function(id){
        return `
        <div class="calendar" id="child-${id}-"></div>`.trim()
    },

     // Generate html of camera viewer
     generateCamera: function(id){
        return `
        <div class="camera" style="width: 100%; height: 100%"></div>`.trim()
    },



}

export default htmlSymbolUtil;