const axios = require('axios')
require('dotenv').config()

let send = (link) => {
    let url = new URL(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${link}`)
    
    axios.get(url.href)
        .then(() => console.log('success'))
        .catch(() => console.log('error'))
}

module.exports = send
