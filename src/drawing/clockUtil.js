//import calendar from 'pg-calendar';

const clockUtil = {

    /**
     * Init context and size for radial clock
     * @param {number} radius - radius of radial clock
     * @param {string} id - id of DIV parent element
     */
    initRadialClock: function(radius, id){
        $(`#${id}`).append(`<canvas width="${2*radius}" height="${2*radius}" style="background-color: none"></canvas>`);
        let canvas = document.querySelector(`#${id} canvas`);
        let ctx = canvas.getContext('2d');
        ctx.translate(radius, radius);
        radius *= 0.9;
        setInterval(()=>{
            this.drawRadialClock(ctx, radius);
        }, 1000);

    },

    drawRadialClock: function(ctx, radius){
        this.drawRadialFace(ctx, radius);
        this.drawRadialNumbers(ctx, radius);
        this.drawRadialTime(ctx, radius);
    },

    drawRadialFace: function(ctx, radius){
        let grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius * 0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    },

    drawRadialNumbers: function(ctx, radius){
        var ang;
        var num;
        ctx.font = radius*0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num = 1; num < 13; num++){
          ang = num * Math.PI / 6;
          ctx.rotate(ang);
          ctx.translate(0, -radius*0.85);
          ctx.rotate(-ang);
          ctx.fillText(num.toString(), 0, 0);
          ctx.rotate(ang);
          ctx.translate(0, radius*0.85);
          ctx.rotate(-ang);
        }
    },

    drawRadialTime: function (ctx, radius) {
        let now = new Date();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        //hour
        hour = hour % 12;
        hour = (hour * Math.PI / 6) +
            (minute * Math.PI / (6 * 60)) +
            (second * Math.PI / (360 * 60));
        this.drawRadialHand(ctx, hour, radius * 0.5, radius * 0.07);
        //minute
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
        this.drawRadialHand(ctx, minute, radius * 0.8, radius * 0.07);
        // second
        second = (second * Math.PI / 30);
        this.drawRadialHand(ctx, second, radius * 0.9, radius * 0.02);
    },

    drawRadialHand: function(ctx, pos, length, width){
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
    },




    // Digital clock function 
    initDigitalClock: function (id) {
        let isFirst = true;
        // Set some css value
        console.log($(`#${id}`).width(), $(`#${id}`).height());
        let scaleY = parseFloat($(`#${id}`).height()/194);
        let scaleX = parseFloat($(`#${id}`).width()/410);
        let padX = 40*scaleX, padY = 40*scaleY;
        console.log(scaleX, scaleY, padX, padY)
        $(`#${id} .digital-clock`).css("padding", `${padY}px ${padX}px`);
        $(`#${id} .digital-clock`).css("width",  `${410*scaleX}px`);
        $(`#${id} .digital-clock`).css("height", `${194*scaleY}px`);

        $(`#${id} .digital-clock .display`).css("padding", `${40*scaleY}px ${20*scaleX}px ${20*scaleY}px ${20*scaleX}px`);
        $(`#${id} .digital-clock .display`).css("width", `${330*scaleX}px`);
        $(`#${id} .digital-clock .display`).css("height", `${114*scaleY}px`);
        // $(`#${id} .digital-clock`).css("transform", `scale(${scaleX}, ${scaleY})`);
        // $(`#${id} .digital-clock`).css("-ms-transform", `scale(${scaleX}, ${scaleY})`);
        
        

        // Cache some selectors
        let clock = $(`#${id}`),
            alarm = clock.find('.alarm'),
            ampm = clock.find('.ampm');

        // Map digits to their names (this will be an array)
        let digit2Name = 'zero one two three four five six seven eight nine'.split(' ');

        // This object will hold the digit elements
        let digits = {};

        // Positions for the hours, minutes, and seconds
        let positions = [
            'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
        ];

        // Generate the digits with the needed markup,
        // and add them to the clock

        let digitHolder = clock.find('.digits');

        $.each(positions, function () {

            if (this == ':') {
                digitHolder.append('<div class="dots">');
            }
            else {

                let pos = $('<div>');

                for (var i = 1; i < 8; i++) {
                    pos.append('<span class="d' + i + '">');
                }

                // Set the digits as key:value pairs in the digits object
                digits[this] = pos;

                // Add the digit elements to the page
                digitHolder.append(pos);
            }

        });

        // Add the weekday names

        var weekDayName = 'MON TUE WED THU FRI SAT SUN'.split(' '),
            weekDayHolder = clock.find('.weekdays');

        $.each(weekDayName, function () {
            weekDayHolder.append('<span>' + this + '</span>');
        });

        var weekdays = clock.find('.weekdays span');


        // Run a timer every second and up<a href="https://www.jqueryscript.net/time-clock/">date</a> the clock
        console.debug("run here before update time")
        // Schedule this function to be run again in 1 sec
        let w, h;
        setInterval(() => {
            this.updateTime(digits, digit2Name, weekdays, ampm);
            // Scale digits into fit size
            // Using transform css
            // TO-DO
            $(`#${id} .digital-clock .display .digits div`).each(function () {
               
                $(this).css("transform", `scale(${scaleX}, ${scaleY})`);
            })
            //$(`#${id} .digital-clock .display .digits`).css("transform", `scale(${scaleX}, ${scaleY})`);
        }, 1000);
    },

    updateTime: function (digits, digit2Name, weekdays, ampm) {

        // Use moment.js to output the current time as a string
        // hh is for the hours in 12-hour format,
        // mm - minutes, ss-seconds (all with leading zeroes),
        // d is for day of week and A is for AM/PM

        let now = moment().format("hhmmssdA");

        digits.h1.attr('class', digit2Name[now[0]]);
        digits.h2.attr('class', digit2Name[now[1]]);
        digits.m1.attr('class', digit2Name[now[2]]);
        digits.m2.attr('class', digit2Name[now[3]]);
        digits.s1.attr('class', digit2Name[now[4]]);
        digits.s2.attr('class', digit2Name[now[5]]);

        // The library returns Sunday as the first day of the week.
        // Stupid, I know. Lets shift all the days one position down, 
        // and make Sunday last

        let dow = now[6];
        dow--;

        // Sunday!
        if (dow < 0) {
            // Make it last
            dow = 6;
        }

        // Mark the active day of the week
        weekdays.removeClass('active').eq(dow).addClass('active');

        // Set the am/pm text:
        ampm.text(now[7] + now[8]);

        
    },

    renderCalendar: function(id){
        $('.calendar').fullCalendar({
            // weekends: false // will hide Saturdays and Sundays
          })
    },

    renderCameraViewer: function(id){
        let width = $(`#${id}`).width();
        let height = $(`#${id}`).height(); 
        $(`#${id} .camera`).append(`<video id="${id}-children"" width="${width-16}" height="${height-16}"
        style="margin: 8px; border-radius: 8px; background-color: #333;" controls></video>`);
        $(`#${id} .camera`).css("background-color", "#ff9a00");
        $(`#${id} .camera`).css("border-radius", "10px");



        // Set up web-rtc here
        const constraints = {
            video: true
          };

          const video = document.querySelector('video');
          navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {video.srcObject = stream});
          
    }
}

export default clockUtil;