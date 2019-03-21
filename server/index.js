const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const worship_controller = require('./worship_controller');
const outreach_controller = require('./outreach_controller');
const events_controller = require ('./events_controller')
const creds = require('./email_configuration');
const session = require('express-session');
const axios = require('axios');
const stripe = require("stripe")("sk_test_p1Bp9R0v7vhzSs0hhlBuofrA");
const nodemailer = require('nodemailer');
const auth_controller = require('./auth_controller')

const app = express();
app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

massive (process.env.CONNECTION_STRING).then(database => {
  app.set('db', database)
  console.log('Database is kickin')
}).catch(error => console.log(error, 'Unexpected error with database'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

app.get('/auth/callback', (req, res) => {
  console.log('hello')
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    console.log('trade code for access token')
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
  }

  function tradeAccessTokenForAdminInfo(accessTokenResponse) {
    console.log('trade access token for admin')
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
  }

  function storeAdminInfoDatabase(response) {
    console.log('store admin info db')
    const auth0Id = response.data.sub;
    console.log(auth0Id)
    const db = req.app.get('db');
    return db.get_admin(auth0Id).then(admins => {
      console.log('admin =========>', admins[0])
      if(admins.length) {
        const admin = admins[0];
        req.session.admin = admin;
        console.log('still working')
        res.redirect('/');
      } else {
        const adminArray = [
          auth0Id,
          response.data.name,
          response.data.email
        ];
        console.log(response.data, auth0)
        console.log('second still workings')
        return db.create_admin(adminArray).then(newAdmin => {
        console.log(newAdmin, 'create admin has fired')
        req.session.admin = newAdmin;
        res.redirect('/');
        }).catch(error => {
          console.log('error in db.get_admin', error);
          res.status(500).send('Unexpected error');
        })
      }
    }).catch(error => {
      console.log('error in db.get_admin', error);
      res.status(500).send('Unexpected error');
    })
  }

  tradeCodeForAccessToken()
    .then(tradeAccessTokenForAdminInfo)
    .then(storeAdminInfoDatabase)
    .catch(error => {
      console.log('Server error', error)
      res.status(500).send('An error occurred on the server. Check terminal')
    });
});


/* NodeMailer Endpoint */
var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

app.post('/send', (req, res, next) => {
  console.log(req.body)
  var name = req.body.name
  var email = req.body.email
  var phone = req.body.phone
  var message = req.body.message
  var content = `<h1 style="font-weight: bold; color: blue"> Name: ${name} </h1> \n <h2><i>Email:</i></h2> ${email} \n <h3><u>Phone:</u></h3> ${phone} \n <h4>Message:</h4> ${message} `

  var mail = {
    from: name,
    to: creds.USER,  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content,
    html: `${content}`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

/*Stripe Endpoint*/

app.post("/charge", async (req, res) => {
  let {amount} = req.body;
  console.log('amount', +req.body.amount)
  console.log('')
  console.log('test')
  try {
    let {status} = await stripe.charges.create({
      amount: +amount,
      currency: "usd",
      description: "An example charge",
      source: req.body.id
    });
    console.log('status]===========' ,status)

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});



/* Worship Controller: Render in Worship Team */
app.get('/api/worship', worship_controller.get)
app.post('/api/worship', worship_controller.post)
app.put('/api/worship/:id', worship_controller.update)
app.delete('/api/worship/:id', worship_controller.delete)

/* Outreach Controller: Render in Outreach*/
app.get('/api/outreach', outreach_controller.get)
app.post('/api/outreach', outreach_controller.post)
app.put('/api/outreach/:id', outreach_controller.update)
app.delete('/api/outreach/:id', outreach_controller.delete)

/* Events Controller: Render in  Calendar */
app.get('/api/events', events_controller.get)
app.post('/api/events', events_controller.post)
app.put('/api/events/:id', events_controller.update)
app.delete('/api/events/:id', events_controller.delete)

app.get('/api/admin-data', (req, res) => {
  console.log(req.session.admin)
  res.json(req.session.admin);
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

const path = require('path')
app.get('*', (req, res)=>{
 res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 7300;
app.listen(PORT, () => {
  console.log('Soaring on Port 7300 🚀 ')
})
