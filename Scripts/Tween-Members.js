// Tween para el primer título
const FirstTitleMembers = new SplitText('.Title-Members', {
    
    type: "chars"
})

gsap.from(FirstTitleMembers.chars, {

    autoAlpha: 0,

    stagger: .1,

    duration: .8,

    rotation: 360
})


// Tween para el segundo título
const SecondTitleMembers = new SplitText('.Caption-Purpose-Supermarket', {
    
    type: "chars"
})

const Timeline = gsap.timeline({

    scrollTrigger: {

        trigger: ".Caption-Purpose-Supermarket", 

        start: "top 65%", // Comenzando la animación cuando se vizualice el 65% de la parte posterior 
    
        onLeaveBack: () => {
            Timeline.reverse(); // Revirtiendo la animación cuando el usuario haga scroll hacia arriba
        },
    }
});

Timeline.from(SecondTitleMembers.chars, {

    autoAlpha: 0,

    stagger: 0.1,

    duration: 0.6,

    rotation: 360,

})