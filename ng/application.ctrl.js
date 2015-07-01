(function () {

  angular.module('socialApp')
  .controller('ApplicationCtrl', function ($scope) {
    $scope.$on('login', function (_, user) {
      $scope.currentUser = user;
    });
    $scope.$on('logout', function () {
      console.log('Logged out');
      $scope.currentUser = null;
    });
  });
})();
