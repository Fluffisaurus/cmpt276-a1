const DEBUG = 1;

// get all elements into an array
// index for corresponding Activity X row = X-1;
var weights = [].slice.call(document.querySelectorAll("input[id*=weight]"));
var numerators = [].slice.call(document.querySelectorAll("input[id*=grade-num]"));
var denominators = [].slice.call(document.querySelectorAll("input[id*=grade-den]"));
var percentages = [].slice.call(document.querySelectorAll("p[id*=percent]"));

// get references to the buttons and result
var weighted = document.getElementById("weighted");
var mean = document.getElementById("mean");
var clearAll = document.getElementById("clear-all");
var result = document.getElementById("result");

// check if everything is referenced properly
if(DEBUG) console.log(weights, numerators, denominators, percentages, weighted, mean, result);

updatePercentages = (event) =>{
  if(numerators.indexOf(event.target) !== -1){ // indexOf returns -1 if doesn't exist
    index = numerators.indexOf(event.target);
  }
  else{
    index = denominators.indexOf(event.target);  
  }

  // some values may not be input yet, default value = NaN
  if(isNaN(denominators[index].value) || denominators[index].value === "") {
    value = NaN;
  }
  else{
    value = numerators[index].value / denominators[index].value;
  }

  // handle all diff cases for value
  // denominator min val set to 1 so won't have divide by zero error
  if(isNaN(value)){
    percentages[index].innerHTML = "not a number!";
  }
  else if(value > 1){
    percentages[index].innerHTML = "can't get over 100%!";
  }
  else{
    percentages[index].innerHTML = parseFloat(value * 100).toFixed(2);
  }
}

for(let i = 0; i < numerators.length; i++){
  numerators[i].onchange = updatePercentages;
  denominators[i].onchange = updatePercentages;
}

// BUTTON functions and calculations
calculateMean = () =>{
  console.log("calculating mean...");
  let sum = 0;
  for(let i = 0; i < percentages.length; i++){
    if(DEBUG) console.log("current value: " + parseFloat(percentages[i].innerHTML));
    if(isNaN(parseFloat(percentages[i].innerHTML))){
      if(DEBUG) console.log("value is nan, skipping...");
      continue;
    }else{
      if(DEBUG) console.log("valid value, adding...");
      sum += parseFloat(percentages[i].innerHTML);
    }      
  }
  if(DEBUG) console.log(sum);

  result.value = parseFloat(sum/4).toFixed(2) + "%";
}

calculateWeighted = () =>{
  console.log("calculating weighted...");
  let numeratorSum = 0;
  let denominatorSum = 0;

  // sum each numerator * weight
  for(let i = 0; i < weights.length; i++){
    if(isNaN(parseFloat(weights[i].value)) || isNaN(parseFloat(percentages[i].innerHTML))){
      if(DEBUG) console.log("weight value is nan, skipping...");
      continue;
    }else{
      numeratorSum += parseFloat(weights[i].value) * parseFloat(percentages[i].innerHTML);
    }      
  }

  // sum weights for denominator
  for(let i = 0; i < weights.length; i++){
    if(isNaN(parseFloat(weights[i].value))){
      if(DEBUG) console.log("weight value is nan, skipping...");
      continue;
    }else{
      denominatorSum += parseFloat(weights[i].value);
    }      
  }
  if(DEBUG) console.log(numeratorSum, denominatorSum)

  result.value = parseFloat(numeratorSum/denominatorSum).toFixed(2) + "%";
}

weighted.onclick = calculateWeighted;
mean.onclick = calculateMean;

clearInputs = () =>{
  for(let i = 0; i < numerators.length; i++){
    numerators[i].value = "";
    denominators[i].value = "";
    weights[i].value = "";
    percentages[i].innerHTML = "";
  }
  result.value = "";
  window.alert("cleared all inputs!");
} 

clearAll.onclick = clearInputs;