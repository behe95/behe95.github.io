// Image Uplaod

// let loadImg=document.querySelector('#imgLoad');
// loadImg.addEventListener('change',fileLoad);

// function fileLoad(event){
//     let outputImg=document.getElementById('output');
//     outputImg.src=URL.createObjectURL(event.target.files[0]);
// }

let loadImg=document.querySelector('#imgLoad');
loadImg.addEventListener('change',fileLoad);

function fileLoad(event){
  var getImagePath = URL.createObjectURL(event.target.files[0]);
  console.log(getImagePath);
  $('.side').css('background-image', 'url(' + getImagePath + ')');

}
/// 3d view

let threed=document.getElementById("first");

threed.addEventListener('change',change3d);

function change3d(e){
    let val=e.target.value;
    let img3d_1=document.getElementById("block_nth_1");
    let img3d_2=document.getElementById("block_nth_2");
    if (e.target.checked == true){
        img3d_1.classList.add('main_1');
        img3d_2.classList.add('left');
    } else {

        img3d_1.classList.remove('main_1');
        img3d_2.classList.remove('left');
    }

}
function image_3d_move(value) {
	document.getElementById('block_nth_1').style.transform="rotateY(" + value + "deg)";
	document.getElementById('block_nth_2').style.transform="rotateY(" + value + "deg)";
	document.getElementById('block_nth_1').style.transformStyle="preserve-3d";
	document.getElementById('block_nth_2').style.transformStyle="preserve-3d";
    document.getElementById('block_nth_1').style.transition="all 4s cubic-bezier(0.49, 0.01, 0.2, 0.99) 0s";
	document.getElementById('block_nth_2').style.transition="all 4s cubic-bezier(0.49, 0.01, 0.2, 0.99) 0s";
    document.getElementById('block_nth_1').style.width="60%";
    document.getElementById('block_nth_2').style.width="6%";
  }

// // rotates landscape and portland
// let rotateChange=document.getElementById("rotateChange");
// rotateChange.addEventListener('click',rotateChanges);
// function rotateChanges(e){
//     let val=e;
//     console.log(val)
//     let img3d=document.getElementById("output");
//         img3d.classList.add('rotateChange');
// }


// width Image
let widthImg=document.querySelectorAll(".widthImg");
console.log(widthImg)
for (let i = 0; i < widthImg.length; i++) {
    widthImg[i].addEventListener('click',widthRange);
function widthRange(e){
    let val=e.target.value;
    console.log(val)
    let widthtext=document.getElementById("widthText")
    widthtext.textContent=val;
    let img3d=document.getElementById("view_image_area");
    let width=val*1;// 1 inchis=96 px
    img3d.style.width=width+"px";
}
}


// height Image
let heightImg=document.querySelectorAll(".heightImg");
console.log(heightImg)
for (let i = 0; i < heightImg.length; i++) {
    heightImg[i].addEventListener('click',heightRange);
    function heightRange(e){
        let val=e.target.value;
        console.log(val)
        let heightText=document.getElementById("heightText")
        heightText.textContent=val;
        let img3d=document.getElementById("output");
        let width=val*1;// 1 inchis=96 px
        img3d.style.height=width+"px";
    }
}
// ZOOM FUNCTION START
function img_zoom_effect(){
    var zoomer_back = document.getElementById('zoomer');
    let zoom_img = document.getElementById("view_image_area");
        zoom_img.style.transform = "scale(1)";
        zoomer_back.value="0";
}
// ZOOM WITH RANGER SLIDER START
var zoomer = document.getElementById('zoomer');
var hubblepic = document.getElementById('view_image_area');

function deepdive(){ 
    zoomlevel = zoomer.valueAsNumber;
    hubblepic.style.webkitTransform = "scale("+zoomlevel+")";
    hubblepic.style.transform = "scale("+zoomlevel+")";
}
// ZOOM WITH RANGER SLIDER END
// ZOOM FUNCTION END
// PHOTO WRAP FUNCTION START
function img_photo_wrap_effect(){
    let photo_wrap_main = document.getElementById("block_nth_1");
    let photo_wrap_left = document.getElementById("block_nth_2");
    photo_wrap_main.classList.toggle("main_1");
    photo_wrap_left.classList.toggle("left");
}
// PHOTO WRAP FUNCTION END
// ROTATE FUNCTION START
// function img_rotate_effect(){
//     let rotate_img = document.getElementById("output");
//     if (rotate_img.style.transform === "rotate(0deg)"){
//         rotate_img.style.transform = "rotate(-90deg)";
//     }else{
//         rotate_img.style.transform = "rotate(0deg)";
//     }
// }
// ROTATE FUNCTION END

// MIRROR FUNCTION START
function img_mirror_effect(){
    let mirror_img = document.getElementById("block_nth_1");
    let mirror_img_2 = document.getElementById("block_nth_2");
    if(mirror_img.style.transform=== "scaleY(1)"){
        mirror_img.style.transform="scaleY(-1)";
        mirror_img_2.style.transform="scaleY(-1)";
    }else{
        mirror_img.style.transform="scaleY(1)";
        mirror_img_2.style.transform="scaleY(1)";
    }

}
// MIRROR FUNCTION END

// BLUR FUNCTION START
function img_blur_effect(){
    let blur_img = document.getElementById("block_nth_2");
    if (blur_img.style.filter === "blur(0px)"){
        blur_img.style.filter = "blur(6px)";
    }else{
        blur_img.style.filter= "blur(0px)";
    }
}
// BLUR FUNCTION END
// BLACK FUNCTION START
function img_black_effect(){
    // let val=e.target.value;
    let black_img = document.getElementById("block_nth_2");
        black_img.style.background="black";
        document.getElementById("patternImg").style.visibility="hidden";

}

// BLACK FUNCTION END
// WHITE FUNCTION START
function img_white_effect(){
    let white_img = document.getElementById("block_nth_2");
        white_img.style.background = "white";
        white_img.style.filter = "brightness(100%)";
        document.getElementById("patternImg").style.visibility="hidden";
}
// WHITE FUNCTION END
// PATTERN IMAGE FUNCTION START
document.getElementById("patternBtn").addEventListener('click',function(e){
    let val=this.children[0];
    val=val.getAttribute('src');
    document.getElementById("patternImg").setAttribute('src',val);
    document.getElementById("patternImg").style.visibility="visible";
    document.getElementById("block_nth_2").style.background="transparent";
    console.log(val)
    })

    document.getElementById("patternBtn_2").addEventListener('click',function(e){
        let val=this.children[0];
        val=val.getAttribute('src');
        document.getElementById("patternImg").setAttribute('src',val);
        document.getElementById("patternImg").style.visibility="visible";
        console.log(val)
        })

// PATTERN IMAGE FUNCTION END
//solid Color
document.getElementById("solidColor").addEventListener('change',function(e){
    let colorVal=e.target.value;
    let white_img = document.getElementById("block_nth_2");
    console.log(colorVal)
    white_img.style.background = colorVal;
    white_img.style.filter = "brightness(100%)";
    
 })
 
//rotateChange

document.getElementById("rotateImg").addEventListener('click',function(e){
    var actualImage = new Image();
actualImage.src = $('#block_nth_2').css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "");

actualImage.onload = function() {
    widths = this.width;
    heights = this.height;

    wid(widths,heights)   
}
function wid(widths,heights){
    console.log(widths);
    console.log(heights);
    
let white_img = document.getElementById("block_nth_2");  
white_img.style.height=widths+"px";
white_img_2.style.width=heights+"px";
} 
})