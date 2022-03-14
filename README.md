# bookstore_application

## 1. Start tips

In the root directory:

`python server.py`

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

![image-20220313204056471](README.assets/image-20220313204056471.png)

### 2. /view/<id>

Details page for the book with id “5”

![image-20220313204110912](README.assets/image-20220313204110912.png)

### 3. /edit/<id>

Edit page for the book with id "5". Edit button is on the top right corner in the /view page

![image-20220313204139255](README.assets/image-20220313204139255.png)

**How to edit?**

See modify tips at the bottom of the page.

What it looks like when editing:

![image-20220313204157271](README.assets/image-20220313204157271.png)

![image-20220313204250547](README.assets/image-20220313204250547.png)

**After editing:**

After the user presses “discard changes” the page should present a dialog box widget that asks whether they are sure. If they are sure, don’t save the data, but take the user back to the view/<id> page so they can see their edits have not been saved. If they aren’t sure, let them keep editing.

**After clicking submit:**

![image-20220313204333731](README.assets/image-20220313204333731.png)

### 4. /search_result/<input>

![image-20220313204355579](README.assets/image-20220313204355579.png)

Search words are highlighted in the web page

The query does substring matching that is not case sensitive on the title and 3 text field: Title, Author, Genre

![image-20220313204412537](README.assets/image-20220313204412537.png)



### 5. /add

User can add a book item into the database

![image-20220313204427417](README.assets/image-20220313204427417.png)

Some input boxes limit the input with regular language.

![image-20220313204551348](README.assets/image-20220313204551348.png)

After successfully submitted, you can tap 'See it here' to view the result(It has already been in the database)

![image-20220313204642878](README.assets/image-20220313204642878.png)

See it here:

![image-20220313204653735](README.assets/image-20220313204653735.png)

**Error detecting:**

Focus on the first error:

![image-20220313204619935](README.assets/image-20220313204619935.png)

## 4. Backend

Using flask as the back-end

How to get the 3 top scored mark recommendations?

Max heap algorithm

![image-20220313204725115](README.assets/image-20220313204725115.png)

