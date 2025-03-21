let number=[];

function generateBars(arr, index=[]){ 
  let barsContainer = document.getElementById("bars");
  barsContainer.textContent="";
  for(let i = 0; i < arr.length; i++){
      let barContainer = document.createElement("div");
      barContainer.className = "bar-container";

      let bar = document.createElement("div");
      bar.style.height = (arr[i] * 5) + "px";
      bar.style.width = "30px";
      bar.style.backgroundColor = index.includes(i) ? "red" : "#ffcc00";
      bar.className = "bar";

      let numLabel = document.createElement("div");
      numLabel.className = "num-label";
      numLabel.innerText = arr[i];
      
      barContainer.appendChild(bar);
      barContainer.appendChild(numLabel);
      barsContainer.appendChild(barContainer);
  }
}

//handle input
function processInput(){
    number=[];
    let inputValue= document.getElementById("input");
    let element = inputValue.value.split(",");
    for (let i = 0; i < element.length; i++){
        let num = parseInt(element[i]);
        if(!isNaN(num)){
            number.push(num);
        }
    }
    if (number.length > 0){
        generateBars(number);
    }
}

//random number
function randomNumber(){
  number=[];
  for(let i=0;i<10;i++){
    number.push(parseInt(Math.random()*50)+5);
  }
  generateBars(number);
}

//delay visuals
function delay(ms){
  return new Promise(function(resolve){
    setTimeout(resolve,ms);
  });
}

// bubble sort
async function bubbleSort(arr){
  let n = arr.length;
  for (let i = n - 1; i >= 1; i--){
      for (let j = 0; j < i; j++){
          generateBars(arr, [j, j + 1]);
          await delay(500);
          if (arr[j] > arr[j + 1]){
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              generateBars(arr, [j, j + 1]);
              await delay(50);
          }
      }
  }
  generateBars(arr);
}

//selection sort
async function selectionSort(arr){
  let n = arr.length;
  for (let i = 0; i <= n - 2; i++){ 
      let minIndex = i;
      for (let j = i; j <= n - 1; j++){
          generateBars(arr, [minIndex, j]);
          await delay(500);

          if (arr[j] < arr[minIndex]) {
              minIndex = j;
          }
      }
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
      generateBars(arr, [i, minIndex]);
      await delay(500);
  }
  generateBars(arr);
}

//insertion sort
async function insertionSort(arr){
  let n = arr.length;
  for (let i = 0; i < n; i++){ 
      let j = i;
      while (j > 0 && arr[j - 1] > arr[j]){ 
          [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]; 
          generateBars(arr, [j - 1, j]);
          await delay(500);
          j--;
      }
  }
  generateBars(arr);
}

//merge sort
async function merge(arr, start, mid, end){
  let size = end - start + 1;
  let temp = new Array(size);
  let left = start;
  let right = mid + 1;
  let j = 0;

  while (left <= mid && right <= end){
      if (arr[left] <= arr[right]){
          temp[j++] = arr[left++];
      } else{
          temp[j++] = arr[right++];
      }
  }
  while (left <= mid){
      temp[j++] = arr[left++];
  }
  while (right <= end){
      temp[j++] = arr[right++];
  }
  for (let i = start; i <= end; i++){
      arr[i] = temp[i - start]; 
      generateBars(arr, [i]); 
      await delay(500);
  }
}
async function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
  generateBars(arr); 
}

//quicksort
 async function pivot(arr, low, high){
  let pivotValue = arr[low];
  let i = low;
  let j = high;
  while (i < j){
      while (i < high && arr[i] <= pivotValue) i++;
      while (j > low && arr[j] > pivotValue) j--;

      if (i < j){
          [arr[i], arr[j]] = [arr[j], arr[i]];
          generateBars(arr, [i, j]);
          await delay(500);
      }
  }
  [arr[low], arr[j]] = [arr[j], arr[low]];
  generateBars(arr, [low, j]);
  await delay(500);
  return j;
}
 async function quickSort(arr, low = 0, high = arr.length - 1){
  if(low < high){
      let index =  await pivot(arr, low, high);
      await quickSort(arr, low, index - 1);
      await quickSort(arr, index + 1, high);
  }
}


//sort array
function sortArray(){
    if(number.length == 0){
        alert("Enter numbers or generate a random array first!");
    }
    let select = document.getElementById("algorithm").value;
    if(select == "bubble"){
        bubbleSort(number);
    }else if (select == "selection"){
        selectionSort(number);
    }else if (select == "insertion"){
        insertionSort(number);
    }else if (select == "merge"){
        mergeSort(number);
    }else if (select == "quick"){
        quickSort(number);
    }
}
