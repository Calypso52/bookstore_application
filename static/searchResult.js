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
        let integer = item.price.split('.')[0];
        let float = item.price.split('.')[1];
        let star = (item.score / 5) * 100;
        let book_item= $(`<div class="col-md-3 bookItem" id="bookItem" data-index='${item.id}'>
                            <div class="bookItemInner" id="bookItemInner">
                                <div class="bookHomeImg resultbookHomeImg">
                                    <img src="${item.coverImage}" alt="bookCover">
                                </div>
                                <div class="bookHomeInfo">
                                    <div class="bookHomeTitle">${item.title}</div>
                                    <div class="bookHomeAuthor">${item.author}</div>
                                    <div class="bookHomePrice"><span class="bookHomePriceInteger">${integer}</span>&nbsp;${float}</div>
                                    <div class="bookHomeGenre">${item.genre}</div>
                                    <div class="bookHomeScore">
                                        <div class="grade-progress-box">
                                            <div class="grade-star-bg">
                                                <div class="grade-star-gradual">
                                                    <span class="progress" id="progress" style="width: ${star}%;"></span>
                                                    <!-- 镂空星星图 -->
                                                    <div class="grade-star-img bgsize"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>&nbsp;&nbsp;&nbsp;${item.score}</div>
                                    </div>
                                </div>
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