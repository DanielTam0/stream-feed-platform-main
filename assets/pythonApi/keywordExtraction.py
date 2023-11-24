from flask import Flask, request, jsonify
from summa import keywords
import nltk
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__)

def selectNoun(keywordsWithSameScore):
    nonuMap = {}
    for keyword in keywordsWithSameScore:
        tags = nltk.pos_tag([keyword])
        nonuMap[tags[0][1]] = tags[0][0]
    
    if "NN" in nonuMap:
        return nonuMap["NN"]
    elif "NNS" in nonuMap:
        return nonuMap["NNS"]
    return None

@app.route('/getkeywords', methods=['POST'])
def getKeywords():
    content = request.json["data"]
    limit = request.json["limit"]
    limit = int(limit)
    trKeywords = keywords.keywords(content, scores = True)

    scoreMap = {}
    for keyword in trKeywords:
        if not keyword[1] in scoreMap:
            scoreMap[keyword[1]] = [keyword[0]]
        else:
            scoreMap[keyword[1]].append(keyword[0])

    keywordWithWeighting = []
    for item in scoreMap.items():
        keywords_ = item[1]
        keyword = selectNoun(keywords_)
        if keyword != None:
            keywordWithWeighting.append({keyword: int(item[0] * 100)})

    # print(keywordWithWeighting)
    keywordWithWeighting = keywordWithWeighting[:limit]
    return jsonify(keywordWithWeighting)

if __name__ =="__main__":
    app.run(debug=True)
