1. 为什么优惠券是活动不是主题
<br>
主题对应的是商品入口，活动对应的是优惠券入口
2. 样式尽量自适应，尽量避免固定值
3. 使用模板字符串ES6
```
`${config.apiBaseUrl}theme/by/names`
```
4. 箭头函数可以解决this定义域问题不用let that=this
```
            success: res => {
                this.setData({
                    topTheme: res.data.data[0]
                })
            }
```
5. 页面js不应该写业务逻辑，应该写数据绑定，所以在小程序中新建一个Model层写业务
V是视图层，Controller是桥梁
6. option+commond+o去除多余导入引用
6. 处理异步调用的主要的三种形式
- callback
- promise
- async await（使用await的前提是函数必须返回结果）同步方式调用异步函数
<br>
需要引入函数，把小程序原生不支持properties的api变成支持properties的api
```
const promisic = function (func) {
    return function (params = {}) {
        return new Promise(((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res)
                },
                fail: (error) => {
                    reject(error)
                }
            })
            func(args)
        }))
    }
}
```
7. 组件中参数初始值
```
    properties: {
        grid: Array
    },
```
等同于
```
        grid: {
          type:Array,
          value:[]
        }
```
8. 自定义组件不能直接使用class，需要使用外部样式类
9. 自定义组件相关原则
- 组件的灵活性和易用性/稳定性之间作出选择，找到平衡点
- 组件的意义，page可以使用Component（page就是一个组件，使用Component会更好，Component可以相互继承，引用）
- 组件提供样式、骨架、业务逻辑的封装，减少代码和逻辑
- 组件的灵活性1.外部样式类 2.Slot插槽 3.业务逻辑（Behavior）（都应该设置满足大部分需求的默认值）
### 优惠券
- 分类型：满减、折扣，使用条件 全场券
- 优惠券过期
- 优惠券领取和使用是俩个概念
- 优惠券必须通过活动发放（活动有起始时间，上下架，分类）
10. 给图片设置display：flex可以消除图片自带边距问题
11. 接口的设置
- 每一个数据一个http（请求量最大，数据库查询次数最大，但灵活性最好，可维护性最好，粒度最小）
- 整个Home页面只发送一个http（http请求数量最少，数据库查询次数小于第一种，接口灵活性最低，可维护性最低，粒度最大）
- 有选择的把部分http请求合并成一个（最大考虑是数据库查询次数）
12. js函数式变成（find、filter、map、some、reduce）
13. ===绝对等于（==称做运算符相等（可以进行类型转换），===不仅数据要相同，类型也要相同）
14. 类保存数据，不能保存状态
- 类的对象既能保存数据，又能保存对象
15. 永远保证调用方调用过程是最简单的
16. async可以把任意的返回包装成promise
17. scroll-view开启flex布局enable-flex
18. width:100%;padding:20dp会出现横向滚动条问题,可以通过设置box-sizing:border-box解决
19. wxs中只能用ES5中的语法，不能用ES6、ES7中的语法（const、export都不能用）
- const是只读常量
- let是局部变量
- var是全局变量
20. 设置快捷键
- Editor=》Live Templates（记得勾选下面No applicable context作用域）
21. 自定义组件设置监听器，监听属性变化
```
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object
  },
  // 新式监听器
  observers: {
    //监听banner属性
    'banner': function(banner) {
      if (!banner) {
        return
      }
      if (banner.items.length === 0) {
        return
      }
      const leftItem = banner.items.find(item => item.name === 'left')
      const rightTopItem = banner.items.find(item => item.name === 'right-top')
      const rightBottomItem = banner.items.find(item => item.name === 'right-bottom')
      this.setData({
        leftItem,
        rightTopItem,
        rightBottomItem
      })
    }
  },
```
 22. 小程序设置点击态（点击动画）优化点击延迟
```
        <view hover-class="rect-hover" hover-stay-time="200">
            <image class="left" src="{{left.img}}"></image>
        </view>
```
image组件没有hover-class属性，所以需要包裹上一个view
<br>
三种缩放效果
```
/*平移效果*/
.rect-hover{
    position: relative;
    top: 3rpx;
    left: 3rpx;
    box-shadow: 0px 0px 8px rgba(0,0,0,.1) inset;
}
/*小缩放效果*/
.small-hover{
    opacity: 0.9;
    transform: scale(0.95,0.95);
}
/*中等缩放效果*/
.medium-hover{
    opacity: 0.8;
    transform: scale(0.85,0.85);
}

```
 23. 创建通用样式稳健wxss/sleeve.wxss，使用时在页面或组件wxss中导入即可
```@import "../../wxss/sleeve.wxss";```
app.wxss不会自动应用到自定义组件当中去，因为自定义组件具有封闭性
 24. 小程序抽象节点机制
插槽和抽象节点区别（抽象节点并不是简单写一段xml代码，而是定义一个完整的自定义组件），抽象节点更加灵活（自定义性，终极解决方案）
 25. spu和sku
 ```
　　spu属性：

　　1、毛重420.00 g

　　2、产地中国大陆

　　sku属性:

　　2、容量: 16G, 64G, 128G

　　3、颜色: 银、白、玫瑰金

例如：iPhone X 可以确定一个产品即为一个SPU。

例如：iPhone X 64G 银色 则是一个SKU。
```
 26. 传递数据到组件当中去
 27. wxs的优点
 ```
 代码的分离
 复用
 ```
 28. 设置触底距离
 App。json中window下面
 ```
"onReachBottomDistance": 100
 ```