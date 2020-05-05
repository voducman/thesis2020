const htmlSymbolUtil = {


    // Generate html of line chart
    generateLineChartHtml: function(id){
        return `
        <div class="ct-chart ct-minor-seventh line-chart" id="${id}"></div>`.trim()
    },

    // Generate html of bar chart
    generateBarChartHtml: function(id){
        return `
        <div class="ct-chart ct-minor-seventh bar-chart" id="${id}"></div>`.trim()
    },

    // Generate html of pie chart
    generatePieChartHtml: function(id){
        return `
        <div class="ct-chart pie-chart" id="${id}"></div>`.trim()
    },

    // Generate html of radial gauge chart
    generateRadialGaugeChartHtml: function(id){
        return `
        <div class="ct-chart gauge-chart container-fluid" id="${id}"></div>`.trim()
    },

    // Generage htmlof speedometer
    generateSpeedometerHtml: function(id){
        return `
        <div>
        <canvas data-type="radial-gauge"id="${id}" ></canvas>
        </div>`.trim()
    },

    // Generate html of linear gauge
    generateLinearGaugeHtml: function(id){
        return `
        <div>
            <canvas data-type="linear-gauge"id="${id}"></canvas>
        </div>`.trim()
    },

    // Generate html of table
    generateTableHtml: function(){
        return `
            <div class="container-fluid">
                <h4 class="text-center">Table Header</h4>           
                <table class="table table-bordered col-md-6 table-hover" style="border: 5px solid #222">
                    <thead>
                    <tr style="border: 5px solid #222; background-color: red">
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style="border: 2px solid #222">
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    <tr style="border: 2px solid #222">
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                    </tr>
                    <tr style="border: 2px solid #222">
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr>
                    </tbody>
                </table>
            </div>`.trim();
    },



}

export default htmlSymbolUtil;