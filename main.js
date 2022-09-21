const express = require('express')
const app = express()
const trigger = require('./upload_photo')
const send = require('./send_msg')
const { date } = require('./date')
const { getTime } = require('./time')
const append = require('./update_db')
const fileUpload = require("express-fileupload")
const { rm } = require('fs/promises')
let LocalStorage = require('node-localstorage').LocalStorage
let localStorage = new LocalStorage('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload())

require('dotenv').config()

const PORT = process.env.PORT || 3000

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.")
    }

    const fileName = req.files.imageFile.md5.toString() + '.png'

    req.files.imageFile.mv(`${__dirname}/./image/${fileName}`)
    send('𝒔𝒐𝒎𝒆𝒐𝒏𝒆 𝒊𝒔 𝒂𝒕 𝒕𝒉𝒆 𝒅𝒐𝒐𝒓')
    trigger(fileName)
        .then(({ data }) => data.id)
        .then(id => {
            send('📅 ' + date() + '   ' + '🕑 ' + getTime() + '   ' + 'https://drive.google.com/uc?export=download%26id=' + id)
            append(date(), getTime(), 'https://drive.google.com/file/d/' + id + '/preview')
            rm(`./image/${fileName}`)
        })
    res.send('ok')
})

app.get('/gas-sensor/:value', (req, res) => {
    let gasLevel = req.params.value

    if (localStorage.getItem('value') == null) {
        localStorage.setItem('value', gasLevel)
        send('📅 ' + date() + '   ' + '🕑 ' + getTime() + '   ' + `Gas Leakage Detected => Intensity => ${req.params.value}`)
        // // axios.get(`https://maker.ifttt.com/trigger/gas-leakage/with/key/${process.env.IFTTT_API}?value1=${req.params.value}`)
        setTimeout(() => {
            localStorage.removeItem('value')
        }, 60000)
    }

    res.send('ok')
})

app.get('/esp32/:content', (req, res) => {
    let content = req.params.content
    console.log(content)
    if (localStorage.getItem('content') == null) {
        localStorage.setItem('content', content)
        // send('📅 ' + date() + '   ' + '🕑 ' + getTime() + '   ' + `Gas Leakage Detected => Intensity => ${req.params.value}`)
        send('📅 ' + date() + '   ' + '🕑 ' + getTime() + '   ' + content)
        setTimeout(() => {
            localStorage.removeItem('content')
        }, 60000)
    }
    res.send('ok')
})

app.listen(PORT, () => console.log(`🚀🚀🚀server running on port: ${PORT}`))
