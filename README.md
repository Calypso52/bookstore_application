# bookstore_application

YouTube demo video link:

https://youtu.be/i6g075mwQmc

## 1. Start tips

In the root directory:

`python server.py`

open in url:

http://127.0.0.1:5000/

## 2. Structure

directories: 

​	/templates: HTML files

​	/static: js files

​	/database: Database, python dict

​	/server: Flask server

​	/topK.py: Maximum root function to find the highest rated book

## 3. Frontend

Routes: 

### 1. /

Home page with the three highest rated books:

![image-20220316195115029](README.assets/image-20220316195115029.png)

### 2. /view/<id

Details page for the book with id “5”



### 3. /edit/<id

Edit page for the book with id "5". Edit button is on the top right corner in the /view page

![image-20220316195334913](README.assets/image-20220316195334913.png)

**How to edit?**

See modify tips at the bottom of the page.

What it looks like when editing:

![image-20220316195359436](README.assets/image-20220316195359436.png)

![image-20220316195704790](README.assets/image-20220316195704790.png)

**After editing:**

After the user presses “discard changes” the page should present a dialog box widget that asks whether they are sure. If they are sure, don’t save the data, but take the user back to the view/<id> page so they can see their edits have not been saved. If they aren’t sure, let them keep editing.

**After clicking submit:**

You can view the result and they are stored in the database.

![image-20220316195816426](README.assets/image-20220316195816426.png)

### 4. /search_result/<input

![image-20220316195907407](README.assets/image-20220316195907407.png)

Search words are highlighted in the web page

The query does substring matching that is not case sensitive on the title and 3 text field: Title, Author, Genre

![image-20220316195955596](README.assets/image-20220316195955596.png)



### 5. /add

User can add a book item into the database

![image-20220316200014275](README.assets/image-20220316200014275.png)

Some input boxes limit the input with regular language.

![image-20220316200300941](README.assets/image-20220316200300941.png)

After successfully submitted, you can tap 'See it here' to view the result(It has already been in the database)

![image-20220316200321794](README.assets/image-20220316200321794.png)

See it here:

![image-20220316200334684](README.assets/image-20220316200334684.png)

**Error detecting:**

Focus on the first error:

![image-20220316200233523](README.assets/image-20220316200233523.png)

## 4. Backend

Using flask as the back-end

How to get the 3 top scored mark recommendations?

Max heap algorithm

![image-20220313204725115](README.assets/image-20220313204725115.png)

## 5. Database

![image-20220313205103996](README.assets/image-20220313205103996.png)