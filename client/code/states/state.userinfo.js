$('#content').load('html/userinfo.html', function () {
    var getuserData = new RestGetUserRequest(global.stateContext.user_id);
    sdk.serverPost('getuser', getuserData, function (data) {
        sdk.parseResult(data, [], function (ok) {
            if (ok) {
                $('#username').html(data.user.username);
            }
        });
    });
});
//# sourceMappingURL=state.userinfo.js.map