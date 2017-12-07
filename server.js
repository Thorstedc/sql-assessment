const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost', //host,
  port: 5432,//port,
  database: 'assessbox',//database,
  user: 'postgres',//user,
  password: 'password'//password
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('hello from User table');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('hello from Vehicle table');
    })
  })

})


// ===== Build enpoints below ============

app.get('/api/users', mainCtrl.getAllUsers);
app.get('/api/vehicles', mainCtrl.getAllVehicles);
app.get('/api/user/:id/vehiclecount', mainCtrl.getCountCarsByID);
app.get('/api/user/:id/vehicle', mainCtrl.getCarsByUserID);
app.get('/api/newervehiclesbyyear', mainCtrl.getVehiclesByYear);
app.get('/api/vehicle', mainCtrl.getQuery);

app.put('/api/vehicle/:vid/user/:uid', mainCtrl.UpdateVehicleOwner);

app.post('/api/users', mainCtrl.addUser);
app.post('/api/vehicles', mainCtrl.addVehicle);

app.delete('/api/user/:uid/vehicle/:vid', mainCtrl.DeleteOwnership);
app.delete('/api/vehicle/:id', mainCtrl.DeleteVehicleByID);






// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
