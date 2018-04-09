function load(){
/* state module for keeping track of application state*/
let state = (function(){

  let ret = { phase: 'Work',
              mins: 25,
              secs: 0,
              paused: true,
              pomTime: 25,
              pauseTime: 5
            }
   ret.setState = function(param, val){
             ret[param] = val;
            };
   ret.makeTime = function(){
     let mins = String(ret.mins)
     let secs = ret.secs < 10 ? '0' + String(ret.secs) : String(ret.secs);
     return [mins, secs].join(':')
   }
  return ret;
}());

/* check state and set view to match current state*/
function setDisplay(){
 document.getElementById('start').innerHTML = state.paused ? "Begin" : "Pause";
 document.getElementById('switch').innerHTML = state.phase === 'Work'? "Rest" : "Work";
 document.getElementsByClassName('phase')[0].innerHTML = state.phase
 document.getElementsByClassName('display')[0].innerHTML = state.makeTime()
}
let sound = new Audio("../audio/buzzer3_x.wav");




(function intialize(){setDisplay();
                      document.getElementById('start').addEventListener('click', start_stop);
                      document.getElementById('switch').addEventListener('click', changePhase);
                      document.getElementById('increase').addEventListener('click', plus);
                      document.getElementById('decrease').addEventListener('click', minus);
                     }());

function plus(){
  switch(state.phase){
    case 'Work':
      state.setState('mins', ++state.mins)
      state.setState('pomTime', ++state.pomTime)
      setDisplay();
      break;
    case 'Rest':
      state.setState('mins', ++state.mins)
      state.setState('pauseTime', ++state.pauseTime)
      setDisplay();
      break;
  }
}

function minus(){
  switch(state.phase){
    case 'Work':
      if(!state.mins <= 0){
        state.setState('mins', --state.mins)
        state.setState('pomTime', --state.pomTime)
        setDisplay();
        break;
    }
    case 'Rest':
      if(!state.mins <= 0){
        state.setState('mins', --state.mins)
        state.setState('pauseTime', --state.pauseTime)
        setDisplay();
        break;
    }
  }
}


function changePhase(){
  state.setState('paused', true);
  if(state.mins === 0 && state.secs === 0){
    sound.play()
    state.setState('paused', false);
  }
  switch(state.phase){
        case 'Work':
          state.setState('mins', state.pauseTime);
          state.setState('secs', 0);
          state.setState('phase', 'Rest');
          break;

        case 'Rest':
          state.setState('mins', state.pomTime)
          state.setState('secs', 0)
          state.setState('phase', 'Work');
          break;
  }
  setDisplay();
}

function advance(){
  if(!state.paused){
    if(state.mins === 0 && state.secs === 0){

      changePhase();
      setDisplay();
      advance();
}
    else{
      if(state.secs === 0){
        state.setState('mins', --state.mins)
        state.setState('secs', 59)
      }
      else{

        state.setState('secs', --state.secs )
      }
      setDisplay();
      setTimeout(advance,1000)
    }

  }




}
function start_stop(){
  if(state.paused){
  state.setState('paused', false);
  advance();
  }
  else{
    state.setState('paused', true)
    setDisplay()
  }
}



}
