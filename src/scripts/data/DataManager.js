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

export const getPosts = () => {
	return fetch("http://localhost:8088/posts")
		.then(response => response.json())
		.then(parsedResponse => {
			postCollection = parsedResponse
			return parsedResponse;
		  })
}

