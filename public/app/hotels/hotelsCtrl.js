app.controller('HotelsController', function ($scope, HotelsData, identity) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
            $scope.isAuth = identity.isAuthenticated();
        }, function (err) {
            console.log("error + " +  err);
        })
});
