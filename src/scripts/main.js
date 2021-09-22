import {
    getUsers, registerUser, loginUser, setLoggedInUser, logoutUser, getLoggedInUser,
    getPosts, usePostCollection, createPost, deletePost, getSinglePost, 
    updatePost, postLike
} from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { showFooter } from "./footer/footerDisplay.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";



//functions for displaying to HTML
const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
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

const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}

const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        //this is expecting an object. Need to fix
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        //show login/register
        showLoginRegister()
    }
}

const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}



// click event listeners
const applicationElement = document.querySelector(".giffygram")


applicationElement.addEventListener("click", event => {

    if (event.target.id === "logout") {  //logout button
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
    } else if (event.target.id === "navImg") {  // peanut butter jar img
        window.location.reload()
    } else if (event.target.id === "directMessageIcon") {  // pen icon
        alert("You have entered a message")
    } else if (event.target.id.startsWith("edit")) {      //edit button 
        const postId = event.target.id.split("--")[1];
        getSinglePost(postId)
            .then(response => {
                showEdit(response);
            })
    }
})

///////////////////LOGIN BUTTON EVENT LISTENER////////////////////

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "login__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
            .then(dbUserObj => {
                if (dbUserObj) {
                    sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                    startGiffyGram();
                } else {
                    //got a false value - no user
                    const entryElement = document.querySelector(".entryForm");
                    entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                }
            })
    }
})

//////////////////REGISTER BUTTON EVENT LISTENER////////////////////////

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "register__submit") {
        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='registerName']").value,
            email: document.querySelector("input[name='registerEmail']").value
        }
        registerUser(userObject)
            .then(dbUserObj => {
                sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                startGiffyGram();
            })
    }
})

/////////////////////CANCEL BUTTON TO CLEAR FORM EVENT LISTENER//////////////////

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        showPostEntry()
    }
})

///////////////SAVE BUTTON EVENT LISTENER ////////////////////

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        const user = JSON.parse(sessionStorage.getItem("user"))

        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: user.id,
            timestamp: Date.now()
        }
        console.log(postObject, "user")
        // be sure to import from the DataManager
        createPost(postObject)
            .then(dataBase => {
                showPostList()
                showPostEntry()
            })
    }
})


////////////////////DELETE BUTTON EVENT LISTENER////////////////////

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("--")[1];
        deletePost(postId)
            .then(response => {
                showPostList();
            })
    }
})

////////////////////////UPDATE BUTTON EVENT LISTENER////////////////

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("--")[1];
        //collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value

        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }

        updatePost(postObject)
            .then(response => {
                showPostList();
                showPostEntry()
            })
    }
})

//////////////LIKEBUTTON EVENT LISTERNER///////////////////

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("like")) {
	  const likeObject = {
		 postId: parseInt(event.target.id.split("__")[1]),
		 userId: getLoggedInUser().id
	  }
	  postLike(likeObject)
		.then(response => {
		  showPostList();
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



const startGiffyGram = () => {
    showPostList();
    showNavBar()
    showFooter()
    showPostEntry()
}

checkForUser()

//start the website
// startGiffyGram();