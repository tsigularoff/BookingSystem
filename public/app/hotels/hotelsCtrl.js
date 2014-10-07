app.controller('HotelsController', function ($scope, $location, HotelsData, identity) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
            $scope.isAuth = identity.isAuthenticated();
        }, function (err) {
            console.log("error + " +  err);
        });

    $scope.createHotel = createHotel;

    function createHotel(data){
        HotelsData.createHotel(data)
            .then(function (data) {
                $location.path('/');
            })
    }
});
