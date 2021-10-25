var rows = 0;
function clearLog() {
    $(".CodeMirror-code").html("");
}
function addRow(text,type="") {
    rows++;
    var allow = ["debug","info","warning","error","assert"];
    if(!allow.includes(type)) type = "keyword";
    $(".CodeMirror-code").append(`<div class="" style="position: relative;">
        <div class="CodeMirror-gutter-wrapper" style="left: -30px;"><div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 21px;">${rows}</div></div>
        <pre class=" CodeMirror-line " role="presentation"><span role="presentation" style="padding-right: 0.1px;"><span class="cm-${type}">${text}</span></span></pre>
    </div>`);
    //scroll
    var scrolltop = Number($('.CodeMirror-scroll')[0].scrollHeight) - Number($('.CodeMirror-scroll')[0].clientHeight);
    $('.CodeMirror-scroll').scrollTop(scrolltop);
    if(rows > 1000) {
        rows = 0;
        clearLog();
    }
}

var socket = io.connect();
socket.on("connect",function(){
	socket.on("logs",function({msg, type}) {
        addRow(msg, type);
    });
});