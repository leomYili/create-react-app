> 本项目来源于[Create React App](repo)(https://github.com/facebook/create-react-app).

# 简介

请使用**node6.X**之上版本进行打包,本脚手架内使用webpack4进行打包

## 脚手架命令

该包用于可视化界面工具系统项目目录及打包脚手架构建,具体命令如下:

### `npm start`

启动本地开发环境命令 <br>
在默认浏览器中打开 [http://localhost:3000](http://localhost:3000).

### `npm test`

启动本地测试环境命令 <br>
打开命令行软件进入调试模式 [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build-XX`

使用`build`命令进行打包 <br>
在本项目中会根据线上环境分为release以及prod,对应线上开发(测试)环境,以及正式线上环境. <br>

* release:线上测试环境,用于对接真实接口,数据库为内部数据库
* master:正式线上环境,用于对接

在打包时会对代码进行压缩,release环境会附带map地图,而prod环境则为最简化形式进行打包,并自动去除**console**

更多信息可以查看 [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run build --report`

在构建时进行依赖分析,使用`--report`参数打开一个额外的页面进行查看,默认为3001

### `npm run eject`

**强烈不建议使用eject进行解包,如果脚手架本身有问题,可访问该项目进行修改,并上传至npm进行使用**

当脚手架缺失功能时,可新增issues进行说明.
