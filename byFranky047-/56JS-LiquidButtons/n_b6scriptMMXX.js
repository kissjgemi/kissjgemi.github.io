const buttons = document.querySelectorAll('button');
const turbulence = document.querySelector('feTurbulence');

let verticalFrequency = 0.25;
let horizontalFrequency = 0.3;

turbulence.setAttribute('baseFrequency', verticalFrequency + ' ' + horizontalFrequency);

const steps = 30;
const interval = 10;

buttons.forEach(function(button) {
    button.addEventListener('mouseover', function() {
        for (let i = 0; i < steps; i++) {
            setTimeout(function() {
                verticalFrequency += 0.006;
                horizontalFrequency -= 0.006;
                turbulence.setAttribute('baseFrequency', verticalFrequency + ' ' + horizontalFrequency);
            }, i * interval);
        }
        setTimeout(function() {
            verticalFrequency = 0.25;
            horizontalFrequency = 0.3;
            turbulence.setAttribute('baseFrequency', verticalFrequency + ' ' + horizontalFrequency);
        }, steps * interval);
    })
});