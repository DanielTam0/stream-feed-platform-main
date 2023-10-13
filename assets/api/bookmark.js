const sqlite3 = require('sqlite3').verbose();
var bookmark_db = new sqlite3.Database('./assets/database/bookmark.db');

const filterData = (bookmarked_info)=>{
    var query = "SELECT * FROM bookmark WHERE title = '" + bookmarked_info[0] +"'" + " AND author = '" + bookmarked_info[1] + "'";
    return new Promise((resolve, reject)=>{
    bookmark_db.serialize(()=>{
        bookmark_db.get(query, (err, data)=>{
            resolve(data);
        })
    });
    })
}


function insertData(bookmarked_info){

    var bookmark_db = new sqlite3.Database('./assets/database/bookmark.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        var journal_insert = bookmark_db.prepare("INSERT INTO bookmark VALUES (?,?,?,?,?,?)");
        journal_insert.run(bookmarked_info[0],bookmarked_info[1],bookmarked_info[2],bookmarked_info[3],bookmarked_info[4],bookmarked_info[5]);

    });
}

function deleteData(bookmarked_info) {
    var query = "DELETE FROM bookmark WHERE title = '" + bookmarked_info[0] +"'" + " AND author = '" + bookmarked_info[1] + "'";
    bookmark_db.run(query, function(err) {
        if(err){
            throw(err)
        }else{
            console.log("success");
        }
        
    });
}

function displayData(){
    var query = "SELECT * FROM bookmark";
    return new Promise((resolve, reject)=>{
    bookmark_db.serialize(()=>{
        bookmark_db.all(query, (err, data)=>{
            resolve(data);
        })
    });
    })
}
module.exports = {filterData,insertData,deleteData,displayData};