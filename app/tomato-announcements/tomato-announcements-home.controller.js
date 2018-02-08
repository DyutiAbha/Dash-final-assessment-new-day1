// Add your code here
(function() {
    'use strict';

    angular
        .module('app')
        .controller('TomatoAnnouncementsController', TomatoAnnouncementsController);
    
    TomatoAnnouncementsController.$inject = [
        '$scope', 'restService', '$q'
    ];

    function TomatoAnnouncementsController($scope, restService, $q) {
        var vm = this;
        vm.loading = false;
        vm.announcements = [];
        vm.owners = [];

        activate();
        
        function activate() {
            vm.loading = true;
            $q.all([
                getAnnouncements(),
                getAnnouncementsOwners(),
             ]).then(activateComplete);

            function activateComplete(results) {
                vm.announcements = results[0];
                vm.owners = results[1];
                vm.loading = false;
            }
        }

        function getAnnouncements() {
            return restService.getAnnouncements().then(function(announcements) {
                return announcements;
            });
        }

        function getAnnouncementsOwners() {
            return restService.getAnnouncementsOwners().then(function(owners) {
                return owners;
            });
        }

    }
})();