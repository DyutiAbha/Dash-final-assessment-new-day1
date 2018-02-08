angular
    .module('app')
    .config(['$routeProvider', function($routeProvider) {
        // Default application route
        $routeProvider
        // route for the home page
        // route for the about page
        .when('/Announcements', {
            templateUrl : './app/tomato-announcements/tomato-announcements-home.html',
            controller  : 'TomatoAnnouncementsHomeController',
            controllerAs: 'vm'
        });
    }]);