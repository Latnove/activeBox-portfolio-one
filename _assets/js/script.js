const header = document.querySelector('.header')
const navLinks = document.querySelectorAll('.navigation__link')
const logoAnchor = document.querySelector('.logoAnchor')
const reviewsNavigation = document.querySelectorAll('.slicks-dots span')
const reviewItems = document.querySelectorAll('.reviews__item')

let indexActiveReview = 0
let numberNavClicks = 0 // решить проблему с nav links
let posForLinks = new Array()
let scrollTarget = null
let activeNavLink = null
let buttonPressed = false

window.addEventListener('resize', () => {
  determinantOfCoordinates()
})
// Scroll
window.addEventListener('scroll', scrollCheck)
document.addEventListener('DOMContentLoaded', () => {
  scrollCheck()
  determinantOfCoordinates()
})

function scrollCheck() {
  let scrollY = window.scrollY

  if (scrollY > 0) {
    header.classList.add('headerScroll')
    if (!logoAnchor.classList.contains('logoAnchor')) {
      logoAnchor.classList.add('logoAnchor')
    }
  } else {
    header.classList.remove('headerScroll')
    logoAnchor.classList.remove('logoAnchor')
  }

  // Navigation error
  if (!buttonPressed) {
    for (i = 0; i <= navLinks.length - 1; i++) {
      if (scrollY >= posForLinks[i] && scrollY < posForLinks[i + 1]) {
        const activeIndex = i
        linkRemoveClass()
        navLinks[activeIndex].classList.add('active')
      } else if (scrollY < posForLinks[0]) {
        linkRemoveClass()

        break
      }
    }
  } else if (buttonPressed) {
    for (i = 0; i < posForLinks.length; i++) {
      if (posForLinks[i] === scrollY) {
        buttonPressed = false
        break
      }
    }
  }
}

// header Links error
document.querySelectorAll('a.navigation__link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()

    const href = this.getAttribute('href').substring(1)
    winScrollY = window.scrollY

    if (link != activeNavLink) {
      activeNavLink = link
      buttonPressed = true
    } else if (link === activeNavLink) {
      for (i = 0; i < posForLinks.length; i++) {
        if (winScrollY === posForLinks[i]) {
          buttonPressed = false

          break
        }
      }
    }

    linkRemoveClass()
    link.classList.add('active')

    if (href === 'download') {
      const scrollTarget = posForLinks[4]
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      })
    } else {
      scrollTarget = document.getElementById(href)

      const topOffset = header.offsetHeight + 1
      const elementPosition = scrollTarget.getBoundingClientRect().top //для определения позиции по top
      const offsetPosition = elementPosition - topOffset

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  })
})

function linkRemoveClass() {
  for (i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove('active')
  }
}

// header Logo
logoAnchor.addEventListener('click', function (zeroPosition) {
  zeroPosition = 0

  window.scrollTo({
    top: zeroPosition,
    behavior: 'smooth',
  })
})

// Navigation error
function determinantOfCoordinates() {
  for (i = 0; i < navLinks.length + 1; i++) {
    if (i === 5) {
      posForLinks.push(document.body.scrollHeight)
      // console.log(document.body.scrollHeight)
      break
    }
    const href = navLinks[i].getAttribute('href')
    if (href.substring(1) === 'download') {
      const targetPos = document.body.clientHeight - window.innerHeight - 2
      const lastScrollPos = targetPos
      posForLinks.push(lastScrollPos)
      // console.log(lastScrollPos)
    } else {
      const targetPos = document.querySelector(href).offsetTop
      const scrollPos = targetPos - (header.offsetHeight + 1)
      posForLinks.push(scrollPos)

      // console.log(scrollPos)
    }
  }
}
