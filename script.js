// CLOCK
function updateTime(){
  document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}
setInterval(updateTime,1000);

// WINDOWS
var biggestIndex=1;
var topBar = document.querySelector("#top");

function openWindow(element){
  element.style.display="flex";
  biggestIndex++;
  element.style.zIndex=biggestIndex;
  topBar.style.zIndex=biggestIndex+1;
}
function closeWindow(element){
  element.style.display="none";
}
function addWindowTapHandling(element){
  element.addEventListener("mousedown",()=>{
    biggestIndex++;
    element.style.zIndex=biggestIndex;
    topBar.style.zIndex=biggestIndex+1;
  });
}

// DRAG
function dragElement(element){
  let startX=0;
  let startY=0;
  document.getElementById(element.id+"header").onmousedown=startDrag;
  function startDrag(e){
    startX=e.clientX;
    startY=e.clientY;
    document.onmousemove=drag;
    document.onmouseup=stop;
  }
  function drag(e){
    let x=startX-e.clientX;
    let y=startY-e.clientY;
    startX=e.clientX;
    startY=e.clientY;
    let newTop = element.offsetTop-y;
    let newLeft = element.offsetLeft-x;
    if(newTop < 70){ newTop=70; }
    element.style.top=newTop+"px";
    element.style.left=newLeft+"px";
  }
  function stop(){
    document.onmousemove=null;
  }
}

// SELECT WINDOWS
var welcome = document.querySelector("#welcome");
var notes = document.querySelector("#notes");
var terminal = document.querySelector("#terminal");
var photos = document.querySelector("#photos");

dragElement(welcome);
dragElement(notes);
dragElement(terminal);
dragElement(photos);

addWindowTapHandling(welcome);
addWindowTapHandling(notes);
addWindowTapHandling(terminal);
addWindowTapHandling(photos);

// BUTTONS
document.querySelector("#welcomeclose").onclick=()=>{ closeWindow(welcome); };
document.querySelector("#notesclose").onclick=()=>{ closeWindow(notes); };
document.querySelector("#terminalclose").onclick=()=>{ closeWindow(terminal); };
document.querySelector("#photosclose").onclick=()=>{ closeWindow(photos); };

document.querySelector("#welcomeopen").onclick=()=>{ openWindow(welcome); };

// APP ICONS
document.querySelector("#notesIcon").onclick=()=>{ openWindow(notes); };
document.querySelector("#terminalIcon").onclick=()=>{
  openWindow(terminal);
  document.querySelector("#terminalInput").focus();
};
document.querySelector("#photosIcon").onclick=()=>{ openWindow(photos); };

// NOTES DATA
var content=[
  {
    title:"Welcome",
    date:"21-06-2026",
    color:"linear-gradient(135deg,#050505,#14213d)",
    content:`
      <h2>Welcome to Noid Notes 🚀</h2>
      <p>This is my first app inside Noid OS.</p>
      <p>Ideas, projects and thoughts.</p>
      <p>If you like it, star the repo on github! (see the Me page for the github)</p>
      <p>Or if you don't wanna do that, see the project on stardance!</h>
    `
  },
  {
    title:"Me",
    date:"21-06-2026",
    color:"linear-gradient(135deg,#330033,#660066)",
    content:`
      <h2>Hi I am Noid DEV 👨‍💻</h2>
      <p>I create websites and open source software.</p>
      <a href="https://github.com/its-noid-dev"> My github </a>
      <a href="https://github.com/its-noid-dev/noidwebos"> This project </a>
    `
  },
  {
    title:"Why",
    date:"11-06-2026",
    color:"linear-gradient(135deg,#003333,#006666)",
    content:`
      <h2>Why Noid OS?</h2>
      <p>Made for Hack Club Stardance.</p>
      <p>Built with HTML CSS and JavaScript.</p>
    `
  }
];

// NOTES SYSTEM
var sidebar = document.querySelector("#sidebar");
var noteText = document.querySelector("#noteText");

function setNotesContent(index){
  noteText.innerHTML = content[index].content;
  document.body.style.background = content[index].color;
  document.querySelector("#appStatus").innerHTML = "📝 "+content[index].title;
}
function addToSidebar(index){
  let note=content[index];
  let div=document.createElement("div");
  div.innerHTML=`<b>${note.title}</b><br><small>${note.date}</small>`;
  div.onclick=()=>{ setNotesContent(index); };
  sidebar.appendChild(div);
}
for(let i=0;i<content.length;i++){
  addToSidebar(i);
}
setNotesContent(0);

// =====================
// TERMINAL APP
// =====================
var terminalOutput = document.querySelector("#terminalOutput");
var terminalInput = document.querySelector("#terminalInput");
var terminalWindow = document.querySelector("#terminalWindow");

// site files this "open source" terminal can show
var siteFiles = {
  "index.html": "<!-- The main HTML structure of Noid OS -->",
  "style.css": "/* All styling for windows, icons and apps */",
  "script.js": "// All the JavaScript logic that powers Noid OS",
  "image1.jpeg": "[binary image file]",
  "terminal.png": "[binary image file]",
  "pic1.png": "[binary image file]",
  "pic2.png": "[binary image file]",
  "pic3.png": "[binary image file]",
  "pic4.png": "[binary image file]",
  "pic5.png": "[binary image file]",
  "pic6.png": "[binary image file]",
  "pic7.png": "[binary image file]",
  "pic8.png": "[binary image file]",
  "pic9.png": "[binary image file]",
  "pic10.png": "[binary image file]"
};

function printLine(text){
  let line = document.createElement("div");
  line.className="terminalEntry";
  line.innerHTML = text;
  terminalOutput.appendChild(line);
  terminalWindow.scrollTop = terminalWindow.scrollHeight;
}

function printCommandEcho(cmd){
  printLine(`<span class="prompt">noid@noidOS:~$</span> ${cmd}`);
}

var steamTrainFrames = [
`
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|
__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/
`,
`
       ====        ________                ___________
   _D _|  |_______/        \\__I_I_____===__|_________|
    |(_)---  |   H\\________/ |   |        =|___ ___|
    /     |  |   H  |  |     |   |         ||_| |_||
   |      |  |   H  |__--------------------| [___] |
   | ________|___H__/__|_____/[][]~\\_______|       |
   |/ |   |-----------I_____I [][] []  D   |=======|
 __/ =| o |=-O=====O=====O=====O \\ ____Y___________|__
  |/-=|___|=    ||    ||    ||    |_____/~\\___/
   \\_/      \\__/  \\__/  \\__/  \\__/      \\_/
`
];

function runSteamTrain(){
  let trainLine = document.createElement("div");
  trainLine.className="terminalEntry steamtrain";
  terminalOutput.appendChild(trainLine);

  let frame = 0;
  let position = 60;
  printLine("🚂 choo choo! (press Ctrl+C style — it'll stop on its own)");

  let interval = setInterval(()=>{
    let pad = " ".repeat(Math.max(position,0));
    let art = steamTrainFrames[frame % steamTrainFrames.length]
      .split("\n")
      .map(l => pad + l)
      .join("\n");
    trainLine.textContent = art;
    terminalWindow.scrollTop = terminalWindow.scrollHeight;

    frame++;
    position -= 4;

    if(position < -80){
      clearInterval(interval);
      printLine("");
    }
  },100);
}

function runCommand(raw){
  let cmd = raw.trim();
  printCommandEcho(cmd);

  if(cmd === ""){
    return;
  }

  let parts = cmd.split(" ");
  let base = parts[0];

  if(base === "help"){
    printLine(
`Available commands:
  help          show this help message
  ls            list site files (open source!)
  cat [file]    print a short description of a file
  whoami        who is running Noid OS
  date          show current date and time
  clear         clear the terminal screen
  sl            choo choo 🚂`
    );
  } else if(base === "ls"){
    printLine(Object.keys(siteFiles).join("&nbsp;&nbsp;&nbsp;"));
  } else if(base === "cat"){
    let file = parts[1];
    if(!file){
      printLine("usage: cat [file]");
    } else if(siteFiles[file]){
      printLine(siteFiles[file]);
    } else {
      printLine(`cat: ${file}: No such file`);
    }
  } else if(base === "whoami"){
    printLine("noid — builder of Noid OS, open source on GitHub");
  } else if(base === "date"){
    printLine(new Date().toString());
  } else if(base === "clear"){
    terminalOutput.innerHTML="";
  } else if(base === "sl"){
    runSteamTrain();
  } else {
    printLine(`command not found: ${base} (try "help")`);
  }
}

printLine("Welcome to Noid Terminal. Type \"help\" to get started.");

terminalInput.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    let val = terminalInput.value;
    terminalInput.value="";
    runCommand(val);
  }
});

terminalWindow.addEventListener("mousedown",(e)=>{
  if(e.target !== terminalInput){
    terminalInput.focus();
  }
});

// =====================
// PHOTOS APP
// =====================
var photoIndex = 1;
var totalPhotos = 10;
var photoDisplay = document.querySelector("#photoDisplay");
var photoCounter = document.querySelector("#photoCounter");

function setPhoto(index){
  photoIndex = index;
  photoDisplay.src = `./pic${photoIndex}.png`;
  photoCounter.innerHTML = `${photoIndex} / ${totalPhotos}`;
}

document.querySelector("#photoPrev").onclick=()=>{
  let newIndex = photoIndex - 1;
  if(newIndex < 1){ newIndex = totalPhotos; }
  setPhoto(newIndex);
};
document.querySelector("#photoNext").onclick=()=>{
  let newIndex = photoIndex + 1;
  if(newIndex > totalPhotos){ newIndex = 1; }
  setPhoto(newIndex);
};

setPhoto(1);