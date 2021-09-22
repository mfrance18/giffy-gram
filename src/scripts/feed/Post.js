import { getLikes } from "../data/DataManager.js"

const getNumberOfLikes = (postId) => {
	getLikes(postId)
		.then(response => {
			const userPost = JSON.parse(sessionStorage.getItem("user"))
			document.querySelector(`#myLikes__${postId}`).innerHTML = `👍 ${response.length}`;
			const getResults = response.find(({userId}) => userId === userPost.id)
			if(getResults === undefined){
				document.getElementById(`likeButton__${postId}`).innerHTML = `<button id="like__${postId}">Like</button>`
			}
		})
}


export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
      <div>
      <h4>Posted By: ${postObject.user.name}</h4>
      <p id="myLikes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
      <div class="allButtons">
        <div id="likeButton__${postObject.id}"></div>
        <div id="editButton__${postObject.id}"><button id="edit--${postObject.id}">Edit</button></div>
        <div id="deleteButton__${postObject.id}""><button id="delete--${postObject.id}">Delete</button></div>
        </div>
      </div>
      </section>
    `
}
