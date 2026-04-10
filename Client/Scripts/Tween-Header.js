gsap.registerPlugin(SplitText)


window.addEventListener('load', () => {

    const TitleHeader = new SplitText('.Title-Header', {
        type: "chars"
    })

    gsap.from (TitleHeader.chars, {
        autoAlpha: 0,
        y: 50,
        stagger: .05, 
        duration: 1,
        ease: "back.out(1.7)"
    })
})



