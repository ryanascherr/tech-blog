const submitBtn = $(".create-new-post");

let postID;
let postTitle;
let postContent;
//make async
submitBtn.click(async (e) => {
    e.preventDefault();
    
    if ($(".new-post-title").val() == "" || $(".new-post-content").val() == "") {
        alert("Please enter a title and text.")
        return;
    }

    const title = $(".new-post-title").val().trim();
    const content = $(".new-post-content").val().trim();

    console.log(title);
    console.log(content);

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    })

      
      const data = await response.json();
      document.location.replace(`/post/${data.id}`);
      // console.log(data);
    //This works, but not like it should. Need to look into this later.
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert("oops");
    //   }
})

$(".new-post-btn").click(function() {
    $(".edit-delete-post-parent").addClass("hidden");
    $(".new-post-parent").removeClass("hidden");
  })

$(".click").click(function() {
    postId = this.getAttribute('data-id');
    postTitle = this.getAttribute('data-title');
    postContent = this.getAttribute('data-content');
    $(".old-post-title").val(postTitle);
    $(".old-post-content").val(postContent);
    $(".all-posts").addClass("hidden");
    $(".edit-delete-post-parent").removeClass("hidden");
})

$(".delete-post").click(async (e) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({ postTitle, postContent }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
})

$(".update-post").click(async (e) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'UPDATE',
        body: JSON.stringify({ postTitle, postContent }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
})