function getSearchResult(result, input) {
    // show what the search text was
    if(Object.keys(result).length) {
        $("#search_content_display").html(`Showing ${result.length} Results for "${input}"`);
    } else {
        $("#search_content_display").html('No results found');
    }
    
    //empty old data
    $("#books_container").empty();
    //insert all new data
    $.each(result, function(i, item){
        let book_item= $(`<div class="col-md-3 bookItem" id="bookItem" data-index='${item.id}'>
                            <div class="bookHomeImg">
                                <img src="${item.coverImage}" alt="bookCover">
                            </div>
                            <div class="bookHomeInfo">
                                <div class="bookHomeTitle">${item.title}</div>
                                <div class="bookHomeAuthor">${item.author}</div>
                                <div class="bookHomePrice">${item.price}</div>
                                <div class="bookHomeGenre">${item.genre}</div>
                                <div class="bookHomeScore">${item.score}</div>
                            </div>
                        </div>`);
        $("#books_container").append(book_item);
    });
}

function handleHighlight(input) {
    let books_container = $('#books_container');
    books_container.unhighlight();
    books_container.highlight(input);
}

$(document).ready(function(){
    // when the page loads, get items to be displayed by url params
    getSearchResult(result, input);
    // handle highlight
    handleHighlight(input);
    // handle jump link to specific page
    $('#books_container').on('click', '#bookItem', function() {
        let curId = $(this).attr('data-index');
        // jump to the target url
        window.location.href = `/view/${curId}`;
    })
})