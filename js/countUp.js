document.addEventListener('DOMContentLoaded', function () {
    const counterElements = document.querySelectorAll('.number h3')
    options = {
        duration: 5,
    }
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const finalNumber = entry.target.dataset.count
                    const countUpInstance = new countUp.CountUp(
                        entry.target.id,
                        finalNumber,
                        options
                    )
                    if (!countUpInstance.error) {
                        countUpInstance.start()
                    } else {
                        console.error('CountUp Error:', countUpInstance.error)
                    }
                    observer.unobserve(entry.target) // Optional: Unobserve after animating
                }
            })
        },
        { threshold: 0.7 }
    )

    counterElements.forEach((el) => {
        observer.observe(el)
    })
})
