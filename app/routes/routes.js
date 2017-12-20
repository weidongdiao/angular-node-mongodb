'use strict';

// var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function(app,db) {
    // var clickHandler = new ClickHandler(db);
    var words = require(process.cwd() + '/app/controllers/words_controller');
    
    app.route('/')
        .get(function(req,res) {
            res.sendFile(process.cwd() + '/views/index.html');
        });
    
    // app.route('/weather')
    //     .get(weather.getWeather);
    app.route('/words')
    .get(words.getWords);
    // app.get('/words', words.getWords);
    // app.route('/api/clicks')
    // .get(clickHandler.getClicks);
};