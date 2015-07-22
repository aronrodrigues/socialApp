var expect = require('chai').expect;
var api = require('../../support/api');
var user = require('../../support/user');
var Post = require('../../../../models/post');

describe('controllers.api.posts', function () {

  beforeEach(function (done) {
    Post.remove({}, done);
  });

  describe('GET /api/posts', function (done) {

    beforeEach(function (done) {
      var posts = [
        { body: 'post1', username: 'aronrodrigues' },
        { body: 'post2', username: 'aronrodrigues' },
        { body: 'post3', username: 'aronrodrigues' }
      ];

      Post.create(posts, done);

    });

    it('returns 200', function (done) {
      api.get('/api/posts')
      .expect(200)
      .expect(function (response) {
        expect(response.body.length).to.be.equals(3);
      })
      .end(done);
    });

  });

  describe('POST /api/posts by the book.', function (done) {

    var token;

    beforeEach(function (done) {
      
      user.create('aronrodrigues', 'pass', function (err, user) {
        
        if (!err) {
          token = user.token;
        }

        done(err);
      
      });

    });

    beforeEach(function (done) {
      api.post('/api/posts')
      .send({ body: 'this is my new post' })
      .set('X-Auth', token)
      .expect(201)
      .end(done);
    });

    it('returns 201 and creates the post', function (done) {
      Post.findOne(function (err, post) {
        
        if (!err) {
          expect(post.body).to.equal('this is my new post')
        }

        done(err);
      
      });
    });

  });

  describe('POST /api/posts by myself.', function (done) {

    var token, body;

    beforeEach(function (done) {
      
      user.create('aronrodrigues', 'pass', function (err, user) {
        
        if (!err) {
          token = user.token;
          body = 'My new post (' + Math.random() + ') at ' + Date.now();
        }

        done(err);
      
      });

    });

    /*beforeEach(function (done) {
      api.post('/api/posts')
      .send({ body: 'this is my new post' })
      .set('X-Auth', token)
      .expect(201)
      .end(done);
    });*/

    it('returns 201 and creates the post', function (done) {

      api.post('/api/posts')
      .send({ body: 'this is my new post' })
      .set('X-Auth', token)
      .expect(201)
      .end(function (err) {
        if (err) return done(err);
        Post.findOne(function (err, post) {
          if (!err) {
            expect(post.body).to.equal('this is my new post')
          }
          done(err);
        });
      });
      
    });

  });
  
});
