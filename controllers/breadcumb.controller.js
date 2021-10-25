const db = require('../models');
const Category = db.category;
// Tạo pagination cho category + Blog + App
exports.createBreadcumb = async (lastCateId, curLang, lastItemTitle, curPageUrl, homeText, hierarchyCate) => {
    try {
        var breadcumbs = [];
        var homeTitle = (homeText) ? homeText : 'Home';
        var rootUrl = (!curLang.ismain) ? `${domain}/${curLang.id}` : domain;
        var arrBreadcumbs = [];
        var breadcrumbID = curPageUrl.replace(new RegExp(`^\/${curLang.id}`, "g"), "");
        breadcrumbID = (breadcrumbID == "") ? `${domain}/${curLang.id}/` : `${domain}${curPageUrl}`;
        var homeUrl = `${rootUrl}/`;
        var schema = {
            "@context": "https://schema.org",
            "@id": `${breadcrumbID}#breadcrumb`,
            "@type": "BreadcrumbList",
            "itemListElement": []
        };
        schema["itemListElement"].push({
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@type": "WebPage",
                "@id": homeUrl,
                "url": homeUrl,
                "name": sitename
            }
        });
        arrBreadcumbs.push(`<div id="breadcrumb" class="breadcumb">`);
        arrBreadcumbs.push(`<a class="item" href="${rootUrl}">${homeTitle}</a>`);
        if (lastCateId != null && breadcumbs.length==0) {
            breadcumbs = await Category.findAllParentsSEO(lastCateId, curLang.id);
            breadcumbs = (breadcumbs == null) ? [] : breadcumbs;
        }
        var hierarchyCate = (hierarchyCate) ? hierarchyCate : [];
        hierarchyCate.map(hc => {
            breadcumbs.push(hc);
        })
        var maxLoop = breadcumbs.length - 1;
        var slug = "";
        for (let i = 0; i <= maxLoop; i++) {
            slug = slug.concat("/", breadcumbs[i].slug);
            let url = `${rootUrl}${slug}`;
            url = (url.match(/\?/g)) ? url : `${url}/`;
            let title = breadcumbs[i].title;
            schema["itemListElement"].push({
                "@type": "ListItem",
                "position": i + 2,
                "item": {
                    "@type": "WebPage",
                    "@id": url,
                    "url": url,
                    "name": title
                }
            });
            if (i == maxLoop && lastItemTitle == null) {
                arrBreadcumbs.push(`<span class="item">${title}</span>`);
            } else {
                arrBreadcumbs.push(`<a class="item" href="${url}">${title}</a>`);
            }
        }
        if (lastItemTitle != null) {
            arrBreadcumbs.push(`<span class="item">${lastItemTitle}</span>`);
            let arr = curPageUrl.split("?");
            let url = `${domain}${arr[0]}`;
            url += (url.match(/\/$/g)) ? "" : "/";
            schema["itemListElement"].push({
                "@type": "ListItem",
                "position": maxLoop + 3,
                "item": {
                    "@type": "WebPage",
                    "@id": url,
                    "url": url,
                    "name": lastItemTitle
                }
            });
        }
        arrBreadcumbs.push(`</div>`);
        var rs = { html: arrBreadcumbs.join(""), schema: JSON.stringify(schema) };
        return rs;
    } catch (err) {
        return {};
    }
}