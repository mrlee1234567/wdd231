const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();
const jaar = today.getFullYear();

document.getElementById("lastModified").innerHTML = document.lastModified;

currentyear.innerHTML = `&copy;${jaar}`