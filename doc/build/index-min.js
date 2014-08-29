KISSY.add('kg/month-picker/1.0.0/index',["node","base"],function(S ,require, exports, module) {function e(){e.superclass.constructor.apply(this,arguments),this._initializer()}var t=require("node").all,s=require("base");S.extend(e,s,{_initializer:function(){this._monthpickerID=this.get("triggerNode");var s=t(this._monthpickerID);s.addClass("monthpicker-component"),s.append(e.HEAD_TEMPLATE),s.attr("onSelectStart","return (event.srcElement.type == 'text')"),this.get("lang")&&this.set("lang",!0),this._picker=this._monthpickerID+"-modal",s.append(this._initialmodal());var a=new Date;this.get("month")?this.set("month",this.get("month")-1):this.set("month",a.getMonth()),this.get("year")?this.set("year",this.get("year")):this.set("year",a.getFullYear()),this.set("selectedyear",this.get("year")),s.one(".monthpicker-month").text(this.monthNamesShort[this.get("month")]),s.one(".monthpicker-year").text(this.get("year")),this._buttonevent()},_initialmodal:function(){var t={Jan:"Jan",Feb:"Feb",Mar:"Mar",Apr:"Apr",May:"May",Jun:"Jun",Jul:"Jul",Aug:"Aug",Sep:"Sep",Oct:"Oct",Nov:"Nov",Dec:"Dec"};return this.get("lang")&&(t=null,t={Jan:"1月",Feb:"2月",Mar:"3月",Apr:"4月",May:"5月",Jun:"6月",Jul:"7月",Aug:"8月",Sep:"9月",Oct:"10月",Nov:"11月",Dec:"12月"},this.monthNamesShort=[],this.monthNamesShort=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]),t.picker_name=this._picker.substr(1),S.substitute(e.TEMPLATE,t)},_buttonevent:function(){var e=t(this._monthpickerID);e.delegate("click",".monthpicker-btn",this._DELEGATE.click,this);var s=t(this._picker);s.one(".picker-model").delegate("click","td.year-cell,td.mon-cell",this._DELEGATE.click,this),t(".picker-model").delegate("mouseenter mouseleave",".year-cell,.mon-cell",this._DELEGATE.mouse,this)},_DELEGATE:{click:function(e){var t=S.one(e.currentTarget),s=e.currentTarget;switch(!0){case t.hasClass("monthpicker-preyear")||t.hasClass("monthpicker-nextyear"):this.changeHeaderYear(s);break;case t.hasClass("monthpicker-premonth")||t.hasClass("monthpicker-nextmonth"):this.changeHeaderMonth(s);break;case t.hasClass("monthpicker-time"):this.showHiddenRegion();break;case t.hasClass("year-cell")||t.hasClass("mon-cell"):this.cellSelected(s);break;case t.hasClass("year-back")||t.hasClass("year-go"):var a=t.hasClass("year-back")?"back":"go";this.changeRegionYear(a);break;case t.hasClass("cancel")||t.hasClass("sure"):this.endSelected(s)}},mouse:function(e){"mouseenter"==e.type?t(e.currentTarget).addClass("monthpicker-button-hover"):"mouseleave"==e.type&&t(e.currentTarget).removeClass("monthpicker-button-hover")}},changeHeaderYear:function(e){var s=parseInt(this.get("year"));if(t(e).hasClass("monthpicker-preyear"))var a=1==s?9999:s-1;else var a=9999==s?0:s+1;t(this._monthpickerID).one(".monthpicker-year").text(a),this.set("year",a)},changeHeaderMonth:function(e){var s=parseInt(this.get("year")),a=this.get("month"),r=t(this._monthpickerID);if(t(e).hasClass("monthpicker-premonth")){if(0>a-1){var n;n=1==s?9999:s-1,r.one(".monthpicker-year").text(n),this.set("year",n)}a=0>a-1?(a+12-1)%12:(a-1)%12,this.set("month",a)}else if(t(e).hasClass("monthpicker-nextmonth")){if(a+1>11){var n;n=9999==s?1:s+1,r.one(".monthpicker-year").text(n),this.set("year",n)}a=(a+1)%12,this.set("month",a)}r.one(".monthpicker-month").text(this.monthNamesShort[a])},showHiddenRegion:function(){var e=t(this._monthpickerID);e.all(".monthpicker-selected").removeClass("monthpicker-selected");for(var s=t(this._monthpickerID).all(".mon-cell"),a=0;a<s.length;a++)if(this.monthNamesShort[this.get("month")]==s.item(a).text()){s.item(a).addClass("monthpicker-selected");break}for(var r=t(this._monthpickerID).all(".year-cell"),a=0;a<r.length;a++)if(0==a)r.item(a).text(this.get("year")),r.item(a).addClass("monthpicker-selected");else{var n=parseInt(r.item(a-1).text())+1;r.item(a).text(n)}var c=t(this._picker);c.css({position:"absolute",top:e.offset().top,left:e.offset().left,display:"block"})},cellSelected:function(e){t(e).hasClass("mon-cell")?t(this._picker).all(".mon-cell").removeClass("monthpicker-selected"):t(e).hasClass("year-cell")&&(t(this._picker).all(".year-cell").removeClass("monthpicker-selected"),this.set("selectedyear",parseInt(t(e).text()))),t(e).addClass("monthpicker-selected")},changeRegionYear:function(e){for(var s=t(this._picker).all(".year-cell"),a=0;a<s.length;a++){var r=0;r="back"==e?parseInt(s.item(a).text())-8:parseInt(s.item(a).text())+8,s.item(a).text(r)}s.hasClass("monthpicker-selected")&&t(this._monthpickerID).one(".year-cell.monthpicker-selected").removeClass("monthpicker-selected");for(var a=0;a<s.length;a++)parseInt(s.item(a).text())==this.get("selectedyear")&&s.item(a).addClass("monthpicker-selected")},endSelected:function(e){var s=-1,a=t(this._monthpickerID),r=t(this._picker);if(t(e).hasClass("sure")){a.one(".monthpicker-year").text(this.get("selectedyear")),a.one(".monthpicker-month").text(r.one(".monthpicker-selected.mon-cell").text());for(var n=0;n<a.all(".mon-cell").length;n++)if(r.one(".monthpicker-selected.mon-cell").text()==a.all(".mon-cell").item(n).text()){s=n;break}this.set("month",s),this.set("year",this.get("selectedyear"))}r.css("display","none")},getPickerMonth:function(){return this.get("month")},getPickerYear:function(){return this.get("year")},monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},{HEAD_TEMPLATE:'<div class="monthpicker"><a href="#" class = "monthpicker-preyear monthpicker-btn"><<</a><a href="#" class = "monthpicker-premonth monthpicker-btn"><</a><a href="#" class = "monthpicker-time monthpicker-btn"><span class = "monthpicker-year"></span>&nbsp<span class = "monthpicker-month"></span></a><a href="#" class = "monthpicker-nextmonth monthpicker-btn">></a><a href="#" class = "monthpicker-nextyear monthpicker-btn">>></a></div>',TEMPLATE:'<div id = "{picker_name}" class = "picker-div" style = "display:none"><table class = "picker-model"><tbody><tr><td class = "picker-button" colspan = "2"><a href = "javascript:void(0)" class = "year-back monthpicker-btn">&lt;</a></td><td class = "picker-button" colspan = "2"><a href = "javascript:void(0)" class = "year-go monthpicker-btn">&gt;</a></td></tr><tr><td class = "year-cell"></td><td class = "year-cell"></td><td class = "year-cell"></td><td class = "year-cell"></td></tr><tr><td class = "year-cell"></td><td class = "year-cell"></td><td class = "year-cell"></td><td class = "year-cell"></td></tr><tr><td class = "mon-cell">{Jan}</td><td class = "mon-cell">{Feb}</td><td class = "mon-cell">{Mar}</td><td class = "mon-cell">{Apr}</td></tr><tr><td class = "mon-cell">{May}</td><td class = "mon-cell">{Jun}</td><td class = "mon-cell">{Jul}</td><td class = "mon-cell">{Aug}</td></tr><tr><td class = "mon-cell">{Sep}</td><td class = "mon-cell">{Oct}</td><td class = "mon-cell">{Nov}</td><td class = "mon-cell">{Dec}</td></tr></tbody></table><div class = "btn-sure-cancel"><a href = "javascript:void(0)" class="sure monthpicker-btn">OK</a><a href="javascript:void(0)" class="cancel monthpicker-btn">Cancel</a></div></div>',ATTRS:{triggerNode:{value:""},lang:{value:!1},month:{value:""},year:{value:""},selectedyear:{value:""}}}),module.exports=e;});