# 功能
上传图片并且编辑

# cropper js跟css地址
https://cdnjs.com/libraries/cropperjs

# 使用说明
- 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
 npm install
```

- 启动服务器
```
$ npm run start
```

## 目录结构说明
```
|─dist # 编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
├─node_modules # 利用npm管理的所有包及其依赖
├─vendor # 所有不能用npm管理的第三方库
├─public # 存放一些静态文件,css以及image
├─lib # 存放一些通用函数
├─.babelrc # babel的配置文件
├─.eslintrc # ESLint的配置文件
├─example.html # 仅作为重定向使用
├─package.json # npm的配置文件
├─webpack.config.js # 生产环境的webpack配置文件
├─app.js  # express搭建的一个服务器
├─src # 当前项目的源码
    ├─react # react相关代码
    ├─template #一些模板html
    ├─*.js  #一些js文件
```

https://github.com/Array-Huang/webpack-seed

