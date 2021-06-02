const submitBtn = $(".create-new-post");

submitBtn.click(function(e) {
    e.preventDefault();
    
    if ($(".new-post-title").val() == "" || $(".new-post-content").val() == "") {
        alert("Please enter a title and text.")
        return;
    }

    const title = $(".new-post-title").val().trim();
    const content = $(".new-post-content").val().trim();

    console.log(title);
    console.log(content);

    const response = fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
    //This works, but not like it should. Need to look into this later.
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert("oops");
    //   }
})

$(".new-post-btn").click(function() {
    $(".new-post-parent").removeClass("hidden");
  })