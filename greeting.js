//2개의 플레이어, 1번째 플레이어는 .class js form, 나머지는 input
const form =document.querySelector(".js-form"), //원하는 셀렉터는 css방식으로 다 가져온다.
 input = form.querySelector("input"),
 //greeting 가져오기
 greeting = document.querySelector(".js-greetings");

//변수 USER_LS = user_local storage
 const USER_LS = "currentUser",
 SHOWING_CN = "showing"; //class name

 function saveName(text){
     localStorage.setItem(USER_LS,text);
 }

 function handleSubmit(event){
     event.preventDefault(); // submit하면 새로고침되는 기본 동작을 막음
     const currentValue = input.value;
     paintGreeting(currentValue); //paintGreeting 기능의 text를 불러온다
     //하지만 value가 저장되지 않았으니 저장 기능을 추가한다
     saveName(currentValue);
 }

 //currentuser가 null이면 user의 이름을 요청하는 기능
 function askForName(){
     form.classList.add(SHOWING_CN); //whatIsYourName 창을 띄움
     form.addEventListener("submit",handleSubmit);//뭔가를 form에 submit 하면 handleSubmit를 처리한다.
 }
 //currentUser이 null이 아니라면 이름을 색칠하자, 1개의 argument(text)를 갖는다.
 function paintGreeting(text){
     form.classList.remove(SHOWING_CN); //텍스트를 색칠할거면 폼을 숨겨야한다.
     greeting.classList.add(SHOWING_CN); //greeting을 보여준다.
     greeting.innerText = `Hello ${text}`; //내가 보낸 text를 넣는다.
 }
 //loadName의 역할은 localStorage 내용을 가져오는 것
 function loadName(){
     const currentUser = localStorage.getItem(USER_LS);

     if(currentUser === null){
         //유저가 없는 경우
         askForName();
     }
     else{
         //유저가 있는 경우
         paintGreeting(currentUser);
     }
 }

 function init(){
     loadName();
}
init();