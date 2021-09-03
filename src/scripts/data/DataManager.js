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

export const getPosts = () => {

	return fetch("http://localhost:8088/posts")
		.then(response => response.json())
}

