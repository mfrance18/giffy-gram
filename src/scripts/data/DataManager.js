const loggedInUser = {
	id: 1,
	name: "Matt",
	date: 1630513816281,
	email: "trumpetman072392@aol.com"
}

export const getLoggedInUser = () => {
	return loggedInUser;
}

export const getUsers = () => {

	return fetch("http://localhost:8088/users")
		// this is translating javascript can read it
		.then(response => response.json())
}

let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
//GETS ALL POSTS
export const getPosts = () => {
	return fetch("http://localhost:8088/posts")
		.then(response => response.json())
		.then(parsedResponse => {
			postCollection = parsedResponse
			return parsedResponse;
		  })
}
// GETS A SINGLE POST
export const getSinglePost = (postId) => {
	return fetch(`http://localhost:8088/posts/${postId}`)
	  .then(response => response.json())
  }
// ALLOWS US TO CREATE POST
export const createPost = postObj => {
	return fetch("http://localhost:8088/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(postObj)
  
	})
		.then(response => response.json())
  }
//FUNCTION TO DELETE POST
  export const deletePost = postId => {
	return fetch(`http://localhost:8088/posts/${postId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
  
	})
		.then(response => response.json())
  }
//THIS MAKES THE UPDATE BUTTON WORK
  export const updatePost = postObj => {
	return fetch(`http://localhost:8088/posts/${postObj.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(postObj)
  
	})
		.then(response => response.json())
		
  }
