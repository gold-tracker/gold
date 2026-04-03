function ounceToGram(pricePerOunce) {
  return pricePerOunce / 28.3495;
}

function price24k(pricePerGram) {
  return (pricePerGram).toFixed(2);
}

function price21k(pricePerGram) {
  return (pricePerGram * (21 / 24)).toFixed(2);
}

function price18k(pricePerGram) {
  return (pricePerGram * (18 / 24)).toFixed(2);
}


function bar1g(pricePerGram) {
  return (pricePerGram * 1).toFixed(2);
}

function bar10g(pricePerGram) {
  return (pricePerGram * 10).toFixed(2);
}

function bar50g(pricePerGram) {
  return (pricePerGram * 50).toFixed(2);
}

function bar100g(pricePerGram) {
  return (pricePerGram * 100).toFixed(2);
}

function bar500g(pricePerGram) {
  return (pricePerGram * 500).toFixed(2);
}

function bar1000g(pricePerGram) {
  return (pricePerGram * 1000).toFixed(2);
}


function englishCoin(pricePerGram) {
  return (7.988 * (22 / 24) * pricePerGram).toFixed(2);
}

function rashadiCoin(pricePerGram) {
  return (7.2 * (22 / 24) * pricePerGram).toFixed(2);
}


function usdToJod(usd) {
  const rate = 0.709; 
  return (usd * rate).toFixed(2);
}


function jodToUsd(jod) {
  const rate = 0.709; 
  return (jod / rate);
}

function twoDecimals(value) {

    const parts = value.toString().split(".");
  if (parts.length < 2) return 0;        // no decimal part
  return parts[1].slice(0, 2);  
}