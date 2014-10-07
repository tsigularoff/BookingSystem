app.controller('HotelsListController', function ($scope, hotelsData) {

    hotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
        }, function (err) {
            console.log("error + " +  err);
        })
});
