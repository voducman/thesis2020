import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const elementsUtil = (function(){

    function genIdByCountedElement(_id){
        let eNum = document.querySelectorAll(`[id|=${_id}]`).length;
        eNum++;
        return `${_id}-${eNum}`;
    }

    function getHeightTotal(selector){
        return $(selector).outerHeight();
    }

    function getWidthTotal(selector){
        return $(selector).outerWidth();
    }


    return {
        getElementId: function(id){
            return genIdByCountedElement(id);
        },

        renderDisplayValue: function(id){
            $(`#${id}`).append('<div><p style="margin: 0">##.##</p></div>');
        },

        renderButton: function(id, width, height){
            $(`#${id}`).append(`<div>
                                <button type="button" class="btn btn-sm" style="width: ${width}px; 
                                    height: ${height}px; font-size: 15px; color: red; font-weight: 500; margin: 0;">
                                    Button
                                </button>
                                </div>`);

        },

        renderSwitch: function(id){
            $(`#${id}`).append(` 
            <div class="togglebutton text-center">
                <label  data-size="lg">
                        <span class="before-text">OFF</span>
                        <input type="checkbox" checked>
                        <span class="toggle"></span>
                        <span class="after-text">ON</span>
                        <style>
                            #${id} input[type=checkbox] + span.toggle{
                                background-color: gray!important;
                            }
                            #${id} input[type=checkbox]:checked + span.toggle{
                                background-color: red!important;
                            } 
                        </style>
                </label>
            </div>`);

        },

        renderInput: function(id, width, height){
            $(`#${id}`).append(`
                <div>
                    <input type="text" placeholder="&nbsp;type here..." style="box-sizing: border-box;"/>
                </div>`); 
        },

        renderSlider: function(id, orientation){
            let slider = document.getElementById(id);
            if (orientation == 'vertical') {

                noUiSlider.create(slider, {
                    start: 25,
                    connect: 'upper',
                    range: {
                        'min': 0,
                        'max': 100
                    },
                    direction: 'rtl',
                    orientation: 'vertical',
                })
                // slider.querySelector('.noUi-connects').style.width = '10px';
                // slider.querySelector('.noUi-base').style.width = '10px';
                // slider.style.width = '10px';
               
                return
            }

            var mySlider = new rSlider({
                target: '#' + id,
                values: ['00', 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                range: false,
                tooltip: false,
                scale: false,
                labels: false,
                set: [30],
                width: 250,
                height: 20
                
            });
            $(`#${id}`).height(15);

        },

        renderProgressBar: function(id){
            $(`#${id}`).append(`<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100" style="width:50%">
                                    70%
                                </div>`);  
        },

        renderCheckbox: function(id){
            $(`#${id}`).append(`<input type="checkbox" checked>`);  
        },

        renderSymbol: function(id){
            $(`#${id}`).append(`<img src="/static/images/default-symbol-set.png">`); 
        },

        


    }
})()

export default elementsUtil;