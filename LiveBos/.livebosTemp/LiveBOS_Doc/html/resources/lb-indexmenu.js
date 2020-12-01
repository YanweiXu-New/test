/*
 * Copyright (c) 1996-2013 ApexSoft co.,td.
 * site: http://www.apexsoft.com.cn
 * author: lvl
 */
Ext.ns('LBUI.ctrl');
{
	var IM = LBUI.ctrl.IndexMenu = Ext.extend(Ext.Component, {
			id:'indexMenu',
			curNavId:0,//当前导航id
    		maxNavId:0,//最大导航id
    		tableRange:200,//每页宽度
    		pageLimit:8,//每页默认显示条数
    		indexsHtml:null,
            cls:'lb-index-menu',
            tpl:new Ext.XTemplate(
            	'<table align="right" cellpadding="0" cellspacing="0" class="floatmenu_table">',
				  '<tr>',
				    '<td class="floatmenu_shade_top">&nbsp;</td>',
				    '<td class="floatmenu_top">&nbsp;</td>',
				  '</tr>',
				  '<tr>',
				    '<td class="floatmenu_shade_bg">',
				   ' <div class="floatmenu_fix_open lb-index-menu-toggle"></div>',
				    '</td>',
				    '<td class="floatmenu_td">',
				    	 '<div class="floatmenu_title">导航索引</div>',
			             '<div id="floatmenu_div_box" class="floatmenu_div_box">',
		              	 '</div>',
			             '<div id="floatmenu_page" class="floatmenu_page">',
			             '</div>',
				   '</td>',
				  '</tr>',
				  '<tr>',
				    '<td class="floatmenu_shade_bottom_left">&nbsp;</td>',
				    '<td class="floatmenu_shade_bottom_bg">&nbsp;</td>',
				  '</tr>',
				'</table>'
            ), initComponent:function (options) {
                IM.superclass.initComponent.apply(this, arguments);
            }, onRender:function () {
                IM.superclass.onRender.apply(this, arguments);
                this.el.update(this.tpl.apply({}), true);
                this.show();
                var btn = this.el.query('.lb-index-menu-toggle')[0];
                this.toggleBtn = Ext.get(btn);
                this.onMin(btn);///默认关闭着
                this.el.on('mouseover', this.onOpen, this);
                this.el.on('mouseout', this.onMin, this);
            }, onDestroy:function () {
                IM.superclass.onDestroy.apply(this, arguments);
                this.el.dom.parentNode.removeChild(this.el.dom);
            }, onOpen:function (btn) {
                this.toggleBtn.replaceClass('floatmenu_fix_close', 'floatmenu_fix_open');
                this.el.select('.floatmenu_table').removeClass('floatmenu_table_colse');
            }, onMin:function (btn) {
                this.toggleBtn.replaceClass('floatmenu_fix_open', 'floatmenu_fix_close');
                this.el.select('.floatmenu_table').addClass('floatmenu_table_colse');
            }, show:function() {
            	var divBoxHtml =[];
            	var indexLength = this.indexsHtml.length;
            	var tableNum = parseInt(indexLength / this.pageLimit) + 1;
            	
            	divBoxHtml.push('<div style="width:'+ tableNum * this.tableRange +'px;">');
            	
            	for(var i = 0; i < indexLength; i++) {
            		if(i % this.pageLimit == 0)
            			divBoxHtml.push('<ul class="floatmenu">');
            		divBoxHtml.push(this.indexsHtml[i]);
            		if(i % this.pageLimit == (this.pageLimit - 1))
            			divBoxHtml.push('</ul>');
            	}
            	divBoxHtml.push('</div>');
            	Ext.get("floatmenu_div_box").dom.innerHTML=divBoxHtml.join('');
            	var navHtml = [];
            	if(tableNum > 1){
	        		maxNavId = tableNum - 1;
	            	navHtml.push('<a class="floatmenu_arrow_pre_gray" tag="-1"></a>');
	            	for(var i=0;i<tableNum;i++){
	            		if(i==0){
	            			navHtml.push('<a class="floatmenu_current" tag="'+i+'">'+(i+1)+'</a>');
	            		}else{
	            			navHtml.push('<a class="floatmenu_normal" tag="'+i+'">'+(i+1)+'</a>');
	            		}
	            	}
	            	navHtml.push('<a class="floatmenu_arrow_next" tag="-2"></a>');
	        	}
	        	Ext.get("floatmenu_page").dom.innerHTML=navHtml.join('');
            	if(tableNum>1){
	            	Ext.get(this.id).select('div.floatmenu_page>a').on('click', this.navEvent,this);
	            	curNavId=0;
	            	Ext.get(this.id).select('floatmenu_div_box').scrollTo('left',0);
	        	}
            }, navEvent:function(e,el){
	        	var tag=parseInt(e.getTarget('a').getAttribute('tag'));
	        	this.navTag(tag);
	        }, navTag:function(tag){
	        	if(curNavId==tag){
	        		return;
	        	}else{
	        		if(tag==-1){
	        			curNavId--;
	        			if(curNavId<0){curNavId=0;}
	        		}else if(tag==-2){
	        			curNavId++;
	        			if(curNavId>maxNavId){curNavId=maxNavId;}
	        		}else{
	        			curNavId=tag;
	        		}
	        	}
	        	Ext.get(this.id).select('div.floatmenu_div_box').scrollTo('left',curNavId*this.tableRange,true);
	        	Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_current').replaceClass('floatmenu_current', 'floatmenu_normal');
	        	Ext.get(this.id).select('div.floatmenu_page>a:nth-child('+(curNavId+2)+')').replaceClass('floatmenu_normal', 'floatmenu_current');
	        	if(curNavId==0){
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_pre').replaceClass('floatmenu_arrow_pre', 'floatmenu_arrow_pre_gray');
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_next_gray').replaceClass('floatmenu_arrow_next_gray', 'floatmenu_arrow_next');
	        	}else if(curNavId==maxNavId){
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_pre_gray').replaceClass('floatmenu_arrow_pre_gray', 'floatmenu_arrow_pre');
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_next').replaceClass('floatmenu_arrow_next', 'floatmenu_arrow_next_gray');
	        	}else{
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_next_gray').replaceClass('floatmenu_arrow_next_gray', 'floatmenu_arrow_next');
	        		Ext.get(this.id).select('div.floatmenu_page>a.floatmenu_arrow_pre_gray').replaceClass('floatmenu_arrow_pre_gray', 'floatmenu_arrow_pre');
	        	}
	        }
        }
    );
}