const { google } = require("googleapis")

const append = async (date, time, url) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "token.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    const authClientObject = await auth.getClient()

    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject })

    const spreadsheetId = "1j0lMaxoXwXw2NrbynbuhKfGb9imuNUzJ19M5esZGb9Y"


    await googleSheetsInstance.spreadsheets.values.append({
        auth, 
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[date, time, url]],
        },
    })

}

module.exports = append