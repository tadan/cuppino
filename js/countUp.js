document.addEventListener('DOMContentLoaded', (event) => {
    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let counter = entry.target
                    let countUp = new CountUp(
                        counter,
                        counter.getAttribute('data-count')
                    )
                    if (!countUp.error) {
                        countUp.start()
                    } else {
                        console.error(countUp.error)
                    }
                    observer.unobserve(entry.target) // Stop observing the target
                }
            })
        },
        { threshold: 0.6 }
    ) // Trigger when 60% of the target is visible

    // Observe the target
    document.querySelectorAll('.number h3').forEach((target) => {
        observer.observe(target)
    })
})
