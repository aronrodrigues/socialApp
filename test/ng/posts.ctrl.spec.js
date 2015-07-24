describe('posts.ctrl', function () {

  var $scope, mockPostsSrvc;

  beforeEach(function () {
    module('socialApp');
    inject(function ($rootScope, $controller, $q) {

      mockPostsSrvc = {
        fetch: function () {
          var deferred = $q.defer();
          deferred.resolve([
            { username: 'aronrodrigues', body: 'first post' },
            { username: 'aronrodrigues', body: 'second post' }
          ]);

          return deferred.promise;
        }, create: sinon.stub().returns({then: sinon.spy()})
      };

      $scope = $rootScope.$new();
      $controller('PostCtrl', { $scope: $scope, PostSrvc: mockPostsSrvc });

    });
  });

  it ('loads posts from the service', function () {
    $scope.$digest();
    expect($scope.posts).to.have.length(2);
  });

  it('sends a new post to the service', function () {
    $scope.postBody = 'My new post';
    $scope.addPost();
    expect(mockPostsSrvc.create).to.have.been.calledWith({ body: 'My new post' });
  });

});