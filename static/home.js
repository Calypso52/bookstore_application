function getPopularItems(data) {
    //empty old data
    $("#books_container").empty();

    //insert all new data
    $.each(data, function(i, item){
        let book_item= $(`<div class="col-md-4 bookItem" id="bookItem" data-index=${item.id}>
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
    })
}

// jump to the target book interface
function handleItemClick(id) {
    window.location.href = `/view/${id}`;
}

$(document).ready(function(){
    // when the page loads, get 3 most popular books
    getPopularItems(data);
    // handle book item click event
    $('#books_container').on('click', '#bookItem', function() {
        let idClicked = $(this).attr("data-index");
        handleItemClick(idClicked);
    })
})