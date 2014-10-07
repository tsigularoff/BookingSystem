app.factory('HotelsData', function($resource, $q, $http) {

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

    return {
        getAllHotels : getAllHotels
    }
});
