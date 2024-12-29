
let carousel=document.querySelector(".carousel");
firstimg= carousel.querySelectorAll("img")[0];
let arrowicons=document.querySelectorAll(".wrapper i");

let isDragStart=false , prevPageX, prevScrollLeft;
let firstimgwidth = firstimg.clientWidth + 14;

arrowicons.forEach(icon=> {
    icon.addEventListener("click",()=>{
        carousel.scrollLeft += icon.id =="left"?-firstimgwidth:firstimgwidth;
    })
});

let dragstart=(e)=>{
    isDragStart=true;
    prevPageX=e.pagex;
    prevScrollLeft= carousel.scrollLeft;
}

let dragging=(e)=>{
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging")
    let positionDiff = e.pagex-prevPageX;
    carousel.scrollLeft=prevScrollLeft-positionDiff;
}

let dragstop=()=>{
    isDragStart=false;
    carousel.classList.remove("dragging")
}

carousel.addEventListener("mousedown",dragstart);
carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mouseup",dragstop);

//animation of main page img

// let img=document.querySelector("#mainimg");
// console.log(img);

// let img1=document.querySelector("#img1");
// let img2=document.querySelector("#img2");
// let img3=document.querySelector("#img3");
// let img4=document.querySelector("#img4");

// console.log(img1);

// function changeImage(filename){
//     img.setAttribute("src",filename);
// }

function swapImage(clickedImg) {
   
    let heroImg = document.getElementById('mainimg');

    // Update the hero image src with the clicked image src
    heroImg.src = clickedImg.src;

    // Add the animation class
    heroImg.classList.add('swap');

    // Remove the animation class after the animation completes
    setTimeout(() => {
        heroImg.classList.remove('swap');
    }, 400); // Match this duration with the CSS animation duration
}


// Menu card Javascript And Add to Cart 








