const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

app.use((req, res) => {
  fs.writeFile('./server/config.json', JSON.stringify(req.body), 'utf8', function (error) {
    if (error) {
      console.log(error)
      return false
    }
    console.log('写入成功')
  })
  res.send(req.body)
})

app.listen(3001, () => console.log('server is listennng 3001'))