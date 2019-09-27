const DEBUG = 1;

var weights = [].slice.call(document.querySelectorAll("input[id*=weight]"));
var numerators = [].slice.call(document.querySelectorAll("input[id*=grade-num]"))
var denominators = [].slice.call(document.querySelectorAll("input[id*=grade-den]"))
var percentages = [].slice.call(document.querySelectorAll("p[id*=percent]"))

if(DEBUG) console.log(weights, numerators, denominators, percentages);

