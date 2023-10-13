function findThesaurus(){
    (async () => {
        const SpellCorrector = require('spelling-corrector');
        const thesaurus = require("thesaurus");
        var spellCorrector = new SpellCorrector();
        spellCorrector.loadDictionary();
        var input = ""
        var corr_text = spellCorrector.correct(input);
        var result = thesaurus.find(corr_text)
        console.log(result);
        var stringSimilarity = require("string-similarity");
        var matches = stringSimilarity.findBestMatch("design", result);
        console.log(matches);
    })();
}

findThesaurus();
/////////////////////////////
// var stringSimilarity = require("string-similarity");

// var similarity = stringSimilarity.compareTwoStrings("healed", "sealed");
// console.log(similarity);
// var matches = stringSimilarity.findBestMatch("design", [
//   "Taking the perspective of users and stakeholders can help designers incorporate human-centricity in their practice. However, we know relatively little of the dynamics of perspective taking – a cognitive facet of empathy – in design processes as a situated cognitive and behavioural activity, rather than as an overall orientation. To illuminate how perspective taking is used in design, we carried out a longitudinal multiple case study of 49-month-long graduate-level product and service design projects, exploring differences between high and midscale performance in different design phases. Through thematic analysis of review session discussions, we find that perspective taking in high-performing sessions involves three aggregate dimensions: gathering data to form perspectives, scoping and making sense of perspectives and using perspectives in creative processing. We identify phase-dependent characteristics for the scope and emphasis of perspective taking in concept development, system design and detailed design. We also describe different ways in which novice teams struggled to create and apply user perspectives. As a result, the current study sheds light on perspective taking and the changing nature of effective perspective taking across the design process.",
// ]);
// var matches2 = stringSimilarity.findBestMatch("engineering", [
//     "Taking the perspective of users and stakeholders can help designers incorporate human-centricity in their practice. However, we know relatively little of the dynamics of perspective taking – a cognitive facet of empathy – in design processes as a situated cognitive and behavioural activity, rather than as an overall orientation. To illuminate how perspective taking is used in design, we carried out a longitudinal multiple case study of 49-month-long graduate-level product and service design projects, exploring differences between high and midscale performance in different design phases. Through thematic analysis of review session discussions, we find that perspective taking in high-performing sessions involves three aggregate dimensions: gathering data to form perspectives, scoping and making sense of perspectives and using perspectives in creative processing. We identify phase-dependent characteristics for the scope and emphasis of perspective taking in concept development, system design and detailed design. We also describe different ways in which novice teams struggled to create and apply user perspectives. As a result, the current study sheds light on perspective taking and the changing nature of effective perspective taking across the design process.",
//   ]);
// console.log(matches.bestMatch , matches2.bestMatch);
// 0.8
// {
//   ratings: [
//     { target: 'science', rating: 0.07692307692307693 },
//     { target: 'logic', rating: 0.16666666666666666 },
//     { target: 'electronic engineering', rating: 0.8 }
//   ],
//   bestMatch: { target: 'electronic engineering', rating: 0.8 },
//   bestMatchIndex: 2
// }