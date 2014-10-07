app.controller('HotelDetailsController', function ($scope, $location, $routeParams, HotelsData, notifier) {
    HotelsData.getHotelById($routeParams.id)
        .then(function (data) {
            $scope.hotel = data;
        }, function (err) {
            notifier.error('Please login first!');
            $location.path('/');
        })
});
