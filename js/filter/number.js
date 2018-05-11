eApp.filter('number', function () {
    return function (str, glue) {
        // 如果傳入必需為數字型參數，不然就噴 isNaN 回去
        if (isNaN(str)) {
            return NaN;
        }
        // 決定三個位數的分隔符號(預設逗號)
        var glue = (typeof glue == 'string') ? glue : ',';
        var digits = str.toString().split('.'); // 先分左邊跟小數點

        var integerDigits = digits[0].split(""); // 整數的部分切割成陣列
        var threeDigits = []; // 用來存放3個位數的陣列

        // 當數字足夠，從後面取出三個位數，轉成字串塞回 threeDigits
        while (integerDigits.length > 3) {
            threeDigits.unshift(integerDigits.splice(integerDigits.length - 3, 3).join(""));
        }

        threeDigits.unshift(integerDigits.join(""));
        digits[0] = threeDigits.join(glue);

        return digits.join(".");
    };
});
