describe('posts.svc', function () {
	
	var PostSrvc, $httpBackend;

	beforeEach(function () {
		module('socialApp');
		inject(function (_PostSrvc_, _$httpBackend_) {
			PostSrvc = _PostSrvc_;
			$httpBackend = _$httpBackend_;

		});
	});

	afterEach(function () {
		$httpBackend.flush();
	});

	describe('#fetch', function () {

		beforeEach(function () {
			$httpBackend.expect('GET', '/api/posts')
			.respond([
				{ username: 'aronrodrigues', body: 'first post' },
				{ username: 'aronrodrigues', body: 'second post' }
			]);
		})

		/*it ('exists', function () {
			expect(PostSrvc).to.exists;
		});*/

		it('gets 2 posts', function () {
			PostSrvc.fetch().success(function (posts) {
				expect(posts).to.have.length(2);
			});
		});
	});

	describe('#create', function () {

		beforeEach(function () {
			$httpBackend.expect('POST', '/api/posts')
			.respond({ username: 'aronrodrigues', body: 'created post' });
		});

		it('gets 2 posts', function () {
			PostSrvc.create({ body: 'sample body' }).success(function (post) {
				expect(post.body).to.be.equals('created post');
			});
		});
	});

});