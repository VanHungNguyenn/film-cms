var cheerio = require('cheerio');

// Tạo schema băng truyền + thêm băng truyền vào content
function tableOfContents(content) {
    $ = cheerio.load(content, null, false);
    var h = hh = hhh = index = 1;
    var tocDom = [];
    var tocDomSchema = [];    
    $("h2, h3, h4").each(function() {
        var id = functions.convert_slug($(this).text());
        id = id.toLowerCase();
        var anchor = "<a name='" + id + "'></a>";
        $(this).before(anchor);
        if ($(this).is("h2")) {
            tocDom.push(`<a class="lvl-h" href="#${id}"><span class="icon">${h}</span> ${$(this).text()}</a>`);
            h++;
            hh = hhh = 1;
        } else if ($(this).is("h3")) {
            tocDom.push(`<a class="lvl-hh" href="#${id}"><span class="icon">${h-1}.${hh}</span> ${$(this).text()}</a>`);
            hh++;
            hhh = 1;
        } else {
            tocDom.push(`<a class="lvl-hhh" href="#${id}"><span class="icon">${hh-1}.${hhh}</span> ${$(this).text()}</a>`);
            hhh++;
        }
        tocDomSchema.push(`${$(this).text()}`);
        index++;
    });    
    return {
        toc: tocDom,
        schema: tocDomSchema,
        content: $.html()
    };
}

module.exports = {
    tableOfContents
}