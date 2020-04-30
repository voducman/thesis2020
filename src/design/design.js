let Line        = require('./model/Line');
let Polyline    = require('./model/Polyline');
let Ellipse     = require('./model/Ellipse');
let Circle      = require('./model/Rectangle');
let Polygone    = require('./model/Polygone');
let Textblock   = require('./model/Textblock');
let Graphview   = require('./model/Graphview');
let Table       = require('./model/Table');
let Display     = require('./model/DisplayValue');
let Button      = require('./model/Button');
let Switch      = require('./model/Switch');
let Input       = require('./model/Input');
let Slider      = require('./model/Slider');
let Progress    = require('./model/ProgressBar');
let Checkbox    = require('./model/Checkbox');
let SymbolSet   = require('./model/SymbolSet');
let LineChart   = require('./model/LineChart');
let BarChart    = require('./model/BarChart');
let PieChart    = require('./model/PieChart');
let GaugeChart  = require('./model/GaugeChart');

let url         = require('url');
let onChange    = require('on-change');
let designUtil  = require('./designUtil');
let drawingData = require('./drawingData');
                  require('./design.config');



console.log(designUtil.getDesignId());

let dataWatched = onChange(drawingData, (path, value, previousValue)=>{
    // Update UI of drawing page

})

