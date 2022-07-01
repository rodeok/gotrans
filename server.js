const PORT = 9000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/languages', async (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'https://google-translate20.p.rapidapi.com',
      'x-rapidapi-key': '7a1254c861msh9e205c8f2248a7bp16db68jsn32aab7daf18d',
    },
  }

  try {
    const response = await axios(
      'https://google-translate20.p.rapidapi.com/translate',
      options
    )
    const arrayOfData = Object.keys(response.data.data).map(
      (key) => response.data.data[key]
    )
    res.status(200).json(arrayOfData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

app.get('/translation', async (req, res) => {
  const { textToTranslate, outputLanguage, inputLanguage } = req.query

  const options = {
    method: 'GET',
    params: {
      text: textToTranslate,
      tl: outputLanguage,
      sl: inputLanguage,
    },
    headers: {
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
    },
  }

  try {
    const response = await axios(
      'https://google-translate20.p.rapidapi.com/translate',
      options
    )
    res.status(200).json(response.data.data.translation)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))
