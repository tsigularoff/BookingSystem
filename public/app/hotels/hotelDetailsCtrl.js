app.controller('HotelDetailsController', function ($scope, $location, $routeParams, identity, HotelsData, notifier, ratingService) {

    $scope.rate = rate;
    $scope.bookNow = bookNow;
    $scope.roomTypes = [];

    HotelsData.getHotelById($routeParams.id)
        .then(function (data) {
            $scope.hotel = data;
            console.log(data);
            addRoomTypes(data);
        }, function (err) {
            notifier.error('Please login first!');
            $location.path('/');
        });

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
                    data.bookingId = getRandomBookingId();
                    $scope.bookingData = data;
                }
            }, function (err) {
                console.log(err);
            });
    }

    function addRoomTypes(hotel) {
        var isRoomTypeAdded = false;

        for(var i =0; i< hotel.rooms.length; i+=1){
            var roomType = hotel.rooms[i].room_max_occupancy;

            for(var j = 0; j < $scope.roomTypes.length; j+=1){
                if(roomType == $scope.roomTypes[j]){
                    isRoomTypeAdded = true;
                    break;
                }
            }

            if(!isRoomTypeAdded){
                $scope.roomTypes.push(roomType);
            }
            isRoomTypeAdded = false;
        }
    }

    function getRandomBookingId() {
        var bookingId = Math.floor(Math.random()*13445);
        return bookingId;
    }


});
