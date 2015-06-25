(function () {
  
  var app = angular.module('socialApp');

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
