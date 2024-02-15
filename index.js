import express from 'express';
import axios from 'axios';

//Instantiate express
const app = express();
const port = 3000;

//set EJS as view engine
app.set('view engine', 'ejs');

//use static files in express
app.use(express.static('public'));

//express built-in middleware
app.use(express.urlencoded({ extended: true }));

//route handler in express "GET" Method
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://bored-api.appbrewery.com/random');
    const result = response.data;
    res.render('index', { data: result });
  } catch (error) {
    console.log(`Failed to make request : ${error.message}`);
    res.render('index', { error: error.message });
  }
});

//route handler in express "POST" Method
app.post('/', async (req, res) => {
  const { type } = req.body;
  const { participants } = req.body;
  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    const randomResultIndex = Math.floor(result.length * Math.random());
    res.render('index', { data: result[randomResultIndex] });
  } catch (error) {
    console.log(`Failed to make request : ${error.message}`);
    res.render('index', { error: 'No activities that match your criteria.' });
  }
});

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
