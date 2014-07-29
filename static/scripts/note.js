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
                    tp && groupsmodel.attr('type', tp);
                }
            })
            this.model.load();
        }
    })('#typelist', typesmodel);


    var groupsmodel = new My.Model('/note/notegroups', {
        type: null
    });
    My.extend(groupsmodel, {
        loadbefore: function(loader) {
            loader.url = M.url.marry(loader.url, {
                type: this.attr('type').id
            });
        },

        loadafter: function(result) {
            return result.data || [];
        }
    });

    var groupsview = My.View.extend({
        tpl: '<a data-id="{id}">{name}</a>',
        events: {},

        initialize: function() {
            this.model.on({
                'attr:type': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();

                    var gp = this.get(0);
                    gp && notesmodel.attr('group', gp);
                }
            });
        }
    })('#grouplist', groupsmodel);


    var notesmodel = new My.Model('/note/notes', {
        group: null
    });
    My.extend(notesmodel, {
        loadbefore: function(loader) {
            loader.url = M.url.marry(loader.url, {
                group: this.attr('group').id
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
                'attr:group': function(e) {
                    this.load();
                },
                load: function() {
                    this.render();
                }
            });
        }
    })('#notelist', notesmodel);
})();