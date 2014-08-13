(function(M) {
    var Accordion = My.View.extend({
        tpl: ['<ul class="component-accordion">',
            '<li class="component-accordion-item">',
            '<header class="component-accordion-title"><h5>{title}</h5></header>',
            '<article class="component-accordion-content">{content}</article>',
            '</li>',
            '</ul>'
        ].join(''),
        events: {
            'click': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
            },
            'click ul>li>header': function(evt, view) {
                var $li = M(evt.currentTarget.parentNode);
                view.toggle($li.index());
            }
        },

        initialize: function(params) {
            this.params = params;
        },

        renderafter: function() {
            this.$items = this.ui.find('ul>li');
            M.each(this.params, function(p, i) {
                var item = this.$items.nth(i + 1);
                item.find('h5').text(p.title);
                item.find('article').html(p.content);
            }, null, this);
        },

        initialized: function() {
            this.toggle(0);
        },

        template: function() {
            if (!this.params || !this.params.length) return this.tpl;

            var header = '<ul class="component-accordion">',
                footer = '</ul>',
                content = this.tpl.replace(header, '').replace(footer, '');
            this.params && (content = M.repeat(content, this.params.length || 1));
            return header + M.template(content, this.model && this.model.toSource()) + footer;
        },

        toggle: function(index) {
            this.actived = index;
            this.$actived = this.$items.nth(index + 1);
            this.$actived.addClass('cur').siblings('.cur').removeClass('cur');
        }
    }, 'Accordion');

    M.plugin('component', {});
    M.component.Accordion = Accordion;
})(My);