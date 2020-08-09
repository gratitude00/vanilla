const toDoForm = document.querySelector(".js-toDoform"), //변수 이름을 form이라고 하면 greeting.js의 form과 충돌하게 된다. 다른이름으로 해주기
 toDoInput = toDoForm.querySelector("input"), //간단한 input, toDoForm 네임을 가져와야 함
 toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'; //상수

    //함수가 true를 return하는 item들이 있는 array를 만들것임
    //filter는 array의 모든 item을 통해 함수 실행
    //그리고 true인 item만 가지고 새로운 array를 만들고

let toDos = []; //해야할 일을 생성할 때마다 toDos array에 추가하기, cleanToDos 하기 위해 let 변수

function deleteToDo(event){
    //console.log(event.target.parentNode) .target을 하는 이유는 삭제할 때 무엇을 삭제할지 알기 위해서
    //부모가 누군지 알아야 삭제 가능, delete child element mdn 구글링해보기
    const btn = event.target;
    const li = btn.parentNode; //지워야할 li인 parentNode를 만든다.
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //모든 toDos가 'li'의 id와 같지 않을 때
    }) //filter 함수를 사용, forEach와 같이 각각의 아이템과 같이 실행
    //toDo.id는 숫자 li.id는 string이기 때문에 parseInt를 써서 string을 숫자로 바꿔준다.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){ //const toDos를 가져와서 로컬에 저장하 는 일을 함
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //JSON.stringify는 JS object를 string이 되도록 저장
}

function paintToDo(text){
    //평소에 하던 건 querySelector를 써서 HTML에서 가져온다 
    const li = document.createElement("li"); //무언가를 생성하길 원할 때, 생성할 Element는 ul
    const delBtn = document.createElement("button"); //삭제 버튼
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text; //text는 submit function에서 온 값 
    li.appendChild(span);//뭔가를 그의 father element 안에 넣는 것
    li.appendChild(delBtn);
    li.id = newId; //버튼을 클릭했을 때 어떤 li를 지워야 할 지 알기위해
    toDoList.appendChild(li);
    const toDoObj = { //todo를 이런 식으로 저장하는 이유 = local storage에도 저장해야하기 때문
        text: text,
        id: newId//array의 길이
    };
    toDos.push(toDoObj); //toDos Array 안에 toDoObj를 집어 넣음
    saveToDos(); //push 한 이후에 호출해야함, 그렇지 않으면 saveToDos를 불러도 저장할 게 없음
    //js는 local storage에 있는 모든 data를 string으로 저장하려고 한다. value가 objectobject로 나옴 ->object가 string이 되도록 만들어야한다.
}
//비어있는 li를 만들었고 Btn, span을 만들고 span, Btn을 li 안에 넣음
//

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //enter로 제출했을 대 공백으로 되돌리고싶음.
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);

    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos); //JSON은 data를 전달할 때 js가 그걸 다룰 수 있도록 object로 바꿔주는 기능
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text); //해야할 일을 화면에 띄우기. paintToDo 기능 호출
        }); //forEach=기본적으로 함수 실행 array에 담겨있는 것들 각각에 한 번씩 함수를 실행해준다. 그 각각을 toDo라고 칭함
        //forEach는 array를 위한 function임.
    }
}

//***filter! forEach! list에 있는 모든 item을 위한 함수를 실행시킴

function init(){
    loadToDos(); //뭔가를 load해야함
    toDoForm.addEventListener("submit", handleSubmit)
}
init();