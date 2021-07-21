class Timer {
    constructor(_time, _currentTime, _timerInterval = 100, _internalTimer, _internalTimerout) {
      this.time = _time; //tempo limite = tempo de contagem regressiva em milissegundos;
      this.currentTime = _currentTime; //tempo corrido = tempo de contagem atual em milissegundos;
      this.timerInterval = _timerInterval; //intervalo de tempo a ser utilizado dentro do contador interno sendo o padrão 100 milissegundos;
      this.callbackTimeout = function() {}; //função a ser chamada quando o tempo tiver esgotado;
      this.callbackTimeInterval = function() {}; // função a ser chamada a cada ‘timerInterval’;
      this.internalTimer = _internalTimer; //variável que recebe a função setInterval() e que possibilita que seja apagada com clearInterval(internalTimer);
      this.internalTimerout = _internalTimerout; //variável que recebe a função setTimeout() e que possibilita que seja apagada com clearTimeout(internalTimeout).
    }
  
    // responsável por definir o tempo (time) regressivo em milissegundos;
    setTimer(_time) {
      this.time = _time;
      this.currentTime = _time;
      return this.time;
    }
  
    //define qual o intervalo que a classe utilizará no seu contador regressivo;
    setTimerInterval(_timerInterval = 100) {
      this.timerInterval = _timerInterval;
      return this.timerInterval;
    }
  
    // define a função de callback ‘callbackTimeout’ a ser executada ao final da contagem regressiva;
    setCallbackTimeout(_callbackTimeout) {
      this.callbackTimeout = _callbackTimeout;
      return this.callbackTimeout;
    }
  
    //define a função de call- back ‘callbackTimeInterval’ a ser executada após cada intervalo definido em ‘timerInterval’ ou, se não configurado, utilizar o padrão de 100 milissegundos; 
    setCallbackTimeInterval(_callbackTimeInterval) {
      this.callbackTimeInterval = _callbackTimeInterval;
      return this.callbackTimeInterval;
    }
  
    //retorna o tempo corrente ‘currentTime’. Este retorno pode ser a qualquer momento, seja no começo, durante a contagem ou no fim;
    getCurrentTime() {
      this.currentTime = this.time;
      return this.currentTime; //vem em milisegundos
    }
  
    // inicia o contador;
    startTimer() {
  
  
      this.internalTimer = setInterval(() => {
        this.currentTime -= this.timerInterval;
  
        this.callbackTimeInterval();
  
  
        if (this.currentTime <= 0) {
          clearInterval(this.internalTimer)
        }
  
      }, this.timerInterval);
  
      this.internalTimeout = setTimeout(this.callbackTimeout, this.time);
    }
  
  
    //para a contagem sem zerar os valores dos atributos;
    stopTimer() {
      clearTimeout(this.internalTimeout); //Para a função setTimeout
      clearInterval(this.internalTimer);
      //ou this.time passa a valer this.internalTimerout?
      this.time = this.currentTime; //o tempo passa a valer o tempo corrido 
    }
  
    //reinicia os valores de ‘time’, ‘currentTime’, ‘timerInterval’ e os controladores de tempo ‘internalTimer’ e ‘internalTimeout’.
    resetTimer() {
      this.internalTimerout = 0;
      this.internalTime = 0;
      this.time = 0;
      this.currentTime = 0;
      this.timerInterval = 0;
      this.callbackTimeInterval = function() {};
      this.callbackTimeout = function() {};
    }
  
    currentTimeString() {
      let durationTimer = this.currentTime;
      console.log(durationTimer)
  
      let milliseconds = Math.floor((durationTimer % 1000) / 100),
        seconds = Math.floor((durationTimer / 1000) % 60),
        minutes = Math.floor((durationTimer / (1000 * 60)) % 60),
        hours = Math.floor((durationTimer / (1000 * 60 * 60)) % 24);
  
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
  }
  
  // *****************FINAL DA CLASS AQUI **************************************
  
  let timer = new Timer();
  
  function getMilissegundosVisor() {
    let visorEntrada = document.getElementById("tempoVisor").value;

    let entradaDividido = visorEntrada.split(':');
    let horasEmMs = entradaDividido[0] * 60 * 60 * 1000;
    let minutosEmMs = entradaDividido[1] * 60 * 1000;
    let segundosEmMs = entradaDividido[2].split('.')[0] * 1000;
    let milisegundos = (entradaDividido[2].split('.')[1] * 10) || 0;
  
    let entradaVisorConvertido = horasEmMs + minutosEmMs + segundosEmMs + milisegundos;
    return entradaVisorConvertido;
  }
  
  function iniciarTimer() {
    let entradaVisorConvertido = getMilissegundosVisor();
     
    timer.setTimer(entradaVisorConvertido);
    timer.setTimerInterval();
    timer.setCallbackTimeInterval(function() {
      respostaVisor.innerHTML = timer.currentTimeString();
    });
  
    timer.setCallbackTimeout(function() {
      console.log("finalizou");
    });
  
    timer.startTimer();

    document.getElementById('play').style.display ="none";
    document.getElementById('restart').style.display ='block';
  }
  
  function pararTimer() {
    timer.stopTimer();
  }
  
  function apagarTimer() {
    timer.resetTimer();
    document.getElementById('tempoVisor').value = "";
    document.getElementById('respostaVisor').innerHTML = timer.currentTimeString();
    
    document.getElementById('play').style.display ="block";
    document.getElementById('restart').style.display ='none';

  }

  function restartTimer(){
    timer.stopTimer();
    timer.startTimer();
  }
  