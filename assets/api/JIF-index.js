const xlsx = require("xlsx");
const filePath = "assets/data/Clarivate_IF_report.xlsx";
const MathJS = require("mathjs");
const fs = require("fs");

var data = [];
var info = [];
var sqrt_mean = 0;
var sqrt_total = 0;
var max_sqrt_val = 0;
var min_sqrt_val = 0;
var divide_val = 0;
var cat_info = JSON.parse(fs.readFileSync("assets/JSON/JIF.json"));

// import excel data
function importJIF() {
    var file = xlsx.readFile(filePath);
    var sheets = file.SheetNames;

    const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
    temp.forEach((res) => {
        data.push(res);
    })
    for (var i = 0; i < 10000; i++) {
        let temp_obj = {
            journalName: data[i]["Journal name"],
            ISSN: data[i]["ISSN"],
            Category: data[i]["Category"],
            totalCite: data[i]["Total Citations"],
            JIF: parseFloat(data[i]["2022 JIF"]),
            JCI: parseFloat(data[i]["2022 JCI"]),
            percentOAGold: data[i]["% of OA Gold"]
        };
        info.push(temp_obj);
    }
    for (var i = 0; i < 10000; i++) {
        if (i == 0) {
            max_sqrt_val = Math.sqrt(info[i].JIF);
        } else if (i == 9999) {
            min_sqrt_val = Math.sqrt(info[i].JIF);
        }
        sqrt_total += MathJS.sqrt(info[i].JIF);
    }
    divide_val = (max_sqrt_val - min_sqrt_val) / 9;
    sqrt_mean = sqrt_total / 10000;

    return info;
}
function JIFScore(journal_info) {
    var IF_score = Math.sqrt(journal_info.JIF) * 1.25;
    if (Math.sqrt(journal_info.JIF) > 8) {
        IF_score = 10;
    }

    return IF_score;
}
function updateJIF(updated_excel) {
    var file = xlsx.readFile(filePath);
    var ws_name = file.SheetNames[0];
    var ws = file.Sheets[ws_name];
    Object.keys(ws).forEach((key, i) => {
        if (i > 10) {
            if ((i - 1) % 10 == 0) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["Journal name"], h: updated_excel[Math.floor(i / 10)]["Journal name"], w: updated_excel[Math.floor(i / 10)]["Journal name"] }
            } else if ((i - 1) % 10 == 1) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["JCR Abbreviation"], h: updated_excel[Math.floor(i / 10)]["JCR Abbreviation"], w: updated_excel[Math.floor(i / 10)]["JCR Abbreviation"] }
            } else if ((i - 1) % 10 == 2) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["ISSN"], h: updated_excel[Math.floor(i / 10)]["ISSN"], w: updated_excel[Math.floor(i / 10)]["ISSN"] }
            } else if ((i - 1) % 10 == 3) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["eISSN"], h: updated_excel[Math.floor(i / 10)]["eISSN"], w: updated_excel[Math.floor(i / 10)]["eISSN"] }
            } else if ((i - 1) % 10 == 4) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["Category"], h: updated_excel[Math.floor(i / 10)]["Category"], w: updated_excel[Math.floor(i / 10)]["Category"] }
            } else if ((i - 1) % 10 == 5) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["Total Citations"], h: updated_excel[Math.floor(i / 10)]["Total Citations"], w: updated_excel[Math.floor(i / 10)]["Total Citations"] }
            } else if ((i - 1) % 10 == 6) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["JIF"], h: updated_excel[Math.floor(i / 10)]["JIF"], w: updated_excel[Math.floor(i / 10)]["JIF"] }
            } else if ((i - 1) % 10 == 7) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["JIF Quartile"], h: updated_excel[Math.floor(i / 10)]["JIF Quartile"], w: updated_excel[Math.floor(i / 10)]["JIF Quartile"] }
            } else if ((i - 1) % 10 == 8) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10)]["JCI"], h: updated_excel[Math.floor(i / 10)]["JCI"], w: updated_excel[Math.floor(i / 10)]["JCI"] }
            } else if ((i - 1) % 10 == 9) {
                ws[key] = { t: 's', v: updated_excel[Math.floor(i / 10) - 1]["% of OA Gold"], h: updated_excel[Math.floor(i / 10) - 1]["% of OA Gold"], w: updated_excel[Math.floor(i / 10) - 1]["% of OA Gold"] }
            }
        }
    })
    xlsx.writeFile(file, filePath);
}
module.exports = { importJIF, JIFScore, updateJIF };

// new method

// var journal_info_cat = journal_info.Category.split(';');
// var IF_score = 0;
// for(var i=0;i<journal_info_cat.length;i++){
//     journal_info_cat[i] = journal_info_cat[i].trim();
//     if(cat_info[journal_info_cat[i]]){
//         console.log( journal_info_cat[i]," ",cat_info[journal_info_cat[i]]);
//         //console.log(cat_info[journal_info_cat[i]].base_score + 2.5*(journal_info.JIF - cat_info[journal_info_cat[i]].min)/(cat_info[journal_info_cat[i]].max - cat_info[journal_info_cat[i]].min));
//         IF_score += (cat_info[journal_info_cat[i]].base_score + 2.5*(journal_info.JIF - cat_info[journal_info_cat[i]].min)/(cat_info[journal_info_cat[i]].max - cat_info[journal_info_cat[i]].min));
//     }
// }
// IF_score = IF_score/journal_info_cat.length;