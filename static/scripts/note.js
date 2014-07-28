(function() {
    var typesmodel = My.extend(new My.Model('/note/notetypes'), {
        loadafter: function(result) {
            return result.data || [];
        }
    });

    var typesview = My.View.extend({
        tpl: '<a data-id="{id}">{name}</a>',
        events: {},

        initialize: function() {
            this.model.on({
                load: function() {
                    this.render();

                    var tp = this.get(0);
                    tp && groupsmodel.type(tp);
                }
            })
            this.model.load();
        }
    })('#typelist', typesmodel);


    var groupsmodel = My.extend(new My.Model('/note/notegroups'), {
        type: function(val) {
            if (My.isUndefined(val))
                return this._type;
            (!this._type || this._type.id !== val.id) && (this._type = val, this.trigger('change:type', val));
        },

        loadbefore: function(loader) {
            loader.url = M.packageURL(loader.url, {
                type: this.type().id
            });
        },

        loadafter: function(result) {
            return result.data || [];
        }
    });

    var groupsview = new(My.View.extend({
        tpl: '<a data-id="{id}">{name}</a>',
        events: {},

        initialize: function() {
            this.model.on({
                'change:type': function(e) {
                    this.find(e.data) ? this.render() : this.load();
                },
                load: function() {
                    this.render();

                    var gp = this.get(0);
                    gp && notesmodel.group(gp);
                }
            });
        }
    }))('#grouplist', groupsmodel);


    var notesmodel = My.extend(new My.Model('/note/notes'), {
        group: function(val) {
            if (My.isUndefined(val))
                return this._group;
            (!this._group || this._group.id !== val.id) && (this._group = val, this.trigger('change:group', val));
        },

        loadbefore: function(loader) {
            loader.url = M.packageURL(loader.url, {
                group: this.group().id
            });
        },

        loadafter: function(result) {
            return result.data || [];
        }
    });

    var notesview = new(My.View.extend({
        tpl: '<section><header><a data-id="{id}">{name}</a></header><article>{content}</article><footer><a>{signature}</a><a>{ctime}</a></footer></section>',
        events: {},

        initialize: function() {
            this.model.on({
                'change:group': function(e) {
                    this.find(e.data) ? this.render() : this.load();
                },
                load: function() {
                    this.render();
                }
            });
        }
    }))('#notelist', notesmodel);
})();