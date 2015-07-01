(function () {

  angular.module('socialApp')
  .service('loginSrvc', function ($http) {

    var srvc = this;

    srvc.getUser = function () {
      return $http.get('/api/users');
    };

    srvc.login = function (username, password) {
      return $http.post('/api/sessions', {
        username: username, password: password
      }).then(function (val) {
        srvc.token = val.data;
        $http.defaults.headers.common['X-Auth'] = val.data;
        return srvc.getUser();
      });
    };

    srvc.logout = function () {
      srvc.token = null;
      delete $http.defaults.headers.common['X-Auth'];
    };

    return srvc;

  });

})();