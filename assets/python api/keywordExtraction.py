from summa import keywords

@app.route('/result')
def result(input, amount):
    TR_keywords = keywords.keywords(input, scores = True);
    count = 0;
    numKeywords = 0;
    keywordList = []
    while numKeywords <= amount:
        if(numKeywords==0):
            keywordList.append(TR_keywords[numKeywords][0]);
            numKeywords += 1;
        else:
            if(TR_keywords[numKeywords + count][1]==TR_keywords[numKeywords + count - 1][1]):
                word = str(keywordList[numKeywords-1]) + " , " + str(TR_keywords[numKeywords + count][0]);
                keywordList[numKeywords-1] = word;
                count += 1;
            else:
                keywordList.append(TR_keywords[numKeywords + count][0]);
                numKeywords += 1;


    return keywordList;