let areas = {
  a: null,
  b: null,
  c: null,
};

//functions item
const dragStart = (e) => {
  e.currentTarget.classList.add("dragging");
};

const dragEnd = (e) => {
  e.currentTarget.classList.remove("dragging");
};
//functions area
const dragOver = (e) => {
  if (e.currentTarget.querySelector(".item") === null) {
    e.preventDefault(); //libera o drop
    e.currentTarget.classList.add("hover");
  }
};
const dragLeave = (e) => {
  e.currentTarget.classList.remove("hover");
};
const drop = (e) => {
  e.currentTarget.classList.remove("hover");

  let dragItem = document.querySelector(".item.dragging"); //item sendo arrastado

  //verificação se há item dentro da area
  if (e.currentTarget.querySelector(".item") === null) {
    e.currentTarget.appendChild(dragItem); //add no final da area, como nao há item nenhum, será o unico
    //appendChild adiciona o item literalmente, nao cria clone
    uptadeAreas();
  }
};
//functions area neutral
const dragOverNeutral = (e) => {
  e.preventDefault(); //libera o drop
  e.currentTarget.classList.add("hover");
};
const dragLeaveNeutral = (e) => {
  e.currentTarget.classList.remove("hover");
};
const dropNeutral = (e) => {
  e.currentTarget.classList.remove("hover");

  let dragItem = document.querySelector(".item.dragging");
  e.currentTarget.appendChild(dragItem);
  uptadeAreas();
};
//logic functions
const uptadeAreas = () => {
  document.querySelectorAll(".area").forEach((area) => {
    let name = area.getAttribute("data-name");

    //se a area nao está vazia, jogue o VALOR de CADA CAIXA dentro de 'AREAS' (a,b,c)
    if (area.querySelector(".item") !== null) {
      //a,b,c dentro de area = conteudo em cada caixa
      areas[name] = area.querySelector(".item").innerHTML;
    } else {
      areas[name] = null;
    }

    //verificação para dar CLASS CORRECT em AREAS
    if (areas.a === "1" && areas.b === "2" && areas.c === "3") {
      document.querySelector(".areas").classList.add("correct");
    } else {
      document.querySelector(".areas").classList.remove("correct");
    }
  });
};
//events
document.querySelectorAll(".item").forEach((i) => {
  i.addEventListener("dragstart", dragStart); //start arrastar
  i.addEventListener("dragend", dragEnd); //finish arrastar
});
document.querySelectorAll(".area").forEach((i) => {
  //eventos para area onde você pode 'pôr' algo
  i.addEventListener("dragover", dragOver); //ao ITEM PASSAR pela AREA
  i.addEventListener("dragleave", dragLeave); //ao ITEM SAIR da AREA
  i.addEventListener("drop", drop); //ao ficar na area
});
document
  .querySelector(".neutralArea")
  .addEventListener("dragover", dragOverNeutral);
document
  .querySelector(".neutralArea")
  .addEventListener("dragleave", dragLeaveNeutral);
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral);
