var db = require('../../db');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = require('chai').expect;
var Post = require('../../models/post');

describe('making a post', function () {

  beforeEach(function (done) {
    Post.remove({}, done);
  });

  it('logs in and creates a new post', function () {

    // go to home page
    browser.get('http://localhost:3001');

    // click login
    element(by.css('nav .mnu-login')).click();

    // fill out and submit login form
    element(by.model('username')).sendKeys('dickeyxxxx');
    element(by.model('password')).sendKeys('pass');
    element(by.css('form .btn')).click();

    // submit a new post on the posts page
    var post = 'My new post (' + Math.random() + ') at ' + Date.now();
    element(by.model('postBody')).sendKeys(post);
    element(by.css('form .btn')).click();

    // the user should now see ther post as the first post on the page
    /*element.all(by.css('ul.list-group li')).first().getText().then(function (text) {
      expect(text).to.contain(post);
    });*/
    expect(element.all(by.css('ul.list-group li')).first().getText()).to.eventually.contain(post);

  });

});
