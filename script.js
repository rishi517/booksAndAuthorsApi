const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
const sql = require('mysql2')
app.use(express.json());

const con = sql.createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "mydb"
})

con.connect();


 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
});
 
app.get('/api/book', (req,res)=> { 
    con.query('call getBooks()', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
      });

});

app.get('/api/author', (req,res)=> { 
    con.query('call getAuthors()', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
      });

});

 app.get('/api/person', (req, res)=> {
    con.query('call getPersons()', function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
      });
 });

 app.get('/api/person/:id', (req, res)=> {
    con.query('call getPerson(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;
        
        res.send(results);
      });
 })

app.get('/api/book/:id', (req, res) => { 
    con.query('call getBook(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        if (results.length == 0) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
        else res.send(results);
    });
    
});

app.get('/api/person/:id', (req, res) => { 
    con.query('call getAuthor(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        if (results.length == 0) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
        else res.send(results);
    });
    
});


app.get('/api/book/:id/authors', (req, res) => {    
    con.query('call getBookAuthors(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        if (results.length == 0) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
        else res.send(results);
    });
    
});
 
//CREATE Request Handler
app.post('/api/book', (req, res)=> {

    const title = req.body.name
 
    con.query('call insertBook(?)', title, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });

    });

app.post('/api/person', (req, res)=> {

    const name = req.body.name
    con.query('call insertPerson(?)', name, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });

    });

app.post('/api/author', (req, res)=> {

    const bookId = req.body.bookId;
    const personId = req.body.personId;
    con.query('call insertAuthor(?,?)', [bookId, personId], function (error, results, fields) {
            if (error) throw error;
    
            res.send(results);
        });
    
        });

 
//UPDATE Request Handler
app.put('/api/book/:id', (req, res) => {
    con.query('call updateBook(?,?)', [req.params.id, req.body.name], function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
});

app.put('/api/person/:id', (req, res) => {
    con.query('call updatePerson(?,?)', [req.params.id, req.body.name], function (error, results, fields) {
        console.log(error)
        if (error) throw error;

        res.send(results);
    });
});

//DELETE Request Handler
app.delete('/api/author/:id', (req, res) => {
    con.query('call deleteAuthor(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
      
});


app.delete('/api/person/:id', (req, res) => {
    con.query('call deletePerson(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
      
});

app.delete('/api/book/:id', (req, res) => {
    con.query('call deleteBook(?)', req.params.id, function (error, results, fields) {
        if (error) throw error;

        res.send(results);
    });
      
});

 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
