## month-picker

* 版本：1.0.0
* 教程：[http://gallery.kissyui.com/month-picker/1.0.0/guide/index.html](http://gallery.kissyui.com/month-picker/1.0.0/guide/index.html)
* demo：[http://gallery.kissyui.com/month-picker/1.0.0/demo/index.html](http://gallery.kissyui.com/month-picker/1.0.0/demo/index.html)

# Monthpicker #

Monthpicker是一个供用户选择年份和月份的组件，在类似线简历填写等信息系统中可以有广泛应用

- 作者：维钧

#### Monthpicker的特性 ###

* 使用简单
* 支持读取年份
* 支持读取月份

### 使用方法 ###
    1.html中加入：
        <div id="{ID}"></div>
    2.js中加入
        var monthpicker = new Monthpicker({
            triggerNode : '#'+'{ID}'
        });
    3.获取年份和月份
        var monthpicker = new Monthpicker({
            triggerNode : '#'+'{ID}'
        });
        monthpicker.getPickerYear();//读取年份
        monthpicker.getPickerMonth();//读取月份
    4. 可配置项
        年月的配置（可选），不写默认为当前年月
        var monthpicker = new Monthpicker({
            triggerNode : '#monthpicker',
            month : '12',//12月
            year : '1989'//1989年
        });

        中文的配置（可选），不写默认为英文
         var monthpicker = new Monthpicker({
            triggerNode : '#monthpicker',
            month : '12',//12月
            year : '1989'//1989年
            lang : true//中文
        });




