ingress-intel-auth 使用说明
===========

此项目依赖于PhantomJs，因此需要先配置好PhantomJs环境。

PhantomJs下载链接：http://phantomjs.org/download.html

### 使用方式

 1. 下载安装相应版本的phantomjs，并参考文档完成相关配置（使得phantomjs命令可用即可）
 2. 调用以下命令（或双击get-cookie.cmd文件）以启动授权：
            phantomjs get-cookie/main.js
 3. 授权完成后，cookie信息会保存至根目录的cookie.txt文件中,按需读取即可
 
 
 ####附加说明
 - 每次启动命令时，会删除旧的cookie.txt文件。调用命令后，检测到新的cookie.txt文件已生成时，说明授权过程已完成，从文件中读取新的cookie信息即可。
 - 注意：在网络环境变化（如IP变更）时，可能会触发Google二次验证导致授权失败，此时一般用浏览器登陆一下、完成二次校验就好了。
 - 同一帐号连续登录次数过多，貌似也会触发二次校验^v^
 - phantomjs的具体使用，可以参考其文档：http://phantomjs.org/quick-start.html
 - 可搜索关键词“phantomjs + python”获取其与Python协作的具体方法
