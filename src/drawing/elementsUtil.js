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
            $(`#${id}`).append('<p style="margin: 0">##.##</p>');
        },

        renderButton: function(id){
            $(`#${id}`).append('<button type="button" class="btn btn-info btn-sm">Button</button>');
            const width = getWidthTotal(`#${id} button`);
            const height = getHeightTotal(`#${id}`);
    
            $(`#${id}`).parent().attr('width', width);
            $(`#${id}`).parent().attr('height', height);
        },

        renderSwitch: function(id){
            $(`#${id}`).append(` <label  data-size="lg">
                NEW
                    <input type="checkbox" checked data-size="lg" >
                    <span class="toggle"></span>
                EDIT 
            </label>`);

        },

        renderInput: function(id){
            $(`#${id}`).append(`<input type="text" name="adfaf" placeholder="type here..."/>`);  
            const width = $(`#${id}`).parent().width();
            const height = $(`#${id}`).parent().height();
            $(`#${id} input`).width(width - 4);
            $(`#${id} input`).height(height - 6);

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