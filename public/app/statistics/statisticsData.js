app.factory('StatisticsData', function($q, $http) {

    function getStatistics() {
        var deffered = $q.defer();

        $http({
            method: 'GET',
            url : '/api/stats/'
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
        getStatistics : getStatistics
    }
});

