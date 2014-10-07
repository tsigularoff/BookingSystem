app.controller('MainCtrl', function($scope, HotelsData) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
            hotelsCache = data;
        }, function (err) {
            console.log(err);
        })
});