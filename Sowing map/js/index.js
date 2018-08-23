//将整体封装成一个自运行函数
(function () {
    //规定好每张图片的位置和状态
    var states = [{
            ZIndex: 1,
            width: 120,
            height: 150,
            top: 69,
            left: 134,
            opac: 0.2
        },
        {
            ZIndex: 2,
            width: 130,
            height: 170,
            top: 59,
            left: 0,
            opac: 0.5
        },
        {
            ZIndex: 3,
            width: 170,
            height: 218,
            top: 36,
            left: 110,
            opac: 0.7
        },
        {
            ZIndex: 4,
            width: 224,
            height: 288,
            top: 0,
            left: 263,
            opac: 1
        },
        {
            ZIndex: 3,
            width: 170,
            height: 218,
            top: 36,
            left: 470,
            opac: 0.7
        },
        {
            ZIndex: 2,
            width: 130,
            height: 170,
            top: 59,
            left: 620,
            opac: 0.5
        },
        {
            ZIndex: 1,
            width: 120,
            height: 150,
            top: 69,
            left: 500,
            opac: 0.2
        }
    ];

    //将状态和位置赋给li
    var lis = $('#box li');

    function move() {
        lis.each(function (index, ele) {
            var state = states[index];
            // $(ele).css({
            //     "z-index":state.ZIndex,
            //     'width':state.width,
            //     'height':state.height,
            //     'top':state.top,
            //     'left':state.left
            // })

            //初始效果
            $(ele).css('z-index', state.ZIndex).finish().animate(state, 1000).find('img').css('opacity', state.opac);
        })
    }
    //初始调用
    move();
    //下一张
    function next() {
        //原理：把数组中的最后一个元素移动到第一个元素位置
        states.unshift(states.pop());
        move();
    }
    $('#box .next').click(function () {
        next();

    })
    //上一张
    $('#box .prev').click(function () {
        //原理：把数组中的第一个元素移动到最后一个元素位置
        states.push(states.shift());
        move();
    })

    //自动轮播
    var time = null;

    function autoPlay() {
        time = setInterval(function () {
            next()
        }, 1000)
    }
    autoPlay();

    //停止轮播
    $('#box sextion').add('#box li').hover(function () {
        clearInterval(time);
    }, function () {
        autoPlay();
    })
})








//封装为插件，能够重复使用，会产生什么效果？
//1、插件中最好不要使用id，原因：id具有唯一性，插件是为了重复使用的，会造成页面冲突
//2、变量命名和方法命名：states、time、move()、用户在使用这个插件的时候，可能还会引入自己的创建的文件，这样会产生冲突
//3、标签class值的问题：prev、next。这些class名太大众化，大多数会被重复
//4、插件的文件命名问题：index.js  index.css