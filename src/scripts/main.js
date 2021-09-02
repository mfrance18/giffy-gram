import { getUsers } from "./data/DataManager.js";

// const allUsers = getUsers().then(apiUsers => {
//     console.log("now we can console the users", apiUsers)
// })


const startGiffyGram = () => {
    const postElement = document.querySelector(".postList");
	postElement.innerHTML = "Hello Cohort 51"
}
// Are you defining the function here or invoking it?
startGiffyGram();

getUsers()
.then(data => {
    console.log("User Data", data)
})