var assert = require('assert');
var request = require('request');

describe('API Tests', function() {
  var url ="http://localhost:3000/addTwonumbers/3/5";

  it('Should return the sum', function(done) {
    request(url, function(error, response, body){
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('Status code 400', function(done) {
    var url ="http://localhost:3000/addTwonumbers/abc/xyz";
    request(url, function(error, response, body){
      assert.equal(response.statusCode, 400); 
      done();
    });
  });

  it('returns 8', function(done) {
    request(url, function(error, response, body){
        body= JSON.parse(body)
        assert.equal(typeof body.result, 'number');
        done();
    });
  });

});