(function(M) {
    var alerttip = new(M.View.extend({
        tpl: '<div class="component-alerttip"></div>',

        render: function() {
            this.ui.append(this.tpl);
            this.$box = this.ui.find('.component-alerttip');
        },

        show: function(txt) {
            this.$box.html(txt).top(30).delay(2000, this.hide, null, this);
        },

        hide: function() {
            this.$box.top(-100);
        }
    }, 'AlertTip'))(document.body);

    M.plugin('component', {});
    M.component.alerttip = alerttip;
})(My);