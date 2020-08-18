const dropZone = document.querySelector(".drop-zone")
const fileInput = document.querySelector("#fileInput")
const browseBtn = document.querySelector("#browseBtn")

browseBtn.addEventListener('click', ()=>{
    fileInput.click()
})

dropZone.addEventListener("drop", (e)=>{
    e.preventDefault()
    console.log("dropped", e.dataTransfer.files[0].name);
    dropZone.classList.remove("dragged")

})
dropZone.addEventListener("dragover", (e)=>{
    e.preventDefault()
    dropZone.classList.add("dragged")

    // console.log("dropping file");
})


dropZone.addEventListener("dragleave", (e)=>{
    dropZone.classList.remove("dragged")

    console.log("drag ended");
})

