function getPopularItems(data) {
    //empty old data
    $("#books_container").empty();

    //insert all new data
    $.each(data, function(i, item){
        let integer = item.price.split('.')[0];
        let float = item.price.split('.')[1];
        let star = (item.score / 5) * 100;
        let book_item= $(`<div class="col-md-4 bookItem" id="bookItem" data-index=${item.id}>
                            <div class="bookItemInner" id="bookItemInner">
                                <div class="bookHomeImg homebookHomeImg">
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