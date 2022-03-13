// verify input
function verifyInput(obj) {
    // judge whether no input
    try {
        Object.getOwnPropertyNames(obj).forEach(function(key) {
            if(obj[key].length === 0) {
                $(`.${key}`).css('border', '1px solid red');
                $(`.${key}`).focus();
                throw new Error();
            }
        })
    } catch(e) {
        return false;
    }

    // judge url input legality
    let urlTest = /^https?:\/\/([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+/;
    if(!urlTest.test(obj.bookCoverInput)) {
        sertErrorAlert('bookCoverInput');
        return false;
    }
    
    // judge year input legality
    let today = new Date();
    let year = parseInt(obj.bookYearInput);
    if(isNaN(year) || year > today.getFullYear() || year <= 0) {
        sertErrorAlert('bookYearInput');
        return false;
    }

    // judge price input legality
    let price = obj.bookPriceInput
    let priceTest = /^([0-9]|[1-9]\d+)(\.[0-9]+)?$/;
    if(price.charAt(0) !== '$' || !priceTest.test(price.split('$')[1])) {
        sertErrorAlert('bookPriceInput');
        return false;
    }

    // judge score input legality
    let scoreTest = /^([0-5])(\.\d{1})$/;
    if(!scoreTest.test(obj.bookScoreInput) || obj.bookScoreInput > 5) {
        sertErrorAlert('bookScoreInput');
        return false;
    }

    return true;
}

// set alarm info function
function sertErrorAlert(cls) {
    $(`.${cls}`).css('border', '1px solid rgb(255, 0, 0)');
    $(`.${cls}`).focus();
}

// clear all inputs and focus on the first input
function clearAll() {
    $(".bookTitleInput").val('');
    $(".bookAuthorInput").val('');
    $(".bookCoverInput").val('');
    $(".bookYearInput").val('');
    $(".bookPriceInput").val('');
    $(".bookScoreInput").val('');
    $(".bookLanguageInput").val('');
    $(".bookPublisherInput").val('');
    $(".bookGenreInput").val('');
    $(".bookSummaryInput").val('');
    $(".bookTitleInput").focus();
}

function handleSubmit() {
    let form = $('#addDataForm');
    let formContent = form.serializeArray();
    const contentObj = new Object();
    // get trimmed inputs
    for(let item of formContent) {
        let key = item.name;
        let input = item.value;
        let trimInput = input.trim();
        contentObj[key] = trimInput;
    };

    let verifyResult = verifyInput(contentObj);
    if(verifyResult === false) return;

    $.ajax({
        type: "POST",
        url: '/add_data',
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(contentObj),
        success: function(result){
            let all_data = result["data"]
            if(all_data && all_data.id && all_data.id.length) {
                $("#topHandleBox").css('visibility', 'visible');
            }

            // clear all inputs and focus on the first input
            clearAll();

            // jump to preview page
            let curAddItemId = all_data.id;
            $("#previewBtn").click(function() {
                window.location.href = `/view/${curAddItemId}`;
            })
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
    // handle submit form
    $('#submitBtn').click(function(e) {
        e.preventDefault();
        handleSubmit();
    });

    // clear alarm info of a input
    $('.addInput').keyup(function() {
        let curInput = $(this).attr('name');
        if($(`.${curInput}`).css('border') === '1px solid rgb(255, 0, 0)') {
            $(`.${curInput}`).css('border', '1px solid rgb(206, 212, 218)')
        }
    });

    // close top handle box
    $(".topClose").click(function() {
        $("#topHandleBox").css('visibility', 'hidden');
    });
})