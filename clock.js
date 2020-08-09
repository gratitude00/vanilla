//js-clock이라는 class 이름을 찾아준다. 
const clockContainer = document.querySelector(".js-clock"),
//clock class의 자식을 탐색하고 싶을 때<js-clock>의 자식  
 clockTitle = clockContainer.querySelector("h1");

//시간을 가져오는 함수
function getTime(){
    //여기서 date는 class
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    //객체 안에 텍스트 넣기, 백틱(`) 기호 사용
    //seconds -> seconds이 10보다 작으면 0${seconds}를 리턴하고 아니면 그냥 seconds를 리턴한다.
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    //setInterval 함수로 매 초 변화를 나타냄
    setInterval(getTime,1000);
}
init();