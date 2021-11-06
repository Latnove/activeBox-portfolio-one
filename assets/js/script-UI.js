// Features
const featuresItem = document.querySelectorAll('.features-item')
const featuresImage = document.querySelectorAll('.features-item img')

// TeamSocialIcons
const teamSocialIcon = document.querySelectorAll('.social__icon')

// FooterIcons
const footerIcons = document.querySelectorAll('.share__links svg')
const iconHeightFooter = []
const iconWidthFooter = []
let iconSizeReaded = false
let currentFooterIcon = 0

window.addEventListener('DOMContentLoaded', () => {
  featuresImageChange()
  windowResizing()
  footerIconChange()
})

window.addEventListener('resize', () => {
  windowResizing()
  featuresImageChange()
  footerIconChange()
})

// Features
function windowResizing() {
  for (i = 3; i < 6; i++) {
    //features item (3-5)
    if (i === 3 || i === 4 || i === 5) {
      if (window.matchMedia('(max-width: 769px)').matches) {
        featuresItem[i].style.marginTop = '2.6em'
        featuresItem[i].style.paddingBottom = '3.4em'
      } else if (window.matchMedia('(max-width: 993px)').matches) {
        featuresItem[i].style.marginTop = '2.9em'
        featuresItem[i].style.paddingBottom = '3.8em'
      } else if (window.matchMedia('(max-width: 1201px)').matches) {
        featuresItem[i].style.marginTop = '3em'
        featuresItem[i].style.paddingBottom = '4.75em'
      } else if (window.matchMedia('(min-width: 1202px)').matches) {
        featuresItem[i].style.marginTop = '3.625em'
        featuresItem[i].style.paddingBottom = '6.75em'
      }
    }
  }

  if (window.matchMedia('(max-width: 545px)').matches) {
    for (i = 2; i < featuresItem.length; i++) {
      if (window.matchMedia('(max-width: 321px)').matches) {
        featuresItem[i].style.paddingBottom = '0'
        featuresItem[i].style.marginTop = '2.6em'
        if (i === 4 || i === 5) {
          featuresItem[i].style.paddingBottom = '2.8em'
        }
      } else {
        featuresItem[i].style.marginTop = '2.8em'
        featuresItem[i].style.paddingBottom = '0'

        // последняя строчка элемтов (3 строка)
        if (i === 4 || i === 5) {
          featuresItem[i].style.paddingBottom = '3.2em'
        }
      }
    }
  } else if (window.matchMedia('(min-width: 546px)').matches) {
    featuresItem.forEach(item => {
      if (item === featuresItem[2]) {
        featuresItem[2].removeAttribute('style')
      }
    })
  }
}

function featuresImageChange(width, height) {
  featuresImage.forEach(image => {
    width = image.naturalWidth
    height = image.naturalHeight

    if (window.matchMedia('(max-width: 321px)').matches) {
      image.style.width = width * 0.55 + 'px'
      image.style.height = height * 0.55 + 'px'
    } else if (window.matchMedia('(max-width: 421px)').matches) {
      image.style.width = width * 0.68 + 'px'
      image.style.height = height * 0.68 + 'px'
    } else if (window.matchMedia('(max-width: 545px)').matches) {
      image.style.width = width * 0.72 + 'px'
      image.style.height = height * 0.72 + 'px'
    } else if (window.matchMedia('(max-width: 769px)').matches) {
      image.style.width = width * 0.8 + 'px'
      image.style.height = height * 0.8 + 'px'
    } else if (window.matchMedia('(max-width: 993px)').matches) {
      image.style.width = width * 0.87 + 'px'
      image.style.height = height * 0.87 + 'px'
    } else {
      image.style.width = width + 'px'
      image.style.height = height + 'px'
    }
  })
}

// FooterIcons
function footerIconChange(height) {
  footerIcons.forEach(svg => {
    if (iconSizeReaded) {
      // currentFooterIcon (initially) === 0
      height = iconHeightFooter[currentFooterIcon]

      if (svg === footerIcons[currentFooterIcon]) {
        if (matchMedia('(max-width: 321px)').matches) {
          svg.setAttribute('height', height * 0.5 + 'px')
        } else if (matchMedia('(max-width: 421px)').matches) {
          svg.setAttribute('height', height * 0.7 + 'px')
        } else if (matchMedia('(max-width: 545px)').matches) {
          svg.setAttribute('height', height * 0.734 + 'px')
        } else if (matchMedia('(max-width: 769px)').matches) {
          svg.setAttribute('height', height * 0.88 + 'px')
        } else if (matchMedia('(max-width: 993px)').matches) {
          svg.setAttribute('height', height * 0.93 + 'px')
        } else {
          svg.setAttribute('height', height + 'px')
        }

        currentFooterIcon = currentFooterIcon + 1
      }

      if (currentFooterIcon === footerIcons.length) {
        currentFooterIcon = 0
      }
    }

    if (!iconSizeReaded) {
      iconHeightFooter.push(svg.height.baseVal.value)

      if (footerIcons[2] === svg) {
        iconSizeReaded = true
        footerIconChange()
      }
    }
  })
}
