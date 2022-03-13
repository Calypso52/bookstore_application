// send request to server to get search result function
function getTargetBooks() {
    // get search content
    let bookName = $("#topInput").val();
    // Check if input is empty or all whitespaces
    let checkInput = bookName;
    
    // check input
    if(checkInput.trim().length === 0) {
        alert('Input is empty or all whitespaces. Please check your input.');
        $("#topInput").val("");
        $("#topInput").focus();
        return;
    }

    // jump to the target url
    window.location.href = `/search_results/${checkInput}`;
}

$(document).ready(function(){
    // if click search button
    $("#topSearch").click(function(){
        getTargetBooks();
    })

    // if press enter
    $("#topInput").keyup(function(e){
        if(e.keyCode === 13) {
            getTargetBooks();
        }
    })
})