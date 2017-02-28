ingress-intel-auth 使用说明
===========

此项目依赖于PhantomJs，因此需要先配置好PhantomJs环境。

PhantomJs下载链接：http://phantomjs.org/download.html

### 使用方式

 1. 下载安装相应版本的phantomjs，并参考文档完成相关配置（使得phantomjs命令可用即可）
 2. 调用以下命令（或通过相应.cmd/.sh文件）启动授权：
 
            phantomjs get-cookie/main.js <login-email> <password>
            
 3. 授权完成后，cookie信息会直接通过命令行输出,按需读取即可
 - 若授权成功，则命令行返回：
 
        {
            "status":"success",
            "data":{
                "SACSID":"~AJKiYcFNTBumkUFZz5m5ny2If7WGhshY6kZgGpV1cBusR......",
                "csrftoken":"C0bNNJZApRmtPG55DMXLcROtgRBONVez"
            }
        }


 - 若授权失败，则命令行返回：
 
        {
            "status":"error",
            "errorMsg":"login failed: wrong email and/or password"
        }
        

    
 
 ####附加说明
 - 调试模式：为简化调用，默认情况下调试模式会被禁用，命令行仅输出最终结果，不输出任何中间信息。
 
    若想得到更多输出用以帮助调试，修改get-cookie/modules/module-20-config.js以启用调试模式：

          var config = {
               debugEnable: true,
               ......
           };


 - 在网络环境变化（如IP变更）时，可能会触发Google二次验证导致授权失败(此时一般用浏览器登陆一下、手动完成一次二次校验就好了)
 - 同一帐号连续登录次数过多，貌似也会触发二次校验^v^
 - phantomjs的具体使用，可以参考其文档：http://phantomjs.org/quick-start.html
 - 代码基于[ingress-ice](https://github.com/nibogd/ingress-ice)项目完成，特此感谢
