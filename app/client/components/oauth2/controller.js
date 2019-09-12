'use strict';
const request = require('request');
const content = require('./content');
const express = require('express');
const router = express.Router();
const config = require('../../../config/config');

const fs = require('fs');
const path = require('path');
const storeData = (data, filename) => {
  try {
    let filepath = path.resolve(process.cwd(), filename);
    fs.writeFileSync(filepath, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

router.get('/oauth/authorize', (req, res) => {

  var message = "Bogus request detected";

  //console.log("query: ", req.query);

  if (req.query.state && req.query.state.indexOf("BBP2019") !== -1) {
    // got short term auth code
    if (req.query.code) {

      var url = "https://api.medium.com/v1/tokens";
      var oauth = {
        code: req.query.code,
        client_id: config.medium.client_id,
        client_secret: config.medium.client_secret,
        grant_type: "authorization_code",
        redirect_uri: "https://www.thebetterbecauseproject.org/oauth/authorize"
      };
      //console.log(url, oauth);

      request.post(url, {form: oauth}, (error, response, body) => {

        //console.log(body);

        if (body.token_type && body.token_type.indexOf("Bearer") !== -1) {
          storeData(body, "tokens.json");
        }
      });
      message = "Authorization successful";
    }
  }
  else {
    // some type of error happened or bogus request
    if (req.query.error && req.query.error.indexOf("access_denied") !== -1) {
      message = "Access denied";
    }
  }
  console.log(`/oauth/authorize: `, message)
  res.render('oauth', {
    content: content,
    message: message
  })
});

module.exports = router;
