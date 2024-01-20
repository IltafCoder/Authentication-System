
const registerUser = () => {
    
    const u_n = document.querySelector('input[type=text]').value
    const u_p = document.querySelector('input[type=password]').value
    const c = document.querySelector('input[type=checkbox]')

    if (u_n === '' && u_p !== '') {
        accessError('input[type=text]', false)
    }
    else if (u_p === '' && u_n !== '') {
        accessError(false, 'input[type=password]')
    }
    else if (u_n === '' && u_p === '') {
        accessError('input[type=text]', 'input[type=password]')
    }
    else if (!c.checked) {
        const x = document.querySelector('#signup-form > div')
        x.style.border = '2px solid red'
        setTimeout(() => {
            x.style.border = '2px solid transparent'
        }, 1000)
    }
    else {
        let f = document.getElementById('signup-form')

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.querySelector('input[type=text]').value.toLowerCase().trim(),
                password: document.querySelector('input[type=password]').value.toLowerCase().trim(),
            }),
        }).then(response => {
            if (!response.ok) {
                console.log("Error occured")
            }

            return response
            

        }).then(() => {
            document.getElementsByClassName('form')[0].style.display = 'none'
            document.getElementsByClassName('signup-msg')[0].style.display = 'flex'
        })
    }

}

const loginUser = () => {

    const u_n = document.querySelector('input[type=text]').value.toLowerCase().trim()
    const u_p = document.querySelector('input[type=password]').value.toLowerCase().trim()

    if (u_n === '' && u_p !== '') {
        accessError('input[type=text]', false)
    }
    else if (u_p === '' && u_n !== '') {
        accessError(false, 'input[type=password]')
    }
    else if (u_n === '' && u_p === '') {
        accessError('input[type=text]', 'input[type=password]')
    }
    else {

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': u_n,
                'password': u_p
            })
        }).then(response => {
            if (!response.ok) {
                console.log("Error occured")
            }

            return response.json()
            
        }).then((a) => {

            if (a.user_status === 1) {
                document.getElementsByClassName('form')[0].style.display = 'none'
                document.getElementsByClassName('login-msg')[0].style.display = 'flex'
            }
            else {
                const x = document.querySelector('.form')
                x.style.boxShadow = '0 0 10px red'
                setTimeout(() => {
                    x.style.boxShadow = '0 0 10px rgba(0, 221, 255, 0.8)'
                }, 2000)
            }
        })
    }

}

const accessError = (e1, e2) => {

    if (e1 && e2 === false) {

        const x = document.querySelector(e1)

        x.style.backgroundColor = 'rgb(117, 0, 0)'
        setTimeout(() => {
            x.style.backgroundColor = 'var(--gray-light)'
        }, 1000)

    }
    else if (e1 === false && e2) {

        const x = document.querySelector(e2)

        x.style.backgroundColor = 'rgb(117, 0, 0)'
        setTimeout(() => {
            x.style.backgroundColor = 'var(--gray-light)'
        }, 1000)

    }
    else {

        const x = document.querySelector(e1)
        const y = document.querySelector(e2)

        x.style.backgroundColor = 'rgb(117, 0, 0)'
        y.style.backgroundColor = 'rgb(117, 0, 0)'
        setTimeout(() => {
            x.style.backgroundColor = 'var(--gray-light)'
            y.style.backgroundColor = 'var(--gray-light)'
        }, 1000)
    }

}