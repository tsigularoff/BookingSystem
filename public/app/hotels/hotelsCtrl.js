app.controller('HotelsController', function ($scope, $location, HotelsData, identity, auth) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
            $scope.isAuth = identity.isAuthenticated();
            $scope.isHotelOwner = identity.isAuthorizedForRole('hotelOwner');
            console.log( $scope.isHotelOwner);
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
