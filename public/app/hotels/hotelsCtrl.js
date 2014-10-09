app.controller('HotelsController', function ($scope, $location, HotelsData, identity, auth) {

    HotelsData.getAllHotels()
        .then(function (data) {
            $scope.hotels = data;
            $scope.isAuth = identity.isAuthenticated();
            $scope.isHotelOwner = identity.isAuthorizedForRole('owner');
        }, function (err) {
            console.log("error + " +  err);
        });

    $scope.createHotel = createHotel;

    function createHotel(data){
        data.userRating = 0;
        HotelsData.createHotel(data)
            .then(function (data) {
                $location.path('/');
            })
    }
});
