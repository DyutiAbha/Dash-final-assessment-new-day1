(function() {
    'use strict';

    angular
        .module('app')
        .factory('restService', restService);
    
    restService.$inject = ['$http'];

    function restService($http) {
        var service = {
            getTomatoes: getTomatoes,
            getFarms: getFarms,
            getExerciseThreeData: getExerciseThreeData,
            getAnnouncements: getAnnouncements,
            getAnnouncementsOwners: getAnnouncementsOwners
        };

        return service;

        function getTomatoes() {
            return $http({
                method: 'GET', 
                url: 'http://localhost:3000/tomatoes'
            }).then(function(response) {
                return response.data;
            });
        }

        function getFarms() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/farms'
            }).then(function(response) {
                return response.data;
            });
        }

        function getExerciseThreeData() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/exerciseThreeData'
            }).then(function(response) {
                return response.data;
            });
        }

        //Add your code here.
        function getAnnouncements() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/announcements'
            }).then(function(response) {
                return response.data;
            });
        }

        function getAnnouncementsOwners() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/owners'
            }).then(function(response) {
                return response.data;
            });
        }
    }
})();