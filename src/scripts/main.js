import { getUsers, getPosts } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { showFooter } from "./footer/footerDisplay.js";

const applicationElement = document.querySelector(".giffygram")

//event listeners
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout"){
        console.log("You just logged out")
    } else if (event.target.id === "navImg"){
        window.location.reload()
    } else if (event.target.id === "directMessageIcon"){
        alert("You have entered a message")
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