const DEBUG = 1;

// get all elements into an array
// index for corresponding Activity X row = X-1;
var weights = [].slice.call(document.querySelectorAll("input[id*=weight]"));
var numerators = [].slice.call(document.querySelectorAll("input[id*=grade-num]"))
var denominators = [].slice.call(document.querySelectorAll("input[id*=grade-den]"))
var percentages = [].slice.call(document.querySelectorAll("p[id*=percent]"))

// get references to the buttons
var weighted = document.getElementById("weighted");
var mean = document.getElementById("mean");

if(DEBUG) console.log(weights, numerators, denominators, percentages, weighted, mean);

updatePercentages = (event) =>{
  if(numerators.indexOf(event.target) !== -1){ // indexOf returns -1 if doesn't exist
    index = numerators.indexOf(event.target);
  }
  else{
    index = denominators.indexOf(event.target);  
  }

  value = numerators[index].value / denominators[index].value;

  if(value > 1){
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
  if(DEBUG) console.log("calculating mean...");
}

calculateWeighted = () =>{
  if(DEBUG) console.log("calculating weighted...");
}

weighted.onclick = calculateWeighted;
mean.onclick = calculateMean;