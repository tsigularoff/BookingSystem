app.controller('SignUpCtrl', function($scope, $location, auth, notifier) {
    $scope.signup = function(user) {
        if(user.isHotelOwner){
            user.roles = ['owner'];
        }
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    }
});