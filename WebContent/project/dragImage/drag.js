var DragDrop =  function() { 

    var VVG = {};  
    VVG.DOM = {
        $: function(id) { 
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        bindEvent: function(node, type, func) { 
            if (node.addEventListener) {
                node.addEventListener(type, func, false);
            } else if (node.attachEvent) {
                node.attachEvent("on" + type, func);
            } else {
                node["on" + type] = func;
            }
        },
        getEvent: function(event) { 
            return event ? event : window.event;
        },
        getTarget: function(event) { 
            return event.target || event.srcElement;
        },
        prevent: function(event) {
            event.cancelBubble = true;

            if (event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            };
        }
    }

    var box = null; 
    var dragBox = null;
    var dragging = null; 

    var origScroll = { top: 0, left: 0 }; 
    var curScroll = { top: 0, left: 0 }; 

    var origMouse = { x: 0, y: 0 };
    var curMouse = { x: 0, y: 0 };
    
    var moveFlag = false;

    function drag(event, outElem, innerElem) { 
        event = VVG.DOM.getEvent(event); 
        var target = VVG.DOM.getTarget(event);

        box = VVG.DOM.$(outElem);
        dragBox = VVG.DOM.$(innerElem);

        switch (event.type) {
        case "mousedown":
            if( (target.parentElement.parentElement == box) || (target.parentElement == box) ){ 
                if (box.offsetHeight < box.scrollHeight){
                    dragging = box; 
                };
            };
            if (!dragging){
                return ;
            }
            
            origScroll.top = dragging.scrollTop;
            origScroll.left = dragging.scrollLeft;

            origMouse.x = event.clientX;
            origMouse.y = event.clientY;

            break;
        case "mousemove":
            if(dragging){ 
                moveFlag = true;
                VVG.DOM.prevent(event);

                curMouse.x = event.clientX;
                curMouse.y = event.clientY;

                curScroll.top = -(curMouse.y - origMouse.y) + origScroll.top;
                curScroll.left = -(curMouse.x - origMouse.x) + origScroll.left;

                if (curScroll.top < 0){
                    curScroll.top = 0;
                };
                if (curScroll.top > dragging.offsetHeight){
                    curScroll.top = dragging.offsetHeight;
                };
                if (curScroll.left < 0){
                    curScroll.left = 0;
                };
                if (curScroll.left > dragging.offsetWidth){
                    curScroll.left = dragging.offsetWidth;
                };

                dragging.scrollTop = curScroll.top;
                dragging.scrollLeft = curScroll.left;
            }
            break;
        case "mouseup":
            
            if (moveFlag){
                VVG.DOM.prevent(event);
            }
            
            dragging = null;
            origScroll = { top: 0, left: 0 }; 
            curScroll = { top: 0, left: 0 }; 

            origMouse = { x: 0, y: 0 };
            curMouse = { x: 0, y: 0 };
            break;
        case "mouseout":
            if (moveFlag){
                VVG.DOM.prevent(event);
            }
            
            // 清空拖动目标
            dragging = null;
            origScroll = { top: 0, left: 0 }; 
            curScroll = { top: 0, left: 0 }; 

            origMouse = { x: 0, y: 0 };
            curMouse = { x: 0, y: 0 };
            break;
        case "click":
            if (moveFlag){
                VVG.DOM.prevent(event);
            }
            break;
        }
    };
    return {
        dragStart: function(outElem, innerElem) {
            var dragFun = function(event){
                drag(event, outElem, innerElem);
            };
            
            VVG.DOM.bindEvent(document, "mousedown", dragFun);
            VVG.DOM.bindEvent(document, "mousemove", dragFun);
            VVG.DOM.bindEvent(document, "mouseup", dragFun);
            VVG.DOM.bindEvent(VVG.DOM.$(outElem), "mouseout", dragFun);
        }
    }
}();

