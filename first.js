const {default: axios} = require('axios')
const express = require('express')
const app = express()
const port=3000

app.get('/', async (req,res)=>{
  const {data} = await axios.get('http://localhost:3001')
  res.send(data)
})
app.listen(port, ()=>{
  console.log(`Exmple app listening port ${port}`)
})
