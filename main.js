/**
* ESC 2023 Bingo Spiel
* @version: 1.1
* @author: aliciaberthel
*/
const f1="Deutschland wird Letzter";
const f2="Rap-Teil im Song";
const f3="Thorsten Schorn kinda horny";
const f4='"Thank you for an amazing Show tonight!"';
const f5='"Let the Eurovision Song Contest begin"';
const f6="Pausenact covert ehemalige ESC Beitr&auml;ge";
const f7="Thorsten Schorn verteidigt den deutschen Act";
const f8="viel zu großes Delay bei den Schalten zu den L&auml;ndern";
const f9="Instrumentalteil mit Tanzeinlage";
const f10="On-Stage Kostümwechsel";
const f11="0 Punkte f&uuml;r Deutschland im Zuschauervoting";
const f12="Skandinavien schiebt sich gegenseitig Punkte zu";
const f13="zu viel Stroboskoplicht";
const f14="jemand geht w&auml;hrend einer Ballade aufs Klo";
const f15="irgendwelche Memes werden referenziert";
const f16="Flitzer!";
const f17="Klamottenwechsel bei den Moderator*innen";
const f18="ABBA-Mitglied live vor Ort";
const f19="jemand tut so, als w&uuml;rde er/sie ein Instrument spielen";
const f20="Sing-along Teil im Lied";
const f21="jemand tr&auml;gt eine Sonnenbrille";
const f22="Barfuß auf der B&uuml;hne";
const f23="Hosts singen";
const f24="im Greenroom wird gesoffen";
const f25="random Schloss oder Burg im Einspieler";
const f26="Ein Host singt"
const f27="der Gewinner ist ein Solokünstler"
const f28="Jemand wedelt mit einem Glowstick";
const f29="Ein*e Punkte-Korrespondet*in ist ehemalige*r ESC-Teilnehmer*in";
const f30="Die Hosts reden synchron";
const f31="Jegliche queere Flagge";
const f32="technische Panne";
const f33="Nebelmaschine!! Wo ist die B&uuml;hne???";
const f34="etwas 'unpolitisch politisches'";
const f35="die Franzosen weigern sich englisch zu sprechen";
const f36="Alexander Rybak";
const f37="tanzen im Liegen";
const f38 = "jemand macht ein Handherz";
const f39 = "jemand weint";
const f40 = "Bandmitglieder küssen sich";
const f41 = "queerbaiting";
const f42 = "Jemand aus euer Watchparty spricht über LENA";

let finput1 = "";
let finput2 = "";
let finput3 = "";
let felder = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f19,f20,f21,f22,f23,f24,f25,f26,f27,f28,f29,f30,f31,f32,f33,f34,f35,f36,f37,f38,f39,f40,f41,f42];
let checked = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

if(localStorage.getItem("checked") === null){
  localStorage.setItem("checked", JSON.stringify(checked));
} else {
  checked = JSON.parse( localStorage.getItem("checked"));
  loadChecked();
}

function init(){
  startPopUp();
  addallEventListeners();
}
init(); 

function startPopUp(){
    document.getElementById("submit").addEventListener("click", submitOnClick);
    if(localStorage.getItem("popupClosed")){
      hide("popup2");
      buildApp();
    }
}

function addallEventListeners(){
  let fields = document.getElementsByClassName("field");
  for(let i=0; i<fields.length; i++){
    fields[i].addEventListener("click", function(e){
      setCheckedOnLS(i);
      checkBingo(i);
      e.stopPropagation();
      e.preventDefault();
    })
  }
}


function setCheckedOnLS(field){
  cb = document.getElementById("f" + field);
  if(checked[field]){
    checked[field] = false;
    cb.checked = false;
  } else {
    checked[field] = true;
    cb.checked = true;
  }
  localStorage.setItem("checked", JSON.stringify(checked));
}

function loadChecked(){
  let fields = document.getElementsByClassName("field");
  for(let i=0; i<fields.length; i++){
    if(checked[i]){
      fields[i].firstChild.checked = true;
    }
  }
}

//loggt VERLOREN zwei mal, GEWONNEN aber nur ein mal, warum?
function checkBingo(field){
  if(verticalWin(field) || horizontalWin(field) || diagonalWin(field)){
    console.log("GEWONNEN");
    getWinScreen();
  }
}

function getWinScreen(){
  document.getElementById("popupwin").style.display = "grid";
  let refresh = document.getElementById("refresh");
  refresh.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
  })
  
}

function verticalWin(field){
  let win = true;
  let start = (roundDown(field/5)*5);

  for(let i=start; i< start+5; i++){
       win = win && document.getElementById("f"+i).checked;
  }
  return win; 
}

function horizontalWin(field){
  let win = true;
  let start = field % 5;
  for(let i=start; i< start+20; i+=5){
       win = win && document.getElementById("f"+i).checked;
  }
  return win; 
}

function diagonalWin(field){
   return (diagonalWin1(field) || diagonalWin2(field));

}


function diagonalWin1(field){
  let win = true;
  if(field % 6 == 0){
    for(let i=0; i<= 24; i+=6){
      win = win && document.getElementById("f"+i).checked;
    }
    return win; 
  }
  else{
    return false;
  }

}

function diagonalWin2(field){
  let win = true;
  if(field % 4 == 0){
    for(let i=4; i<= 20; i+=4){
      win = win && document.getElementById("f"+i).checked;
    }
    return win; 
  }
  else{
    return false;
  }
}

function submitOnClick(){
 finput1 = document.getElementById("joker1").value;
 finput2 = document.getElementById("joker2").value;
 finput3 = document.getElementById("joker3").value;
 if(! isValidJokers()){
  return;
 }
 hide("popup2");
 buildApp();
}

function buildApp(){
  localStorage.setItem("popupClosed", true);
 //check if randomized on local
 if(localStorage.getItem("felder") === null){
  //nicht vorhanden
  randomizeArray(felder);
  localStorage.setItem("felder", JSON.stringify(felder));
  } else {
    felder = JSON.parse(localStorage.getItem("felder"));
  }
  NEWgenerateInputFields();
  // ToDo: Add Jokers to localStorage
}
function hide (id) {
  document.getElementById(id).style.display ='none';
}


function generateInputFields(){
  randomizeArray(felder);
  checkInputs();
  var newHtml = "";
 for (var i=0; i<25; i++){
   if(i%5==0){
     newHtml += '<div class="row">'
   }
   newHtml += '<div class="field"><input type="checkbox" id="f' + i + '"> <label for="f' + i + '">' + felder[i] + '</label></div>';
  // if (i==4||i==9|| i==14|| i==19|| i==24){
  if ((i-4)%5==0){
     newHtml+= '</div>';
   }
  }

  document.getElementById("bingo").innerHTML = newHtml;
}
// NEUE FUNKTION DOM MANIPULATION
function NEWgenerateInputFields(){
  checkInputs();
  for(var i=0; i<25; i++){
    document.getElementById("l" + i).innerHTML = felder[i];
  }
}



function randomizeArray(arr){
  for (var i = arr.length-1; i>0; i--){
    // var j = Math.floor(Math.random()*(i+1);
    var j = getRandomInt(i+1);
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
}

function checkInputs(){
  if (finput1 != "" && finput2 != "" && finput3 != "" ){
    let xyz = threeRandomInts(24);
    console.log(xyz);
    felder[xyz[0]] = finput1;
    felder[xyz[1]] = finput2;
    felder[xyz[2]] = finput3;
    localStorage.setItem("felder", JSON.stringify(felder));
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function threeRandomInts(max){
  let x = null;
  let y = null;
  let z = null;
  while( x== y || y==z || z==x){
    x = getRandomInt(24);
    y = getRandomInt(24);
    z = getRandomInt(24);
  }
  return [x,y,z];
}

function roundDown(number, decimals) {
    decimals = decimals || 0;
    return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
}

function isValidJokers(){
  let error = 0;
  if (finput1 == "" || finput2 == "" || finput3 == ""){
    error += 1;
  }
  if (finput1.length < 5 || finput2.length < 5 || finput3.length < 5){
    error += 1;
  }
  return (error == 0);
}
