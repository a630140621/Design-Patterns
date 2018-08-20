[toc]

# Design Patterns
设计模式

# 单例模式

使用场景：

1. 需要生成唯一序列号的环境
2. 在整个项目中需要一个共享访问点或共享数据
3. 创建一个对象消耗资源过多

## Singleton.simple.class.js

简单的单例模式

## Singleton.simple1.class.js

将单例放到原型上

## Singleton.multi.class.js

单例模式的加强版, 新建实例的时候传入不同的名称即可得到不同的实例, 若名称相同则得到相同的实例

## Singleton.multi1.class.js

将 instances 放到原型链上

# 工厂方法模式

# 模板方法模式

优点：

1. 封装不变部分，扩展可变部分。 
2. 提取公共代码，便于维护。 
3. 行为由父类控制，子类实现。

缺点：

* 增加代码的阅读难度.

使用场景： 

1. 多个子类有共有的方法，且逻辑基本相同。 
2. 重要的、复杂的方法，可以考虑把核心算法设计为模板方法, 周边的相关细节功能由子类实现.
3. 对外开放自定义拓展功能, 用户只需要实现此模板方法即可实现自定义功能

## Templete.class.js

简单的模板方法

## Templete.hook.class.js

带钩子的模板方法

## Template.sequence.class.js

可自定义模板方法的执行顺序

# 建造者模式

建造者模式的特点是分步构建一个复杂的对象，可以用不同组合或顺序建造出不同意义的对象，通常使用者并不需要知道建造的细节。

优点: 

1. 建造者模式的封装性很好。使用建造者模式可以有效的封装变化
2. 建造者模式很容易进行扩展。如果有新的需求，通过实现一个新的建造者类就可以完成，基本上不用修改之前已经测试通过的代码，因此也就不会对原有功能引入风险。

# 代理模式

代理模式也叫做 _委托模式_, 负责对真实角色的应用, 把所有抽象主题类定义的方法限制委托给真实的角色实现, 并在处理完毕前后做 __预处理__ 和 __善后__ 工作

ES6 中新增了一个代理类 [参考链接](http://es6.ruanyifeng.com/#docs/proxy) 用来实现相关功能

> 这里写的代理模式是参考设计模式中实现的代码

## Proxy.introduction.class.js

代理模式介绍

## Proxy.common.class.js

普通的代理模式

## Proxy.dynamic.class.js

动态代理, 此处使用 ES6 Proxy 实现对类中函数访问的代理

> 实现了对类中方法进行动态代理，包括预处理和后续处理

# 中介者模式(未完成)

中介者模式（Mediator），用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

如果有多个模块(超过3个)进行相互调用,形成网状结构, 那么对于系统的维护是非常困难的;这时候使用中介者模式是非常好的, 对于每个类来说只处理自身相关的事情,其他的事情全部交给中介者类进行处理

# 命令模式(未完成)

将一个请求封装成一个对象, 从而让你使用不同的请求把客户端参数化, 对请求排队或者记录请求日志, 可以提供命令的撤销和恢复功能

敏捷开发原则告诉我们，不要为代码添加基于猜测的、实际不需要的功能，如果不清楚一个系统是否需要命令模式，一般就不要着急去实现它，事实上，在增加需求时通过重构实现这个模式并不困难，只有在真正需求如撤销、恢复操作等功能时，把原来的代码重构为命令模式才有意义。

# 责任链模式

## Chain.class.js

财秘登录的责任链方式(目前的代码有点问题)

## Chain.classify.class.js

责任链基本用法

## Chain.class.1.js

责任链用法的一个模拟场景

## 妆饰者模式

定义：

* **装饰者(decorator)** 模式能够在不改变对象自身的基础上，在程序运行期间给 __对象动态的添加职责。__ 与继承相比，装饰者是一种更轻便灵活的做法。

优点：

* 可以动态的给某个对象添加额外的职责，而不会影响从这个类中派生的其它对象

## 策略模式

定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

> 使用策略模式重构代码，可以消除程序中大片的条件分支语句。

## 适配器模式

适配器模式（Adapter）是将一个类（对象）的接口（方法或属性）转化成客户希望的另外一个接口（方法或属性），适配器模式使得原本由于接口不兼容而不能一起工作的那些类（对象）可以一些工作。

> js （弱类型语言） 中，作用？？？