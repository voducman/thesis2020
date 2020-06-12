
function renderVectorMap(){

    let makerList = data.getListGateway();
    console.log(makerList)
    let maker = makerList.map((ele) => {
        return {latLng: ele.latLng, name: ele.name}
    })

    console.log(maker)

    // maker = [
    //     {latLng: [10.644324, 106.220406], name: 'Long An City'},
    //     {latLng: [20.411484, 97.563179], name: 'Mianma City'},
    //     {latLng: [-0.52, 166.93], name: 'Nauru'},
    //     {latLng: [-8.51, 179.21], name: 'Tuvalu'},
    //     {latLng: [43.93, 12.46], name: 'San Marino'},
    // ],

    var mapData = {
           'VN': 50,
           'CN': 20,
           'IQ': 25,
           'JP': 15,
           'KR': 30,
           'IN': 25,
           'MY': 10,
           'KZ': 20,
           'SA': 15
       };

       $('#gateway-map').empty();
       $('#gateway-map').vectorMap({
           map: 'asia_mill',
           backgroundColor: "transparent",
           zoomOnScroll: true,
           regionStyle: {
               initial: {
                   fill: '#e4e4e4',
                   "fill-opacity": 0.9,
                   stroke: 'none',
                   "stroke-width": 0,
                   "stroke-opacity": 0
               }
           },

           series: {
               regions: [{
                   values: mapData,
                   scale: ["#AAAAAA","#444444"],
                   normalizeFunction: 'polynomial'
               }]
           },
           markerStyle: {
               initial: {
                 fill: '#F8E23B',
                 stroke: '#383f47'
               }
             },
           markers: maker,
       });
}

module.exports = {
    renderVectorMap: function(){
        
    }

}

