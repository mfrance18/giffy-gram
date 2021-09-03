import { Footer } from "./footerData.js";


export const showFooter =  () => {
    const footerElement = document.querySelector(".footer")
    footerElement.addEventListener("change", event => {
        if (event.target.id === "yearSelection") {
          const yearAsNumber = parseInt(event.target.value)
      
          console.log(`User wants to see posts since ${yearAsNumber}`)
        }
      })
      footerElement.innerHTML += Footer()
}