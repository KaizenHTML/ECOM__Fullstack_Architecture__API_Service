// Tween para el primer título
const TitleMembers = new SplitText('.Title-Members', {
    
    type: "chars"
})

gsap.from(TitleMembers.chars, {

    autoAlpha: 0,

    stagger: .1,

    duration: .8,

    rotation: 360
})



// Tween para el segundo título
const TitlePurpose = new SplitText('.Title-Purpose-Supermarket', {
    
    type: "chars"
})

const Timeline = gsap.timeline({

    scrollTrigger: {

        trigger: ".Title-Purpose-Supermarket", 

        // Comenzando la animación cuando se vizualice el 65% del top 
        start: "top 65%", 
    
        // Revirtiendo la animación 
        onLeaveBack: () => {
            Timeline.reverse(); 
        },
    }
});

Timeline.from(TitlePurpose.chars, {

    autoAlpha: 0,

    stagger: 0.1,

    duration: 0.6,

    rotation: 360,

})