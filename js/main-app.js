var app = angular.module("findout", ["ngAnimate", "angularUtils.directives.dirPagination"]);

app.controller("findoutController", function($scope, $timeout, $http){
    
    /**Informações do usuário (login) */
    $scope.user = {
        name: "Visitante",
        image: "img/userdefault.png"
    };
    /**Variável de controle de dados da lista */
    $scope.empty = false;

    /**Contadores de status */
    $scope.active = 0;
    $scope.inactive = 0;
    $scope.sold = 0;

    /**Função para ordenar a tabela em ordem alfabética de acordo com a coluna clicada */
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
    /**Função para filtrar os dados da tabela */
    $scope.find = function(){
        if(document.getElementById("announcementList").children.length == 1){
            $scope.empty = true;
        }else{
            $scope.empty = false;
        }
    }
    /**Função para mascarar os valores de preço dos itens na tabela */
    $scope.currencyMask = function(number){
        var maskedCurrency = parseInt(number.replace(/[\D]+/g,'') ) + "";

        maskedCurrency = maskedCurrency.replace(/([0-9]{2})$/g, ",$1");

        if(maskedCurrency.length > 6)
            maskedCurrency = maskedCurrency.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return maskedCurrency;
    }
    /**Função para contar quantos tipos de status existem na tabela */
    $scope.checkStatus = function(list){
        for(var i = list.length; i--;){
            var status = list[i].status;
            if(status == "ATIVO"){
               $scope.active++;
            }else if(status == "INATIVO"){
                $scope.inactive++;
            }else{
               $scope.sold++;
            }
        }
    };

    /**Chama a API com os dados da lista de Anúnicos */
    /**Neste modelo a API deve ter o formato fixo da tabela (colunas, etc) */
    /*$scope.announcements = [];
    $http.get("data.json").then(function(response){
        $scope.announcements = response;
    });*/

    /**Lista de dados para teste */
    $scope.announcements = [
        {image: "", brand: "Citroën", model: "C3", color: "Azul", year:"2013", motor: "1.5 Flex", exchange: "Manual", price: "4000000", status: "ATIVO"},
        {image: "", brand: "Peugeot", model: "208", color: "Vermelho", year:"2013", motor: "1.6 Flex", exchange: "Manual", price: "4100000", status: "ATIVO"},
        {image: "", brand: "Fiat", model: "Novo Uno", color: "Vermelho", year:"2013", motor: "1.0 Flex", exchange: "Manual", price: "3500000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Up", color: "Branco", year:"2015", motor: "1.0 Flex", exchange: "Manual", price: "3000000", status: "ATIVO"},
        {image: "", brand: "Jeep", model: "Renegade", color: "Preto", year:"2017", motor: "3.0 Flex", exchange: "Automático", price: "8500000", status: "ATIVO"},
        {image: "", brand: "Citroën", model: "C3 Picasso", color: "Prata", year:"2014", motor: "1.6 Flex", exchange: "Automático", price: "4500000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Fox", color: "Prata", year:"2010", motor: "1.6 Flex", exchange: "Automático", price: "4500000", status: "ATIVO"},
        {image: "", brand: "Volkswagen", model: "Gol", color: "Preto", year:"2009", motor: "1.0 Flex", exchange: "Manual", price: "3000000", status: "ATIVO"},
        {image: "", brand: "Ford", model: "Fiesta", color: "Vermelho", year:"2014", motor: "1.6 Flex", exchange: "Manual", price: "2800000", status: "VENDIDO"},
        {image: "", brand: "Ford", model: "New Fiesta", color: "Branco", year:"2016", motor: "1.6 Flex", exchange: "Manual", price: "4500000", status: "INATIVO"},
        {image: "", brand: "Fiat", model: "Palio", color: "Azul", year:"2012", motor: "1.4 Flex", exchange: "Manual", price: "3000000", status: "VENDIDO"},
        {image: "", brand: "Honda", model: "Fit", color: "Prata", year:"2009", motor: "1.4 Flex", exchange: "Manual", price: "3200000", status: "INATIVO"},
        {image: "", brand: "Honda", model: "New Civic", color: "Prata", year:"2016", motor: "2.0 Flex", exchange: "Automático", price: "5100000", status: "VENDIDO"},
        {image: "", brand: "Ford", model: "Fiesta", color: "Verde", year:"1998", motor: "1.0", exchange: "Manual", price: "1200000", status: "INATIVO"},
        {image: "", brand: "Fiat", model: "Uno", color: "Branco", year:"1992", motor: "1.0", exchange: "Manual", price: "1000000", status: "VENDIDO"},
        {image: "", brand: "Volkswagen", model: "Gol", color: "Branco", year:"2004", motor: "1.0", exchange: "Manual", price: "1700000", status: "VENDIDO"}
    ];

    $scope.checkStatus($scope.announcements);

    /**Função logout */
    $scope.logout = function(){
        //deve destruir a sessão e redirecionar para a tela de login
        window.location.href = "login.html";
    };
});