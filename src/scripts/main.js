import { getUsers, getPosts, usePostCollection } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { showFooter } from "./footer/footerDisplay.js";

const applicationElement = document.querySelector(".giffygram")

// click event listeners
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

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        showFilteredPosts(yearAsNumber)
    }
})

//functions for displaying to HTML
const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`)
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList")
    postElement.innerHTML = PostList(filteredData)
}



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