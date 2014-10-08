app.controller('MainCtrl', function($scope, HotelsData, StatisticsData) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
        }, function (err) {
            console.log(err);
        });

    StatisticsData.getStatistics()
        .then(function (data) {
            $scope.stats = data;
            console.log(data);
        }, function (err) {

        });

});