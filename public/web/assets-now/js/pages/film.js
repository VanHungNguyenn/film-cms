
function selectCountry(item) {
    let list = $('input.checkbox-country');
    for(var i=0;i<list.length;i++) {
        let id = $(list[i]).attr("id");
        let name = $(list[i]).attr("data-name");
        if(name == item) {
            $(`input.checkbox-country#${id}`).attr('checked', true);
            break;
        }
    }
}
$(function() {
    $('#type').selectpicker();
    $('.dropify').dropify();
    var drEvent = $('#input-file-events').dropify();
    drEvent.on('dropify.beforeClear', function(event, element) {
        return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
    });
    drEvent.on('dropify.afterClear', function(event, element) {
        alert('File deleted');
    });
    drEvent.on('dropify.errors', function(event, element) {
        console.log('Has Errors');
    });
    var drDestroy = $('#input-file-to-destroy').dropify();
    drDestroy = drDestroy.data('dropify')
    $('#toggleDropify').on('click', function(e) {
        e.preventDefault();
        if (drDestroy.isDropified()) {
            drDestroy.destroy();
        } else {
            drDestroy.init();
        }
    });
    // if($("#content").length > 0){
    //     var KTTinymce = function () {
    //         // Private functions
    //         var demos = function () {
    //             tinymce.init({
    //                 selector: 'textarea#content',
    //                 height:300,
    //                 plugins: [
    //                     "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
    //                     "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
    //                     "save table contextmenu directionality emoticons template paste textcolor"
    //                 ],
    //                 toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
    //             });
    //         }

    //         return {
    //             // public functions
    //             init: function() {
    //                 demos();
    //             }
    //         };
    //     }();
    //     KTTinymce.init();
    // }
});
$(document).on("click", "#btn-grab", function() {
    let url = $("#url").val();
    toastr.success("Đang grab, xin vui lòng đợi");
    $.ajax({
        type: "GET",
        url: `/${dashboard}/grab/?url=${url}`,
        success: function(data) {
            if(data.status == 1) {
                if(data.data.name) $("#name").val(data.data.name.trim());
                if(data.data.nameEn) $("#nameEn").val(data.data.nameEn.trim());
                if(data.data.actor) $("#actor").val(data.data.actor.trim());
                if(data.data.director) $("#director").val(data.data.director.trim());
                if(data.data.year) $("#year").val(data.data.year.trim());
                if(data.data.duration) $("#duration").val(data.data.duration.trim());
                if(data.data.imdb) $("#imdb").val(data.data.imdb.trim());
                if(data.data.keyword) {
                    let keyword = data.data.keyword.trim().split(",");
                    let name = keyword[0].trim();
                    if(data.data.keyword) $("#keywords").val(`${data.data.keyword} ${name} vietsub`);
                }
                if(data.data.content) $("#content").val(data.data.content.trim());
                // tinymce.activeEditor.setContent(data.data.content);
                //quốc gia
                for(var i=0;i<data.data.country.length;i++) {
                    let item = data.data.country[i];
                    selectCountry(item);
                }
                //thể loại
                let category = "";
                for(var i=0;i<data.data.category.length;i++) {
                    let item = data.data.category[i];
                    category += `${item}, `;
                }
                if(category) $("#list_category").val(category);
                let check = false;
                if(data.data.thumb) {
                    check = true;
                    $("#linkthumb").attr("src", data.data.thumb);
                }
                if(data.data.banner) {
                    check = true;
                    $("#linkbanner").attr("src", data.data.banner);
                }
                if(check) {
                    $(".image").css("display", "block");
                }
                if(url.includes("animehay")) {
                    $("#type").val("anime");
                } else if(url.includes("fptplay")) {
                    $("#type").val("phim-bo");
                }
                toastr.success("Đã grab thành công");
            } else {
                toastr.error(data.msg);
            }
        }
    });
});