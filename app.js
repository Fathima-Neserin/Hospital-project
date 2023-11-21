const express = require('express');
const fs = require('fs');
const morgan =require('morgan');
const bodyParser=require('body-parser');
const app = new express();
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


app.use((req, res, next) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    req.data = JSON.parse(data);
    next();
  });
});

app.get('/',(req,res)=>{
    app.get('/', (req, res) => {
        res.json(req.data);
      });
})

app.use(bodyParser.json()); 

app.post('/add', (req, res) => {
    console.log(req.body);
  const newHospital = req.body;
  req.data.hospitals.push(newHospital);

  
  fs.writeFile('data.json', JSON.stringify(req.data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to data.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.json( 'Hospital added successfully');
  });
});


app.put('/update', (req, res) => {
  const patientCount = parseInt(req.params.patientCount);
  const updatedHospital = req.body;

  
  const HospitalIndex = req.data.hospitals.findIndex(hospitals => hospitals.patient-count === patientCount);

  if (userIndex === -1) {
    return res.status(404).json( 'Hospital not found' );
  }

  

  
  req.data.hospitals[hospitalIndex] = { ...req.data.hospitals[hospitalIndex], ...updatedHospital };

  console.log( req.data);


  fs.writeFile('data.json', JSON.stringify(req.data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to data.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.json('Hospital updated successfully');
  });
});

app.delete('/delete', (req, res) => {
  const hospitalName = parseInt(req.params.hospitalName);

  
  const hospitalIndex = req.data.hospitals.findIndex(hospital => hospital.name === hospitalName);

  if (hospitalIndex === -1) {
    return res.status(404).json(  'User not found' );
  }


  console.log( req.data);

  
  const deletedUser = req.data.hospitals.splice(hospitalIndex, 1)[0];

  
  console.log( req.data);

  
  fs.writeFile('./data.json', JSON.stringify(req.data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to data.json:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.json( 'Hospital deleted successfully');
  });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

