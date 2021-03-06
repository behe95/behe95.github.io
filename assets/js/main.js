// html2canvas(document.body, {
//     onrendered: function (canvas) {
//         document.body.appendChild(canvas)
//     },
//     scale: 5
// })

//canvas
const main__canvas = document.getElementById('main__canvas');
const main__ctx = main__canvas.getContext('2d');

const preview__image__canvas = document.getElementById('preview__image__canvas');
const preveiw__image__context = preview__image__canvas.getContext('2d');

//canvas edit btn
const edit__canvas__btn = document.getElementById('edit__canvas__btn');
let isEditCanvasName = false;
edit__canvas__btn.addEventListener('click', handleEditCanvasBtn);

const custom__canvas__name = document.getElementById('custom__canvas__name');
const custom__canvas__name__input = document.getElementById('custom__canvas__name__input');
custom__canvas__name__input.addEventListener('input', customCanvasNameInputChangeHandler);
let custom__canvas__name__text = "";


//3d init
let camera, scene, renderer, geometry, texture, mesh;
const main__canvas__holder = document.getElementById('main__canvas__holder');

let width = main__canvas__holder.offsetWidth;
let height = main__canvas__holder.offsetHeight;

let radians = 10 * Math.PI / 180
// let size = 350;

function init3d() {
    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer( { antialias: true,
        preserveDrawingBuffer: true,
        alpha:true} ); 
    // renderer.setClearColor( 0x000000, 0 );
    renderer.setClearColor( 0xf9f8f8, 1 );

    renderer.setSize(width, height);
    // document.getElementById('main__canvas__holder').appendChild(renderer.domElement);
    renderer.setPixelRatio( window.devicePixelRatio );
    
  scene = new THREE.Scene();
  
    camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 400;
    scene.add(camera);

    texture = new THREE.Texture(main__canvas);

    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;

    var material = new THREE.MeshBasicMaterial({ map: texture });
    geometry = new THREE.BoxGeometry( 350, 350, 50 );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // main__canvas.width = main__canvas.height = size;
}




//image upload
const imgLoadInput = document.getElementById('imgLoad');
imgLoadInput.addEventListener('input', imgLoadInputHandler);

let singleImageFile = null;
let singleImage = new Image();
let singleImageFileReader = new FileReader();

let isSingleImageLoaded = false;

const cancelCanvasPhotoUploadBtn = document.getElementById('cancel__canvas__photo__upload');

cancelCanvasPhotoUploadBtn.addEventListener('click', cancelCanvasPhotoUploadHandler);


//canceling image
function cancelCanvasPhotoUploadHandler() {
    isSingleImageLoaded = false;
    singleImageFile = null;
    singleImage = new Image();
    singleImageFileReader = new FileReader();



    document.getElementById('photo__upload__area__components__holder').classList.remove('hide__component');
    document.getElementById('preview__image__canvas__holder').classList.remove('d-flex');
    document.getElementById('preview__image__canvas__holder').classList.remove('justify-content-between');
    document.getElementById('preview__image__canvas__holder').classList.add('hide__component');
}

//image uploading
function imgLoadInputHandler(e) {
    singleImageFile = e.target.files[0];
    singleImageFileReader.readAsDataURL(singleImageFile);

    document.getElementById('photo__upload__area__components__holder').classList.add('hide__component');
    document.getElementById('preview__image__canvas__holder').classList.remove('hide__component');
    document.getElementById('preview__image__canvas__holder').classList.add('d-flex');
    document.getElementById('preview__image__canvas__holder').classList.add('justify-content-between');
    document.getElementById('preview__image__name').innerText = singleImageFile.name;

}



//image rotation
const threeDSwitch = document.getElementById('first');
threeDSwitch.addEventListener('input', threeDSwitchHandler);
let isThreeDEnabled = false;
const rotateImgBtn = document.getElementById('rotateImg');
rotateImgBtn.addEventListener('click', rotateImageHandler);

let isRotateImage = false;
let rotateDegree = 0;

function threeDSwitchHandler(e) {
    if (e.target.checked){
        document.getElementById('main__canvas').hidden = true;
        document.getElementById('main__canvas__holder').appendChild(renderer.domElement);

        return isThreeDEnabled = true;
    }
    document.getElementById('main__canvas__holder').removeChild(renderer.domElement);
    document.getElementById('main__canvas').hidden = false;

    isThreeDEnabled = false;
}

function rotateImageHandler() {
    isRotateImage = true;
    if (rotateDegree !== -360) {
        return rotateDegree -= 90;
    }
    rotateDegree = 0;
}

function rotateImage(source,x,y,w,h,deg){
    deg = deg>360?deg%360:(deg<0?360+(deg%360):deg);
    
    var rad = deg*Math.PI/180;
    var _rad = (deg%90)*Math.PI/180;
    
    var i= {
      w : w * Math.cos(_rad) + h * Math.sin(_rad),
      h : w * Math.sin(_rad) + h * Math.cos(_rad)
    };
    if(((deg/90)|0)%2){
      var t = i.w;
      i.w = i.h;
      i.h = t;
    }
    i.x = (i.w - w) / 2;
    i.y = (i.h - h) / 2;
    
    // console.log('i',i);
    
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext("2d");
    
    cvs.width = i.w;
    cvs.height = i.h;
    ctx.translate(i.w/2, i.h/2);
    ctx.rotate(rad);
    ctx.drawImage(source,x,y,w,h,-i.w/2+i.x,-i.h/2+i.y,w,h);
    return cvs;
  }




// zoom controller
const zoomSlider = document.getElementById('zoomer');
let zoomScaleValue = 1;

zoomSlider.addEventListener('input', zoomHandler);

function zoomHandler(e) {
    zoomScaleValue = e.target.value;
}

//reset zoom
const resetZoomBtn = document.getElementById('reset__zoom');
resetZoomBtn.addEventListener('click', (e) => zoomScaleValue = 1);

//3d rotate around Y axis with perspective
const threeDControlerSlider = document.getElementById('three_d_controler');

threeDControlerSlider.addEventListener('input', threeDControlerHandler);

function threeDControlerHandler(e) {
    console.log(e.target.value);
    radians = e.target.value * Math.PI / 180
}



  //drawing image on canvas 
function drawImageScaled(img, ctx) {
    let canvas = ctx.canvas ;
   let hRatio = canvas.width  / img.width    ;
   let vRatio =  canvas.height / img.height  ;
   let ratio  = Math.min ( hRatio, vRatio );
   let centerShift_x = ( canvas.width - img.width*ratio ) / 2;
   let centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
   ctx.clearRect(0,0,canvas.width, canvas.height);

   //blurr background
    main__ctx.shadowBlur = 5;
    main__ctx.shadowColor = "#000000";
    main__ctx.fillStyle = "#ffffff";
    main__ctx.fillRect(0, 0, img.width, img.height);

   //zoom controlling
   ctx.transform(zoomScaleValue,0,0,zoomScaleValue,-(zoomScaleValue-1)*canvas.width/2,-(zoomScaleValue-1)*canvas.height/2)


//    const angle1 = 3 * Math.PI/180;
//     const angle2 = 3 * Math.PI/180;

//     var cs = Math.cos(angle1), sn = Math.sin(angle1);
//     var h = Math.cos(angle2);
//     var a = 100*cs, b = -100*sn, c = 200;
//     var d = h*100*sn, e = h*100*cs, f = 200;
//     main__ctx.setTransform(a, d, b, e, c, f);

   //draw image on context
   ctx.drawImage(img, 0,0, img.width, img.height,
                      centerShift_x,centerShift_y,img.width*ratio, img.height*ratio); 
    preveiw__image__context.clearRect(0,0,preview__image__canvas.width, preview__image__canvas.height);
    preveiw__image__context.drawImage(img, 0,0, img.width, img.height,
        centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);

    //rotate image and draw
    // if(isRotateImage){
        let rotated = rotateImage(canvas,0,0,canvas.width,canvas.height,rotateDegree);
        canvas.width  = rotated.width ;
        canvas.height = rotated.height;
        ctx.drawImage(rotated,0,0,rotated.width,rotated.height,0,0,rotated.width,rotated.height);
    // }

    // cube.rotation.y += 0.01;

    
    

}





function handleEditCanvasBtn(e){
    isEditCanvasName = !isEditCanvasName;
    if (isEditCanvasName) {
        custom__canvas__name.classList.add('hide__component');
        custom__canvas__name__input.classList.remove('hide__component');
        custom__canvas__name__input.focus();
    }else{
        custom__canvas__name.classList.remove('hide__component');
        custom__canvas__name__input.classList.add('hide__component');
    }

    custom__canvas__name.innerText = custom__canvas__name__text ? custom__canvas__name__text : 'My beautiful canves';
}

function customCanvasNameInputChangeHandler(e) {
    custom__canvas__name__text = e.target.value;
}


//animate infinite loop
function animate() {
    requestAnimationFrame(animate);
    // console.log('hey');
    // if(singleImageFile) {
        singleImageFileReader.onload = function () {
            singleImage.src = singleImageFileReader.result;
            // singleImage.onload = function () {
            //     isSingleImageLoaded = true;
            // };        
        }
    // }
    // if (isSingleImageLoaded) {
        drawImageScaled(singleImage, main__ctx)
    // }

    texture.needsUpdate = true;
    // mesh.rotation.y += 0.01;
    mesh.rotation.y = radians;
    renderer.render(scene, camera);

};

init3d();
animate();