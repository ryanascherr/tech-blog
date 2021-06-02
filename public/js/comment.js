const submitBtn = $(".comment-submit-btn");
const btnID = submitBtn.data('id');
console.log(btnID);

submitBtn.click(function(e) {
    e.preventDefault();

    if ($(".comment-field").val() == "") {
        alert("Please enter some text.");
        return;
    }

    const content = $(".comment-field").val().trim();

    const response = fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, btnID }),
        headers: { 'Content-Type': 'application/json' }
    });

    document.location.reload();

    //   if (response.ok) {
        // document.location.replace('/');
//       } else {
//         alert("oops");
//       }
})