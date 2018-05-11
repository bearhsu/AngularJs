eApp.filter('vipCode', function () {
    return function (data, param) {
        for(var i in param) {
            for(var j in data) {
                if(param[i].PARAM_CODE == data[j].VIP_CODE) {
                    data[j] = angular.extend(data[j], param[i]);
                }
            }   
        }
        return data;
    };
});
