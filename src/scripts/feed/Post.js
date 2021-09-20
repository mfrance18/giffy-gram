
export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p>${postObject.description}</p>
      <div class="buttons">
        <button id="edit--${postObject.id}">Edit</button>
        <button id="delete--${postObject.id}">Delete</button>
      </div>
      </section>
    `
}
