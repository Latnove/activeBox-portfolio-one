const header = document.querySelector('.header')
const headerLogo = document.querySelector('.header__body img')

// Прокрутка при клике
const menuLinks = document.querySelectorAll('.header__link[data-goto]')
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })

  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - (header.offsetHeight + 1)

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active')
        headerMenu.classList.remove('_active')
        clickOnBurger = false // Так как бургер меню закрывается при переходе
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      })
      e.preventDefault()
    }
  }
}

// Header Logo - при нажатии на него мы возвразаемся в САМЫЙ ВЕРХ
headerLogo.addEventListener('click', function (zeroPosition) {
  if (!header.classList.contains('_click-on-the-burger') || clickOnBurger === false) {
    zeroPosition = 0

    window.scrollTo({
      top: zeroPosition,
      behavior: 'smooth',
    })
  }
})

// Menu Burger - его появление и исчезновение
const iconMenu = document.querySelector('.header__burger')
const headerMenu = document.querySelector('.header__menu')

let deleteDelay // setTimeout
let clickOnBurger = false

if (iconMenu) {
  iconMenu.addEventListener('click', () => {
    if ((!header.classList.contains('_click-on-the-burger') && window.scrollY <= 0) || clickOnBurger === false) {
      clickOnBurger = true
      clearTimeout(deleteDelay)
      header.classList.add('_click-on-the-burger')
    } else if (clickOnBurger === true) {
      clickOnBurger = false
      removeBackgroundHeader()
    }
    console.log(clickOnBurger)

    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active')
    headerMenu.classList.toggle('_active')
  })
}

function removeBackgroundHeader() {
  deleteDelay = setTimeout(() => {
    header.classList.remove('_click-on-the-burger')
  }, 500)
}

// Добавление фона для header при скролле
window.addEventListener('scroll', scrollCheck)
document.addEventListener('DOMContentLoaded', () => {
  scrollCheck()
})

function scrollCheck() {
  let scrollY = window.scrollY

  if (scrollY > 0) {
    header.classList.add('_header-scroll')
    if (!headerLogo.classList.contains('_header__logo')) {
      headerLogo.classList.add('_header__logo')
    }
  } else {
    header.classList.remove('_header-scroll')
    headerLogo.classList.remove('_header__logo')
  }
}
