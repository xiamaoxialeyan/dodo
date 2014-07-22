module.exports = {
    getGroups: function(req, res) {
        res.json([{
            id: 1,
            name: '门户'
        }, {
            id: 2,
            name: '视频'
        }]);
    }
}