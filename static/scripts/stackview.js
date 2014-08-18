(function(M) {
    var StackView = M.View.extend({
        tpl: ['<div class="component-stacks"></div>',
            '<nav class="component-stack-nav"></nav>'
        ].join(''),

        events: {
            'mousewheel': function(evt, view) {

            },
            'click nav': function(evt, view) {

            }
        },

        initialize: function() {
            this.model.on('change': function(evt) {

            });
        },

        template: function() {
            return this.tpl;
        },

        renderafter: function() {

        },

        fill: function() {

        }
    }, 'StackView');

    M.plugin('component', {});
    M.component.StackView = StackView;
})(My);