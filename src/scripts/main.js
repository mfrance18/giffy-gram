import { getUsers, getPosts } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { showFooter } from "./footer/footerDisplay.js";

const applicationElement = document.querySelector(".giffygram")

//event listeners
applicationElement.addEventListener("click", event => {

    if (event.target.id === "logout") {  //logout button
        console.log("You just logged out")
    } else if (event.target.id === "navImg") {  // peanut butter jar img
        window.location.reload()
    } else if (event.target.id === "directMessageIcon") {  // pen icon
        alert("You have entered a message")
    } else if (event.target.id.startsWith("edit")) {      //edit button 
        console.log("post clicked", event.target.id.split("--"))
        console.log("the id is", event.target.id.split("--")[1])
    }
})

//functions for displaying to HTML
const showNavBar = () => {
    const navElement = document.querySelector("nav")
    navElement.innerHTML += NavBar()
}

const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const startGiffyGram = () => {
    showPostList();
    showNavBar()
    showFooter()
}


//start the website
startGiffyGram();