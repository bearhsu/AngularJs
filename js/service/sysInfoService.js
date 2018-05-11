///======================
/// singleton service
/// 存取登入者資料、系統變數、
///======================
eApp.factory('sysInfoService', ['$rootScope', '$q',function ($rootScope, $q) {

        /**============================================================================
         * 
         * 				Platform storage device 平台儲存裝置 ($rootScope)
         * 
         * ============================================================================*/
        /*-----------------------------------------------------------------------------
         * @Description: 前端資料管理伺服器
         *               font-end manager server
         *-----------------------------------------------------------------------------*/
        $rootScope.navigator = (navigator.userAgent.match("Safari") !== null && navigator.userAgent.match("Safari")) ? true : false;
        $rootScope.server = {
            id: [],
            data: []
        };

        /**============================================================================
         * 
         * 			平台儲存裝置與方法 (singleton)
         * 
         * ============================================================================*/
        if (arguments.callee._singletonInstance) {
            return arguments.callee._singletonInstance;
        }

        var obj = {};

        obj.UserInfo = {};
        obj.RoleName = "";

        /** get set **/

        obj.getUser = function () {
            return $.parseJSON(sessionStorage.User);
        };
        obj.setUser = function (user) {
            sessionStorage.User = JSON.stringify(user);
        };

        obj.getUserID = function () {
            return sessionStorage.UserID;
        };
        obj.setUserID = function (UserID) {
            sessionStorage.UserID = UserID;
        };

        obj.getUserName = function () {
            return sessionStorage.UserName;
        };
        obj.setUserName = function (UserName) {
            sessionStorage.UserName = UserName;
        };

        obj.parseUserInfo = function (oJSON) {
            parseUserInfo(oJSON);
        }
        
        arguments.callee._singletonInstance = obj;
        return obj;

}]);
