// Elastic inputs 
const containers = document.querySelectorAll(".input-container");
const form = document.querySelector('form'); 

// Creating the timeline and setting the default transition to 1 second 
const tl = gsap.timeline({defaults: {duration: 1}});

// Line 
const start = 
"M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512"

//End version of the line 
const end = 
"M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512"

//Elastic effect (looping over each of the containers and checking if the inputs are focussed)

containers.forEach ((container) => {
    const input = container.querySelector('.input');
    const line = container.querySelector ('.elastic-line');
    const placeholder = container.querySelector('.placeholder');


    input.addEventListener('focus', () => {
        //Check to see if there is any text in the input 
        if(!input.value) {
            tl.fromTo(
                line, 
                {attr: {d: start} },
                {attr: {d: end}, ease: 'Power2.easeOut', duration: 0.75}
            );
            tl.to(line, {attr: {d: start}, ease: 'elastic.out(3, 0.5'}, '<50%')

            //placeholder shift 
            tl.to(placeholder,{
                top: -15, 
                left: 0,
                scale: 0.7,
                 duration: 0.5,
                  ease: 'Power2.easeOut' 
                },
                "<15%"
                
                )

        }
    });
});

//Revert back if it is not focussed 

form.addEventListener('click', () => {
    containers.forEach(container => {
        const input = container.querySelector('.input');
        const line = container.querySelector ('.elastic-line');
        const placeholder = container.querySelector('.placeholder');

        if(document.activeElement !== input) {
            if(!input.value) {
                gsap.to(placeholder, {top:0, left: 0, scale: 1, duration: 0.5, ease: "Power2.easeOut"})
            }
        }

    })

});



