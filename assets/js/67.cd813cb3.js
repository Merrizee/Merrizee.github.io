(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{381:function(t,v,_){"use strict";_.r(v);var s=_(8),n=Object(s.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"设计模式都用了哪些"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#设计模式都用了哪些"}},[t._v("#")]),t._v(" 设计模式都用了哪些：")]),t._v(" "),v("p",[t._v("1."),v("strong",[t._v("责任链模式")]),t._v("：一个场景是为npos部门提供计算offer的接口，首先第一步是要进行传入参数合法性校验的过滤，常规的校验一般是两种：")]),t._v(" "),v("ul",[v("li",[t._v("使用validate相关的注解和自定义注解校验入参请求对象")]),t._v(" "),v("li",[t._v("复杂点的需要代码里手动判断。")])]),t._v(" "),v("p",[t._v("我们因为有一些校验是包含一些复杂的数据库查询，和流程判断的，所以需要手动写代码判断并处理，这种情况下使用责任链模式，定义一个通用的校验规则接口，不同的校验规则是接口的实现类，使用的时候，不同的方法用哪些规则添加哪些规则的实现类即可，接口中遍历所有添加到规则的实现类。")]),t._v(" "),v("p",[t._v("2."),v("strong",[t._v("策略模式")]),t._v("：把if else这种的条件语句的所有条件都放到map里，具体的条件处理方式使用具体的实现类。")]),t._v(" "),v("p",[t._v("3."),v("strong",[t._v("单例模式")]),t._v("：场景是工具类，例如生成uuid的、定时任务springbatch那里统一处理记录job的任务执行日志的。目的就是省资源，不用频繁创建对象，第二个就是保证类的安全")]),t._v(" "),v("p",[t._v("4."),v("strong",[t._v("模板模式")]),t._v("：一部分流程是通用的，只是具体实现细节不同，提取公共的流程成抽象方法，具体的实现让子类实现。")])])}),[],!1,null,null,null);v.default=n.exports}}]);