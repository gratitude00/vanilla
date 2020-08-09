const body = document.querySelector("body"); //body로 설정할 것이기 때문에 body를 가져옴

const IMG_NUMBER = 5;

function handleImgLoad(){
    console.log('finished loading');
}

function paintImage(imgNumber){
    const image = new Image(); //함수 안에 새로운 Object
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    //image.addEventListener("loadend",handleImgLoad);
    //table listener를 이미지화 하기 위해 eventLister를 연결
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER); //floor는 뒤의 소숫점 반내림. random()*3은 0부터 3이전까지 숫자
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();