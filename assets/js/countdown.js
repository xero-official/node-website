$(document).ready(function() {
  web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.xerom.org'));
  var currentBlock = null;
  var currSeconds = null;
  var initialized = false

  function calculate(timeRemaining) {
    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining = (timeRemaining % 86400);

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = (timeRemaining % 3600);

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = (timeRemaining % 60);

      seconds = parseInt(timeRemaining);

      document.getElementById("cdDays").innerHTML = parseInt(days, 10);
      document.getElementById("cdHours").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("cdMinutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("cdSeconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      return;
    }
  }

  function showCurrentBlockData() {
    $("#cdCurrBlock").html(currentBlock);
    $("#cdBlocksLeft").html(300000 - currentBlock);
    calculate(currSeconds);
    currSeconds--;
  }

  function getCurrentBlock() {
    web3.eth.getBlockNumber(function(error, result) {
      if (!error) {
        currentBlock = result;
        var diffBlocks = 300000 - currentBlock;
        currSeconds = diffBlocks * 13;

        if (initialized == false) {
          setInterval(showCurrentBlockData, 1000);
          initialized = true;
        }

        setTimeout(() => {
          getCurrentBlock();
        }, 60000);
      }
    });
  }

  getCurrentBlock();
});
