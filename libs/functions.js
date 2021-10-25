function convert_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    // Xóa ký tự đặc biệt 
    str = str.replace(/([^0-9a-z-\s])/g, '');
    // xóa dấu - có sẵn
    str = str.replace(/\s-\s/g, ' ');
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
    // return
    return str;
}

function convert_slug_episode(name){
    name = name.toLowerCase();
    if(name.match(/\d|\d\.\d/g)){
        var numberName = parseFloat(name);
        if(numberName==0) return 'tap-full';
        else if(numberName<10) return `tap-0${convert_slug(name)}`;
        else return `tap-${convert_slug(name)}`;
    }
    return convert_slug(name);
}

function number_format(number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    var s = ''

    var toFixedFix = function(n, prec) {
        if (('' + n).indexOf('e') === -1) {
            return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
        } else {
            var arr = ('' + n).split('e')
            var sig = ''
            if (+arr[1] + prec > 0) {
                sig = '+'
            }
            return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
        }
    }

    s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }

    return s.join(dec)
}

function shuffle() {
    word = "0123456789abcdefghijklmnopqrstuvwxyz";
    var a = word.split(''),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join('');
}

function frist_last_dayofmonth(mmyyyy) {
    var arrMonth = mmyyyy.split("-");
    if (arrMonth.length < 2) {
        var d = new Date();
        arrMonth = [d.getMonth() + 1, d.getFullYear()];
    }
    var fm = Number(arrMonth[0]);
    fm = (fm < 10) ? '0'.concat(fm) : fm;
    var fDay = new Date(''.concat(arrMonth[1], '-', fm, '-01T00:00:00.000Z'));
    var ld = new Date(fDay.getFullYear(), fDay.getMonth() + 1, 0).getDate();
    ld = (ld < 10) ? '0'.concat(ld) : ld;
    var lDay = new Date(''.concat(arrMonth[1], '-', fm, '-', ld, 'T23:59:59.000Z'));
    return { month: mmyyyy, fday: fDay, lday: lDay };
}

function ext_from_name(fname) {
    var arr = fname.split(".");
    if (arr.length < 2) {
        arr = ["", ""];
    }
    return { name: arr[0], ext: arr[1] };
}

function calc_filesize(bytes) {
    var arr = ['Bytes', 'Mb', 'Gb', 'Tb'];
    var size = bytes.toString().concat(' ', arr[0]);
    for (let i = 0; i < arr.length; i++) {
        if (bytes < 1024) {
            break;
        }
        bytes = bytes / 1024;
        size = (i == 0) ? parseFloat(bytes).toFixed(0).toString().concat(' ', arr[i]) : parseFloat(bytes).toFixed(2).toString().concat(' ', arr[i]);
    }
    return size;
}

function get_param_url(url, paramname) {
    var arr1 = url.split("?");
    var rs = null;
    if (arr1.length >= 2) {
        var arr2 = arr1[1].split("&");
        arr2.forEach(param => {
            var arr3 = param.split("=");
            if (arr3.length >= 2) {
                if (arr3[0] == paramname) {
                    rs = arr3[1];
                }
            }
        });
    }
    return rs;
}

function remove_duplicates(arr) {
    return arr.filter(function(item, index, self) {
        return self.indexOf(item) == index;
    });
}

function slug_to_name(slug) {
    let tmp = slug.replace(/-/g, " ");
    return tmp.charAt(0).toUpperCase() + tmp.slice(1);
}

function formart_timestamp_text(timestamp) {
    let d = new Date(timestamp),
        arrMonth = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
    return ''.concat(arrMonth[d.getMonth()], " ", d.getDate(), ", ", d.getFullYear());
}

function formart_timestamp_dt(timestamp) {
    let d = new Date(timestamp);
    let day = d.getDate();
    day = (day < 10) ? `0${day}` : `${day}`;
    let month = d.getMonth() + 1;
    month = (month < 10) ? `0${month}` : `${month}`;
    return `${d.getFullYear()}-${month}-${day}`;
}

function formart_datetime(timestamp, texttype) {
    try {
        var d = new Date(timestamp);
        var h = (d.getHours() < 10) ? `0${d.getHours()}` : d.getHours(),
            m = (d.getMinutes() < 10) ? `0${d.getMinutes()}` : d.getMinutes(),
            day = (d.getDate() < 10) ? `0${d.getDate()}` : d.getDate(),
            month = (d.getMonth() + 1 < 10) ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
            year = d.getFullYear();
        if (texttype == "time")
            return ''.concat(h, ":", m);
        if (texttype == "full")
            return ''.concat(h, ":", m, " ", day, "/", month, "/", year);
        if (texttype == "day")
            return ''.concat(day, "/", month, "/", year);
        if (texttype == "at")
            return ''.concat(day, "/", month, "/", year, " at ", h, ":", m);
        if (texttype == "seo")
            return d.toISOString().replace(/\.\d{3}Z/g, "+00:00");
        return "wrong texttype";
    } catch (err) {
        return "wrong datetime";
    }
}

function create_date_from_string(ddmmyyyy, emptyisnow){
    var arr = ddmmyyyy.split("/");
    var d = "";
    if(arr.length == 3){
        d = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);
    }
    if(d instanceof Date && !isNaN(d)){
        if(emptyisnow){
            d = new Date(`${arr[2]}-${arr[1]}-${arr[0]}T23:59:59.000Z`)
        }
    }else{
        if(emptyisnow){
            d = new Date();
        }else{
            d = "";
        }
    }
    return d;
}

function calc_hours_two_dates(d1, d2){
    return Math.round((d1 - d2) / 60 / 1000, 0);
}

function random_element_arr(arr) {
    return arr[Math.floor(Math.random() * arr.length)].replace(/\r?\n/g, "").trim();
}

function createHierarchy(arry) {
    var roots = [],
        children = {};
    // find the top level nodes and hash the children based on parent
    for (var i = 0, len = arry.length; i < len; ++i) {
        var item = arry[i],
            p = item.parentid,
            target = !p ? roots : (children[p] || (children[p] = []));
        target.push(item);
    }

    // function to recursively build the tree
    var findChildren = function(parent) {
        if (children[parent.id]) {
            parent.children = children[parent.id];
            for (var i = 0, len = parent.children.length; i < len; ++i) {
                findChildren(parent.children[i]);
            }
        }
    };
    // enumerate through to handle the case where there are multiple roots
    for (var i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
    }
    return roots;
}

function postMaping(Post) {
    if (Post.PostLang && Post.PostLang.length > 0) {
        Post.title = Post.PostLang[0].title;
        Post.seotitle = (Post.PostLang[0].seotitle) ? Post.PostLang[0].seotitle : Post.seotitle;
        Post.description = Post.PostLang[0].description;
        Post.seodescription = (Post.PostLang[0].seodescription) ? Post.PostLang[0].seodescription : Post.seodescription;
        Post.content = Post.PostLang[0].content;
        delete Post.PostLang;
    }
    return Post;
}

function cateMaping(Category) {
    if (Category.CateLang && Category.CateLang.length > 0) {
        Category.title = Category.CateLang[0].title;
        Category.seotitle = (Category.CateLang[0].seotitle) ? Category.CateLang[0].seotitle : Category.seotitle;
        Category.description = Category.CateLang[0].description;
        Category.seodescription = (Category.CateLang[0].seodescription) ? Category.CateLang[0].seodescription : Category.seodescription;
        Category.content = Category.CateLang[0].content;
        delete Category.CateLang;
    }
    return Category;
}

function getPreAndNextLink(curUrl, curPage){
    var arr = curUrl.split("?"),
        prevUrl = '',
        nextUrl = '';
    if(arr.length == 1){
        prevUrl = (curPage - 1 == 1) ? curUrl : `${curUrl}?page=${curPage-1}`; 
        nextUrl = `${curUrl}?page=${curPage+1}`;
    }
    if(arr.length == 2){
        let extension = arr[1];            
        if(extension.match(/page=\d+/g)){
            prevUrl = (curPage-1==1) ? curUrl.replace(/page=\d+/g,"") : curUrl.replace(/page=\d+/g, `page=${curPage-1}`);            
            nextUrl = curUrl.replace(/page=\d+/g, `page=${curPage+1}`);
        }else{
            prevUrl = `${arr[0]}?page=${curPage-1}&${arr[1]}`;
            nextUrl = `${arr[0]}?page=${curPage+1}&${arr[1]}`;
        }
    }
    prevUrl = prevUrl.replace(/\?\&|\?$/g,"?");
    nextUrl = nextUrl.replace(/\?\&|\?$/g,"?");
    return {
        prevUrl: prevUrl,
        nextUrl: nextUrl
    }
}

function getEpisodeName(name){    
    name = name.toLowerCase();
    if(name.match(/\d|\d\.\d/g)){
        var numberName = parseFloat(name);
        if(numberName==0) return 'Full';        
        else return `Tập ${name}`;
    }
    return name;
}

module.exports = {
    getEpisodeName,
    getPreAndNextLink,
    convert_slug,
    number_format,
    shuffle,
    frist_last_dayofmonth,
    ext_from_name,
    calc_filesize,
    get_param_url,
    remove_duplicates,
    slug_to_name,
    formart_timestamp_text,
    random_element_arr,
    createHierarchy,
    postMaping,
    cateMaping,
    formart_datetime,
    formart_timestamp_dt,
    calc_hours_two_dates,
    create_date_from_string,
    convert_slug_episode
}