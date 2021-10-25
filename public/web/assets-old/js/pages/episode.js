$(function() {
    $('#server').selectpicker();
    KTFormRepeater.init();
});
var KTFormRepeater = function() {
    // Private functions
    var demo = function() {
        $('#kt_repeater_1').repeater({
            initEmpty: false,
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            }
        });
    }
    return {
        // public functions
        init: function() {
            demo();
        }
    };
}();
var $repeater = $('.repeater-episode').repeater({
    initEmpty: false,
    show: function() {
        $(this).slideDown();
    },
    hide: function() {
        $(this).slideUp();
    }
});
$("#frmEpisode").submit(function(e) {
    e.preventDefault();
    var server = $("#server").val();
    var begin = Number($("#begin").val());
    var end = Number($("#end").val());
    var list = $("#list").val();
    var item = list.trim().split("\n");
    var stt = 0;
    var array = [];
    if(!begin && !end) {
        begin = 0;
        end = item.length-1;
    }
    for(var i=begin;i<=end;i++) {
        if(stt < 1000) {
            let obj = {};
            let name = i;
            var row = item[stt];
            if(String(row).includes("|")) {
                let info = row.split("|");
                if(info.length == 2) {
                    var url = info[1];
                    name = info[0];
                } else {
                    var url = info[0];
                }
            } else var url = row;
            if(url == undefined) url = "";
            obj.name = name;
            obj.url = url;
            obj.server2 = server;
            array.push(obj);
            stt++;
        } else {
            break;
        }
    }
    $repeater.setList(array);
});

$(".frmMulti").submit(async function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    let list = $("#list").val().split("\n");
    let stt = 0;
    for(const item of list) {
        if(item) {
            let check = await addVideo(url, item).catch(() => false);
            if(check) {
                stt++;
            }
        }
    }
    toastr.success(`Đã thêm ${stt} video`);
    $("#kt_modal_add").modal("hide");
    $(".frmModal").trigger("reset");
    setTimeout(function(){
        $('.datatable').KTDatatable('reload');
    }, 100);
});
const addEpisode = (ajax, server, name, url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: ajax,
            data: `server=${server}&name=${name}&url=${url}`,
            success: function(data) {
                if (data.status == 1) {
                    toastr.success(data.msg);
                } else {
                    toastr.error(data.msg);
                }
                resolve();
            },
            error: () => {
                toastr.error("Error");
                resolve();
            }
        });
    })
}
$("#frmMulti").submit(async function(e) {
    e.preventDefault();
    var ajax = $(this).attr("action");
    var server = $("#server").val();
    var listname = $(".name");
    var listurl = $(".url");
    for (var i = 0; i < listname.length; i++) {
        await addEpisode(ajax, server, $(listname[i]).val(), $(listurl[i]).val());
    }
    location.assign(`/${dashboard}/film/episode/${filmid}/`);
});
$("#frmGetList").submit(function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    var urldrive = $("#urldrive").val();
    $.ajax({
        type: "GET",
        url: url,
        data: `url=${urldrive}`,
        success: function(data) {
            if(data.status == 1) {
                toastr.success("Get danh sách drive thành công");
                let html = "";
                let files = data.data.files;
                for(let i=files.length-1;i>=0;i--) {
                    let item = files[i];
                    html+= `${item.name}|https://drive.google.com/file/d/${item.id}/view\n`;
                }
                $("#listdrive").val(html);
            } else toastr.error(data.msg);
        }
    });
});
function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
$(".btn-replace").click(function() {
    var replace = $("#replace").val();
    var ext = $("#ext").val();
    var list = $("#listdrive").val().split("\n");
    var html = "";
    for(const item of list) {
        if(item) {
            let info = item.split("|");
            let name = info[0];
            let url = info[1];
            name = replaceAll(name, replace, "");
            name = replaceAll(name, ext, "");
            html += `${Number(name)}|${url}\n`;
        }
    }
    $("#listdrive").val(html);
})