function CheckGroup(renderTo, options, isMultiple) {
    var that = this;
    that.renderTo = renderTo;
    that.options = options;
    that.isMultiple = !!isMultiple;
    that.initHtml();
    that.initEvent();
}
CheckGroup.prototype.initHtml = fInitHtml;
CheckGroup.prototype.initEvent = fInitEvent;
CheckGroup.prototype.toggleEl = fToggleEl;
CheckGroup.prototype.isSelected = fIsSelected;
CheckGroup.prototype.val = fVal;

function fInitHtml() {
    var that = this;
    // 请补全代码，拼接html字符串
    var sHtml = '';
    var childs = '';
    var options = that.options;
    for(var i=0;i<options.length;i++){
        var cur = options[i];
        childs += `<div data-val=${cur.value} class="item">${cur.test}</div>`
    }
    // 单/复选框
    sHtml = (that.isMultiple ? '<div class= "checkgroup">' :'<div class= "checkgroup radius">') + childs + '</div>';
    that.renderTo.innerHTML = sHtml;
    // 请补全代码，获取checkgroup的dom元素引用
    that.el = document.querySelector('.checkgroup');
}

function fInitEvent() {
    var that = this;
    that.el && that.el.addEventListener('click', function (event) {
        var item = event.target;
        item.classList.contains('item') && that.toggleEl(item);
    });
}

function fToggleEl(item) {
    // 根据当前是单选还是多选，以及当前元素是否选中，高亮/取消���亮指定的选项dom元素
    var that = this;

    if (that.isSelected(item)) {
        // 请补全代码
        item.setAttribute('class', 'item');
    } else if (that.isMultiple) {
        // 请补全代码
        item.setAttribute('class', 'item selected');
    } else {
        // 请补全代码
        var parent = item.parentNode;
        var children = parent.children;
        for(var i=0;i<children.length;i++){
            if(children[i] !== item){
                children[i].setAttribute('class', 'item');
            }else{
                children[i].setAttribute('class', 'item selected');
            }
        }
    }
}

function fIsSelected(item) {
    // 请补全代码，判断item是否选中
    var sclass = item.getAttribute('class');
    return /(selected)/.test(sclass);
}

function fVal(values) {
    var that = this;
    if (arguments.length === 0) {
        // 请补全代码，获取高亮的选项元素
        var items = document.getElementsByClassName('item selected');
        // 请补全代码，获取高亮的选项元素的data-val
        var result = [];
        for(var i=0;i<items.length;i++){
            result.push(items[i].getAttribute('data-val'))
        }
        return result;
    }
    !that.isMultiple && values.length > 1 && (values.length = 1);
    // 请补全代码，获取所有的选项元素
    var items = document.getElementsByClassName('item');;
    // 请补全代码，在指定元素上加上高亮的class
    for(var i=0;i<items.length;i++){
        var item = items[i];
        if(values.indexOf(item.getAttribute('data-val')) !== -1){
            item.setAttribute('class', 'item selected');
        }
    }
}
