(function(M) {
    var Form = M.View.extend({
        tpl: ['<div class="component-form" style="display: none;">',
            '<section class="component-form-win">',
            '<header class="component-form-title"><h5>{title}</h5></header>',
            '<article class="component-form-body">{body}</article>',
            '<footer class="component-form-btns">',
            '<button class="component-btn sea ok">确 定</button>',
            '<button class="component-btn normal cancel">取 消</button>',
            '</footer>',
            '</section>',
            '</div>'
        ].join(''),

        events: {
            'click': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                M(evt.target).is('.component-form', view.ui) && view.close();
            },
            'click button.ok': function(evt, view) {
                evt.stopPropagation();
                view.pick().check() && view.commit();
            },
            'click button.cancel': function(evt, view) {
                evt.stopPropagation();
                view.cancel();
            },
            'submit .form': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                view.pick().check() && view.commit();
            },
            'change .form': function(evt, view) {
                evt.stopPropagation();
                evt = evt.target;
                view.model.set(evt.name, evt.value);
            }
        },

        initialize: function(params) {
            this.params = params;

            var _ = this;
            this.model || (this.model = new M.Model());
            this.model.on({
                change: function(evt) {
                    _.fill();
                },
                commit: function(evt) {
                    _.commited && _.commited(evt.data);
                }
            });
        },

        template: function() {
            var source = this.model.toSource();
            return source.length ? M.template(this.tpl, source) : this.tpl;
        },

        renderafter: function() {
            this.$form = this.ui.find('.component-form');
            this.$win = this.$form.find('section');
            this.$title = this.$form.find('h5');
            this.$body = this.$form.find('article');

            this.$title.text(this.params.title || '');
            this.$body.html(this.params.body || '');

            this.fill();
            return this;
        },

        open: function(focus) {
            this.$form.show().delay(20, this.$form.addClass, 'visibility');
            this.$win.delay(20, this.$win.addClass, 'visibility');

            var f = this.$body.find('input[name="' + (focus || 'name') + '"]');
            f && f[0] && f[0].focus();

            this.opened && this.opened();
            return this;
        },

        close: function() {
            this.$body.find('[name]').val('');
            this.$form.removeClass('visibility').delay(250, this.$form.hide);
            this.$win.removeClass('visibility');
            this.model.clear();
            this.closed && this.closed();
            return this;
        },

        cancel: function() {
            this.close();
            return this;
        },

        fill: function() {
            var _ = this;
            this.$body.find('[name]').each(function() {
                var v = _.model.get(this.name);
                this.value = v !== undefined ? v : '';
            });
            return this;
        },

        pick: function() {
            var _ = this;
            this.$body.find('[name]').each(function() {
                _.model.set(this.name, this.value);
            });
            return this;
        },

        commit: function() {
            this.model.commit();
            return this;
        },

        check: function() {
            return true;
        }
    }, 'Form');

    M.plugin('component', {});
    M.component.Form = Form;
})(My);