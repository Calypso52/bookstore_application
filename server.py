from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
from database import book_info
from topK import getBiggestNumbers
app = Flask(__name__)

# data will be shown on /home page
searchResultArr = []

# ROUTES
# home page route
@app.route('/')
def home():
    global book_info
    global searchResultArr
    
    # get top 3 high score books by biggest heap
    top_3_score_arr = getBiggestNumbers(book_info, 3)
    
    # clear array
    searchResultArr = []
    
    for item in top_3_score_arr:
        searchResultArr.append(book_info[item[0]])
    
    return render_template('home.html', data = searchResultArr)

@app.route('/add')
def add():
    return render_template('add.html')
    

@app.route('/add_data', methods=['GET', 'POST'])
def add_data():
    global book_info
    json_data = request.get_json()
    # print(json_data)
    
    genre = []
    genreArr = json_data["bookGenreInput"].split(',')
    for item in genreArr:
        item = item.strip()
        genre.append(item)
        
    curDicLen = str(len(book_info) + 1)
        
    new_item_dict = {
        'id': curDicLen,
        'title': json_data["bookTitleInput"],
        'coverImage': json_data["bookCoverInput"],
        'year': json_data["bookYearInput"],
        'summary': json_data["bookSummaryInput"],
        'author': json_data["bookAuthorInput"],
        'price': json_data["bookPriceInput"],
        'score': json_data["bookScoreInput"],
        'genre': genre,
        'publisher': json_data["bookPublisherInput"],
        'language': json_data["bookLanguageInput"]
    }
    
    book_info[curDicLen] = new_item_dict
    
    return jsonify(data = new_item_dict)
# **************************************************************************
@app.route('/edit_data', methods=['GET', 'POST'])
def edit_data():
    global book_info
    json_data = request.get_json()
    # print(json_data)
    id = json_data["id"]
    
    book_info[id]["title"] = json_data["title"]
    book_info[id]["year"] = json_data["year"]
    book_info[id]["summary"] = json_data["summary"]
    book_info[id]["author"] = json_data["author"]
    book_info[id]["price"] = json_data["price"]
    book_info[id]["score"] = json_data["score"]
    book_info[id]["genre"] = json_data["genre"]
    book_info[id]["publisher"] = json_data["publisher"]
    book_info[id]["language"] = json_data["language"]
    
    print(book_info[id])
    
    return jsonify(data = book_info[id])
# **************************************************************************

# get detail results
@app.route('/view/<id>')
def get_book_info(id):
    global book_info
    
    # define return arr
    book_info_arr = book_info[id]
    return render_template('book_info.html', data = book_info_arr)

# initial edit page
@app.route('/edit/<id>')
def initial_edit(id):
    global book_info
    
    # define return arr
    book_info_arr = book_info[id]
    return render_template('edit.html', data = book_info_arr)


# get search results
@app.route('/search_results/<searchContent>')
def search_results(searchContent):
    global book_info
    
    searchResultList = []
    
    for key in book_info:
        search_content = str.lower(searchContent)
        database_name = str.lower(book_info[key]["title"])
        database_author = str.lower(book_info[key]["author"])
        
        # fuzzy search(case insensitive) for 3 attributes
        if (search_content in database_name or search_content in database_author):
            searchResultList.append(book_info[key])
        else:
            for item in book_info[key]["genre"]:
                database_genre = str.lower(item)
                if search_content in database_genre:
                    searchResultList.append(book_info[key])
                    break

    # send back search result and input
    return render_template('searchResult.html', result = searchResultList, input = searchContent)

if __name__ == '__main__':
   app.run(debug = True)