const weather = document.querySelector(".js-weather");

const API_KEY = "7926f465fc932cf58b0290bf494c8869";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch( //data는 fetch를 이용해서 가져오면 됨, 앞에 https:// 넣어주고 백틱으로 넣기
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json()
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`; //js에서 뭔가가 끝나길 기다리는 방법은 then 사용하기
            //json 데이터가 준비되면 Object 가져오기
        })
            //then은 함수가 완전히 들어왔을 때 함수 호출
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){ //좌표를 가져오는데 성공할 때 처리하는 함수
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,//latitude: latitude,
        longitude //longitude: longitude 이름 같으면 이렇게 써도 됨, 좌표 저장
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){ //좌표 요청하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError) //navigator API 이용할것임
    //getCurrentPosition()은 2개의 requirement를 가지고 있음, 첫 번째는 함수
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        //getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();