(function () {

  var app = angular.module('app', []);
  app.controller('PostCtrl', function ($scope, PostSrvc) {
    
    $scope.posts = [];

    $scope.addPost = function () {

      if ($scope.postBody) {

        PostSrvc.create({
          username: 'dickeyxxx',
          body: $scope.postBody
        }).success(function (post) {

          $scope.posts.unshift(post);
          $scope.postBody = null;

        });

      }

    };

    function activate() {
      PostSrvc.fetch().success(function (posts) {
        $scope.posts = posts;
      });
    }

    activate();

  });

  app.service('PostSrvc', function ($http) {
    var srvc = this;

    srvc.fetch = function () {
      return $http.get('/api/posts');
    };

    srvc.create = function (post) {
      return $http.post('/api/posts', post)
    };

    return srvc;

  });

})();
