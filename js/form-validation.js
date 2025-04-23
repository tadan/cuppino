/* Checking Phone Number if valid */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cateringForm')
    const phoneInput = document.getElementById('phone')
    const phoneError = document.getElementById('phoneError')

    function validatePhone(phone) {
        // This regex allows for various phone number formats
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        return phoneRegex.test(phone)
    }

    phoneInput.addEventListener('input', function () {
        if (validatePhone(this.value)) {
            phoneError.textContent = ''
            this.setCustomValidity('')
        } else {
            phoneError.textContent = 'Please enter a valid phone number'
            this.setCustomValidity('Invalid phone number')
        }
    })

    form.addEventListener('submit', function (event) {
        if (!validatePhone(phoneInput.value)) {
            event.preventDefault()
            phoneError.textContent = 'Please enter a valid phone number'
        }
    })
})
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cateringForm')
    const firstNameInput = document.getElementById('name')
    const nameError = document.getElementById('nameError')
    const phoneInput = document.getElementById('phone')
    const phoneError = document.getElementById('phoneError')
    const submitButton = form.querySelector('button[type="submit"]')

    function validatePhone(phone) {
        // This regex allows for various phone number formats
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        return phoneRegex.test(phone)
    }
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s'-]+$/
        return nameRegex.test(name)
    }

    function validateForm() {
        let isValid = true
        const requiredInputs = form.querySelectorAll(
            'input[required], select[required]'
        )

        requiredInputs.forEach((input) => {
            if (!input.value.trim()) {
                isValid = false
            }
        })

        if (!validateName(firstNameInput.value)) {
            isValid = false
            nameError.textContent = 'Please enter a valid name'
        } else {
            nameError.textContent = ''
        }

        if (!validatePhone(phoneInput.value)) {
            isValid = false
        }

        submitButton.disabled = !isValid
        return isValid
    }

    form.addEventListener('input', validateForm)

    firstNameInput.addEventListener('input', function () {
        if (validateName(this.value)) {
            nameError.textContent = ''
            this.setCustomValidity('')
        } else {
            nameError.textContent = 'Please enter a valid name'
            this.setCustomValidity('Invalid first name')
        }
        validateForm()
    })

    phoneInput.addEventListener('input', function () {
        if (validatePhone(this.value)) {
            phoneError.textContent = ''
            this.setCustomValidity('')
        } else {
            phoneError.textContent = 'Please enter a valid phone number'
            this.setCustomValidity('Invalid phone number')
        }
        validateForm()
    })

    form.addEventListener('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault()
            phoneError.textContent = 'Please enter a valid phone number'
        }
    })

    // Initial validation
    validateForm()
})

/* Form Validation */
document
    .getElementById('cateringForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault()

        const submitButton = e.target.querySelector('button[type="submit"]')
        submitButton.disabled = true // Disable the submit button to prevent multiple submissions

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            numberOfPeople: document.getElementById('numberOfPeople').value,
            typeOfEvent: document.getElementById('typeOfEvent').value,
        }

        try {
            const response = await fetch(
                'https://cuppino.it/.netlify/functions/submit-form',
                {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.ok) {
                // Show the confirmation modal
                const modal = document.getElementById('confirmationModal')
                modal.style.display = 'block'

                // Close the modal when the close button is clicked
                document.getElementById('closeModal').onclick = function () {
                    modal.style.display = 'none'
                }

                // Close the modal when clicking outside of the modal content
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = 'none'
                    }
                }

                document.getElementById('cateringForm').reset()
            } else {
                alert(
                    'There was an error submitting your form. Please try again.'
                )
            }
        } catch (error) {
            console.error('Error:', error)
            alert('There was an error submitting your form. Please try again.')
        } finally {
            submitButton.disabled = false // Re-enable the submit button
        }
    })
/* Form Validation */
document
    .getElementById('cateringForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            numberOfPeople: document.getElementById('numberOfPeople').value,
            typeOfEvent: document.getElementById('typeOfEvent').value,
        }

        try {
            const response = await fetch('/.netlify/functions/submit-form', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            })
        } catch (error) {
            console.error('Error:', error)
            alert('There was an error submitting your form. Please try again.')
        }
    })
