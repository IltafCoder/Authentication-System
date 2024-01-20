
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const database = require('./database.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public','index.html'))
})

app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'public', 'signup.html'))
})

app.post('/signup', (req, res) => {

    const data = req.body
    const u_name = data.username
    const u_pass = data.password
   
    database.push({'username': u_name, 'password': u_pass})
    const database_string = JSON.stringify(database)

    try {
        fs.writeFile('./database.json', database_string, (err) => {
            if (err) {
                console.log("Error!")
            }
            else {
                console.log("Done!")
            }
        })
    }
    catch (error) {
        console.log(error)
    }

    res.status(200).sendFile(path.resolve(__dirname, 'public', 'signup.html'))

})

app.post('/login', (req, res) => {
    const data = req.body

    const u_name = data.username
    const u_pass = data.password

    const srch_qry = JSON.stringify({'username': u_name, 'password': u_pass})
   
    const database_string = JSON.stringify(database)

    let user_status = 0
    if (database_string.includes(srch_qry)) {
        user_status = 1
    }

    res.send({'user_status': user_status})

})


app.listen(port, () => {
    console.log('Server listening on port 5000...')
})