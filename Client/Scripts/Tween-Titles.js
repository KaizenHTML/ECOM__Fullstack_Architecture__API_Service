window.addEventListener('load', () => {

    const titlesToAnimate = [".Title-Section-Cards", ".Title-Purpose-Supermarket", ".Title-Members"];

    titlesToAnimate.forEach(selector => {

        const split = new SplitText(selector, {type: 'chars'});

        gsap.from(split.chars, {

            scrollTrigger:{
                start: 'top 90%',
                trigger: selector,
                toggleActions: 'play none none none'
            },

            duration: 1,
            stagger: .05,
            autoAlpha: 0,
            rotation: 360,
        });
    });
});
