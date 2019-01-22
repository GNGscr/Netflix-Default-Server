require('dotenv').config() 

const express = require('express');
const morgan = require('morgan')
const path = require('path')
const cors = require('cors');
const p = require( './server/utils/color_logger')(path.basename(__filename));
const asm = require('./server/utils/async_middleware');
const Main = require('./server/modules/main.model');
const db = require('./server/db/mongoose.connection')


// const port = process.env.PORT || 3000;

const { NODE_ENV, API_PORT, API_HOST } = process.env;


const app = express();
// app.use(cors())

// db.connect();
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.resolve('./build')))

// test routing
app.get('/api/', async (req, res) => {
  
  res.json("Dfdsfsdf")
});

app.get('/api/main', asm(async(req, res) => {
  await db.connect()
  const find = await Main.find({})
                          .select(`-_id 
                                  title 
                                  poster 
                                  descrition
                                  details
                                  trailer`) ;
  console.dir(find)
  res.json(find)
}));

// central error handling
app.use( (err, req, res, next) => {
  p.error(err)
  if(NODE_ENV === 'production')
      res.status(500).json({error:'internal server error'})
  else
      res.status(500).json({error:err.message,stack:err.stack})
})
//when no routes were matched...
app.use('*', (req, res) => {
  res.status(404).json({[req.url]:"not found"})
})

//connect to mongo db

//start the express api server
app.listen(API_PORT,API_HOST, (error) => {
    if(error) p.error(error)
    else p.magenta(`express api is live  ✨ ⚡ http://${API_HOST}:${API_PORT} ✨ ⚡`)
});
