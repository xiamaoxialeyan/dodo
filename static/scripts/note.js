(function() {
    M('.typebox').mousewheel(function(evt) {
        typesview.setCur(typesview.cur + (evt.wheelDelta > 0 ? -1 : 1));
    });

    var typesmodel = My.extend(new My.Model('/note/notetypes'), {
        loadafter: function(result) {
            return result.data || [];
        }
    });

    var typesview = new(My.View.extend({
        tpl: '<li><a data-id="{id}"><label>{name}</label></a></li>',
        events: {
            'click li': function(evt, view) {
                view.setCur(M(this).index());
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
            this.items = this.ui.find('li');
            this.setCur(this.items.length - 1);
        },

        modifyType: function(index, type, old) {
            M(this.items.get(index)).find('label').text(type.name);
        },

        delType: function(index) {
            M(this.items.get(index)).remove();
            this.items = this.ui.find('li');
            this.setCur(index >= this.items.length ? 0 : index);
        }
    }, 'TypesView'))('#typelist', typesmodel);


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
                d.ctime = d.ctime.slice(0, 16);
                return d;
            });
        }
    });

    var booksview = new(My.View.extend({
        tpl: '<li><div title="点击查看详细记事"><a data-id="{id}">{name}</a><p class="desc">{desc}</p><p class="count"><span>{count}</span>篇</p><p class="time">{ctime}</p></div></li>',
        events: {
            'click li': function(evt, view) {
                view.emitNotes(view.model.get(M(this).index()));
            }
        },

        initialize: function() {
            var _ = this;
            this.model.on({
                'attr:type': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();
                },
                add: function(evt) {
                    _.addBook(evt.data);
                },
                change: function(evt) {
                    var params = evt.data;
                    _.modifyBook(params[0], params[1], params[2]);
                },
                unset: function(evt) {
                    _.delBook(evt.data);
                }
            });
        },

        renderafter: function() {
            this.items = this.ui.find('li');
            this.delegate().layout();
        },

        layout: function() {
            var l = this.items.length,
                cs = ['', 'rotated', 'twisted', 'rotated-left'];
            this.items.each(function(i) {
                M(this).addClass(cs[i % 4]);
            });
            return this;
        },

        emitNotes: function(book) {
            book && notesmodel.attr('book', book);
        },

        addBook: function(book) {
            this.ui.append(M.template(this.tpl, book));
            this.items = this.ui.find('li');
            this.layout();
        },

        modifyBook: function(index, book, old) {
            M(this.items.get(index)).find('a').text(book.name).next().text(book.desc).next().find('span').text(book.count);
        },

        delBook: function(index) {
            M(this.items.get(index)).remove();
            this.items = this.ui.find('li');
            this.layout();
        }
    }, 'BooksView'))('#booklist', booksmodel);


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

    var notesview = new(My.View.extend({
        tpl: '<li><a class="notename" data-id="{id}">{name}</a><span class="signature">{signature}</span><span class="time">{ctime}</span><a class="icon-newtab" title="新窗口打开"></a></li>',
        events: {
            'click li': function(evt, view) {

            }
        },

        initialize: function() {
            var _ = this;

            this.parent = this.ui.parent().click(function() {
                _.hide();
            });

            this.model.on({
                'attr:book': function(e) {
                    e.data && (_.show(), this.load());
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
            this.model.attr('book', null);
        }
    }, 'NotesView'))('#notelist', notesmodel);


    var TypeForm = M.component.Form.extend({
        addType: function(id) {
            id && (this.model.set('id', id), this.model.attr('types').set('$', this.model.get(0)));
        },

        check: function() {
            if (!this.model.get('name')) {
                M.component.alerttip.show('类别名称不能为空！');
                return false;
            }
            return true;
        },

        commited: function(res) {
            if (!res) {
                M.component.alerttip.show('未知错误！');
                return;
            }
            res.status == 1 && (this.addType(res.data.id), this.close());
            M.component.alerttip.show(res.message);
        }
    }, 'TypeForm');


    var BookForm = M.component.Form.extend({
        initialized: function() {
            var _ = this;
            this.model.attr('books').on({
                'attr:type': function(evt) {
                    _.setType(evt.data.id);
                }
            });
            this.setType(this.model.attr('books').get('type'));
        },

        setType: function(type) {
            this.model.set('type', type);
        },

        addBook: function(id) {
            id && (this.model.set({
                'id': id,
                count: 0,
                ctime: M.formatDate(M.now(), 'yyyy-MM-dd hh:mm')
            }), this.model.attr('books').set('$', this.model.get(0)));
        },

        check: function() {
            if (!this.model.get('type')) {
                M.component.alerttip.show('请选择类别！');
                return;
            }

            if (!this.model.get('name')) {
                M.component.alerttip.show('记事本名称不能为空！');
                return false;
            }

            if (this.model.get('desc').length > 20) {
                M.component.alerttip.show('记事本概述不能超过20个字符');
                return;
            }

            return true;
        },

        commited: function(res) {
            if (!res) {
                M.component.alerttip.show('未知错误！');
                return;
            }
            res.status == 1 && (this.addBook(res.data.id), this.close());
            M.component.alerttip.show(res.message);
        }
    }, 'BookForm');


    var NoteForm = M.component.Form.extend({
        initialized: function() {
            this.$form.addClass('noteform');
            this.addEditor();

            var _ = this;
            this.model.attr('books').on({
                load: function() {
                    _.updateSelect();
                },
                change: function() {
                    _.updateSelect();
                }
            });
            this.updateSelect();
        },

        addEditor: function() {
            var _ = this;
            M.component.Editor.create(this.$form.find('.noteeditor'), function(editor) {
                _.editor = editor;
                _.resize();
            });
            return this;
        },

        resize: function() {
            this.editor && this.editor.ui.height(this.$body.height() - this.$body.find('label').outerHeight() * 3 - 20);
        },

        updateSelect: function() {
            var data = this.model.attr('books').toSource();
            data.unshift({
                id: '',
                name: '请选择记事本'
            });

            this.$body.find('select').html(M.map(data, function(d) {
                return '<option value="' + d.id + '">' + d.name + '</option>';
            }).join(''));
        },

        addNote: function(id) {
            id && (this.model.set({
                'id': id,
                ctime: M.formatDate(M.now(), 'yyyy-MM-dd hh:mm')
            }), this.model.attr('notes').set('$', this.model.get(0)), this.model.attr('books').load());
        },

        pick: function() {
            var _ = this;
            this.$body.find('[name]').each(function() {
                _.model.set(this.name, this.value);
            });
            this.model.set('content', this.editor.content());
            return this;
        },

        check: function() {
            if (!this.model.get('book')) {
                M.component.alerttip.show('请选择记事本！');
                return;
            }

            if (!this.model.get('name')) {
                M.component.alerttip.show('记事名称不能为空！');
                return false;
            }

            if (!this.model.get('content')) {
                M.component.alerttip.show('记事内容不能为空！');
                return;
            }

            return true;
        },

        commited: function(res) {
            if (!res) {
                M.component.alerttip.show('未知错误！');
                return;
            }
            res.status == 1 && (this.addNote(res.data.id), this.close());
            M.component.alerttip.show(res.message);
        },

        closed: function() {
            this.editor && this.editor.closed();
        }
    }, 'NoteForm');


    function createTypeForm() {
        var model = new My.Model('/note/notetype', {
            types: typesmodel
        }, {
            name: ''
        });

        return new TypeForm('.typeform', model, {
            title: '新建类别',
            body: ['<form class="form" autocomplete="off" method="post">',
                '<label>名称：<input name="name" placeholder="请输入类别名称"></label>',
                '</form>'
            ].join('')
        });
    }

    function createBookForm() {
        var model = new My.Model('/note/notebook', {
            books: booksmodel
        }, {
            type: '',
            name: '',
            desc: ''
        });

        return new BookForm('.bookform', model, {
            title: '新建记事本',
            body: ['<form class="form" autocomplete="off" method="post">',
                '<label><input type="hidden" name="type" value="{type}"></label>',
                '<label>名称：<input name="name" placeholder="请输入记事本名称"></label>',
                '<label>概述：<textarea name="desc" placeholder="最多可输入20个字符" rows="2"></textarea></label>',
                '</form>'
            ].join('')
        });
    }

    function createNoteForm() {
        var model = new My.Model('/note/note', {
            books: booksmodel,
            notes: notesmodel
        }, {
            book: '',
            name: '',
            content: '',
            signature: ''
        });

        return new NoteForm('.noteform', model, {
            title: '新建记事',
            body: ['<form class="form" autocomplete="off" method="post">',
                '<label>记事本：<select name="book"><option>请选择记事本</option></select></label>',
                '<label>名&nbsp;&nbsp;&nbsp;&nbsp;称：<input name="name" placeholder="请输入记事名称"></label>',
                '<label>内&nbsp;&nbsp;&nbsp;&nbsp;容：<div class="noteeditor"></div></label>',
                '<label>签&nbsp;&nbsp;&nbsp;&nbsp;名：<input name="signature"></label>',
                '</form>'
            ].join('')
        });
    }

    var typeform, bookform, noteform;

    function openForm(type) {
        var form = type === 'type' ? (typeform || (typeform = createTypeForm())) :
            (type === 'book' ? (bookform || (bookform = createBookForm())) :
                (noteform || (noteform = createNoteForm())));
        form.open();
    }


    M('article>nav>a').click(function(evt) {
        openForm(M(this).data('type'));
    });

    M(window).resize(function() {
        noteform && noteform.resize();
    });
})();