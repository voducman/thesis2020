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

    function initArrayValuesFrom(min, max) {
        let values = [],
            range = max - min
        for (let i = 0, iLen = range; i < iLen; i++) {
            values.push(parseFloat(min) + i)
        }

        values.push(max);
        return values;
    }


    return {
        getElementId: function(id){
            let timeNow = new Date().getTime();
            return `${id}-${timeNow}`;
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
                                background-color: gray;
                            }
                            #${id} input[type=checkbox]:checked + span.toggle{
                                background-color: red;
                            } 
                        </style>
                </label>
            </div>`);

        },

        renderInput: function(id, width, height){
            $(`#${id}`).append(`
                <div>
                    <input type="text" placeholder="&nbsp;type here..." 
                    style="box-sizing: border-box; width:${width}px; height:${height}px; 
                    padding-left: 15px; border-width: 0px; font-size: 10px;"/>
                </div>`); 
        },

        renderHorizontalSlider: function(id, width, height){
            let sliderRoot = document.getElementById(id);
            let hslider = new rSlider({
                target: '#' + id,
                values: initArrayValuesFrom(0, 100),
                step: 1,
                scale: false,
                labels: false,
                tooltip: false,
                set: [25],  
                onChange: function(value){
                    sliderRoot.parentElement.properties.onChange(parseFloat(value));
                    setTimeout(function(){
                        try{
                            hslider.setValues(eval(sliderRoot.parentElement.properties.assignTag));
                        }catch(e){ console.error(e + '')}
                    }, 3000)
                }          
            });

            sliderRoot.parentElement.properties.setValue = function(value){
                hslider.setValues(value);
            }

            sliderRoot.parentElement.properties.getValue = function(){
                return hslider.getValue();
            }

            sliderRoot.parentElement.properties.changeSliderRange = function(min, max){

                hslider.conf.values = initArrayValuesFrom(min, max);
                hslider.destroy();
                hslider.init();
            }

            let parent = sliderRoot.parentElement;
            parent.querySelector('.rs-container .rs-bg').style.width = `${width}px`; //
            // Background color
            parent.querySelector('.rs-container .rs-bg').style.backgroundColor = "white"; //
            parent.querySelector('.rs-container .rs-bg').style.borderWidth = 0;
            parent.querySelector('.rs-container .rs-bg').style.height = `${height}px`; //
            parent.querySelector('.rs-container .rs-selected').style.height = `${height}px`; //
            // Foreground color
            parent.querySelector('.rs-container .rs-selected').style.backgroundColor = 'red'; //
            parent.querySelector('.rs-container .rs-selected').style.borderWidth = '0px';
            parent.querySelector('.rs-container .rs-pointer').style.height = `${height + 10}px`; //
            parent.querySelector('.rs-container .rs-scale').remove();
            parent.querySelector('.rs-container').style.width = `${width}px`; //
        },


        renderVerticalSlider: function(id, width, height){
            let slider = document.getElementById(id);
                noUiSlider.create(slider, {
                    start: 25,
                    connect: 'lower',
                    range: {
                        'min': 0,
                        'max': 100
                    },
                    direction: 'rtl',
                    orientation: 'vertical',
                    margin: 0,
                    padding: 0, 
                })

            //slider.setAttribute('disabled', true);
            slider.style.margin = '0px';
            slider.style.width = width + 'px';
            slider.style.height = height + 'px';
            slider.querySelector('.noUi-handle').style.width = width + 6 + 'px';
            // Foreground color
            slider.querySelector('.noUi-connect').style.backgroundColor = "red";
            slider.querySelector('.noUi-connect').style.width = width + 'px';
            // Background color
            slider.querySelector('.noUi-connects').style.backgroundColor = "white";
            slider.querySelector('.noUi-connects').style.width = width + 'px';
            
            slider.noUiSlider.on('update', function(values, handle){
                slider.parentElement.properties.onChange(values[handle]);
                setTimeout(function(){
                    try{
                        slider.noUiSlider.set(eval(slider.parentElement.properties.assignTag));
                    }catch(e){ console.error(e + '')}
                }, 3000)
            })

            slider.parentElement.properties.changeSliderRange = function(min, max){
                slider.noUiSlider.updateOptions({
                    range: {min, max}
                })
            }

            slider.parentElement.properties.setValue = function(value){
                slider.noUiSlider.set(value);
            }

            slider.parentElement.properties.getValue = function(){
                return slider.noUiSlider.get();
            }
           
        },

        renderHorProgressBar: function(id, width, height){
            $(`#${id}`).append(`
            <div class="progress" id="child-${id}" style="height:${height}px; width: ${width}px; border-radius: 0;
             background-color: white; position: relative">
                <div class="progress-bar role="progressbar" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100" style="width:50%; background-color: green;
                            display: flex; align-items: center; justify-content: center;">
                     <span>25%</span>
                </div>
            </div>`);  
        },

        renderVerProgressBar: function(id, width, height){
            $(`#${id}`).append(`
            <div class="progress" id="child-${id}" style="height:${height}px; width: ${width}px; border-radius: 0;
             background-color: white; position: relative">
                <div class="progress-bar role="progressbar" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100" style="height:50%; width:100%; background-color: green;
                            position: absolute; bottom: 0; display: flex; align-items: center; justify-content: center;">
                     <span>25%</span>
                </div>
            </div>`);  
        },

        renderCheckbox: function(id){
            $(`#${id}`).append(`<input type="checkbox" checked style="width:  20px; height: 20px; margin: 0;">`);  
        },

        renderSymbol: function(id){
            $(`#${id}`).append(`
            <img src="" class="on"  style="width: inherit; height: inherit; display: none;">
            <img src="" class="off" style="width: inherit; height: inherit; display: block;">`); 
        },

        


    }
})()

export default elementsUtil;