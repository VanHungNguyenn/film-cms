async function baseMeta(curLang, curUrl, page) {
    var arrMetaTags = [];
    var urlNoneLang = (!curLang.ismain) ? curUrl.replace(new RegExp(`^\/${curLang.id}`, 'g'), "") : curUrl;
    urlNoneLang = (urlNoneLang == "") ? "/" : urlNoneLang;
    var canonicalUrl = (curLang.ismain) ? `${domain}${urlNoneLang}` : `${domain}/${curLang.id}${urlNoneLang}`;
    var robotFullText = "";
    robotFullText += (page.index == true) ? "index, " : "noindex, ";
    robotFullText += (page.index == true) ? "follow" : "nofollow";
    var googlebotText = (page.index == true) ? "index" : "noindex";
    var googlebotNewsText = (page.index == true) ? "snippet" : "nosnippet";
    arrMetaTags.push(`<meta name="real-googlebot" content="${googlebotText}">`);
    arrMetaTags.push(`<meta name="real-googlebot-news" content="${googlebotNewsText}">`);
    arrMetaTags.push(`<meta name="real-robots" content="${robotFullText}">`);
    arrMetaTags.push(`<title>${page.seotitle}</title>`);
    if(page.seodescription!=null && page.seodescription!=""){
        arrMetaTags.push(`<meta name="description" content="${page.seodescription}">`);
    }
    arrMetaTags.push(`<meta property="og:type" content="${page.pagetype}">`);
    arrMetaTags.push(`<meta property="og:site_name" content="${sitename}">`);
    arrMetaTags.push(`<meta property="og:url" content="${canonicalUrl}">`);
    arrMetaTags.push(`<meta property="og:title" content="${page.seotitle}">`);
    if(page.seodescription!=null && page.seodescription!=""){
        arrMetaTags.push(`<meta property="og:description" content="${page.seodescription}">`);
    }
    arrMetaTags.push(`<meta name="twitter:card" content="summary_large_image">`);
    arrMetaTags.push(`<meta name="twitter:title" content="${page.seotitle}">`);
    if(page.seodescription!=null && page.seodescription!=""){
        arrMetaTags.push(`<meta name="twitter:description" content="${page.seodescription}">`);
    }
    arrMetaTags.push(`<link rel="canonical" href="${canonicalUrl}">`);
    arrMetaTags.push(`<meta property="og:locale" content="${curLang.codelang}">`);    
    return arrMetaTags;
}

async function homeMeta(curLang, curUrl, page) {
    var homeMeta = await baseMeta(curLang, curUrl, page),
        rootUrl = (curLang.ismain) ? domain : `${domain}/${curLang.id}`;
    homeMeta.push(`<link rel="alternate" type="application/rss+xml" href="${rootUrl}/${sitenameSlug}.rss" title="${sitename}">`);
    return homeMeta;
}

async function cateMeta(curLang, curUrl, pageContent, curPage, maxPage) {
    var cateMeta = await baseMeta(curLang, curUrl, pageContent);    
    var paginationData = functions.getPreAndNextLink(curUrl, curPage);
    if (curPage > 1) {        
        cateMeta.push(`<link rel="prev" href="${domain}${paginationData.prevUrl}">`);
    }
    if (curPage < maxPage) {        
        cateMeta.push(`<link rel="next" href="${domain}${paginationData.nextUrl}">`);
    }
	if(pageContent.cateslug){
        var domainLangUrl = (curLang.ismain) ? domain : `${domain}/${curLang.id}`;
        cateMeta.push(`<link rel="alternate" type="application/rss+xml" href="${domainLangUrl}/${sitenameSlug}-${pageContent.cateslug}.rss" title="${pageContent.seotitle}">`);
    }
    return cateMeta;
}

async function postMeta(curLang, curUrl, page) {
    var postMeta = await baseMeta(curLang, curUrl, page);
    var thumb = page.thumb || {};
    var thumbObj = (thumb.childsizes) ? thumb.childsizes.split(",") : [];
    var sizeArr = (thumbObj.length > 0) ? thumbObj[thumbObj.length - 1].split("x") : [];
    var width = sizeArr[0] || 0;
    var height = sizeArr[1] || 0;
    var pubdate = functions.formart_datetime(page.publishat, "seo");
    var moddate = functions.formart_datetime(page.modifyat, "seo");
    if (page.category)
        postMeta.push(`<meta property="article:section" content="${page.category}">`);
    postMeta.push(`<meta property="article:published_time" content="${pubdate}">`);
    postMeta.push(`<meta property="article:modified_time" content="${moddate}">`);
    postMeta.push(`<meta property="og:updated_time" content="${moddate}">`);
    if (width > 0)
        postMeta.push(`<meta property="og:image:width" content="512">`);
    if (height > 0)
        postMeta.push(`<meta property="og:image:height" content="250">`);
    if (thumb.url) {
        postMeta.push(`<meta property="og:image" content="${thumb.url}">`);
        postMeta.push(`<meta property="og:image:secure_url" content="${thumb.url}">`);
        postMeta.push(`<meta name="twitter:image" content="${thumb.url}">`);
    }
    return postMeta;
}

module.exports = {
    baseMeta,
    homeMeta,
    cateMeta,
    postMeta	
}