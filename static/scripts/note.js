(function() {
    M('.typebox').mousewheel(function(evt) {
        var n = evt.wheelDelta > 0 ? -1 : 1;
        typesview.setCur(typesview.cur + n);
    });

    var typesmodel = My.extend(new My.Model('/note/notetypes'), {
        loadafter: function(result) {
            return result.data || [];
        }
    });

    var typesview = My.View.extend({
        tpl: '<li><a data-id="{id}"><label>{name}</label></li></a>',
        events: {
            'click a': function(evt, view) {
                view.setCur(M(this).parent().index());
            }
        },

        initialize: function() {
            this.model.on({
                load: function() {
                    this.render();
                }
            })
            this.model.load();
        },

        renderafter: function() {
            this.delegate();
            this.blur = M('.blur');
            this.items = this.ui.find('li');
            this.setCur(0);
        },

        setCur: function(i) {
            if (i < 0 || i >= this.items.length) return;

            var cur = this.items.get(i);
            if (cur) {
                var old = this.items.get(this.cur);
                old && (M(old).removeClass('cur'));

                this.blur.style('top', 35 + 40 * i);
                M(cur).addClass('cur');
                this.cur = i;

                this.emitBooks(this.model.get(i));
            }
        },

        emitBooks: function(type) {
            type && booksmodel.attr('type', type);
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
            return result.data || [];
        }
    });

    var booksview = My.View.extend({
        tpl: '<li><a data-id="{id}">{name}</li></a>',
        events: {},

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
        tpl: '<section><header><a data-id="{id}">{name}</a></header><article>{content}</article><footer><a>{signature}</a><a>{ctime}</a></footer></section>',
        events: {},

        initialize: function() {
            this.model.on({
                'attr:book': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();
                }
            });
        }
    })('#notelist', notesmodel);
})();