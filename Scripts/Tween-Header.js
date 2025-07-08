gsap.registerPlugin('SplitText')


const TitleHeader = new SplitText('.Title-Header', {
    
    type: "chars"
})

gsap.from(TitleHeader.chars, {

    autoAlpha: 0,

    stagger: .2,

    duration: 1.3,

})

