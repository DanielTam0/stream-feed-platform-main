//package
const express = require('express');
const app = express();
const path = require('path');
const basePath = path.join(__dirname, '../../')
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3').verbose();
const MathJS = require("mathjs");
const v2 = require("./v2/route");
// app.use
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(basePath));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use("/v2", v2.route);
// include files
var rssListJS = require("./rss-list.js");
var rssParser = require('./rss-parser.js');
var user = require('./user.js');
// var highImpact = require('./high-impact.js');
var bookmark = require('./bookmark.js');
var JIFindex = require("./JIF-index.js");
var thesaurus = require("./thesaurus.js");

//global variables
var store_list_no = [];
var max_total = null;
var min_total = null;
const forever = new Date('9999-12-31T23:59:59Z');

// create database file
// let bookmark_db = new sqlite3.Database('./assets/database/bookmark.db',
// sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
// (err) => {
//     bookmark_db.run("CREATE TABLE IF NOT EXISTS bookmark (title TEXT, author TEXT, publish_date DATETIME, publisher TEXT, url TEXT, abstract TEXT)");
// });

// get post method
// app.get('/test', (req, res) => {
//     res.render('test');
// })

//user-setting
// app.get('/user-setting', (req, res) => {
//     if (req.query.user_id) {
//         if (req.query.user_id == config.Config) {
//             return
//         }

//         config.Config = req.query.user_id;
//         user.getAuthorProfileData(req.query.user_id)
//             .then(() => {userSetting(res)});
//     } else {
//         userSetting(res);
//     }
// })

// function userSetting(res) {
//     res.render("user-setting", {image: config.Config.image, name: config.Config.name, wordScore: config.Config.wordScore})
// }

// app.post('/user-setting', (req, res) => {
//     var default_weighting = {relative_weight:0.5,impact_weight:0.5};
//     res.clearCookie('saved_keywords');
//     res.cookie('saved_keywords', req.body.saved_keywords,{ expires: forever });
//     res.cookie('weighting',default_weighting,{ expires: forever });
//     res.redirect('/mainpage');
// })

//main page
app.get('/mainpage', (req, res) => {
    var org_name = rssListJS.orgList();
    var list_name = rssListJS.rssList();
    var filter_name = req.query.filter;
    var info = JIFindex.importJIF();
    const cookies = req.cookies;
    //const saved_keywords = cookies['saved_keywords'];
    const store_list_no = cookies['store_list_no'];
    const weighting = cookies['weighting'];
    const lock_max_min = cookies['lock_max_min'];
    // const store_list_no = [[ 12, 7 ],[ 6, 4 ], [2, 11]];
    // For Dr. Wang
    const saved_keywords = [["Electro-optic",10],["Optical",8],["Modulation",10],["Quantum",5],["Photonics",8],["Lithium Niobate",8], ["LiNbO3",8], ["Waveguide",8], ["Resonator",8], ["Fabrication",6], ["Microwave photonics",8], ["Nanophotonic",8], ["Plasmonic",3], ["Dispersion",5], ["Second-Harmonic",8], ["Frequency comb",8], ["Nonlinear optic",8], ["Integrated photonics",10], ["Photonic integrated circuits",10], ["Inverse designs",8], ["narrowband emission",7]];
    //const store_list_no = [[ 1, 0 ],   [ 0, 7 ], [ 0, 4 ],   [ 1, 10 ],[ 2, 11 ],  [ 6, 0 ], [ 6, 1 ],   [ 6, 2 ],  [ 6, 3 ],   [ 6, 4 ], [ 6, 5 ],   [ 12, 7 ],  [ 12, 8 ],  [ 12, 5 ], [ 13, 33 ], [ 7, 18 ], [ 14, 0 ] ];

    //res.clearCookie('lock_max_min');
    if(store_list_no){

        var temp_result = rssParser.outputNewFeed(store_list_no,saved_keywords,weighting).then(result => {
            return result;
        })
        var db_result = bookmark.displayData().then(results=>{
            return results;
        })
        const printJournal = async() =>{
            var final_result = await temp_result;
            var db_data = await db_result;
            if(req.query.search){
                var temp_search_item = [];
                for(var i=0; i<final_result.length; i++){
                    console.log(final_result[i]);
                    if(final_result[i].creator.toLowerCase().indexOf(req.query.search.toLowerCase())>-1 || final_result[i].isoDate.toLowerCase().indexOf(req.query.search.toLowerCase())>-1 || final_result[i].listName.toLowerCase().indexOf(req.query.search.toLowerCase())>-1 || final_result[i].title.toLowerCase().indexOf(req.query.search.toLowerCase())>-1 ||final_result[i].content.toLowerCase().indexOf(req.query.search.toLowerCase())>-1){
                        temp_search_item.push(final_result[i]);
                    }
                }
                final_result = temp_search_item;
            }else if(filter_name){
                var filter_result = [];
                for(var i=0;i<final_result.length;i++){
                    if(filter_name == final_result[i].listName){
                        filter_result.push(final_result[i]);
                    }
                }
                final_result = filter_result;
            }
            max_total = Math.max(...final_result.map(obj => obj.totalScore));
            min_total = Math.min(...final_result.map(obj =>obj.totalScore));
            if(lock_max_min){
                console.log(lock_max_min);
                for(var i = 0;i<final_result.length;i++){
                    if(final_result[i].totalScore > MathJS.sqrt(lock_max_min.lock_max)){
                        final_result[i].totalScore = lock_max_min.lock_max;
                    }
                    final_result[i].totalScore = MathJS.sqrt(final_result[i].totalScore);
                    final_result[i].totalScore = final_result[i].totalScore.toFixed(3);
                }
            }else{
                for(var i = 0;i<final_result.length;i++){
                    // final_result[i].totalScore = MathJS.sqrt(final_result[i].totalScore);
                    // final_result[i].totalScore = final_result[i].totalScore.toFixed(3);
                }
                
            }

            res.render("mainpage", {org_name:org_name, list_name:list_name, saved_keywords:saved_keywords, final_result:final_result,store_list_no:store_list_no, db_data:db_data});
        }
        printJournal();
}else{
    
    res.render("mainpage", {org_name:org_name, list_name:list_name, saved_keywords:saved_keywords,final_result:null,store_list_no:null, db_data:null});
}
})

app.post('/mainpage', (req, res) => {
    if(req.body.title){
        var bookmarked_info = [];
        bookmarked_info.push(req.body.title);
        bookmarked_info.push(req.body.author);
        bookmarked_info.push(req.body.publish_date);
        bookmarked_info.push(req.body.publisher);
        bookmarked_info.push(req.body.url);
        bookmarked_info.push(req.body.abstract);

        var get_result = bookmark.filterData(bookmarked_info)
        .then(results=>{
            if(results){
                bookmark.deleteData(bookmarked_info);
            }else{
                bookmark.insertData(bookmarked_info);
            }
        })
    }else if(req.body.lock){
        var lock = {lock_max:max_total,lock_min:min_total};
        res.clearCookie('lock_max_min');
        res.cookie('lock_max_min',lock,{ expires: forever });
        res.send('');
    }else{
        var target_journal = rssParser.outputJournal(req.body.org_no, req.body.list_no);
        store_list_no = target_journal;

        res.clearCookie('store_list_no');
        res.cookie('store_list_no', store_list_no,{ expires: forever });
        res.redirect('/mainpage');
    }
})

//high impact journals
// app.get('/high-impact-feed', (req, res) => {
//     var high_impact_rank = highImpact.getHighImpactJournal().then(result => {
//         return result;
//     })
//     var high_impact_feed = highImpact.outputHINews().then(result => {
//         return result;
//     })
//     const printHIJournal = async() =>{
//         var ranking = await high_impact_rank;
//         var high_impact_feeds = await high_impact_feed;
//         res.render('high-impact',{ranking:ranking, high_impact_feeds:high_impact_feeds});
//     }
//     printHIJournal();
    
// })

//user profile
// app.get('/user-profile', (req, res) => {
//     const cookies = req.cookies;
//     //const saved_keywords = cookies['saved_keywords'];
//     const saved_keywords = [["Electro-optic",10],["Optical",8],["Modulation",10],["Quantum",5],["Photonics",8],["Lithium Niobate",8], ["LiNbO3",8], ["Waveguide",8], ["Resonator",8], ["Fabrication",6], ["Microwave photonics",8], ["Nanophotonic",8], ["Plasmonic",3], ["Dispersion",5], ["Second-Harmonic",8], ["Frequency comb",8], ["Nonlinear optic",8], ["Integrated photonics",10], ["Photonic integrated circuits",10]];
//     //Electro-optic,Optical,Modulation,Quantum,Photonics,Lithium,Niobate,LiNbO3,Waveguide,Resonator,Fabrication,Microwave photonics,Nanophotonic,Plasmonic,Dispersion,Second-Harmonic,Frequency comb,Nonlinear optic,Integrated photonics,Photonic,Integrated circuits,Inverse design
//     const user_profile = cookies['profile'];
//     const weighting = cookies['weighting'];

//     function sortByIndex(a,b){
//         if(a[1]==b[1]){
//             return 0;
//         }else{
//             return (a[1]>b[1]) ?-1:1;
//         }
//     }
//     for(var i=0;i<saved_keywords.length;i++){
//         saved_keywords[i].synonyms = thesaurus.printSynonyms(saved_keywords[i][0]);
//     }
//     saved_keywords.sort(sortByIndex);
//     res.render('v2/user-profile',{saved_keywords:saved_keywords,user_profile:user_profile,weighting:weighting});
// })

// app.post('/user-profile', (req, res) => {
//     res.clearCookie('saved_keywords');
//     res.clearCookie('weighting');
//     res.cookie('weighting',req.body.weighting,{ expires: forever });
//     res.cookie('saved_keywords', req.body.saved_keywords,{ expires: forever });
//     res.send('');
// })

//bookmark
app.get('/bookmark', (req, res) => {
    var get_result = bookmark.displayData()
    .then(results=>{
        if(req.query.sort == "sort-op2"){
            results.sort(function(a,b){
                return new Date(a.publish_date) - new Date(b.publish_date);
            });
        }else if(req.query.sort == "sort-op3"){
            results.sort(function(a,b){
                return new Date(b.publish_date) - new Date(a.publish_date);
            });
        }else{
            results = results.reverse();
        }
        res.render('bookmark',{bookmark_info:results});
    })
})
app.post('/bookmark', (req, res) => {
    if(req.body.remove_bookmark){
        remove_bookmark = [req.body.remove_bookmark.title,req.body.remove_bookmark.author];
        bookmark.deleteData(remove_bookmark);
    }
})

//update
app.get('/update', (req, res) => {
    res.render('update')
})
app.post('/update', (req, res) => {
    JIFindex.updateJIF(req.body.updated_excel);
})


app.listen(3000);