let submitListObj = {};

// append genres
function initialGenre(data) {
    let genre = data.genre;
    //insert all new genre data
    $.each(genre, function(i, item){
        let book_item= $(`<li class="editGenre" data-index="${i}">${item}</li>`);
        $("#book_genre").append(book_item);
    })
}

// initialize default data
function initialSubmitListObj(data) {
    submitListObj["id"] = data.id;
    submitListObj["title"] = data.title;
    submitListObj["year"] = data.year;
    submitListObj["summary"] = data.summary;
    submitListObj["author"] = data.author;
    submitListObj["price"] = data.price;
    submitListObj["score"] = data.score;
    submitListObj["genre"] = data.genre;
    submitListObj["publisher"] = data.publisher;
    submitListObj["language"] = data.language;
}

// modify specific one item and save change into submitted object
function collectItem(editElem, toBeModifiedAttr) {
    if(toBeModifiedAttr === 'genre') {
        // get which one is clicked
        let lock = 0;
        $('#book_genre').on('click', editElem, function() {
            let curClicked = $(this).attr("data-index");
            
            // 0 represent unclicked, 1 represent clicked
            if(lock !== 0) return;

            lock = 1;
            let cur = $(this);
            // get current text
            let curText = cur.text();
            // get current height
            let curHeight = cur.height();
            // get current width
            let curWidth = cur.width();
            cur.empty();
            // create an input element
            let ipt = $("<input>");
            ipt.val(curText);
            ipt.width(curWidth);
            ipt.height(curHeight);
            cur.append(ipt);
            ipt.trigger("select");
            // press enter to confirm input
            ipt.keyup(function(e) {
                if(e.keyCode === 13) {
                    cur.text(ipt.val());
                    submitListObj[toBeModifiedAttr][curClicked] = ipt.val();
                    
                    // reset to clickable state
                    lock = 0;
                }
            })
        });
    } else if(toBeModifiedAttr === 'summary') {
        let lock = 0;
        $(editElem).on('click', function() {
            // 0 represent unclicked, 1 represent clicked
            if(lock !== 0) return;

            lock = 1;
            let cur = $(this);
            // get current text
            let curText = cur.text();
            // get current width
            let curWidth = cur.width();
            cur.empty();
            // create an input element
            let textArea = $("<textarea rows='7'></textarea>");
            textArea.val(curText);
            textArea.width(curWidth);
            cur.append(textArea);
            textArea.trigger("select");
            // press enter to confirm input
            textArea.keyup(function(e) {
                if(e.keyCode === 13) {
                    cur.text(textArea.val());
                    submitListObj[toBeModifiedAttr] = textArea.val();
                    // reset to clickable state
                    lock = 0;
                }
            })
        })
    } else {
        let lock = 0;
        $(editElem).on('click', function() {
            // 0 represent unclicked, 1 represent clicked
            if(lock !== 0) return;

            lock = 1;
            let cur = $(this);
            // get current text
            let curText = cur.text();
            // get current height
            let curHeight = cur.height();
            // get current width
            let curWidth = cur.width();
            cur.empty();
            // create an input element
            let ipt = $("<input>");
            ipt.val(curText);
            ipt.width(curWidth);
            ipt.height(curHeight);
            cur.append(ipt);
            ipt.trigger("select");
            // press enter to confirm input
            ipt.keyup(function(e) {
                if(e.keyCode === 13) {
                    let modified = ipt.val();
                    let modifiedInput = modified.trim();
                    if(toBeModifiedAttr === 'year') {
                        // judge year input legality
                        let today = new Date();
                        let year = parseInt(modifiedInput);
                        if(isNaN(year) || year > today.getFullYear() || year <= 0) {
                            alert('Input invalid. Year cannot exceed this year. Sample: 2012');
                            return;
                        }
                    }
                    if(toBeModifiedAttr === 'score') {
                        // judge score input legality
                        let scoreTest = /^([0-5])(\.\d{1})$/;
                        if(!scoreTest.test(modifiedInput) || modifiedInput > 5) {
                            alert('Input invalid. score should be less than 5.0. Sample: 4.5');
                            return;
                        }
                    }
                    if(toBeModifiedAttr === 'price') {
                        let price = modifiedInput
                        let priceTest = /^([0-9]|[1-9]\d+)(\.[0-9]+)?$/;
                        if(price.charAt(0) !== '$' || !priceTest.test(price.split('$')[1])) {
                            alert('Input invalid. Sample: $4.55');
                            return;
                        }
                    }
                    cur.text(modifiedInput);
                    submitListObj[toBeModifiedAttr] = ipt.val();
                    // reset to clickable state
                    lock = 0;
                }
            })
        })
    }
}

function collectAllModifiesToSubmitListObj() {
    collectItem('.editTitle', 'title');
    collectItem('.editAuthor', 'author');
    collectItem('.editYear', 'year');
    collectItem('.editPublisher', 'publisher');
    collectItem('.editScore', 'score');
    collectItem('.editLanguage', 'language');
    collectItem('.editPrice', 'price');
    collectItem('.editSummary', 'summary');
    collectItem('.editGenre', 'genre');
}

function handleSubmit(submitListObj) {
    $.ajax({
        type: "POST",
        url: '/edit_data',
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(submitListObj),
        success: function(result){
            let all_data = result["data"]
            window.location.href = `/view/${all_data.id}`;
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    // initial default data
    initialGenre(data);

    initialSubmitListObj(data);

    // if press discard btn
    $("#editDiscard").click(function() {
        if(window.confirm('Are you sure to discard?')) {
            window.location.href = `/view/${data.id}`;
        }
    })

    // collect all modyfies to submit object
    collectAllModifiesToSubmitListObj();

    $("#editSubmit").click(function() {
        handleSubmit(submitListObj);
    })
})