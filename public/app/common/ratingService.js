app.factory('ratingService', function ($http, $q) {
    function rateHotel(ratingData) {
        var deffered = $q.defer();

        $http({
            method: 'POST',
            url : '/api/hotels/:id/rate',
            data : {
                rate : ratingData.rate,
                hotelId : ratingData.hotelId,
                userId : ratingData.userId
            }
        })
            .success(function (data) {
                deffered.resolve(data);
            })
            .error(function (err) {
                deffered.reject(err);
            });

        return deffered.promise;
    }

    return{
        rateHotel : rateHotel
    }

});
