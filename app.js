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
                gsap.to(placeholder, {top:0, left: 0, scale: 1, duration: 0.5, ease: "Power2.easeOut",
            });
            }
        }
      //Validation
      //Name Validation
      input.addEventListener('input', (e) => {
        if(e.target.type == 'text') {
            let inputText = e.target.value;
            if(inputText.length > 2) {
                //Colorize 
                colorize('#6391E8', line, placeholder )

            } else {
                colorize('#FE8C99', line, placeholder )
            }
        }
              //Email Validation 

        if(e.target.type == 'email') {
            let valid = validateEmail(e.target.value);
            if(valid) {
                //Colorize 
                colorize('#6391E8', line, placeholder )

            } else {
                colorize('#FE8C99', line, placeholder )
            }
        }


        //Phone validation 


        if(e.target.type == 'tel') {
            let valid = validatePhone(e.target.value);
            if(valid) {
                //Colorize 
                colorize('#6391E8', line, placeholder )

            } else {
                colorize('#FE8C99', line, placeholder )
            }
        }
      });
    })

});

// Checking the email validation 
function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }


  //colorize 
  function colorize(color, line, placeholder) {
    gsap.to (line, {stroke: color, duration: 0.75}); 
    gsap.to(placeholder, {color: color, duration: 0.74});
  }

  //Checkbox animation 
  const checkbox = document.querySelector('.checkbox')
  const tl2 = gsap.timeline({defaults: {duration: 0.5, ease: "Power2.easeOut"}})

  const tickMarkPath = document.querySelector('.tick-mark path'); 
  //getting the length of the path 
  const pathLength = tickMarkPath.getTotalLength(); 

//Setting the handwriting effects 
gsap.set (tickMarkPath, {strokeDashoffset: pathLength, strokeDasharray: pathLength })





checkbox.addEventListener('click', () => {
    if(checkbox.checked) {
        tl2.to('.checkbox-fill', {top: "0%"}); 
        tl2.fromTo(
        tickMarkPath, 
        {strokeDashoffset: pathLength},
        {strokeDashoffset: 0}, 
        '<50%'
        );
        tl2.to('.checkbox-label', {color: '#6391e8'}, "<")

        //reverting back 
    } else {
        tl2.to ('.checkbox-fill', {top: '100%'})
        tl2.fromTo(tickMarkPath, {strokeDashoffset: 0}, {strokeDashoffset: pathLength}, '<50%'
        );
        tl2.to('.checkbox-label', {color: '#c5c5c5'}, "<")
    }


});