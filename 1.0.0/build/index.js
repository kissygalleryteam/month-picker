/*
Fri Aug 29 2014 15:06:54 GMT+0800 (中国标准时间)
combined files by KMD:

index.js
*/

KISSY.add('kg/month-picker/1.0.0/index',["node","base"],function(S ,require, exports, module) {
var $ = require('node').all;
var Base = require('base');

//Monthpicker对象
function Monthpicker() {
    // 调用父类构造函数
    Monthpicker.superclass.constructor.apply(this, arguments);

    // 初始化组件
    this._initializer();
}
//Monthpicker继承自基础类base
S.extend(Monthpicker, Base, {
    /**
     * monthpicker初始化
     *
     * @method _initializer
     * @private
     */
    _initializer: function(){
        //获得创建monthpicker的结点id
        this._monthpickerID = this.get('triggerNode');
        var currentMonthpicker = $(this._monthpickerID);
        currentMonthpicker.addClass('monthpicker-component');
        //添加组件的显示部分
        currentMonthpicker.append(Monthpicker.HEAD_TEMPLATE);
        //兼容ie，封闭双击选中默认事件
        currentMonthpicker.attr('onSelectStart', "return (event.srcElement.type == 'text')");
        //中文还是英文
        if(this.get('lang')){
            this.set('lang', true);
        }
        //组件隐藏部分ID
        this._picker = this._monthpickerID + '-modal';
        //渲染隐藏部分
        currentMonthpicker.append(this._initialmodal());
        //获取当前年和月，如果用户配置了，使用用户配置的，若没有配置，采用当前年月
        var date = new Date();
        if(!this.get('month')){
            this.set('month', date.getMonth());  
        }else{
            this.set('month', this.get('month')-1);//减一把月份数字换成角标数字  
        }
        if(!this.get('year')){
            this.set('year', date.getFullYear());
        }else{
            this.set('year', this.get('year'));
        }
        this.set('selectedyear', this.get('year'));
        //将当前年月放入组件中
        currentMonthpicker.one('.monthpicker-month').text(this.monthNamesShort[this.get('month')]);
        currentMonthpicker.one('.monthpicker-year').text(this.get('year'));
        //绑定事件                
        this._buttonevent();
    },
    
    /**
     * 返回monthpicker隐藏部分模板
     *
     * @method _initialmodal
     * @private
     */
    _initialmodal: function(){
        var pickermodal_param = {Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr', May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Aug', Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dec'};
           
        //如果设置中文，显示中文
        if(this.get('lang')){
            pickermodal_param = null;
            pickermodal_param = {Jan: '1月', Feb: '2月', Mar: '3月', Apr: '4月', May: '5月', Jun: '6月', Jul: '7月', Aug: '8月', Sep: '9月', Oct: '10月', Nov: '11月', Dec: '12月'};
            this.monthNamesShort = [];
            this.monthNamesShort = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        }
        pickermodal_param['picker_name'] = this._picker.substr(1);
        //替换模板中的占位符生成模版
        return S.substitute(Monthpicker.TEMPLATE, pickermodal_param);
    },

    /**
     * 事件绑定
     *
     * @method _buttonevent
     * @private
     */
    _buttonevent: function(){
        /**
         *monthpicker所有的click事件
         */
        var currentMonthpicker = $(this._monthpickerID);
        currentMonthpicker.delegate('click', '.monthpicker-btn', this._DELEGATE.click,this);
        var currentMonthpickerModal = $(this._picker);
        currentMonthpickerModal.one('.picker-model').delegate('click', 'td.year-cell,td.mon-cell' ,this._DELEGATE.click, this);//选择添加样式
        /**
         *monthpicker所有的mouseenter和mouseleave事件
         */
        $('.picker-model').delegate('mouseenter mouseleave', '.year-cell,.mon-cell', this._DELEGATE.mouse, this);//选择区域的mouseenter，mouseleave事件
     },
   

    /**
     * 事件代理
     *
     * @method _DELEGATE
     * @private
     */
    _DELEGATE: {
        click: function(e){
            var target = S.one(e.currentTarget);
            var targetSelector = e.currentTarget;
            switch(true){
                case target.hasClass('monthpicker-preyear') || target.hasClass('monthpicker-nextyear') :
                    this.changeHeaderYear(targetSelector);
                    break;
                case target.hasClass('monthpicker-premonth') || target.hasClass('monthpicker-nextmonth') :
                    this.changeHeaderMonth(targetSelector);
                    break;
                case target.hasClass('monthpicker-time') :
                    this.showHiddenRegion();
                    break;
                case target.hasClass('year-cell') || target.hasClass('mon-cell') :
                    this.cellSelected(targetSelector);
                    break;
                case target.hasClass('year-back') || target.hasClass('year-go') :
                    var backOrGo = target.hasClass('year-back')?'back' : 'go';
                    this.changeRegionYear(backOrGo);
                    break;
                case target.hasClass('cancel') || target.hasClass('sure') :
                    this.endSelected(targetSelector);
                    break;
            }
        },
        mouse: function(e){
            if(e.type == 'mouseenter'){
                $(e.currentTarget).addClass('monthpicker-button-hover');
            }
            else if(e.type == 'mouseleave'){
                $(e.currentTarget).removeClass('monthpicker-button-hover');
            }
         }
    },

    /**
     * 加减头部的年
     *
     * @method changeHeaderYear
     * 
     */
    changeHeaderYear: function(targetSelector){
        var currentYear = parseInt(this.get('year'));
        if($(targetSelector).hasClass('monthpicker-preyear')){
            
            var year = (currentYear == 1)? 9999 : (currentYear-1);//如果当前年份是9999，那就回到1去循环
               
        }
        else{
                
            var year = (currentYear == 9999)? 0 : (currentYear+1);//如果当前年份是0，那就回到9999去循环
                
        }
        $(this._monthpickerID).one('.monthpicker-year').text(year);
        this.set('year', year);
    },

    /**
     * 加减头部的月
     *
     * @method changeHeaderMonth
     * 
     */
    changeHeaderMonth: function(targetSelector){
        var currentYear = parseInt(this.get('year'));
        var monthIndex = this.get('month');
        var currentMonthpicker = $(this._monthpickerID);
        //在从12月加到下一年的1月时，改变年份，在从1月捡到上一年的12月时，改变年份
        if($(targetSelector).hasClass('monthpicker-premonth')){
            if(monthIndex-1<0){
                var year;
                if(currentYear == 1){
                    year = 9999;
                }
                else{
                    year = currentYear-1;
                }
                currentMonthpicker.one('.monthpicker-year').text(year);
                
                this.set('year', year);
            }
            monthIndex = (monthIndex-1)<0? (monthIndex+12-1)%12 : (monthIndex-1)%12;
            this.set('month', monthIndex);
        }
        else if($(targetSelector).hasClass('monthpicker-nextmonth')){
            if(monthIndex+1>11){
                var year;
                if(currentYear == 9999){
                    year = 1;
                }
                else{
                    year = currentYear+1;
                }
                currentMonthpicker.one('.monthpicker-year').text(year);
                this.set('year', year);
            }
            monthIndex = (monthIndex+1)%12;
            this.set('month',monthIndex);
        }
        
        //显示点击后的月
        currentMonthpicker.one('.monthpicker-month').text(this.monthNamesShort[monthIndex]);
    },

    /**
     * 点击年月显示隐藏的选择区域
     *
     * @method showHiddenRegion
     * 
     */
    showHiddenRegion: function(){
        var currentMonthpicker = $(this._monthpickerID);
        currentMonthpicker.all('.monthpicker-selected').removeClass('monthpicker-selected');
        var allMonthTd = $(this._monthpickerID).all('.mon-cell');
        //把头部显示的月在选择区域选中
        for(var i = 0; i<allMonthTd.length; i++){
            if(this.monthNamesShort[this.get('month')] == allMonthTd.item(i).text()){
                allMonthTd.item(i).addClass('monthpicker-selected');
                break;
            }
        }

        //把头部显示的年在选择区域选中
        var allYearTd = $(this._monthpickerID).all('.year-cell');
        for(var i = 0; i<allYearTd.length; i++){
            if (i == 0){
                allYearTd.item(i).text(this.get('year'));
                allYearTd.item(i).addClass('monthpicker-selected');
            }
            else{
                //根据上一年的年份加1算出当前年份
                var currentCellYear = parseInt(allYearTd.item(i-1).text())+1;
                allYearTd.item(i).text(currentCellYear);
            }
        }
        
        var currentMonthpickerModal = $(this._picker);                                     
        // currentMonthpickerModal.css('position', 'absolute');
        // currentMonthpickerModal.css('left', currentMonthpicker.offset().left);
        // currentMonthpickerModal.css('top', currentMonthpicker.offset().top);
        // currentMonthpickerModal.css('display', 'block');
        currentMonthpickerModal.css({'position': 'absolute', 'top': currentMonthpicker.offset().top, 'left': currentMonthpicker.offset().left, 'display': 'block'});
    },

    /**
     * 选中年月添加样式
     *
     * @method cellSelected
     * 
     */
    cellSelected: function(targetSelector){
        //if($(targetSelector).hasClass('mon-cell') && $(self._picker).all('.mon-cell').hasClass('.monthpicker-selected')){
        if($(targetSelector).hasClass('mon-cell')){            
            $(this._picker).all('.mon-cell').removeClass('monthpicker-selected');
        }
        else if($(targetSelector).hasClass('year-cell')){
            $(this._picker).all('.year-cell').removeClass('monthpicker-selected');
            //把当前选中的year保存起来
            this.set('selectedyear',parseInt($(targetSelector).text()));
        }
        $(targetSelector).addClass('monthpicker-selected');
       
    },
    /**
     * 加减选择区域的年份
     *
     * @method changeRegionYear
     * 
     */
    changeRegionYear: function(backOrGo){
        var allYearTd = $(this._picker).all('.year-cell');
        for(var i = 0; i<allYearTd.length; i++){  
            var newyear = 0;
            if (backOrGo == 'back') {
                newyear = parseInt(allYearTd.item(i).text())-8;
            }
            else{
                newyear = parseInt(allYearTd.item(i).text())+8;
            }
            allYearTd.item(i).text(newyear);
        }

        //如果年份区域不包含之前所选中的年份，去掉monthpicker-selector样式
        if(allYearTd.hasClass('monthpicker-selected')){
            $(this._monthpickerID).one('.year-cell.monthpicker-selected').removeClass('monthpicker-selected');
        }
        for(var i = 0; i < allYearTd.length; i++){
            if(parseInt(allYearTd.item(i).text()) == this.get('selectedyear')){
                allYearTd.item(i).addClass("monthpicker-selected");
            }
        }
    },
    /**
     * 点击OK或者Cancel响应时间
     *
     * @method endSelected
     * 
     */
    endSelected: function(targetSelector){
        var monthIndex = -1;
        var currentMonthpicker = $(this._monthpickerID);
        var currentMonthpickerModal = $(this._picker);
        if($(targetSelector).hasClass('sure')){
            currentMonthpicker.one('.monthpicker-year').text(this.get('selectedyear'));
            currentMonthpicker.one('.monthpicker-month').text(currentMonthpickerModal.one('.monthpicker-selected.mon-cell').text());
            for(var i = 0; i < currentMonthpicker.all(".mon-cell").length; i++){
                if(currentMonthpickerModal.one('.monthpicker-selected.mon-cell').text() == currentMonthpicker.all(".mon-cell").item(i).text()){
                    monthIndex = i;
                    break;
                }
            }
            this.set('month', monthIndex);
            this.set('year', this.get('selectedyear'));
        }
        
        currentMonthpickerModal.css('display', 'none');
    },
    /**
     * 获取月份
     *
     * @method getPickerMonth
     * @public
     */
    getPickerMonth: function(){
        return this.get('month');
    },

    /**
     * 获取年份
     *
     * @method getPickerYear
     * @public
     */
    getPickerYear: function(){
        return this.get('year');
    },

    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Short names of months

}, {
    
        HEAD_TEMPLATE:  '<div class="monthpicker">'
                        +'<a href="#" class = "monthpicker-preyear monthpicker-btn"><<</a>'
                        +'<a href="#" class = "monthpicker-premonth monthpicker-btn"><</a>'
                        +'<a href="#" class = "monthpicker-time monthpicker-btn"><span class = "monthpicker-year"></span>&nbsp<span class = "monthpicker-month"></span></a>'
                        +'<a href="#" class = "monthpicker-nextmonth monthpicker-btn">></a>'
                        +'<a href="#" class = "monthpicker-nextyear monthpicker-btn">>></a>'
                        +'</div>',//monthpicker显示部分模板
        TEMPLATE:
                '<div id = "{picker_name}" class = "picker-div" style = "display:none">'
                +'<table class = "picker-model"><tbody>'   
                +'<tr><td class = "picker-button" colspan = "2"><a href = "javascript:void(0)" class = "year-back monthpicker-btn">&lt;</a></td>'
                +'<td class = "picker-button" colspan = "2"><a href = "javascript:void(0)" class = "year-go monthpicker-btn">&gt;</a></td></tr>'
                +'<tr><td class = "year-cell"></td><td class = "year-cell"></td>'
                +'<td class = "year-cell"></td><td class = "year-cell"></td></tr>'
                +'<tr><td class = "year-cell"></td><td class = "year-cell"></td>'
                +'<td class = "year-cell"></td><td class = "year-cell"></td></tr>'
                +'<tr><td class = "mon-cell">{Jan}</td><td class = "mon-cell">{Feb}</td>'
                +'<td class = "mon-cell">{Mar}</td><td class = "mon-cell">{Apr}</td></tr>'
                +'<tr><td class = "mon-cell">{May}</td><td class = "mon-cell">{Jun}</td>'
                +'<td class = "mon-cell">{Jul}</td><td class = "mon-cell">{Aug}</td></tr>'
                +'<tr><td class = "mon-cell">{Sep}</td><td class = "mon-cell">{Oct}</td>'
                +'<td class = "mon-cell">{Nov}</td><td class = "mon-cell">{Dec}</td></tr>'
                +'</tbody></table>'
                +'<div class = "btn-sure-cancel"><a href = "javascript:void(0)" class="sure monthpicker-btn">OK</a><a href="javascript:void(0)" class="cancel monthpicker-btn">Cancel</a></div>'
              +'</div>'
        ,//monthpicker隐藏部分模板
        ATTRS: 
        {
                triggerNode: 
                {
                    value: ''
                },

                lang:
                {
                    value: false
                },

                month:
                {
                    value: ''
                },

                year:
                {
                    value: ''
                },

                selectedyear:
                {
                    value: ''
                }
        }//静态成员    
    }
);

module.exports = Monthpicker;




});