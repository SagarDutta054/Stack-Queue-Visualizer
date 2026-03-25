const optionList = document.getElementById("option-list");
const capacityVal = document.getElementById("capacity-val");
const insertValue = document.getElementById("insert-val");

const saveBtn = document.getElementById("save-config-btn");

const insertBtn = document.getElementById("insert-btn");
const deleteBtn = document.getElementById("delete-btn");
const clearContainerBtn = document.getElementById("clear-container-btn");

const insertMessage = document.getElementById("insert-message");
const deleteMessage = document.getElementById("delete-message");
const saveMessage = document.getElementById("save-message");

const dataContainer = document.getElementById("data-type-container");
// insertMessage.classList.add("active");
// deleteMessage.classList.add("active");
// saveMessage.classList.add("active");

let mode = "stack";
let capacity = 5;
let index = 0;
let arr = [];

let arrayData = JSON.parse(localStorage.getItem("arrayData")) || [];
if (arrayData.length == 0) {
  arrayData = { mode, capacity, index, arr };
  localStorage.setItem("arrayData", JSON.stringify(arrayData));
}
capacityVal.value = arrayData.capacity;
optionList.value = arrayData.mode;

const saveConfiguration = () => {
  console.log(optionList.value);
  console.log(capacityVal.value);
  //Here things related to the localstorage will be written
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData.arr.length > 0) {
    saveMessage.innerText = "New configuration can't be saved!";
    saveMessage.classList.add("active");
    setTimeout(() => {
      saveMessage.innerText = "You need to reset the container!";
    }, 2000);

    // saveMessage.classList.add("active");
    setTimeout(() => {
      saveMessage.classList.remove("active");
    }, 5000);
    capacityVal.value = arrayData.capacity;
  } else {
    arrayData.capacity = capacityVal.value;
    arrayData.mode = optionList.value;
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
    saveMessage.innerText = "Configuration saved";
    saveMessage.classList.add("active");
    setTimeout(() => {
      saveMessage.classList.remove("active");
    }, 3000);
    capacityVal.value = arrayData.capacity;
  }
};
const clearContainer = () => {
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  arrayData.arr = [];
  arrayData.index = 0;
  localStorage.setItem("arrayData", JSON.stringify(arrayData));
  initialDisplay();
  saveMessage.innerText = "Container is reset";
  saveMessage.classList.add("active");
  setTimeout(() => {
    saveMessage.classList.remove("active");
  }, 3000);
};
const initialDisplay = () => {
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData.mode == "stack") {
    // let i=0;
    console.log(dataContainer);
    dataContainer.innerHTML = "";
    let j = arrayData.arr.length - 1;
    for (; j >= 0; j--) {
      dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[j]}</div>
      `;
    }
  } else {
    let i = 0;
    let j = arrayData.arr.length;
    dataContainer.innerHTML = "";
    for (i = 0; i < j; i++) {
      dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[i]}</div>
      `;
    }
  }
};

const displayDataItems = () => {
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData.mode == "stack") {
    // let i=0;
    console.log(dataContainer);
    dataContainer.innerHTML = "";
    let j = arrayData.arr.length - 1;
    for (; j >= 0; j--) {
      if (j == arrayData.arr.length - 1) {
        dataContainer.innerHTML += `
        <div class="element-box new">${arrayData.arr[j]}</div>
      `;
      } else {
        dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[j]}</div>
      `;
      }
    }
  } else {
    let i = 0;
    let j = arrayData.arr.length;
    dataContainer.innerHTML = "";
    for (i = 0; i < j; i++) {
      if (i == j - 1) {
        dataContainer.innerHTML += `
        <div class="element-box new">${arrayData.arr[i]}</div>
      `;
      } else {
        dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[i]}</div>
      `;
      }
    }
  }
};
const popDisplay = () => {
  let arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData.mode == "queue") {
    dataContainer.innerHTML = "";
    let n = arrayData.arr.length;
    let i;
    for (i = 0; i < n; i++) {
      if (i == 0) {
        dataContainer.innerHTML += `
        <div class="element-box old">${arrayData.arr[i]}</div>
      `;
      } else {
        dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[i]}</div>
      `;
      }
    }
  } else if (arrayData.mode == "stack") {
    dataContainer.innerHTML = "";
    let n = arrayData.arr.length;
    let i;
    for (i = n - 1; i >= 0; i--) {
      
      if (i == n - 1) {
        dataContainer.innerHTML += `
        <div class="element-box old">${arrayData.arr[i]}</div>
      `;
        // break;
      } else {
        dataContainer.innerHTML += `
        <div class="element-box">${arrayData.arr[i]}</div>
      `;
      }
    }
  }
};

const addDataItem = () => {
  console.log("Data item inserting...");
  const arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (insertValue.value.trim() == "") {
    insertMessage.innerText = "Enter value to insert data item";
    insertMessage.classList.add("active");
    setTimeout(() => {
      insertMessage.classList.remove("active");
    }, 4000);
  } else if (arrayData.index >= arrayData.capacity) {
    insertMessage.innerText = "Overflow!";
    insertMessage.classList.add("active");
    insertValue.value = "";
    setTimeout(() => {
      insertMessage.classList.remove("active");
    }, 4000);
  } else {
    arrayData.arr.push(insertValue.value);
    arrayData.index++;
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
    displayDataItems(insertValue.value);
    insertValue.value = "";
  }
  // Code for inserting data item
};
const deleteDataItem = () => {
  console.log("Data item deleting...");
  let arrayData = JSON.parse(localStorage.getItem("arrayData"));
  if (arrayData.arr.length == 0) {
    deleteMessage.innerText = "Underflow!";
    deleteMessage.classList.add("active");
    setTimeout(() => {
      deleteMessage.classList.remove("active");
    }, 5000);
  } else if (arrayData.mode == "stack") {
    const lastItem = arrayData.arr[arrayData.index - 1];
    let i = 0;
    let newArr = [];
    /* If the arrayData.arr is having only one element
    then loop body will not be executed because 
    arrayData.index - 1 will be equivalent to 1-1=0
    but i is not less than 0 , so loop body will not be executed

    The next statement  arrayData.arr = newArr; will be executed 
    and the initial empty array of the newArr will be assigned 
    to arraydata.arr and it is absolutely what is expected!
    Because after deleting the last element, the arrayData.arr should be 
    empty.
    */
    for (i = 0; i < arrayData.index - 1; i++) {
      newArr.push(arrayData.arr[i]);
      console.log(newArr);
    }
    arrayData.arr = newArr;
    arrayData.index -= 1;
    popDisplay();
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
    setTimeout(() => {
      initialDisplay();
    }, 600);
    deleteMessage.innerText = `Deleted element is ${lastItem}`;
    deleteMessage.classList.add("active");
    setTimeout(() => {
      deleteMessage.classList.remove("active");
    }, 5000);
  } else {
    let i;
    let j = arrayData.arr.length;
    let newArr = [];
    let lastItem = arrayData.arr[0];
    for (i = 1; i < j; i++) {
      newArr.push(arrayData.arr[i]);
    }

    popDisplay();

    arrayData.arr = newArr;
    arrayData.index =
      arrayData.index < 1 ? arrayData.index : arrayData.index - 1;
    localStorage.setItem("arrayData", JSON.stringify(arrayData));

    setTimeout(() => {
      initialDisplay();
    }, 600);
    deleteMessage.innerText = `Deleted element is ${lastItem}`;
    deleteMessage.classList.add("active");
    setTimeout(() => {
      deleteMessage.classList.remove("active");
    }, 4000);
  }
  // Code for deleting data item
};

saveBtn.addEventListener("click", () => {
  saveConfiguration();
});
clearContainerBtn.addEventListener("click", () => {
  clearContainer();
});
insertBtn.addEventListener("click", () => {
  addDataItem();
});
deleteBtn.addEventListener("click", () => {
  deleteDataItem();
});

//saveConfiguration(); //This is the first automatic initialization
initialDisplay();
