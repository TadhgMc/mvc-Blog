const newCommentHandler = async (event) => {
    event.preventDefault();
    console.log('start posting comment')
    const comment = document.querySelector('#comment-desc').value.trim();
    const post_ids = window.location.toString().split('/');
    const post_id = post_ids[4];
    if (comment && post_id) {
      const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({ comment, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to create comment!');
      };
    };
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);