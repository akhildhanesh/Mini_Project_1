const { google } = require('googleapis')
const path = require('path');
const fs = require('fs');
const key = require("./token.json")
const drive = google.drive("v3")
const crypto = require('crypto')
const { date } = require('./date')
const { getTime } = require('./time')


let jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ["https://www.googleapis.com/auth/drive"],
    null
)

jwToken.authorize((authErr) => {
    if (authErr) {
        console.log("error : " + authErr);
        return;
    } else {
        console.log("Authorization accorded");
    }
})

let upload = async (file_name) => {

    let name = `${date()}_${getTime()}_${crypto.randomBytes(10).toString('hex')}`
    let file_mime = 'image/png'

    let folderId = "1UGAVpaxGM943cqGcVahebaVmICU_v5jd"
    let fileMetadata = {
        'name': name,
        parents: [folderId]
    };
    let media = {
        mimeType: file_mime,
        body: fs.createReadStream(path.join(__dirname, './image/' + file_name))
    };

    let data = drive.files.create({
        auth: jwToken,
        resource: fileMetadata,
        media: media,
        fields: 'id'
    })
        .catch(console.log)
    
    return await data
}

module.exports = upload
