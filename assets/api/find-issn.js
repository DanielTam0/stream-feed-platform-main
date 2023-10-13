function findISSN(url){
    var issn = [];

    if(url.indexOf("onlinelibrary.wiley")>-1){     //Wiley
        for(var i=url.indexOf("feed/")+5;i<url.indexOf("feed/")+13;i++){
            issn.push(url[i]);
        }
        issn[3] = issn[3] + "-";
    }else if(url.indexOf("thelancet")>-1){     //
        for(var i=url.indexOf("PIIS")+4;i<url.indexOf("PIIS")+13;i++){
            issn.push(url[i]);
        }
    }

    issn = issn.join("");
    return issn;
}

// findISSN("https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(22)02166-3/fulltext?rss=yes");

module.exports = {findISSN};