// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger')
    const nav = document.querySelector('nav')
    const navLinks = document.querySelectorAll('nav ul li a')
    const body = document.body

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active')
        hamburger.classList.toggle('active')
        // Prevent body scroll when menu is open
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : ''
    })

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('active')
            hamburger.classList.remove('active')
            body.style.overflow = ''
        })
    })

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            !nav.contains(e.target) &&
            !hamburger.contains(e.target) &&
            nav.classList.contains('active')
        ) {
            nav.classList.remove('active')
            hamburger.classList.remove('active')
            body.style.overflow = ''
        }
    })

    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active')
            hamburger.classList.remove('active')
            body.style.overflow = ''
        }
    })
})
