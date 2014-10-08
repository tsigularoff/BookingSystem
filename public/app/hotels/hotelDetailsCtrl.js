app.controller('HotelDetailsController', function ($scope, $location, $routeParams, identity, HotelsData, notifier, ratingService) {
    HotelsData.getHotelById($routeParams.id)
        .then(function (data) {
            $scope.hotel = data;
        }, function (err) {
            notifier.error('Please login first!');
            $location.path('/');
        });

    $scope.rate = rate;

    function rate(rate) {
        var ratingData = {
            hotelId: $routeParams.id,
            userId: identity.currentUser._id,
            rate : rate
        };

        ratingService.rateHotel(ratingData)
            .then(function (data) {
                if(data.isAlreadyRated){
                    notifier.error("You've already rated this hotel");
                } else{
                    $scope.hotel.star_rating = data.star_rating;
                }

            }, function (err) {
                console.log(err);
            })
    }
});
