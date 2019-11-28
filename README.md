## vue企业微信工程vue-corpwx
#### 一、 pull代码之后使用方法

##### 1、安装vue-cli
  	npm install -g vue-cli

##### 2、加载依赖文件
  	npm install

##### 3、启动开发环境工程
    npm run dev
	  
##### 4、启动测试环境工程
    npm run uat

##### 5、打包开发环境代码
    npm run build:dev

##### 6、打包测试环境代码
    npm run build:uat

##### 7、打包正式环境代码
    npm run build:prod

#### 二、学习参考：从零开始初始化vue-vant工程

##### 1、安装vue命令行
    npm install -g vue-cli

##### 2、初始化vue webpack工程
    vue init webpack vue-corpwx

##### 3、安装vant
    npm i vant -S

##### 4、引入vant组件

###### 4.1、全局引入
    import Vant from 'vant';
    import 'vant/lib/vant-css/index.css';
    Vue.use(Vant)
###### 4.2、使用 babel-plugin-import引入 (推荐)
	# 安装 babel-plugin-import 插件
	npm i babel-plugin-import -D

	// 在 .babelrc 或 babel-loader 中添加插件配置
	// 注意：webpack 1 无需设置 libraryDirectory。
	{
  		"plugins": [
    		["import", {
      			"libraryName": "vant",
      			"libraryDirectory": "es",
      			"style": true
    		}]
  		]
	}

	接着你可以在代码中直接引入 Vant 组件，插件会自动将代码转化为方式二中的按需引入形式。
	import { Button } from 'vant';

##### 5、使vue支持scss

###### 5.1、安装相应的装载器
    npm install node-sass --save-dev
    sudo npm install sass-loader --save-dev
    sudo npm install style-loader --save-dev
    sudo npm install css-loader --save-dev

###### 5.2、在webpack.base.conf.js中配置规则
	{
  		test: /\.scss$/,
  		include: '/src/',
  		use: ['style-loader', 'css-loader', 'sass-loader']
	}

###### 5.3、在vue文件下的style设置lang="scss"
	<style lang="scss" scoped></style>

##### 6、安装vuex
    npm i vuex -S

##### 7、安装fastclick
    npm i fastclick -S

##### 8、安装axios
    npm iaxios -S
