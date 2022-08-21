const $ = document;
let itemInput = $.querySelector("#itemInput");
let addBtn = $.querySelector("#addButton");
let clearBtn = $.querySelector("#clearButton");
let todoListElems = $.querySelector("#todoList");
let listContainer = $.querySelector(".list-container");
// console.log(itemInput, addBtn, clearBtn, todoListElems);
let todosArray = [];
function newTodoLocal (itemInputValue) {
    let todo = {
        id:todosArray.length + 1,
        titel:itemInputValue,
        complete:false
    };
    todosArray.push(todo);
    setLocalTodo(todosArray);
    newTodoDom(todosArray);
};
function setLocalTodo(todoList) {
    localStorage.setItem("todos", JSON.stringify(todoList));
};
function newTodoDom(todoList) {
    let  liElem, h3Elem, divElem, btnSuccess, btnDanger ;
    todoListElems.innerHTML = "";

    todoList.forEach((e) => {
    liElem = $.createElement("li");
    liElem.className = "completed well list-container squareLi";

    h3Elem = $.createElement("h3");
    h3Elem.innerHTML = e.titel;
    h3Elem.className = "col-lg-9";
    h3Elem.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    
    divElem = $.createElement("div");
    divElem.className = "divLi-btn";

    btnSuccess = $.createElement("button");
    btnSuccess.className = "btn btn-success";
    btnSuccess.innerHTML = "un done";

    btnDanger = $.createElement("button");
    btnDanger.className = "btn btn-danger";
    btnDanger.innerHTML = "Delete";
        if (e.complete) {
        liElem.className = "uncompleted completed well list-container squareLi";
        btnSuccess.innerHTML = "done";    
        };
    divElem.append(btnSuccess, btnDanger)
    liElem.append(h3Elem, divElem);
    todoListElems.append(liElem);

    btnSuccess.addEventListener('click', ()=> {
        let localTodos = JSON.parse(localStorage.getItem("todos"));
        todosArray = localTodos;
        todosArray.forEach((todo)=>{
            if (todo.id === e.id) {
                 todo.complete = !todo.complete;
            };
        });
        setLocalTodo(todosArray);
        newTodoDom(todosArray);
    });
    btnDanger.addEventListener('click', ()=> {
        let localTodos = JSON.parse(localStorage.getItem("todos"));
        todosArray = localTodos;
        let localTodosIndex = localTodos.findIndex((index)=>{
            return index.id === e.id;
        });
        todosArray.splice(localTodosIndex, 1);
        setLocalTodo(todosArray);
        newTodoDom(todosArray);
    });
    });

};
function addBtnHandler() {
    let itemInputValue = itemInput.value.trim();
    if (itemInputValue) {
        newTodoLocal(itemInputValue);
    };
    itemInput.value = "";
    itemInput.focus();
    addBtn.blur();
};
function enterHandler(event) {
    if (event.keyCode === 13) {
        addBtnHandler();
    };
};
function clearBtnHandler() {
    todosArray = [];
    newTodoDom(todosArray);
    localStorage.removeItem("todos");
    itemInput.value = "";
    clearBtn.blur();
};
function loadHandler() {
    let localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
    todosArray = localTodos;
    }else{
        todosArray = [];
    };
    newTodoDom(todosArray);
    // local for "brightness range slider"
    let localBrightness = JSON.parse(localStorage.getItem("brightness"));
    inputRange.value = localBrightness;
    $.body.style.filter = "brightness(" + localBrightness + "%)";
    // local for "Dark Mode"
    let localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme === "dark") {
        $.body.classList.add("dark");
        homeElem.classList.add("dark");
        iElem.classList.add("iColor");
        statickElem.classList.add("square");
        todoListElems.classList.add("square");
    }
};
addBtn.addEventListener('click', addBtnHandler);
itemInput.addEventListener('keydown', enterHandler);
clearBtn.addEventListener('click', clearBtnHandler);
window.addEventListener('load', loadHandler);
// brightness range slider
let btnBrightness = $.querySelector(".btn-brightness");
let boxBrightness = $.querySelector(".brightness-box");
let inputRange = $.querySelector("#range");
function inputRangeHandler(event) {
    let inputRangeValue = event.target.value;
    $.body.style.filter = "brightness(" + inputRangeValue + "%)";
    localStorage.setItem("brightness" , inputRangeValue);

};
function btnBrightnessHandler() {
    boxBrightness.classList.toggle("show-brightness");
    setTimeout(() => {
    boxBrightness.classList.toggle("show-brightness");
    }, 4000);
};
btnBrightness.addEventListener('click', btnBrightnessHandler)
inputRange.addEventListener('change', inputRangeHandler);
// Dark Mode
let switchElement = $.querySelector(".switch");
let homeElem = $.querySelector(".home");
let statickElem = $.querySelector(".statick");
let iElem = $.querySelector(".fas");
switchElement.addEventListener('click', ()=> {
    $.body.classList.toggle("dark");
    homeElem.classList.toggle("dark");
    iElem.classList.toggle("iColor");
    statickElem.classList.toggle("square");
    todoListElems.classList.toggle("square");
  if ($.body.className.includes("dark")) {
    localStorage.setItem("theme", "dark");
  }else{
    localStorage.setItem("theme", "light");
  };
});
