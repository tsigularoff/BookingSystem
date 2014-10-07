app.factory('HotelsData', function($resource, $q, $http, identity) {

    function getAllHotels() {
        var deffered = $q.defer();

        $http({
            method: 'GET',
            url : '/api/hotels/'
        })
            .success(function (data) {
                deffered.resolve(data);
            })
            .error(function (err) {
                deffered.reject(err);
            });

        return deffered.promise;
    }

    function createHotel(data) {
        var deffered = $q.defer();

        $http({
            method: 'POST',
            url : 'api/hotels',
            data : {
                name : data.name,
                description : data.description,
                star_rating : data.star_rating,
                address : data.address,
                city : data.city,
                pictureUrl : data.pictureUrl,
                rooms : [],
                owner : identity.currentUser._id
            }
        })
            .success(function (data) {
                deffered.resolve(data);
            })
            .error(function (err) {
                deffered.reject(err);
            })

        return deffered.promise;
    }

    return {
        getAllHotels : getAllHotels,
        createHotel : createHotel
    }
});
