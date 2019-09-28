const DEBUG = 0;

var size = numerators.length;
// get all elements into an array; index for corresponding Activity X row = X-1;
var weights, numerators, denominators, percentages;

// get references to the buttons and display elements
var weighted = document.getElementById("weighted");
var mean = document.getElementById("mean");
var addRow = document.getElementById("add-row");
var clearAll = document.getElementById("clear-all");
var result = document.getElementById("result");
var table = document.getElementById("table-data-body");

fetchElements = () => {
  weights = [].slice.call(document.querySelectorAll("input[id*=weight]"));
  numerators = [].slice.call(document.querySelectorAll("input[id*=grade-num]"));
  denominators = [].slice.call(document.querySelectorAll("input[id*=grade-den]"));
  percentages = [].slice.call(document.querySelectorAll("p[id*=percent]"));
  if(DEBUG) console.log(weights, numerators, denominators, percentages);
}

updatePercentages = (event) => {
  if (numerators.indexOf(event.target) !== -1) { // indexOf returns -1 if doesn't exist
    index = numerators.indexOf(event.target);
  }
  else {
    index = denominators.indexOf(event.target);
  }

  // some values may not be input yet, default value = NaN
  if (isNaN(denominators[index].value) || denominators[index].value === "") {
    value = NaN;
  }
  else {
    value = numerators[index].value / denominators[index].value;
  }

  // handle all diff cases for value
  // denominator min val set to 1 so won't have divide by zero error
  if (isNaN(value)) {
    percentages[index].innerHTML = "not a number!";
  }
  else if (value > 1) {
    percentages[index].innerHTML = "can't get over 100%!";
  }
  else {
    percentages[index].innerHTML = parseFloat(value * 100).toFixed(2);
  }
}

initSetOnChange = () =>{
  for (let i = 0; i < size; i++) {
    numerators[i].onchange = updatePercentages;
    denominators[i].onchange = updatePercentages;
  }
}

// BUTTON functions and calculations
calculateMean = () => {
  console.log("calculating mean...");
  let sum = 0;
  for (let i = 0; i < size; i++) {
    if (isNaN(parseFloat(percentages[i].innerHTML))) {
      continue;
    } else {
      sum += parseFloat(percentages[i].innerHTML);
    }
  }
  if (DEBUG) console.log(sum);

  result.value = parseFloat(sum / size).toFixed(2) + "%";
}

calculateWeighted = () => {
  console.log("calculating weighted...");
  let numeratorSum = 0;
  let denominatorSum = 0;

  // sum each numerator * weight
  for (let i = 0; i < size; i++) {
    if (isNaN(parseFloat(weights[i].value)) || isNaN(parseFloat(percentages[i].innerHTML))) {
      if (DEBUG) console.log("weight value is nan, skipping...");
      continue;
    } else {
      numeratorSum += parseFloat(weights[i].value) * parseFloat(percentages[i].innerHTML);
    }
  }

  // sum weights for denominator
  for (let i = 0; i < size; i++) {
    if (isNaN(parseFloat(weights[i].value))) {
      if (DEBUG) console.log("weight value is nan, skipping...");
      continue;
    } else {
      denominatorSum += parseFloat(weights[i].value);
    }
  }
  if (DEBUG) console.log(numeratorSum, denominatorSum)

  result.value = parseFloat(numeratorSum / denominatorSum).toFixed(2) + "%";
}

clearInputs = () => {
  for (let i = 0; i < size; i++) {
    numerators[i].value = "";
    denominators[i].value = "";
    weights[i].value = "";
    percentages[i].innerHTML = "";
  }
  result.value = "";
  window.alert("cleared all inputs!");
}

// set onchange for elements in added row
setNewOnChange = () =>{
  numerators[size-1].onchange = updatePercentages;
  denominators[size-1].onchange = updatePercentages;
}

// idea for joining array of strings from here https://stackoverflow.com/a/16270827
insertTableRow = () => {
  size += 1;
  tabRow = document.createElement('tr');
  tabRow.innerHTML = `
    <tr>
      <td>
        <p>Activity ${size}</p>
      </td>
      <td>
        <p>A${size}</p>
      </td>
      <td>
        <input id="a${size}-weight" type="number" min="0"></input>
      </td>
      <td>
        <input id="a${size}-grade-num" type="number" min="0"></input> / <input id="a${size}-grade-den" type="number" min="1"></input>
      </td>
      <td>
        <p id="a${size}-percent"></p>
      </td>
    </tr>
  `;
  table.appendChild(tabRow);

  // update arrays with element references
  fetchElements();
  setTimeout(setNewOnChange(), 1000);
}



fetchElements();
// check if everything is referenced properly
if (DEBUG) console.log(weights, numerators, denominators, percentages, weighted, mean, result);
initSetOnChange();
weighted.onclick = calculateWeighted;
mean.onclick = calculateMean;
clearAll.onclick = clearInputs;
addRow.onclick = insertTableRow;