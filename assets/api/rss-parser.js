const store_list_no = [];
const cheerio = require("cheerio");
const unirest = require("unirest");
var natural = require('natural');
const rss_list_js = require("./rss-list.js");
const thesaurus = require("./thesaurus.js");
const JIFindex = require("./JIF-index.js");
const findISSN = require("./find-issn.js")
const TFIDF = require("./TF-IDF.js");
const orgList = rss_list_js.orgList();
const rssList = rss_list_js.rssList();
const JIF_info = JIFindex.importJIF();
var stringSimilarity = require("string-similarity");

var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

// add/remove journals
function outputJournal(org_no,list_no){
    var repeat = false;
    var temp_list_no = [org_no,list_no]; 
    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    Array.prototype.remove = function() {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };

    for (var i = 0; i < store_list_no.length + 1; i++){
        if(arrayEquals(store_list_no[i],temp_list_no)){
            repeat = true;
            store_list_no.remove(store_list_no[i]);
            break;
        }
    }
    if(!repeat){
        store_list_no.push(temp_list_no);
    }
    repeat = false;

    return store_list_no;
    
}
const outputNewFeed = async(store_list_no,saved_keywords,weighting) => {
    var request = require('request');
    const Parser = require('rss-parser');
    const parser = new Parser();
    var feed_article = [];
    var related_rate = [];
    const today = new Date();
    var list = [];
    org = orgList;
    list = rssList;

    console.log(store_list_no);
    var promises = [];
    for(var i = 0; i<store_list_no.length;i++){
        console.log(store_list_no[i]);
        if(store_list_no[i][0] == 6 || store_list_no[i][0] == 12 || store_list_no[i][0] == 2){
            let options = {
                url: list[store_list_no[i][0]][store_list_no[i][1]][1],
                qs:{
                    org_no:store_list_no[i][0],
                    list_no:store_list_no[i][1]
                }
            };
            let promise = new Promise((resolve, reject) => {
            request(options, function(error, response, body) {
                if(!error && response.statusCode === 200){
                parser.parseString(body, function(err, feed){
                    if(!err){
                    feed.items.forEach((item) => {
                        if(Math.abs(today - new Date(item.isoDate))<2629800000){
                            
                            item.pubImg = org[options.qs.org_no][0];
                            item.listName = list[options.qs.org_no][options.qs.list_no][0];
                            if(feed.title.includes("Nature") || feed.title.includes("Light: Science") ){

                                item.content = item["content:encoded"].trim();
                                item.contentSnippet = item['content:encoded'].trim();
                            }
                        }
                    });
                    }
                    resolve(feed);
                });
                }else{
                reject(error);
                }
                });
            });
            promises.push(promise);
        }else{
            let feed = await parser.parseURL(list[store_list_no[i][0]][store_list_no[i][1]][1]);
            feed.items.forEach((item) => {
            if(list[store_list_no[i][0]][store_list_no[i][1]][1].indexOf("onlinelibrary.wiley")>-1){
                item.issn = findISSN.findISSN(list[store_list_no[i][0]][store_list_no[i][1]][1]);
            }else if(list[store_list_no[i][0]][store_list_no[i][1]][1].indexOf("thelancet")>-1){
                item.issn = findISSN.findISSN(item.link);
            }
            if(store_list_no[i][0]==14){
                item.pubImg = org[store_list_no[i][0]][0];
                item.listName = list[store_list_no[i][0]][store_list_no[i][1]][0];
                item.isoDate = today;
                if(!item.creator){
                    item.creator = null;
                }
                feed_article.push(item);
            }else if(Math.abs(today - new Date(item.isoDate))<2629800000){
                item.pubImg = org[store_list_no[i][0]][0];
                item.listName = list[store_list_no[i][0]][store_list_no[i][1]][0];
                if(store_list_no[i][0]==7){
                    item.content = item['content:encoded'];
                    item.contentSnippet = item['content:encoded'];
                    item.contentSnippet = item.contentSnippet.split('<h2>Abstract</h2>')[1];
                    
                }
                feed_article.push(item);
            }
            });
        }
        }
    async function getRequestRSS(){
        let temp_feed = [];
        let results = await Promise.all(promises);
        results.forEach(function(result) {
          temp_feed.push(result);
        });
        return temp_feed;
    }
    var request_result = getRequestRSS().then(result => {
        return result;
    })
    var request_rss = await request_result;
    if(request_rss[0]){
        
        for(var i = 0; i < request_rss.length; i++){
            
            for(let j = 0; j < request_rss[i].items.length; j++){
                
                feed_article.push(request_rss[i].items[j]);
            }
        }
    }
    
    TFIDF.addTFIDFDocument(feed_article,saved_keywords);
    for(var i = 0; i < feed_article.length; i++){
        related_rate[i] = 0;
        var temp_related_rate = [];
        var temp_key = [];
        var relative_index_res = "";
        //compute relative index
        relative_index_res = TFIDF.relativeIndex(saved_keywords,i);
        related_rate[i] = relative_index_res.tfidf_index;
        temp_key = relative_index_res.related_keyword;
        temp_related_rate[i] = related_rate[i];
        feed_article[i].keyword = temp_key.join(", ");

        //compute JIF index

        for(var j=0;j<JIF_info.length;j++){
            if(!feed_article[i].listName){
                feed_article[i].listName = feed_article[i-1].listName;
                feed_article[i].pubImg = feed_article[i-1].pubImg;
            }
            if(feed_article[i].issn == JIF_info[j].ISSN || stringSimilarity.compareTwoStrings(feed_article[i].listName.toLowerCase(),JIF_info[j].journalName.toLowerCase()) >= 0.85){
                feed_article[i].impactFactorScore = JIF_info[j].JIF;
                feed_article[i].normalizedIFScore = JIFindex.JIFScore(JIF_info[j]);
                
                break;
            }
        }
        
        if(!feed_article[i].impactFactorScore || !feed_article[i].normalizedIFScore){
            feed_article[i].impactFactorScore = "N/A";
            feed_article[i].normalizedIFScore = 1;
        }


        
    }
    //max & min relative score 
    var max_related_rate = Math.max(...related_rate);
    var min_related_rate = Math.min(...related_rate);
    var normalized_related_rate = [];
    for(var i = 0; i < feed_article.length; i++){
        if((max_related_rate - min_related_rate) == 0){
            normalized_related_rate[i] = 0;
        }else{
            normalized_related_rate[i] = 10* (related_rate[i] - min_related_rate)/(max_related_rate - min_related_rate);
        }
        feed_article[i].totalScore = (feed_article[i].normalizedIFScore * normalized_related_rate[i]);
        normalized_related_rate[i] = normalized_related_rate[i].toFixed(3);
    }
    //var max_total_score = Math.max(...feed_article.map(obj => obj.totalScore));
    for(var i = 0; i < feed_article.length; i++){
        //feed_article[i].totalScore = feed_article[i].totalScore / max_total_score * 10;
        feed_article[i].totalScore = feed_article[i].totalScore.toFixed(3);
    }
    var temp_list = [];
    for(var i = 0; i < feed_article.length; i++){
        temp_list.push({'feed_article': feed_article[i],'related_rate':normalized_related_rate[i],'IF_score':feed_article[i].normalizedIFScores,'total_score':feed_article[i].totalScore});
    }
    temp_list.sort(function(a,b){
        return ((parseFloat(a.total_score) > parseFloat(b.total_score))? -1 : ((parseFloat(a.total_score) == parseFloat(b.total_score)? 0 : 1)));
    })
    for(var i=0;i<temp_list.length;i++){
        feed_article[i] = temp_list[i].feed_article;
        related_rate[i] = temp_list[i].related_rate;
        feed_article[i].related_rate = related_rate[i];
        feed_article[i].totalScore = temp_list[i].total_score;
        
        // var temp_uni_key = [...new Set(feed_article[i].keyword)];
        // feed_article[i].keyword = temp_uni_key.join(', ');
    }
    //const fs = require('fs');
    
    // const jsonData = JSON.stringify(feed_article, null, 2);
    
    // fs.writeFile('data.json', jsonData, (err) => {
    //   if (err) throw err;
    //   console.log('Data written to file');
    // });

    return await feed_article;
};

module.exports = {orgList,rssList,outputJournal,outputNewFeed};


// [
//     [ 1, 0 ],   [ 0, 7 ],
//     [ 0, 4 ],   [ 1, 10 ],
//     [ 2, 11 ],  [ 6, 0 ],
//     [ 6, 1 ],   [ 6, 2 ],
//     [ 6, 3 ],   [ 6, 4 ],
//     [ 6, 5 ],   [ 12, 7 ],
//     [ 12, 8 ],  [ 12, 5 ],
//     [ 13, 33 ], [ 7, 18 ],
//     [ 14, 0 ]
//   ]
