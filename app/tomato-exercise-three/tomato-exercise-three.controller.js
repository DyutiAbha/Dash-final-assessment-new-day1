(function() {
    'use strict';

    angular
        .module('app')
        .controller('TomatoExerciseThreeController', TomatoExerciseThreeController);
    
    TomatoExerciseThreeController.$inject = [
        '$scope', 'restService', '$q'
    ];

    function TomatoExerciseThreeController($scope, restService, $q) {
        var vm = this;

        activate();

        function activate() {
            $q.all([
                getExerciseThreeData(),
                SumByOrdersExercise3(),
                GroupbyOrdersExcercise3()
            ]).then(activateComplete);

            function activateComplete(results) {
                vm.data = results[0];
                //-----
            }
        }

        function getExerciseThreeData() {
            return restService.getExerciseThreeData().then(function(response) {
                return response;
            });
        }

        //Add your code below.
   
        function SumByOrdersExercise3(){
             return restService.getExerciseThreeData().then(function(exThreeData) {
                 console.log("exThreeData", exThreeData);

                 $scope.Countries = exThreeData[0];
                 $scope.tomatoes = exThreeData[1];
                 $scope.statuses = exThreeData[2];
                 $scope.orders = exThreeData[3];

                 console.log("countries", $scope.countries);
                 console.log("tomatoes", $scope.tomatoes);
                 console.log("statuses", $scope.statuses);
                 console.log("orders", $scope.orders);

                 //code starts
                $scope.finalMergedValues = _($scope.orders.orders).groupBy('Countries.ID').map(function(item, itemId) {
				var obj = [];
                var countryName = _($scope.Countries.countries).filter({ID: parseInt(itemId)}).value()[0].Title;
                obj.push(countryName, _(item).sumBy('Qty'));
                return obj;
                }).fromPairs().value(); 

            console.log("FORMAT TWO: Total Tomatoes Ordered by Country ", $scope.finalMergedValues);
            //code ends

                return exThreeData;
            });

         }

         function GroupbyOrdersExcercise3(){
             return restService.getExerciseThreeData().then( function (responseData) {
            var aggregateData = _(responseData[3].orders).groupBy('Countries.ID').map(function(item, itemId) {
                var obj = [];
                var countryName = _(responseData[0].countries).filter({ID: parseInt(itemId)}).value()[0].Title;
                _.forEach(item, function(element) {
                    element['Countries'] = _(responseData[0].countries).filter({ID: parseInt(itemId)}).value();
                    element['Tomato'] = _(responseData[1].tomatoes).filter({ID: parseInt(element.Tomato.ID)}).value();
                    element['Status'] = _(responseData[2].statuses).filter({ID: parseInt(element.Status.ID)}).value();
                });
                obj.push(countryName, item);
                return obj;
            }).fromPairs().value();
            console.log("FORMAT ONE: Orders by Country Details", aggregateData);
            return aggregateData;
            return responseData;
   });
            
         }

    }
})();
