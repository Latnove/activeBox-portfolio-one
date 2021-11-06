const reviewItems = document.querySelectorAll('.reviews__item')

let indexActiveReview = 0
let fullClickOnReview = false
let updateReviewAft // setInterval
let skipСlick // setTimeout

const updateBeforeFirstClick = setInterval(() => {
  if (!fullClickOnReview) {
    autoUpdateReview()
  }
}, 5000)

function updateReviewAfterClick() {
  clearInterval(skipСlick)
  if (!fullClickOnReview) {
    updateReviewAft = setInterval(() => {
      autoUpdateReview()
    }, 5000)
  }
}

// мышка нажата, но не отпущена в течении 3 секунд
document.querySelector('#reviews').addEventListener('mousedown', () => {
  fullClickOnReview = true

  skipСlick = setTimeout(() => {
    fullClickOnReview = false
    updateBeforeFirstClick()
  }, 2500)
})

document.querySelector('#reviews').addEventListener('mouseup', () => {
  clickCheck()
})

function clickCheck() {
  if (fullClickOnReview) {
    clearInterval(updateReviewAft)
    clearInterval(skipСlick)
    clearInterval(updateBeforeFirstClick)

    if (indexActiveReview < reviewItems.length - 1) {
      for (i = 0; i < reviewItems.length - 1; i++) {
        if (reviewItems[i].classList.contains('_review__active') == true) {
          indexActiveReview = ++i

          break
        }
      }
    } else {
      indexActiveReview = 0
    }

    changeReviewClass()
    fullClickOnReview = false
    updateReviewAfterClick()
  }
}

function changeReviewClass() {
  fullClickOnReview = true
  for (i = reviewItems.length - 1; i >= 0; i--) {
    if (reviewItems[i].classList.contains('_review__active')) {
      reviewItems[i].classList.remove('_review__active')
      reviewItems[indexActiveReview].classList.add('_review__active')
      fullClickOnReview = false
      break
    }
  }
}

function autoUpdateReview() {
  if (indexActiveReview < reviewItems.length - 1) {
    indexActiveReview = ++indexActiveReview
  } else {
    indexActiveReview = 0
  }
  changeReviewClass()
}
