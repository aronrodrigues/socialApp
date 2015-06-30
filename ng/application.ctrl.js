(function () {

  angular.module('socialApp')
  .controller('ApplicationCtrl', function ($scope) {
    $scope.$on('login', function (_, user) {
      $scope.currentUser = user;
    });
  });
})();
