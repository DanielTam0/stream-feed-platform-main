from flask import Flask, render_template, url_for, request
from summa import keywords


app = Flask(__name__)
@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")


@app.route('/result', methods=['POST', 'GET'])
def result():
    output = request.form.to_dict()
    text = output["paper"]
    TR_keywords = keywords.keywords(text, scores=True)
    numKeywords = 0;
    count = 0;
    keyword_list = []
    while numKeywords <= 20:
        if(numKeywords == 0):
            keyword_list.append([TR_keywords[numKeywords][0], TR_keywords[numKeywords][1]])
            numKeywords+=1
        else:
            if(TR_keywords[count+numKeywords][1] == TR_keywords[count+numKeywords-1][1]):
                word = str(keyword_list[numKeywords-1][0]) +" , "+ str(TR_keywords[count+numKeywords][0])
                keyword_list[numKeywords-1] = [word,keyword_list[numKeywords-1][1]]
                count+=1
            
            else:
                keyword_list.append([TR_keywords[count+numKeywords][0], TR_keywords[count+numKeywords][1]])
                numKeywords+=1
            
        
        
        
 
    
    
    return render_template('index.html', 
                           kw1 = keyword_list[0][0], sc1=keyword_list[0][1],
                           kw2 = keyword_list[1][0], sc2=keyword_list[1][1],
                           kw3 = keyword_list[2][0], sc3=keyword_list[2][1],
                           kw4 = keyword_list[3][0], sc4=keyword_list[3][1],
                           kw5 = keyword_list[4][0], sc5=keyword_list[4][1],
                           kw6 = keyword_list[5][0], sc6=keyword_list[5][1],
                           kw7 = keyword_list[6][0], sc7=keyword_list[6][1],
                           kw8 = keyword_list[7][0], sc8=keyword_list[7][1],
                           kw9 = keyword_list[8][0], sc9=keyword_list[8][1],
                           kw10 = keyword_list[9][0], sc10=keyword_list[9][1],
                           kw11 = keyword_list[10][0], sc11=keyword_list[10][1],
                           kw12 = keyword_list[11][0], sc12=keyword_list[11][1],
                           kw13 = keyword_list[12][0], sc13=keyword_list[12][1],
                           kw14 = keyword_list[13][0], sc14=keyword_list[13][1],
                           kw15 = keyword_list[14][0], sc15=keyword_list[14][1],
                           kw16 = keyword_list[15][0], sc16=keyword_list[15][1],
                           kw17 = keyword_list[16][0], sc17=keyword_list[16][1],
                           kw18 = keyword_list[17][0], sc18=keyword_list[17][1],
                           kw19 = keyword_list[18][0], sc19=keyword_list[18][1],
                           kw20 = keyword_list[19][0], sc20=keyword_list[19][1],
                           )

if __name__ =="__main__":
    app.run(debug=True)