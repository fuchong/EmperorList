/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-21
 * Time: 下午7:52
 * To change this template use File | Settings | File Templates.
 */

var emperor = {

};
//$(emperor.init);
(function (emperor) {

    var urlback;
    emperor.AppRouter = Backbone.Router.extend({
        routes:{
            "addEmperor":"addEmperor",
            "*actions":"defaultRoute"
        },
        addEmperor:function () {
            var emperorFormView = new emperor.EmperorFormView;
            var emperorItem = new emperor.Emperor();
            emperorFormView.model = emperorItem;
            emperorFormView.render().$el.appendTo('article');
        },
        defaultRoute:function () {
            var emperorCollectionView = new emperor.EmperorCollectionView;
            emperorCollectionView.render().$el.appendTo('article');
        }
    });

    emperor.Emperor = Backbone.Model.extend({
        urlRoot:'/user'
    });

    emperor.EmperorCollection = Backbone.Collection.extend({
        url:'/getAllUser',
        model:emperor.Emperor
    });

    emperor.EmperorCollectionView = Backbone.View.extend({
        tagName:'div',
        className:'listView',
        initialize:function () {
            if(navigator.onLine){
                this.model = new emperor.EmperorCollection;
                this.model.fetch({add:true});
                this.model.on('add', this.addToView);
            }

        },
        render:function () {
            $('article').empty();
            new emperor.drawBackground();
            var source = $("#emperoritem").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(this.el).append(html);

            return this;
        },
        addToView:function (data) {
            var source = $("#emperor").html();
            var template = Handlebars.compile(source);
            var context = data.toJSON();
            var html = template(context);
            $('table').append(html);
        },
        events:{
            'click #addUserButton':'add'
        },
        add:function () {
            self.location = '#addEmperor';
        }
    });

    emperor.EmperorFormView = Backbone.View.extend({
        tagName:'div',
        className:'listView',
        render:function () {
            $('article').empty();
            new emperor.drawBackground();
            var source = $("#addEmperor").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(this.el).append(html);
            this.delegateEvents(this.events);
            return this;
        },
        events:{
            'change #userName, #miaohao, #yihao, #nianhao,#year':'change',
//            'change #emperorImg':'upload',
            'click #save':'save'

        },
        save:function () {
            this.model.save(null, {
                success:function (model, res) {
                    if (!res.isSuccess) {
                        $("#err").html(res.info);
                    } else {
                        self.location = '#defaultRoute';
                    }
                },
                error:function () {
                    $("#err").html("添加用户失败");
                }
            });
        },
//        upload:function (e) {
//            console.log(e.target.files[0].size);
//            var file = e.target.files[0];
//            var img = document.createElement('img');
//            img.classList.add('obj');
//            img.file = file;
//            $(img).appendTo($('#showImage'));
//            var reader = new FileReader();
//            reader.onload = (function (aImg) {
//                return function (e) {
//                    aImg.src = e.target.result;
//                };
//            })(img);
//            reader.readAsDataURL(file);
//            var button = '<input type="button" value="提交" id="submit1">';
//            $(button).appendTo($('#showImage'));
//            $('#submit1').bind("click", function () {
//                emperor.sendFiles();
//            });
//        },
        change:function () {
            this.model.set('userName', $("#userName").val());
            this.model.set('miaohao', $("#miaohao").val());
            this.model.set('yihao', $("#yihao").val());
            this.model.set('nianhao', $("#nianhao").val());
            this.model.set('year', $("#year").val());
        }
    });

    emperor.drawBackground = function(){
        var url;
       var canvas=document.createElement('canvas');
        canvas.width=500;
        canvas.height=500;
        var context = canvas.getContext("2d");
        context.globalAlpha = 0.5;
        var myImage = new Image();
        myImage.src = "./images/backgroundimg.png";
        myImage.onload = function()
        {
            context.drawImage(myImage,0,0,500, 500);
            url= canvas.toDataURL();
            $('.listView').css({
                'background-image':'url('+url+')'
            });
        };

    }

    emperor.sendFiles = function () {
//
        new emperor.FileUpload('', $("#emperorImg")[0].files[0]);
    }
    emperor.FileUpload = function (img,file) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/upload?fileName=" + file.name + '&fileSize=' + file.size);
        xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
        xhr.onload = function (e) {

        };
// Listen to the upload progress.
        var progress = '<progress min="0" max="100" value="0">0% complete</progress>';
        $(progress).appendTo($('#proess'));
        var progressBar = document.querySelector('progress');
        console.log(progressBar);
        console.log(progress);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        };
        xhr.send(file);
    }

}(emperor));

