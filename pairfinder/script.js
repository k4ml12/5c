let confirm = document.getElementById("confirm");
let restart = document.getElementById("clear");
let pairtofind = [];
let pairfinded = [];
let pairposition = [];

for (var i = 0; i < 64; i++) {
  var input = document.createElement("input");
  input.className = "pairgeneral el";
  input.autocomplete = "off";
  input.id = i;
  input.maxLength = "2";

  var div = document.getElementById("items");

  div.appendChild(input);
}

let reset = () => {
  window.setInterval(location.reload(true));
};

restart.addEventListener("click", reset);

let findingFunction = () => {
  for (let i = 0; i < 64; i++) {
    thing = document.getElementById(i).value;
    pairtofind.push(thing);
  }

  const uppairtofind = pairtofind.map((element) => {
    return element.toUpperCase();
  });

  let i = 0;
  while (i < 64) {
    let finding = uppairtofind[i];
    let a = 0;

    for (let x = 0; x < 64; x++) {
      if (finding === uppairtofind[x]) {
        a++;
      }
    }
    if (a == 2) {
      pairfinded.push(finding);
      pairposition.push(i);
    }

    i++;
  }

  console.log(pairfinded);
  console.log(pairposition);

  let colors = 0;
  for (let i = 0; i < pairfinded.length; i++) {
    console.log(pairfinded);

    let first = pairfinded[i];
    let pos1 = pairfinded.indexOf(first);
    let pos2 = pairfinded.indexOf(first, pos1 + 1);

    console.log(pos1);
    console.log(pos2);

    let finded1 = document.getElementById(pairposition[pos1]);
    finded1.setAttribute("class", "pairgeneral pair" + [i]);
    console.log(finded1);
    let finded2 = document.getElementById(pairposition[pos2]);
    finded2.setAttribute("class", "pairgeneral pair" + [i]);
    console.log(finded2);

    pairfinded.splice(pos2, 1);
    pairposition.splice(pos2, 1);
    colors++;
  }
};

confirm.addEventListener("click", findingFunction);
