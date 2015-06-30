(function () {

  var app = angular.module('socialApp');

  app.controller('PostCtrl', function ($scope, PostSrvc) {
      
    $scope.posts = [];

    $scope.addPost = function () {

      if ($scope.postBody) {

        PostSrvc.create({
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

})();
