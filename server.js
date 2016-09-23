/**
 * Created by Irin on 22/09/2016.
 */
var connect = require('connect');
var url = require('url');
var accounting = require('accounting');

var app = connect();
//set server to handle http requests
//get variables from URL
var errorResponse = function (req, res, next){
  res.end('Error, please use \n' +
      '?method=(add/subtract/multiply/divide)' +
      '&x=(number)&y=(number)');
};
var calculateMath = function (req, res, next) {
    //get values from URL querystring ?
    var queryString = url.parse(req.url,true).query;
    var method = queryString.method;
    var x = queryString.x;
    var y = queryString.y;
    var result = 0;
    var mathSymbol = '';
    //switch statement
    switch(method){
        case 'add':
            mathSymbol = '+';
            result = parseInt(x)+parseInt(y);
            break;
        case 'subtract':
            mathSymbol = '-';
            result = parseInt(x)-parseInt(y);
            break;
        case 'multiply':
            mathSymbol = '*';
            result = parseInt(x)*parseInt(y);
            break;
        case 'divide':
            mathSymbol = '/';
            result = parseInt(x)/parseInt(y);
            break;

    }
    //display values
    res.end(x+' '+mathSymbol+' '+y+' = '+result);
};

//use function for response
app.use('/lab3',calculateMath);
//default response last
app.use(errorResponse);

app.listen(3000);
console.log('Server running on port 3000');
