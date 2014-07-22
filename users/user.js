module.exports = {
    login: function(params) {
        return {
            status: 1,
            userName: params.userName,
            pwd: params.pwd
        };
    },

    logout: function() {

    }
}