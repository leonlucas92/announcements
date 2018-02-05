var app = angular.module("findout", ["ngAnimate", "ui.bootstrap", "angularUtils.directives.dirPagination"]);

app.controller("findoutController", function($scope, $timeout, $http){
    
    $scope.user = {
        name: "Augusto Lucas",
        image: "img/userdefault.png"
    };

    /**Função login*/
    $scope.loginApp = function(isValid){
        $scope.submitted = true;
        
        if(isValid){
            alert("FOI");
            console.log("LOGIN");
            console.log($scope.user);

            $http({
                method: 'POST',
                url: 'announcements.html'
            }).sucess(function (data, status, headers, config){
                // Atribui o retorno ao $scope
                $scope.band.name = data.band.name;
            }).error(function (data, status, headers, config){
                // Se tiver error
                console.log(status);
            });
            
            /*$.ajax({
                type: 'post',
                data: $scope.user,
                url:'announcements.html',
                success: function(data){
                    alert(data);  
                }
            });*/
        }
    };

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    /**Chama a API com os dados da lista de Anúnicos */
    $scope.announcements = [];
    $http.get("data.json").then(function(response){
        $scope.announcements = response;
        console.log("AJAX");
    });
    $timeout(function(){
        console.log($scope.announcements);
    }, 200);
    
    /*var loadAnnouncements = function(){
        $http.get("data.json");
        console.log("OK");
    };*/

    //$scope.announcements = loadAnnouncements;

    
    /*$scope.announcements = [
        {image: "img/userdefault.png", brand: "Citroën", model: "C3", color: "Azul", year:"2013", motor: "1.5 Flex", exchange: "Manual", price: "40000", status: "ATIVO"},
        {image: "", brand: "Peugeot", model: "208", color: "Vermelho", year:"2013", motor: "1.6 Flex", exchange: "Manual", price: "41000", status: "ATIVO"},
        {image: "", brand: "Fiat", model: "Novo Uno", color: "Vermelho", year:"2013", motor: "1.0 Flex", exchange: "Manual", price: "35000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Up", color: "Branco", year:"2015", motor: "1.0 Flex", exchange: "Manual", price: "30000", status: "ATIVO"},
        {image: "", brand: "Jeep", model: "Renegade", color: "Preto", year:"2017", motor: "3.0 Flex", exchange: "Automático", price: "85000", status: "ATIVO"},
        {image: "", brand: "Citroën", model: "C3 Picasso", color: "Prata", year:"2014", motor: "1.6 Flex", exchange: "Automático", price: "45000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Fox", color: "Prata", year:"2010", motor: "1.6 Flex", exchange: "Automático", price: "45000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Gol", color: "Preto", year:"2009", motor: "1.0 Flex", exchange: "Manual", price: "30000", status: "ATIVO"},
        {image: "", brand: "Ford", model: "Fiesta", color: "Vermelho", year:"2014", motor: "1.6 Flex", exchange: "Manual", price: "28000", status: "VENDIDO"},
        {image: "", brand: "Ford", model: "New Fiesta", color: "Branco", year:"2016", motor: "1.6 Flex", exchange: "Manual", price: "45000", status: "INATIVO"},
        {image: "", brand: "Fiat", model: "Palio", color: "Azul", year:"2012", motor: "1.4 Flex", exchange: "Manual", price: "30000", status: "VENDIDO"},
        {image: "", brand: "Honda", model: "Fit", color: "Prata", year:"2009", motor: "1.4 Flex", exchange: "Manual", price: "32000", status: "INATIVO"},
        {image: "", brand: "Honda", model: "New Civic", color: "Prata", year:"2016", motor: "2.0 Flex", exchange: "Automático", price: "51000", status: "VENDIDO"},
        {image: "", brand: "Ford", model: "Fiesta", color: "Verde", year:"1998", motor: "1.0", exchange: "Manual", price: "12000", status: "INATIVO"},
        {image: "", brand: "Fiat", model: "Uno", color: "Branco", year:"1992", motor: "1.0", exchange: "Manual", price: "10000", status: "VENDIDO"},
        {image: "", brand: "Volkswagen", model: "Gol", color: "Branco", year:"2004", motor: "1.0", exchange: "Manual", price: "17000", status: "VENDIDO"}
    ];*/

    /**usuário alvo */
    $scope.userForm = {};
    /**variável de controle de edição de usuário */
    $scope.isEdit = false;
    /**Mensagens */
    $scope.message = "";
    /**Informações do usuário selecionado */
    $scope.selectedUser = {};
    /**Índice do usuário selecionado */
    $scope.selectedIndex;
    /**Verificador do checkbox para manter dialog aberta para vários registros */
    $scope.keepOpen = false;
    /**Variável de controle do submit do form */
    $scope.submitted = false;

    /**função salvar com validação*/
    $scope.saveUser = function(isValid){
        $scope.submitted = true;
        
    };

    /**função selecionar usuário alvo */
    $scope.selectUser = function(user){
        $scope.keepOpen = false;
        $scope.title = "Editar";

        var userInfo = {};

        let inputNames = Object.keys(user).filter(key => key.indexOf('$') !== 0);
        for(let input of inputNames){
            userInfo[input] = user[input];
        }

        $scope.selectedIndex = $scope.userList.indexOf(user);

        $scope.isEdit = true;
        $scope.userForm = userInfo;

        $scope.selectedUser = user;
    };
    
    /**função deletar usuário */
    $scope.deleteUser = function(){
        $scope.userList.splice($scope.userList.indexOf($scope.selectedUser), 1);
        $scope.message = "Usuário excluido com sucesso!";
        $scope.clearMessage();

        $scope.userListSize();
    };

    /**função limpar form */
    $scope.formClear = function(form){
        $scope.userForm = {};
        $scope.isEdit = false;
        $scope.title = "Novo";
        $scope.keepOpen = false;
        $scope.submitted = false;
        form.$setPristine();
        form.$setUntouched();
    };

    /**função limpar mensagem */
    $scope.clearMessage = function(){
        $scope.isVisible = true;
        $timeout.cancel(time);

        var time = $timeout(function() {
            $scope.isVisible = "";
            //$scope.message = "";
        }, 3000);
    };

    /**Função que verifica se a tabela possui registro */
    $scope.userListSize = function(){
        $scope.empty = $scope.userList.length == 0;
    }
});