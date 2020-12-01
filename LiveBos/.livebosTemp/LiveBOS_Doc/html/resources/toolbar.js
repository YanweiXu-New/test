function controlsMouseOut(event) {
    Ext.fly("controls").removeClass('visible');
}
function controlsMouseOver(event) {
    Ext.fly("controls").addClass('visible');
}
function closeBrowser() {
	location.href="http://org.eclipse.ui.doc/runAction?action=closeBrowser";
}
function convertHtml() {
	location.href="http://org.eclipse.ui.doc/runAction?action=convert";
}
Ext.onReady(function () {
    var btns = Ext.fly('controls').query('>div');
    var btn = Ext.fly('right-tool').query('>div');
    Ext.get(btn).on('click', function () {
    	closeBrowser();
    });
    Ext.fly("controls").setWidth(btns.length * 55 + 24);
    Ext.each(btns, function () {
        Ext.get(this).on('click', function () {
            var key = this.dom.getAttribute('id');

            var bd = document.body;
            if (key == 'btnZoomIn' || key == 'btnZoomOut') {
            	
                if (!bd.currentZoom) {
                    bd.currentZoom = 1;
                }
                if (key == 'btnZoomOut') {
                    if (parseInt(bd.currentZoom) - 1 > 0) {
                        bd.currentZoom = parseInt(bd.currentZoom) - 1;
                    }
                } else {
                    if (parseInt(bd.currentZoom) + 1 < 8) {
                        bd.currentZoom = parseInt(bd.currentZoom) + 1;
                    }
                }
                Ext.get(bd)
                        .removeClass('zoom' + (bd.currentZoom - 1))
                        .removeClass('zoom' + (bd.currentZoom + 1));
                if (bd.currentZoom > 1)
                    Ext.get(bd).addClass('zoom' + bd.currentZoom);
            } else if (key == 'btnBgMode') {
                if (Ext.fly(this).query('>img')[0].src.indexOf('bgmode-night.png') != -1) {
                    Ext.fly(this).update('<img src="' + resourcePath + 'resources/images/bgmode-day.png" title="白天模式">'); 
                    Ext.fly(bd).addClass('black');
                } else {
                    Ext.fly(this).update('<img src="' + resourcePath + 'resources/images/bgmode-night.png" title="夜间模式">'); 
                    Ext.fly(bd).removeClass('black');
                }
            }  else if(key=='btnPrint'){
                Ext.fly("controls").removeClass('visible');
                self.print();
            } else if(key=='btnClose') {
				closeBrowser();
            } else if(key=='btnConvert') {
				convertHtml();
            }
        })
    })
});			