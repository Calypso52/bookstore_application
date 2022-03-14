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

![image-20220313192558059](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313192558059.png)

### 2. /view/<id>

Details page for the book with id "1"

![image-20220313192708897](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313192708897.png)

### 3. /edit/<id>

Edit page for the book with id "1". Edit button is on the top right corner in the /view page

![image-20220313192742699](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313192742699.png)

**How to edit?**

See modify tips at the bottom of the page.

What it looks like when editing:

![image-20220313193034875](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313193034875.png)

**After editing:**

![image-20220313193246494](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313193246494.png)

After the user presses “discard changes” the page should present a dialog box widget that asks whether they are sure. If they are sure, don’t save the data, but take the user back to the view/<id> page so they can see their edits have not been saved. If they aren’t sure, let them keep editing.

**After clicking submit:**

![image-20220313193455798](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313193455798.png)

### 4. /search_result/<input>

![image-20220313194208316](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313194208316.png)

![image-20220313194220441](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313194220441.png)

Search words are highlighted in the web page

The query does substring matching that is not case sensitive on the title and 3 text field: Title, Author, Genre

![image-20220313194427299](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313194427299.png)



### 5. /add

User can add a book item into the database

![image-20220313193558783](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313193558783.png)

Some input boxes limit the input with regular language.

![image-20220313203023798](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313203023798.png)

After successfully submitted, you can tap 'See it here' to view the result(It has already been in the database)

![image-20220313193920939](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313193920939.png)

See it here:

![image-20220313194040272](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313194040272.png)

Error detecting:

Focus on the first error:

![image-20220313203153733](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313203153733.png)

## 4. Backend

Using flask as the back-end

How to get the 3 top scored mark recommendations?

Max heap algorithm

![image-20220313203356552](C:\Users\calypso\AppData\Roaming\Typora\typora-user-images\image-20220313203356552.png)

![image-20220313203919533](README.assets/image-20220313203919533.png)