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
    .then(response => response.json())
}



