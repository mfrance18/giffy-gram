import { getUsers, getPosts, usePostCollection, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { showFooter } from "./footer/footerDisplay.js";
import { PostEntry } from "./feed/PostEntry.js";

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
    } else if (event.target.id === "newPost__submit") {
        //clear the input fields
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
  })
  
  //SAVE BUTTON FUNCTION TO POST 
  applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
          title: title,
          imageURL: url,
          userId: 1,
          description: description,
          timestamp: Date.now()
      }
  
    // be sure to import from the DataManager
        createPost(postObject)
        .then(dataBase => {
            showPostList()
        })
    }
  })


//FILTER BY YEAR IN FOOTER
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        console.log(`User wants to see posts since ${yearAsNumber}`)
        showFilteredPosts(yearAsNumber)
    }
})


//functions for displaying to HTML
const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
  }


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
        postElement.innerHTML = PostList(allPosts.reverse());
    })
}

const startGiffyGram = () => {
    showPostList();
    showNavBar()
    showFooter()
    showPostEntry()
}


//start the website
startGiffyGram();