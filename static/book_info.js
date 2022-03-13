// append genres
function initialGenre(data) {
    let genre = data.genre;
    //insert all new genre data
    $.each(genre, function(i, item){
        let book_item= $(`<li>${item}</li>`);
        $("#book_genre").append(book_item);
    })
}

$(document).ready(function(){
    // when the page loads, get genres
    initialGenre(data);
    $("#editJump").click(function() {
        window.location.href = `/edit/${data.id}`;
    });
})