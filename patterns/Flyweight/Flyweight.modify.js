/**
 * 享元模式在 js 中的作用, 仅用于启发
 * http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-flyweight/
 * 
 * 在webqq里面, 打开QQ好友列表往下拉的时候，会为每个好友创建一个div( 如果算上div中的子节点, 还远不只1个元素 ).
 * 如果有1000个QQ好友, 意味着如果从头拉到尾, 会创建1000个div, 这时候有些浏览器也许已经假死了. 这还只是一个随便翻翻好友列表的操作.
 * 所以我们想到了一种解决办法, 当滚动条滚动的时候, 把已经消失在视线外的div都删除掉. 这样页面可以保持只有一定数量的节点. 
 * 问题是这样频繁的添加与删除节点, 也会造成很大的性能开销, 而且这种感觉很不对味.
 * 
 * 现在 享元模式 可以登场了. 顾名思义, 享元模式可以提供一些共享的对象以便重复利用. 
 * 仔细想下, 其实我们一共只需要10个div来显示好友信息,也就是出现在用户视线中的10个div.这10个div就可以写成享元.
 * 
 * 注: 此处和享元模式不符, 享元模式是通过利用对象的共性 来实现对象共享的, 此处是把创建好的对象放在池中, 需要时拿出来使用
 */

class DivPool {
    constructor() {
        return DivPool.instance
    }

    getDiv(index) {
        return DivPool['pools'][index]
    }
}

DivPool.instance = new DivPool()
DivPool.pools = [0, 1, 2, 3, 4]

// 用法
let div = new DivPool.getDiv()
div.innerHTML = "{{userInfo}}"




// 原理其实很简单, 把刚隐藏起来的div放到一个数组中, 当需要div的时候, 先从该数组中取, 如果数组中已经没有了, 再重新创建一个. 这个数组里的div就是享元, 它们每一个都可以当作任何用户信息的载体.

// 参考这篇文章,
// https://blog.csdn.net/qq_22533095/article/details/52239076
// 即上述用的方法并不是 享元模式, 而是对象池技术, 思想不同, 但是目的相同
// 参考以下代码

var toolTipFactory = (function () {
    var toolTipPool = []; //存放已经创建的对象

    return {
        create: function () {
            if (toolTipPool.length == 0) { //如果对象池为空,需要创建新的对象
                var div = document.createElement('div'); //创建节点
                document.body.appendChild(div);
                return div;
            } else { //对象池不为空，直接获取
                return toolTipPool.shift();
            }
        },

        recover: function (tooltipDom) { //对象的回收
            return toolTipPool.push(tooltipDom);
        }
    }
})();

//第一次使用创建两个
var ary = [];
for (var i = 0, str; str = ['A', 'B'][i++];) {
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
};

//回收对象
for (var i = 0, toolTip; toolTip = ary[i++];) {
    toolTipFactory.recover(toolTip);
};

//创建新的对象
for (var i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'D'][i++];) {
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
}