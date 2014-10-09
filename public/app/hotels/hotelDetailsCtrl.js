app.controller('HotelDetailsController', function ($scope, $location, $routeParams, identity, HotelsData, notifier, ratingService) {
    HotelsData.getHotelById($routeParams.id)
        .then(function (data) {
            $scope.hotel = data;
        }, function (err) {
            notifier.error('Please login first!');
            $location.path('/');
        });


    $scope.rate = rate;
    $scope.bookNow = bookNow;

    function rate(rate) {
        var ratingData = {
            hotelId: $routeParams.id,
            userId: identity.currentUser._id,
            rate: rate
        };

        ratingService.rateHotel(ratingData)
            .then(function (data) {
                if (data.isAlreadyRated) {
                    notifier.error("You've already rated this hotel");
                } else {
                    $scope.hotel.userRating = data.userRating;
                }

            }, function (err) {
                console.log(err);
            })
    }

    function bookNow(startDate, endDate, roomType) {
        var sDate = Date.parse(startDate);
        var eDate = Date.parse(endDate);

        if (startDate >= endDate) {
            notifier.error('Invalid booking period');
            return;
        }

        var reservationData = {
            userId: identity.currentUser._id,
            hotelId: $scope.hotel._id,
            startDate: startDate,
            endDate: endDate,
            roomType: roomType
        };

        HotelsData.makeReservation(reservationData)
            .then(function (data) {
                if (data.errBookingMessage) {
                    notifier.error(data.errBookingMessage);
                } else {
                    notifier.success("Success booking");
                    $scope.isSuccessBooking = true;
                    data._id = data._id.substring(0, 5);
                    $scope.bookingData = data;
                }
            }, function (err) {
                console.log(err);
            });
    }

});
