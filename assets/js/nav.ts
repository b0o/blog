const nav = document.querySelector('[data-nav-container]') as HTMLDivElement

const activeNavLink = nav.querySelector('[aria-current=page]')

if (activeNavLink) {
  activeNavLink.scrollIntoView({
    behavior: 'auto',
    block: 'center',
  })
}

function hideNav() {
  nav.style.transform = `translateY(-100%)`
}

function showNav() {
  nav.style.transform = `translateY(0)`
}

let timeout: number
let lastScrollPosition = window.scrollY

function handleScroll() {
  if (timeout) {
    window.cancelAnimationFrame(timeout)
  }

  const newScrollPosition = window.scrollY
  const isScrollingDown = newScrollPosition > lastScrollPosition

  timeout = window.requestAnimationFrame(function () {
    if (isScrollingDown) {
      hideNav()
    } else {
      showNav()
    }

    lastScrollPosition = Math.max(newScrollPosition, 0)
  })
}

window.addEventListener('scroll', handleScroll, false)

export {}