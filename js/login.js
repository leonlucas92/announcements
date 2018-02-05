var app = angular.module("loginFindout", ["ngAnimate"]);

app.controller("loginController", function($scope, $timeout, $http){

    /**Função login*/
    //deve capturar os dados do usuário que está logando e utilizar dentro do sistema
    $scope.loginApp = function(isValid){
        $scope.submitted = true;
        
        if(isValid){
            
            window.location.href = "announcements.html";
            /**Chamada ajax para o método back-end login */
            /*$http({
                method: 'POST',
                url: 'announcements.html'
            }).sucess(function(data, status, headers, config){
                //redirecionamento com sucesso
                
            }).error(function(data, status, headers, config){
                //retorno com erro
                console.log(status);
            });*/
            
            
        }
    };
});
