// function synonymousWords(keyword,title,abstract){
//     var thesaurus = require("thesaurus");
//     var stringSimilarity = require("string-similarity");
 
//     var related_rate = 0;
//     var synonyms = thesaurus.find(keyword[0]);
//     // for keyword
//         // keyword title
//     for(var i=0; i<title.split(" ").length; i++){
//         if(stringSimilarity.compareTwoStrings(keyword[0], title.split(" ")[i]) >= 0.7){
//             related_rate += 2*stringSimilarity.compareTwoStrings(keyword[0], title.split(" ")[i])*keyword[1];
//         }
//     }
//         // keyword abstract
//     for(var i=0; i<abstract.split(" ").length; i++){
//         if(stringSimilarity.compareTwoStrings(keyword[0], abstract.split(" ")[i]) >= 0.7){
//             related_rate += stringSimilarity.compareTwoStrings(keyword[0], abstract.split(" ")[i])*keyword[1];
//         }
//     }

//     // for synonyms
//     for(var i = 0; i < synonyms.length; i++){
//         if(synonyms[i].split(" ").length == 1){
//             for(var j = 0; j < title.split(" ").length; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], title.split(" ")[j]) >= 0.9){
//                     related_rate += 0.5*keyword[1];
//                 }
//             }
//             for(var j = 0; j < abstract.split(" ").length; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], abstract.split(" ")[j]) >= 0.9){
//                     related_rate += 0.25*keyword[1];
//                 }
//             }
//         }else if(synonyms[i].split(" ").length == 2){
//             for(var j = 0; j < title.split(" ").length - 1; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], title.split(" ")[j].concat(" ",title.split(" ")[j+1])) >= 0.9){
//                     related_rate += 0.5*keyword[1];
//                 }
//             }
//             for(var j = 0; j < abstract.split(" ").length - 1; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], abstract.split(" ")[j].concat(" ",abstract.split(" ")[j+1])) >= 0.9){
//                     related_rate += 0.25*keyword[1];
//                 }
//             }
//         }else if(synonyms[i].split(" ").length == 3){
//             for(var j = 0; j < title.split(" ").length - 2; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], title.split(" ")[j].concat(" ",title.split(" ")[j+1]," ",title.split(" ")[j+2])) >= 0.9){
//                     related_rate += 0.5*keyword[1];
//                 }
//             }
//             for(var j = 0; j < abstract.split(" ").length - 2; j++){
//                 if(stringSimilarity.compareTwoStrings(synonyms[i], abstract.split(" ")[j].concat(" ",abstract.split(" ")[j+1]," ",abstract.split(" ")[j+2])) >= 0.9){
//                     related_rate += 0.25*keyword[1];
//                 }
//             }
//         }
//     }
//     return related_rate;
    
// }
// function printSynonyms(keyword){
//     var thesaurus = require("thesaurus");
//     var synonyms = thesaurus.find(keyword);
//     return synonyms;
// }

// module.exports = {synonymousWords,printSynonyms};