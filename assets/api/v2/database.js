const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/data.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
initDatabase();

function initDatabase() {
    db.run("CREATE TABLE IF NOT EXISTS data (key TEXT PRIMARY KEY, value TEXT)");
}

function upsert(key, value) {
    db.run("INSERT OR REPLACE INTO data (key, value) VALUES (?, ?)", [key, value], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

async function read(key) {
    let promise = new Promise((resolve, reject) => {
        db.get("SELECT value FROM data WHERE key = ?", [key], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
                return;
            }

            if (row === undefined || row === null) {
                resolve(null);
                return;
            }

            resolve(row.value);
        });
    });

    return await promise;
}

function remove(key) {
    db.run("DELETE FROM data WHERE key = ?", [key]);
}

module.exports = {upsert, read, remove};
