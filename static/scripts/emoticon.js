(function(M) {
    var Emoticon = M.View.extend({
        tpl: ['<div class="component-emoticon">',
            '<header class="component-emoticon-header">',
            '<h1>常用表情</h1>',
            '<a class="icon-close" title="关闭"></a>',
            '</header>',
            '<div class="component-emoticon-icons">',
            '<div class="component-emoticon-stacks"></div>',
            '<nav class="component-emoticon-stacks-nav"></nav>',
            '</div>',
            '<nav class="component-emoticon-nav">',
            '<i></i>',
            '<a title="常用表情"><img src="/static/emoji/weixin/list.gif"></a>',
            '<a title="阿里旺旺"><img src="/static/emoji/aliwangwang/list.gif"></a>',
            '<a title="阿狸"><img src="/static/emoji/ali/list.gif"></a>',
            '<a title="洋葱头"><img src="/static/emoji/yangcongtou/list.gif"></a>',
            '<a title="兔斯基"><img src="/static/emoji/tusiji/list.gif"></a>',
            '<a title="金馆长熊猫"><img src="/static/emoji/jinguanzhangxiongmao/list.gif"></a>',
            '</nav>',
            '</div>'
        ].join(''),

        events: {
            'click header>a': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                view.close();
            },
            'click .component-emoticon-nav>a': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                view.toggle(this.title, M(this).index() - 1);
            },
            'click .component-emoticon-stacks': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                evt = evt.target;
                evt.tagName === 'IMG' && (evt = evt.parentNode);
                evt.tagName === 'LI' && (view.selected(M(evt).find('img').data('src')));
            },
            'mousewheel .component-emoticon-icons': function(evt, view) {
                evt.stopPropagation();
                view.stack(view.seq + (evt.wheelDelta > 0 ? -1 : 1));
            },
            'click .component-emoticon-stacks-nav': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();
                evt = evt.target;
                evt.tagName === 'A' && (view.stack(M(evt).index() + 1));
            }
        },

        initialize: function() {
            this.stackWidth = 530;
            this.stackCount = 4 * 8;
            this.initializeName = '常用表情';
            return this;
        },

        renderafter: function() {
            this.$title = this.ui.find('.component-emoticon-header h1');
            this.$pointer = this.ui.find('nav>i');
            this.$emojilist = this.ui.find('.component-emoticon-stacks');
            this.$stacknav = this.ui.find('.component-emoticon-stacks-nav');
            return this;
        },

        fill: function() {
            var emoji = emojis[this.name],
                path = emoji.path,
                range = emoji.range;

            emoji = M.range(range[0], range[1], 1, path, '.gif');

            var html = [];
            this.stackSum = Math.ceil(emoji.length / this.stackCount);

            for (var i = 0; i < this.stackSum; i++) {
                var data = emoji.slice(i * this.stackCount, (i + 1) * this.stackCount);
                html.push('<ul class="component-emoticon-stack">')
                M.merge(html, M.map(data, function(e) {
                    return '<li><img data-src="' + e + '"></li>';
                }));
                html.push('</ul>');
            }

            this.$emojilist.html(html.join('')).width(this.stackWidth * this.stackSum);
            this.$stacknav.html(M.range(1, this.stackSum, 1, '<a>', '</a>', 'string'));
            this.stack(1);
            return this;
        },

        load: function() {
            this.ui.find('li>img').each(function() {
                this.src || (this.src = M(this).data('src'));
            });
            return this;
        },

        toggle: function(name, index) {
            if (this.name != name) {
                this.name = name;
                this.$title.text(this.name);
                this.fill().load();
            }
            this.$pointer.left(10 + index * 50);
            return this;
        },

        stack: function(seq) {
            if (seq < 1 || seq > this.stackSum)
                return;

            this.seq = seq;
            this.$emojilist.left(-this.stackWidth * (seq - 1));
            this.$stacknav.find('a:nth-child(' + seq + ')').addClass('cur').siblings().removeClass('cur');
            return this;
        },

        selected: function(url) {
            this.trigger('selected', url).close();
            return this;
        },

        open: function(xy) {
            this.name || (this.toggle(this.initializeName, 0));
            this.ui.show();
            xy && this.ui.left(xy.left);
            return this;
        },

        close: function() {
            this.ui.hide();
            return this;
        }
    }, 'Emoticon');

    M.plugin('component', {});
    M.component.Emoticon = Emoticon;

    var emojis = {
        '常用表情': {
            path: '/static/emoji/weixin/',
            range: [1, 104]
        },
        '阿里旺旺': {
            path: '/static/emoji/aliwangwang/',
            range: [1, 99]
        },
        '阿狸': {
            path: '/static/emoji/ali/',
            range: [1, 630]
        },
        '洋葱头': {
            path: '/static/emoji/yangcongtou/',
            range: [1, 111]
        },
        '兔斯基': {
            path: '/static/emoji/tusiji/',
            range: [1, 101]
        },
        '金馆长熊猫': {
            path: '/static/emoji/jinguanzhangxiongmao/',
            range: [1, 246]
        }
    }
})(My);