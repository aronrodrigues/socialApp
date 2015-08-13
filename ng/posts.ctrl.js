(function () {

  var app = angular.module('socialApp');

  app.controller('PostCtrl', function ($scope, PostSrvc) {
    $scope.posts = [];

    $scope.addPost = function () {
      if ($scope.postBody) {

        PostSrvc.create({
          body: $scope.postBody
        }).then(function (res) {

          $scope.posts.unshift(res.data);
          $scope.postBody = null;

        });

      }

    };

    function activate() {
      PostSrvc.fetch().then(function (res) {
        $scope.posts = res.data;
      });
    }

    activate();

  });

})();
