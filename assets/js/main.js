/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header') 
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.popular__swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',
    autoplay: {
        delay: 2500, 
        disableOnInteraction: false,
    },
    speed: 1500, 
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true
})

sr.reveal(`.home__data , .popular__container ,.footer`)
sr.reveal(`.home__board`, {delay: 700, distance: '100px', origin: 'right'})
sr.reveal(`.home__pizza`, {delay: 1400, distance: '100px', origin: 'bottom', rotate: {z: -90}})
sr.reveal(`.home__ingredient`, {delay: 2000, interval: 100})
sr.reveal(`.about__data , .recipe__list ,.contact__data`, {origin: 'right'})
sr.reveal(`.about__img , .recipe__imge ,.contact__img`, {origin: 'left'})
sr.reveal(`.products__card`, {interval: 100})


// page lading
let toRadians = (deg) => deg * Math.PI / 180
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1)

class Pizza {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext('2d')

        this.sliceCount = 6
        this.sliceSize = 80

        this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
        this.center = this.height / 2 | 0

        this.sliceDegree = 360 / this.sliceCount
        this.sliceRadians = toRadians(this.sliceDegree)
        this.progress = 0
        this.cooldown = 10
    }

    update() {
        let ctx = this.ctx
        ctx.clearRect(0, 0, this.width, this.height)

        if (--this.cooldown < 0) this.progress += this.sliceRadians * 0.01 + this.progress * 0.07

        ctx.save()
        ctx.translate(this.center, this.center)

        for (let i = this.sliceCount - 1; i > 0; i--) {
            let rad
            if (i === this.sliceCount - 1) {
                let ii = this.sliceCount - 1

                rad = this.sliceRadians * i + this.progress

                ctx.strokeStyle = '#FBC02D'
                cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
                cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

            } else rad = this.sliceRadians * i

            // border
            ctx.beginPath()
            ctx.lineCap = 'butt'
            ctx.lineWidth = 11
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.strokeStyle = '#F57F17'
            ctx.stroke()

            // slice
            let startX = this.sliceSize * Math.cos(rad)
            let startY = this.sliceSize * Math.sin(rad)
            let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
            let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
            ctx.fillStyle = '#FBC02D'
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(startX, startY)
            ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
            ctx.lineTo(0, 0)
            ctx.closePath()
            ctx.fill()
            ctx.lineWidth = .3
            ctx.stroke()

            // meat
            let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
            let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
            ctx.beginPath()
            ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
            ctx.fillStyle = '#D84315'
            ctx.fill()
        }

        ctx.restore()

        if (this.progress > this.sliceRadians) {
            ctx.translate(this.center, this.center)
            ctx.rotate(-this.sliceDegree * Math.PI / 180)
            ctx.translate(-this.center, -this.center)

            this.progress = 0
            this.cooldown = 20
        }
    }

}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
    let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
    let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
    let x2 = sliceSize * multi * Math.cos(rad + .2)
    let y2 = sliceSize * multi * Math.sin(rad + .2)

    let csx = sliceSize * Math.cos(rad)
    let csy = sliceSize * Math.sin(rad)

    var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
    ctx.beginPath()
    ctx.lineCap = 'round'

    let percentage = map(d, 15, 70, 1.2, 0.2)

    let tx = x1 + (x2 - x1) * percentage
    let ty = y1 + (y2 - y1) * percentage
    ctx.moveTo(x1, y1)
    ctx.lineTo(tx, ty)

    tx = x2 + (x1 - x2) * percentage
    ty = y2 + (y1 - y2) * percentage
    ctx.moveTo(x2, y2)
    ctx.lineTo(tx, ty)

    ctx.lineWidth = map(d, 0, 100, 20, 2)
    ctx.stroke()
}

let pizza = new Pizza('pizza')

let loadingTimeout = setTimeout(() => {
    document.getElementById('loader-container').style.display = 'none';
}, 1700);

(function update() {
    requestAnimationFrame(update)
    pizza.update()
}())
