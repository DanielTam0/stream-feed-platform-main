const Parser = require('rss-parser');
const parser = new Parser();
const cheerio = require("cheerio");
const unirest = require("unirest");
var highImpactLinks = require("./high-impact-links.js");

const my_date = new Date();
const today = my_date.getFullYear() +  "-" + String(my_date.getMonth() + 1).padStart(2, '0')  +  "-" + String(my_date.getDate() + 1).padStart(2, '0');
const my_date2 = new Date();
my_date2.setDate(my_date2.getDate() - 2);
const yesterday = my_date2.getFullYear() +  "-" + String(my_date2.getMonth() + 1).padStart(2, '0')  +  "-" + String(my_date2.getDate() + 1).padStart(2, '0');
const my_date3 = new Date();
my_date3.setDate(my_date3.getDate() - 3);
const two_days = my_date3.getFullYear() +  "-" + String(my_date3.getMonth() + 1).padStart(2, '0')  +  "-" + String(my_date3.getDate() + 1).padStart(2, '0');
//top 5 highest impact journal

const getHighImpactJournal = async () => {
    try {
    const url = "https://www.scimagojr.com/journalrank.php?order=h&ord=desc&type=j";

    return highImpactJournalResult = await unirest
        .get(url)
        .headers({})
        .then((response) => {
        let $ = cheerio.load(response.body);

        var highImpactJournal = [];
        $("tr").each((i, el) => {
            if(i>0 && i<6){
                highImpactJournal[i-1] = {
                    rank:i,
                    title:$(el).find(".tit").text(),
                    hIndex:$(el).find("td:nth-child(5)").text()
                }
                if(highImpactJournal[i-1].title == "Lancet, The"){
                    highImpactJournal[i-1].title = "The Lancet";
                    highImpactJournal[i-1].img = "assets/images/The-lancet-logo.png";

                }else if(highImpactJournal[i-1].title == "Nature"){
                    highImpactJournal[i-1].img = "assets/images/Nature-logo.png";
                }
                else if(highImpactJournal[i-1].title == "Science"){
                    highImpactJournal[i-1].img = "assets/images/Science-inc-logo.png";
                }
                else if(highImpactJournal[i-1].title == "New England Journal of Medicine"){
                    highImpactJournal[i-1].img = "assets/images/NEJM-logo.png";
                }
                else if(highImpactJournal[i-1].title == "Cell"){
                    highImpactJournal[i-1].title = "Cell Press";
                    highImpactJournal[i-1].img = "assets/images/cell-press-logo.png";
                }
            }
        });
        return highImpactJournal;
        });
    } catch (e) {
    console.log(e);
    }
};

// get rss feed
const outputHINews = async() => {
    var highImpactList = highImpactLinks.highImpactList;
    var highImpactFeed = [];
    for(var i = 0; i<highImpactList.length;i++){

        let feed = await parser.parseURL(highImpactList[i]);
        feed.items.forEach((item) => {
            let iso_date = item.isoDate.substring(0, 10);
            if(iso_date == today || iso_date == yesterday || iso_date == two_days) {
                item.isoDate = new Date(item.isoDate);
                item.org = feed.title;

                if(item.org == "The Lancet"){
                    item.img = "assets/images/The-lancet-logo.png";

                }else if(item.org == "Nature"){
                    item.img = "assets/images/Nature-logo.png";
                }
                else if(item.org == "Latest News from Science Magazine"){
                    item.img = "assets/images/Science-inc-logo.png";
                }
                else if(item.org == "Science&#039;s coronavirus news"){
                    item.img = "assets/images/Science-inc-logo.png";
                }
                else if(item.org == "massmed: New England Journal of Medicine: Table of Contents"){
                    item.img = "assets/images/NEJM-logo.png";
                }
                else if(item.org == "Cell"){
                    item.img = "assets/images/cell-press-logo.png";
                }

                highImpactFeed.push(item);
                
            }

        });
    }
    highImpactFeed.sort(function(a,b){
        return ((a.isoDate > b.isoDate)? -1 : ((a.isoDate == b.isoDate? 0 : 1)));
    })
    return await highImpactFeed;
}

module.exports = {getHighImpactJournal,outputHINews};