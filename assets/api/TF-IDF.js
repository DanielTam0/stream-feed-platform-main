var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();


function addTFIDFDocument(feed_article,keyword){
    var temp_feed_article = feed_article;
    tfidf.documents = [];
    var temp_key = [];
    for(var i=0;i<keyword.length;i++){
        if(keyword[i][0].split(" ").length > 1){
            for(var j=0;j<temp_feed_article.length;j++){
                temp_feed_article[j].title = temp_feed_article[j].title.replace(new RegExp(keyword[i][0], "gi"), function(match) {
                    return match.replace(/\s+/g, "-").toLowerCase();
                });
                temp_feed_article[j].content = temp_feed_article[j].content.replace(new RegExp(keyword[i][0], "gi"), function(match) {
                    return match.replace(/\s+/g, "-").toLowerCase();
                });
            }
        }
    }

    for(var i=0; i<temp_feed_article.length;i++){
        var format_title = temp_feed_article[i].title.replaceAll(/-/g,"whyphenw");
        var format_abstract = temp_feed_article[i].content.replaceAll(/-/g,"whyphenw");
        for(var j=0;j<keyword.length;j++){
            temp_key[j] = natural.PorterStemmer.stem(keyword[j][0].replaceAll(" ","wunderw"));
            format_title = format_title.replaceAll(keyword[j][0],temp_key[j]);
            format_abstract = format_abstract.replaceAll(keyword[j][0],temp_key[j]);
        }

        tfidf.addDocument(format_title);
        tfidf.addDocument(format_abstract);
    }
}

function relativeIndex(keyword,index){
    var title_tfidf = 0;
    var abstract_tfidf = 0;
    var tfidf_index = 0;
    var related_keyword = [];
    for(var i=0;i<tfidf.documents.length;i++){
    var doc_key = Object.keys(tfidf.documents[i]);
        for(var j =0;j<doc_key.length;j++){
            var new_doc_key = doc_key[j];
            var stem_new_doc_key = natural.PorterStemmer.stem(new_doc_key);
            let stem_value = tfidf.documents[i][new_doc_key];
            delete tfidf.documents[i][new_doc_key];
            tfidf.documents[i][stem_new_doc_key] = stem_value;
        }
    }

    var title_values = Object.values(tfidf.documents[2*index]);
    var abstract_values = Object.values(tfidf.documents[2*index+1]);

    var title_word_count = title_values.reduce((accumulator, value) => {
        if (typeof value !== 'undefined') {
            return accumulator + value;
        }
        return accumulator;
    }, 0);

    var abstract_word_count = abstract_values.reduce((accumulator, value) => {
        if (typeof value !== 'undefined') {
            return accumulator + value;
        }
        return accumulator;
    }, 0);

    //console.log(title_word_count, "-", abstract_word_count);

    for(var i=0; i<keyword.length;i++){
        var stemmed_keyword = natural.PorterStemmer.stem(keyword[i][0]);
        stemmed_keyword = stemmed_keyword.replaceAll(" ", "-");
        stemmed_keyword = stemmed_keyword.replaceAll(/-/g,"whyphenw");

        tfidf.tfidfs(stemmed_keyword, function(j, measure) {
            if(j == (2*index)){
                title_tfidf += keyword[i][1] * measure;
                if(measure>0){
                    related_keyword.push("[" + (keyword[i][1] * measure).toFixed(1) +"]"+keyword[i][0]);
                }
            }
            if(j == (2*index)+1){
                abstract_tfidf += keyword[i][1] * measure;
                if(measure>0 && related_keyword.indexOf("[" + (keyword[i][1] * measure).toFixed(1) +"]"+keyword[i][0])<0){
                    related_keyword.push("[" + (keyword[i][1] * measure).toFixed(1) +"]"+keyword[i][0]);
                }
            }
        });
    }
    tfidf_index = (0.5 * title_tfidf/title_word_count) + (0.5 * abstract_tfidf/abstract_word_count);

    return {tfidf_index:tfidf_index, related_keyword:related_keyword};
}
module.exports = {addTFIDFDocument,relativeIndex};

// for(var i=0;i<tfidf.documents.length;i++){
//     var doc_key = Object.keys(tfidf.documents[i]);
//     for(var j =0;j<doc_key.length;j++){
//         var new_doc_key = doc_key[j].replaceAll(/whyphenw/g,"-");
//         var stem_new_doc_key = natural.PorterStemmer.stem(new_doc_key);
//         if(doc_key[j].indexOf("whyphenw")>-1){
//             var value = tfidf.documents[i][doc_key[j]];
//             delete tfidf.documents[i][doc_key[j]];
//             tfidf.documents[i][new_doc_key] = value;
//         }
//         let stem_value = tfidf.documents[i][new_doc_key];
//         delete tfidf.documents[i][new_doc_key];
//         tfidf.documents[i][stem_new_doc_key] = stem_value;
//     }
// }