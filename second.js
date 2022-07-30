const express = require('express')
const app = express()
const port=3001

app.get('/', async (req,res)=>{
  const {data} = await axios.get('http://localhost:3001')
  res.send('Hi from second!')
})
app.listen(port, ()=>{
  console.log(`Exmple app listening port ${port}`)
})
