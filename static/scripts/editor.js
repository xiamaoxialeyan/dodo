(function(M) {
    var Editor = My.View.extend({
        events: {
            'click nav>a': function(evt, view) {
                evt.stopPropagation();
                evt.preventDefault();

                var $t = M(this),
                    $ul = $t.find('ul');

                view.toggle($t.siblings().find('ul'), true);
                $ul.length ? view.toggle($ul) : (view.selected($t)[$t.data('cmd')]($t));
            },
            'click ul>li': function(evt, view) {
                evt.stopPropagation();
                var $t = M(this);
                (view.toggle($t.parent()).selected($t, true)[$t.parents('a[data-cmd]').data('cmd')]($t));
            }
        },

        renderafter: function() {
            this.$cmds = this.ui.find('nav>a');
        },

        initialized: function() {
            this.watchIframe();
        },

        watchIframe: function() {
            var _ = this;
            this.ui.find('iframe').load(function() {
                _.fdoc = this.contentDocument;
                _.fdoc.body.focus();
                _.$text = M(_.fdoc.body).click(function() {
                    _.hidden().selection(_.fdoc.getSelection());
                });
            });
        },

        content: function() {
            return this.$text.html();
        },

        focus: function() {
            this.$text[0].focus();
            return this;
        },

        selection: function(sct) {
            if (sct) {
                var $t = M(sct.baseNode.parentNode);
                toggle(this.$cmds.filter('[data-cmd="bold"]'), $t, 'b');
                toggle(this.$cmds.filter('[data-cmd="italic"]'), $t, 'i');
                toggle(this.$cmds.filter('[data-cmd="underline"]'), $t, 'u');
                toggle(this.$cmds.filter('[data-cmd="linethrough"]'), $t, 'strike');
                toggle(this.$cmds.filter('[data-cmd="sup"]'), $t, 'sup');
                toggle(this.$cmds.filter('[data-cmd="sub"]'), $t, 'sub');
            }

            function toggle($cmd, $t, t) {
                ($t.is(t) || $t.parents(t)[0]) && $cmd.addClass('cur') || $cmd.removeClass('cur');
            }
        },

        toggle: function($ul, hidden) {
            $ul.length && ($ul.visible() || hidden ? $ul.hide(350).removeClass('visibility') : $ul.show().delay(20, $ul.addClass, 'visibility'));
            return this;
        },

        hidden: function() {
            return this.toggle(this.ui.find('nav>a>ul'), true);
        },

        selected: function($a, single) {
            single ? $a.addClass('cur').siblings('.cur').removeClass('cur') : ($a.hasClass('cur') && $a.removeClass('cur') || $a.addClass('cur'));
            return this;
        },

        exec: function(cmd, val) {
            this.fdoc.execCommand(cmd, false, val);
            this.focus().check();
            return this;
        },

        check: function() {
            var $undo = this.$cmds.filter('[data-cmd="undo"]'),
                $redo = this.$cmds.filter('[data-cmd="redo"]');
            this.fdoc.queryCommandEnabled('undo') && $undo.removeClass('no') || $undo.addClass('no');
            this.fdoc.queryCommandEnabled('redo') && $redo.removeClass('no') || $redo.addClass('no');
        },

        checkSupSub: function() {
            var $sup = this.$cmds.filter('[data-cmd="sup"]'),
                $sub = this.$cmds.filter('[data-cmd="sub"]');
            this.fdoc.queryCommandEnabled('superscript') && $sup.addClass('cur') || $sup.removeClass('cur');
            this.fdoc.queryCommandEnabled('subscript') && $sub.addClass('cur') || $sub.removeClass('cur');
        },

        undo: function($a) {
            $a.removeClass('cur').hasClass('no') || this.exec('undo');
        },

        redo: function($a) {
            $a.removeClass('cur').hasClass('no') || this.exec('redo');
        },

        bold: function() {
            this.exec('bold');
        },

        italic: function() {
            this.exec('italic');
        },

        underline: function() {
            this.exec('underline');
        },

        linethrough: function() {
            this.exec('strikeThrough');
        },

        sup: function() {
            this.exec('superscript').$cmds.filter('[data-cmd="sub"]').removeClass('cur');
        },

        sub: function() {
            this.exec('subscript').$cmds.filter('[data-cmd="sup"]').removeClass('cur');
        },

        family: function($li) {
            this.exec('fontName', $li.style('font-family'));
        },

        size: function($li) {
            this.exec('fontSize', {
                'x-small': 1,
                'small': 2,
                'medium': 3,
                'large': 4,
                'x-large': 5,
                'xx-large': 6,
                'xxx-large': 7
            }[$li.cls()[0]]);
        },

        color: function($li) {
            this.exec('foreColor', $li.style('color'));
        },

        background: function($li) {
            this.exec('backColor', $li.style('color'));
        },

        clear: function($a) {
            $a.removeClass('cur');
            this.exec('removeFormat');
        },

        justify: function($li) {
            this.exec({
                left: 'justifyLeft',
                center: 'justifyCenter',
                right: 'justifyRight',
                full: 'justifyFull'
            }[$li.cls()[0]]);
        },

        list: function($li) {
            $li.removeClass('cur');
            this.exec({
                order: 'insertOrderedList',
                unorder: 'insertUnorderedList'
            }[$li.cls()[0]]);
        },

        indent: function($li) {
            $li.removeClass('cur');
            this.exec($li.cls()[0]);
        },

        image: function($a) {
            $a.removeClass('cur');

            if (this.imageform) {
                this.imageform.open();
                return;
            }

            this.imageform = createImageForm(this.ui.find('.component-editor-image-dialog')).owner(this).open();
        },

        doImage: function(url) {
            this.exec('insertImage', url);
        },

        face: function() {

        },

        link: function($a) {
            $a.removeClass('cur');

            var sc = this.fdoc.getSelection();
            console.log(sc);

            var md = {
                'title': sc.toString(),
                url: 'http://'
            };

            if (this.urlform) {
                this.urlform.open('title').model.set(md);
                return;
            }

            this.urlform = createUrlForm(this.ui.find('.component-editor-url-dialog'), new M.Model('', null, md));
            this.urlform.owner(this).open('title');
        },

        doLink: function(title, url) {
            this.exec('insertHTML', '<a href="' + url + '">' + title + '</a>');
        },

        unlink: function($a) {
            $a.removeClass('cur');
            this.exec('unlink');
        },

        date: function($a) {
            $a.removeClass('cur');
            this.exec('insertText', M.formatDate(M.now(), 'yyyy-MM-dd'));
        }
    }, 'Editor');

    M.plugin('component', {});
    M.component.Editor = Editor;

    Editor.create = function(container, cb) {
        M.isString(container) && (container = M(container));

        var self = this;

        if (self.prototype.tpl) {
            create();
            return;
        }

        var tpl = M('.component-editor', container).ohtml();
        if (tpl) {
            self.prototype.tpl = tpl;
            create();
            return;
        }

        M.ajax('/components/editor.html', {
            dataType: 'txt',
            contentType: 'text/plain',
            success: function(res) {
                self.prototype.tpl = this.data;
                create();
            }
        });

        function create() {
            var editor = new self(container);
            cb && cb(editor);
        }
    }

    function createUrlForm(container, model) {
        var form = new M.component.Form(container, model, {
            title: '添加超链接',
            body: ['<div class="form">',
                '<label>链接标题：<input name="title" placeholder="请输入链接标题"></label>',
                '<label>链接地址：<input name="url" placeholder="请输入链接地址(如:http://www.dodo.com.cn)" value="http://"></label>',
                '</div>'
            ].join('')
        });
        form.extend({
            owner: function(o) {
                this.editor = o;
                return this;
            },

            commit: function() {
                this.editor && this.editor.doLink(this.model.get('title'), this.model.get('url'));
                this.close();
            },

            check: function() {
                if (!this.model.get('title')) {
                    M.component.alerttip.show('超链接标题不能为空！');
                    return false;
                }

                var url = this.model.get('url');
                if (!url) {
                    M.component.alerttip.show('超链接地址不能为空！');
                    return false;
                }

                if (!/http[s]?:\/\/[^\s\[]+/ig.test(url)) {
                    M.component.alerttip.show('超链接地址不是合法URL！');
                    return false;
                }
                return true;
            }
        });
        return form;
    }

    function createImageForm(container) {
        return new ImageForm(container, {
            title: '添加图片',
            body: ['<div class="form">',
                '<div class="accordionbox"></div>',
                '</div>'
            ].join('')
        });
    }
    var ImageForm = M.component.Form.extend({
        owner: function(o) {
            this.editor = o;
            return this;
        },

        initialized: function() {
            this.addAccordion().owner(this);
        },

        pick: function() {
            return this;
        },

        addAccordion: function() {
            var model = new M.Model('', null, {
                image: null,
                url: ''
            });

            this.accordion = new Accordion('.accordionbox', model, [{
                title: '我的电脑',
                content: ['<p>点击“浏览”，在您电脑中选择要上传的图片，图片上传完毕后将会自动添加到正文中。',
                    '<a href="javascript:;" class="component-btn hot light">浏 览',
                    '<input type="file" name="image" accept="image/*">',
                    '</a>',
                    '</p>',
                    '<span></span>'
                ].join('')
            }, {
                title: '网页地址',
                content: '<label>图片地址：<input name="url" placeholder="请输入图片地址(如:http://www.dodo.com.cn/test.png)"></label>',
            }]);

            return this.accordion;
        },

        commit: function() {
            this.accordion.actived == 0 ? this.upload() : this.insert(this.accordion.model.get('url'));
        },

        upload: function() {
            if (!this.uploader) {
                this.uploader = new M.Multipart('/note/upload', {
                    name: 'image',
                    filters: ['image/*'],
                    maxSize: 10
                });

                var _ = this;
                this.uploader.on({
                    end: function(evt) {
                        var res = M.parse(evt.data);
                        res.code != 1 ? _.uploadError(res.code) : _.insert(location.origin + '/' + res.path);
                    },
                    error: function(evt) {
                        var err = evt.data;
                        _.uploadError(err.code);
                    }
                });
            }
            this.uploader.upload(this.accordion.model.get('image'));
        },

        uploadError: function(code) {
            var msg = ['上传图片失败！', '', '无上传的图片！', '不是图片！', '图片太大！', '上传被取消！'][code] || '未知上传错误!';
            M.component.alerttip.show(msg);
        },

        insert: function(url) {
            this.editor && this.editor.doImage(url);
            this.close();
        },

        check: function() {
            var actived = this.accordion.actived;
            if (actived == 0) {
                var file = this.accordion.model.get('image');
                if (!file) {
                    M.component.alerttip.show('请选择图片！');
                    return false;
                }
                return true;
            }

            var url = this.accordion.model.get('url');
            if (!url) {
                M.component.alerttip.show('超链接地址不能为空！');
                return false;
            }

            if (!/http[s]?:\/\/[^\s\[]+/ig.test(url)) {
                M.component.alerttip.show('超链接地址不是合法URL！');
                return false;
            }
            return true;
        },

        closed: function() {
            this.accordion.clear();
        }
    }, 'ImageForm');

    var Accordion = M.component.Accordion.extend({
        events: {
            'click input[type="file"]': function(evt, view) {
                evt.stopPropagation();
            },
            'change input[type="file"]': function(evt, view) {
                evt.stopPropagation();
                view.selected(this.files[0]);
            },
            'change input[name="url"]': function(evt, view) {
                evt.stopPropagation();
                view.model.set('url', this.value);
            }
        },

        owner: function(o) {
            this.parent = o;
        },

        initialized: function() {
            this.$items.nth(1).find('article').addClass('broswer');
            this.$items.nth(2).find('article').addClass('url');
            this.toggle(0);
        },

        selected: function(file) {
            this.ui.find('.broswer span').text(file && file.name || '');
            this.model.set('image', file);
        },

        clear: function() {
            this.ui.find('.broswer span').text('');
            this.model.clear();
        }
    });

})(My);