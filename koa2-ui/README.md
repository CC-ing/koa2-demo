### react-router-dom 中 BrowserRouter 和 HashRouter
+ 问题
    在本地开发中，如果路由选择BrowserRouter，只能匹配到 / ，匹配其他任何路由如 '/login' 都会出现   404 错误，使用 HashRouter，则可以正确匹配
+ 解决方式
    在webpack中的devServer配置historyApiFallback: true,
    ```
        module.exports = {
            //...
            devServer: {
                historyApiFallback: true,
            },
        };
    ```
+ 原因
    + HashRouter：主要是hash地址的变化，既#号后面的url的变化导致页面的改变，只会产生静态页面的跳转，不回产生路由的变化，即不会发生get的请求
    + BrowserRouter：是利用h5的history对路由进行跳转，路由变化，即会产生get请求，而本地服务器获取到get请求，却没有相应页面的返回，则会报404错误

参考链接： https://www.cnblogs.com/sheep-sheep/p/9550690.html
