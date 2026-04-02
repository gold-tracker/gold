function ounceToGram(pricePerOunce) {
  return pricePerOunce / 31.1035;
}

function price24k(pricePerGram) {
  return pricePerGram;
}

function price21k(pricePerGram) {
  return pricePerGram * (21 / 24);
}

function price18k(pricePerGram) {
  return pricePerGram * (18 / 24);
}


function bar1g(pricePerGram) {
  return pricePerGram * 1;
}

function bar10g(pricePerGram) {
  return pricePerGram * 10;
}

function bar50g(pricePerGram) {
  return pricePerGram * 50;
}

function bar100g(pricePerGram) {
  return pricePerGram * 100;
}

function bar500g(pricePerGram) {
  return pricePerGram * 500;
}

function bar1000g(pricePerGram) {
  return pricePerGram * 1000;
}


function englishCoin(pricePerGram) {
  return 7.988 * (22 / 24) * pricePerGram;
}

function rashadiCoin(pricePerGram) {
  return 7.2 * (22 / 24) * pricePerGram;
}


function usdToJod(usd) {
  const rate = 0.709; 
  return usd * rate;
}


function jodToUsd(jod) {
  const rate = 0.709; 
  return jod / rate;
}