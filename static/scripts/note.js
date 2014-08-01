(function() {
    M('.typebox').mousewheel(function(evt) {
        typesview.setCur(typesview.cur + (evt.wheelDelta > 0 ? -1 : 1));
    });

    var typesmodel = My.extend(new My.Model('/note/notetypes'), {
        loadafter: function(result) {
            return result.data || [];
        }
    });

    var typesview = My.View.extend({
        tpl: '<li><a data-id="{id}"><label>{name}</label></a></li>',
        events: {
            'click a': function(evt, view) {
                view.setCur(M(this).parent().index());
            }
        },

        initialize: function() {
            var _ = this;
            this.model.on({
                load: function() {
                    this.render();
                },
                add: function(evt) {
                    _.addType(evt.data);
                },
                change: function(evt) {
                    var params = evt.data;
                    _.modifyType(params[0], params[1], params[2]);
                },
                unset: function(evt) {
                    _.delType(evt.data);
                }
            })
            this.model.load(); //初始化加载类别列表
        },

        renderafter: function() {
            this.blur = M('.blur');
            this.items = this.ui.find('li');
            this.delegate().setCur(0);
        },

        setCur: function(i) {
            if (i < 0 || i >= this.items.length) return;

            var cur = this.items.get(i);
            if (cur) {
                var old = this.items.get(this.cur);
                old && (M(old).removeClass('cur'));

                this.blur.style('top', 15 + 40 * i);
                M(cur).addClass('cur');
                this.cur = i;

                this.emitBooks(this.model.get(i));
            }
        },

        emitBooks: function(type) {
            type && booksmodel.attr('type', type);
        },

        addType: function(type) {
            this.ui.append(M.template(this.tpl, type));
        },

        modifyType: function(index, type, old) {
            M(this.items.get(index)).find('label').txt(type.name);
        },

        delType: function(index) {
            M(this.items.get(index)).remove();
        }
    })('#typelist', typesmodel);


    var booksmodel = new My.Model('/note/notebooks', {
        type: null
    });
    My.extend(booksmodel, {
        loadbefore: function(loader) {
            loader.url = M.url.marry(loader.url, {
                type: this.attr('type').id
            });
        },

        loadafter: function(result) {
            return M.map(result.data || [], function(d) {
                d.desc || (d.desc = '');
                return d;
            });
        }
    });

    var booksview = My.View.extend({
        tpl: '<li><div title="点击查看详细记事"><a data-id="{id}">{name}</a><p class="desc">{desc}</p><p class="count"><span>{count}</span>篇</p><p class="time">{ctime}</p></div></li>',
        events: {
            'click li': function(evt, view) {
                notesview.show();
            }
        },

        initialize: function() {
            this.model.on({
                'attr:type': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();

                    var bp = this.get(0);
                    bp && notesmodel.attr('book', bp);
                }
            });
        },

        renderafter: function() {
            this.items = this.ui.find('li');
            this.delegate().layout().setCur(0);
        },

        layout: function() {
            var l = this.items.length,
                cs = ['', 'rotated', 'twisted', 'rotated-left'];
            this.items.each(function(i) {
                M(this).addClass(cs[i % 4]);
            });
            return this;
        },

        setCur: function(i) {
            if (i < 0 || i >= this.items.length) return;

            var cur = this.items.get(i);
            if (cur) {
                var old = this.items.get(this.cur);
                old && (M(old).removeClass('cur'));

                M(cur).addClass('cur');
                this.cur = i;

                this.emitNotes(this.model.get(i));
            }
        },

        emitNotes: function(book) {
            book && notesmodel.attr('book', book);
        }
    })('#booklist', booksmodel);


    var notesmodel = new My.Model('/note/notes', {
        book: null
    });
    My.extend(notesmodel, {
        loadbefore: function(loader) {
            loader.url = M.url.marry(loader.url, {
                book: this.attr('book').id
            });
        },

        loadafter: function(result) {
            return result.data || [];
        }
    });

    var notesview = My.View.extend({
        tpl: '<li><a data-id="{id}">{name}</a><a>{signature}</a><a>{ctime}</a></li>',
        events: {
            'click': function(evt, view) {

            }
        },

        initialize: function() {
            this.parent = this.ui.parent().click(function() {
                M(this).hide();
            });

            this.model.on({
                'attr:book': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();
                }
            });
        },

        show: function() {
            this.parent.show();
        },

        hide: function() {
            this.parent.hide();
        }
    })('#notelist', notesmodel);


    var FormView = My.View.extend({
        events: {
            'click': function(evt, view) {
                M(evt.target).is('.formbox', view.ui) && view.close();
            }
        },

        renderafter: function() {
            this.form = this.ui.find('form');
        },

        open: function() {
            this.ui && this.ui.show();

            var f = this.form && this.form.find('input[name]');
            f && f[0] && f[0].focus();
        },

        close: function() {
            this.ui && this.ui.hide();
        },

        cancel: function() {
            this.form && this.form.find('[name]').val('');
            this.close();
        },

        save: function() {
            if (this.form) {
                var url = this.form.attr('action'),
                    method = this.form.attr('method'),
                    data = {};

                this.form.find('[name]').each(function() {
                    data[this.name] = this.value;
                });

                var _ = this;
                M.ajax(url, {
                    method: method,
                    params: data,
                    success: function(res) {
                        res.status == 1 && (M.merge(res.data, data), _.close());
                        alerttip.show(res.message);
                        _.trigger('saved', res.data);
                    },
                    error: function() {
                        alerttip.show('未知错误！');
                        _.trigger('saved', null);
                    }
                });
            }
        }
    });


    var formhtmls = {
        type: ['<form autocomplete="off" action="/note/notetype" method="post">',
            '<label>名称：<input name="name" placeholder="请输入类别名称"></label>',
            '<div class="btns">',
            '<input type="submit" value="保 存">',
            '<button>取 消</button>',
            '</div>',
            '</form>'
        ].join('')
    };

    var typesform = FormView.extend({
        tpl: '<div class="formwin"><div class="formtitle"><h5>新建类别</h5></div>' + formhtmls.type + '</div>',
        events: {
            'click input[type="submit"]': function(evt, view) {
                evt.preventDefault();
                view.check() && view.save();
            },
            'click button': function(evt, view) {
                evt.preventDefault();
                view.cancel();
            }
        },

        initialize: function() {
            var _ = this;
            this.on('saved', function(evt) {
                _.addType(evt.data);
            });
        },

        template: function() {
            return this.tpl;
        },

        addType: function(type) {
            type && typesmodel.set('$', type);
        },

        check: function() {
            if (!this.form[0][0].value) {
                alerttip.show('类别名称不能为空！');
                return false;
            }
            return true;
        }
    })('.typeform');


    var booksform = FormView.extend({
        tpl: '',
        events: {}
    })('.bookform', typesmodel);


    var notesform = FormView.extend({
        tpl: '',
        events: {}
    });


    M('article>nav>button').click(function(evt) {
        var type = M(this).data('type');
        var form = {
            type: typesform,
            book: booksform,
            note: notesform
        }[type];
        form.open();
    });


    var alerttip = My.View.extend({
        show: function(txt) {
            this.ui.html(txt).top(30);

            var _ = this;
            this.timer && (clearTimeout(this.timer));
            this.timer = setTimeout(function() {
                _.hide();
                clearTimeout(_.timer);
            }, 2000);
        },

        hide: function() {
            this.ui.top(-100);
        }
    })('.alerttip');
})();