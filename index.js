const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const bgProgress = document.querySelector(".bg-progress");
const progressPercent = document.querySelector("#progressPercent");
const progressContainer = document.querySelector(".progress-container")
const progressBar = document.querySelector(".progress-bar")

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log("dropped", e.dataTransfer.files[0].name);
  if (e.dataTransfer.files.length) {
    fileInput.files = e.dataTransfer.files;
    uploadFile();
  }
  dropZone.classList.remove("dragged");
});
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragged");

  // console.log("dropping file");
});

dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");

  console.log("drag ended");
});

// file input change and uploader
fileInput.addEventListener("change", () => {
  uploadFile();
});

const uploadFile = () => {

  console.log("file added uploading");

  files = fileInput.files;
  const formData = new FormData();
  formData.append("myfile", files[0]);

  //show the uploader
  progressContainer.style.display = "block"


  // upload file
  const xhr = new XMLHttpRequest();

  // listen for upload progress
  xhr.upload.onprogress = function (event) {
    let percent = Math.round((100 * event.loaded) / event.total);
    progressPercent.innerText = percent;
    const scaleX = `scaleX(${percent / 100})`
    bgProgress.style.transform = scaleX; 
    progressBar.style.transform = scaleX; 
  };

  // handle error
  xhr.upload.onerror = function () {
    console.log(`Error during the upload: ${xhr.status}.`);
  };

  // listen for response which will give the link
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      fileInput.value = '';
      console.log(xhr.responseText);
    }
  };

  xhr.open("POST", "http://localhost:3000/api/files");
  xhr.send(formData);
};
