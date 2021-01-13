import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 5000;
app.use(cors());
 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Read cards
app.get('/api/cards', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if(err) {
            console.log(err);
        } else {
            try {
                const list = JSON.parse(data);
                res.json(list);
            } catch (error) {
                console.log('Error parsing JSON', error);
            }
        }
    });
});

// Create Card
app.post('/api/cards/', (req, res) => {

    let cartObj;

    fs.readFile('data.json', 'utf8', (err, data) => {
        
        if(err) return res.status(500).send('Something went wrong');

        cartObj = JSON.parse(data);
        const date = Date.now();

        cartObj.push({ 
            id: date,
            message : req.body.message 
        });

        const newData = JSON.stringify(cartObj , null , 2);

        fs.writeFile('data.json',  newData , (err, data) =>{
            if(err) return res.status(400).send('Something went wrong');
            res.status(201).send("Card created succesfully");
        });
    });
});

//Delete card
app.delete('/api/card/:id', (req, res) => {

    let cartObj;

    const selectedCard = req.params.id;
   
    fs.readFile('data.json', 'utf8' , (err, data) => {

        cartObj = JSON.parse(data);

        const deleteCard = cartObj.find(c => c.id == selectedCard);
        if(!deleteCard) return res.status(400).send('No card found');

        const index = cartObj.indexOf(deleteCard);
        cartObj.splice(index , 1);
        
        const newData = JSON.stringify(cartObj , null , 2);
        fs.writeFile('data.json' ,  newData , (err, data) =>{
            if(err) return res.status(400).send('Something went wrong');
            res.status(200).send("Card deleted succesfully");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
});

