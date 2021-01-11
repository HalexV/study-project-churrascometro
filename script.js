function addHiddenAttribute(element) {
  element.setAttribute("hidden", true);
}

function removeHiddenAttribute(element) {
  element.removeAttribute("hidden");
}

function addRequiredAttribute(element) {
  element.required = true;
}

function removeRequiredAttribute(element) {
  element.required = false;
}

function toggleDependentInput(element, idHiddenInput) {
  const hiddenLabel = document.querySelector(`label[for=${idHiddenInput}]`);
  const hiddenInput = document.getElementById(idHiddenInput);

  if (element.checked === true) {
    removeHiddenAttribute(hiddenLabel);
    removeHiddenAttribute(hiddenInput);

    addRequiredAttribute(hiddenInput);
  } else {
    addHiddenAttribute(hiddenLabel);
    addHiddenAttribute(hiddenInput);

    removeRequiredAttribute(hiddenInput);
  }
}

//=============================

let churrascometroForm = null;

function defineFormulas(duration) {
  const FORMULAS = {};

  FORMULAS.totalBarbecueGrill = (totalMeat) => {
    const totalBarbecueGrill = Math.round(totalMeat / 1000 / 10);

    if (totalBarbecueGrill === 0) {
      return 1;
    }

    return totalBarbecueGrill;
  };

  FORMULAS.totalTable = (adults, kids) => Math.ceil((adults + kids) / 4);

  if (duration < 6) {
    FORMULAS.totalMeat = (adults, kids) => {
      const MEAT = 400;
      return adults * MEAT + (kids * MEAT) / 2;
    };

    FORMULAS.totalBeer = (adults) => {
      const BEER = 1200;
      return adults * BEER;
    };

    FORMULAS.totalSJW = (adults, kids) => {
      //SJW: Soda, Juice or Water
      const SJW = 1000;
      return adults * SJW + (kids * SJW) / 2;
    };

    FORMULAS.totalManioc = (adults, kids) => {
      const MANIOC = (40 / 100) * 400;
      return adults * MANIOC + (kids * MANIOC) / 2;
    };

    FORMULAS.totalCrumbs = (adults, kids) => {
      const CRUMBS = (10 / 100) * 400;
      return adults * CRUMBS + (kids * CRUMBS) / 2;
    };

    FORMULAS.totalVinagrete = (adults, kids) => {
      const VINAGRETE = (20 / 100) * 400;
      return adults * VINAGRETE + (kids * VINAGRETE) / 2;
    };

    FORMULAS.totalCharcoal = (totalBarbecueGrill) => {
      const CHARCOAL = 2;
      return totalBarbecueGrill * CHARCOAL;
    };

    FORMULAS.cook = (barbecueGrills) => Math.ceil(barbecueGrills / 2);
  } else {
    FORMULAS.totalMeat = (adults, kids) => {
      const MEAT = 650;
      return adults * MEAT + (kids * MEAT) / 2;
    };

    FORMULAS.totalBeer = (adults) => {
      const BEER = 2000;
      return adults * BEER;
    };

    FORMULAS.totalSJW = (adults, kids) => {
      //SJW: Soda, Juice or Water
      const SJW = 1500;
      return adults * SJW + (kids * SJW) / 2;
    };

    FORMULAS.totalManioc = (adults, kids) => {
      const MANIOC = (40 / 100) * 650;
      return adults * MANIOC + (kids * MANIOC) / 2;
    };

    FORMULAS.totalCrumbs = (adults, kids) => {
      const CRUMBS = (10 / 100) * 650;
      return adults * CRUMBS + (kids * CRUMBS) / 2;
    };

    FORMULAS.totalVinagrete = (adults, kids) => {
      const VINAGRETE = (20 / 100) * 650;
      return adults * VINAGRETE + (kids * VINAGRETE) / 2;
    };

    FORMULAS.totalCharcoal = (totalBarbecueGrill) => {
      const CHARCOAL = 3;
      return totalBarbecueGrill * CHARCOAL;
    };

    FORMULAS.cook = (barbecueGrills) => Math.ceil((barbecueGrills / 2) * 2);
  }

  return FORMULAS;
}

function checkMeatDistribution(meatSelected) {
  //The sum of the percents must be equal to 100
  let percentSum = 0;

  for (meat of meatSelected) {
    percentSum += meat.percent;
  }

  if (percentSum !== 100) {
    return false;
  } else {
    return true;
  }
}

function backForm() {
  const renderingArea = document.getElementById("rendering-area");
  const resultsContainer = document.getElementsByClassName(
    "resultsContainer"
  )[0];

  renderingArea.removeChild(resultsContainer);
  renderingArea.appendChild(churrascometroForm);
}

function translateTypeToBR(type) {
  switch (type) {
    case "cattle":
      return "boi";
    case "pork":
      return "porco";
    case "fish":
      return "peixe";
    case "chicken":
      return "frango";
    case "beer":
      return "cerveja";
    case "soda":
      return "refrigerante";
    case "juice":
      return "suco";
    case "manioc":
      return "mandioca";
    case "crumbs":
      return "farofa";
    case "vinagrete":
      return "vinagrete";
  }
}

function adjustKilogram(total) {
  if (total >= 1000) {
    return `${total / 1000} Kg`;
  }

  return `${total} g`;
}
function adjustLiter(total) {
  if (total >= 1000) {
    return `${total / 1000} L`;
  }

  return `${total} Ml`;
}

function mountResult(meatResult, drinkResult, extraResult, recommendations) {
  const renderingArea = document.getElementById("rendering-area");
  renderingArea.removeChild(churrascometroForm);

  const resultsContainer = document.createElement("div");
  const resultTop = document.createElement("div");
  const resultBottom = document.createElement("div");

  const h1ResultTop = document.createElement("h1");
  const h1ResultBottom = document.createElement("h1");

  const ulResultTop = document.createElement("ul");
  const ulResultBottom = document.createElement("ul");

  const backButton = document.createElement("button");

  backButton.addEventListener("click", backForm);

  resultsContainer.classList.add("resultsContainer");
  resultTop.classList.add("results");
  resultBottom.classList.add("results");

  h1ResultTop.textContent = "Resultado";
  h1ResultBottom.textContent = "Recomendações";
  backButton.textContent = "Voltar";

  resultTop.appendChild(h1ResultTop);
  resultBottom.appendChild(h1ResultBottom);

  for (meatItem of meatResult) {
    let liElement = document.createElement("li");

    liElement.textContent = `${adjustKilogram(
      meatItem.total
    )} de ${translateTypeToBR(meatItem.type)}`;

    ulResultTop.appendChild(liElement);
  }

  for (drinkItem of drinkResult) {
    let liElement = document.createElement("li");

    liElement.textContent = `${adjustLiter(
      drinkItem.total
    )} de ${translateTypeToBR(drinkItem.type)}`;

    ulResultTop.appendChild(liElement);
  }

  for (extraItem of extraResult) {
    let liElement = document.createElement("li");

    liElement.textContent = `${adjustKilogram(
      extraItem.total
    )} de ${translateTypeToBR(extraItem.type)}`;

    ulResultTop.appendChild(liElement);
  }

  ulResultBottom.innerHTML = `
    <li>${adjustLiter(recommendations.totalDrinkWater)} de água</li>
    <li>${recommendations.totalBarbecueGrill} churrasqueira(s)</li>
    <li>${recommendations.totalCharcoal} saco(s) de carvão</li>
    <li>${recommendations.totalCook} churrasqueiro(s)</li>
    <li>${recommendations.totalChair} cadeira(s)</li>
    <li>${recommendations.totalTable} mesa(s)</li>
  `;

  resultTop.appendChild(ulResultTop);
  resultBottom.appendChild(ulResultBottom);

  resultsContainer.appendChild(resultTop);
  resultsContainer.appendChild(resultBottom);
  resultsContainer.appendChild(backButton);

  renderingArea.appendChild(resultsContainer);
}

function process(e, form) {
  e.preventDefault();

  churrascometroForm = form;

  const meatResult = [];
  const drinkResult = [];
  const extraResult = [];

  const recommendations = {};

  const adults = Number(form.adults.value);
  const kids = Number(form.kids.value);
  const duration = Number(form.duration.value);

  const meatOptions = form.meats;
  const drinkOptions = form.drinks;
  const extraOptions = form.extras;

  const formulas = defineFormulas(duration);

  const totalMeat = formulas.totalMeat(adults, kids);

  let anyOptionSelected = false;

  for (let i = 0; i < meatOptions.length; i++) {
    if (meatOptions[i].checked) {
      let obj = {};
      anyOptionSelected = true;

      obj.type = meatOptions[i].value;
      obj.percent = Number(form[`percent-${obj.type}`].value);

      meatResult.push(obj);
    }
  }

  if (!anyOptionSelected) {
    alert("Marque pelo menos uma opção de carne!");
    return;
  }

  if (!checkMeatDistribution(meatResult)) {
    alert(
      "A soma das porcentagens das carnes selecionadas devem ser igual a 100%!"
    );
    return;
  }

  for (meatItem of meatResult) {
    meatItem.total = (meatItem.percent / 100) * totalMeat;
  }

  for (let i = 0; i < drinkOptions.length; i++) {
    if (drinkOptions[i].checked) {
      let obj = {};

      obj.type = drinkOptions[i].value;
      obj.percent = Number(form[`percent-people-${obj.type}`].value);

      drinkResult.push(obj);
    }
  }

  for (drinkItem of drinkResult) {
    switch (drinkItem.type) {
      case "beer":
        drinkItem.total =
          (drinkItem.percent / 100) * formulas.totalBeer(adults);

        break;
      case "soda":
        drinkItem.total =
          (drinkItem.percent / 100) * formulas.totalSJW(adults, kids);

        break;
      case "juice":
        drinkItem.total =
          (drinkItem.percent / 100) * formulas.totalSJW(adults, kids);

        break;
      default: {
        alert("Erro bebidas");
        break;
      }
    }
  }

  for (let i = 0; i < extraOptions.length; i++) {
    if (extraOptions[i].checked) {
      let obj = {};

      obj.type = extraOptions[i].value;

      extraResult.push(obj);
    }
  }

  for (extraItem of extraResult) {
    switch (extraItem.type) {
      case "manioc":
        extraItem.total = formulas.totalManioc(adults, kids);
        break;
      case "crumbs":
        extraItem.total = formulas.totalCrumbs(adults, kids);
        break;
      case "vinagrete":
        extraItem.total = formulas.totalVinagrete(adults, kids);
        break;
      default:
        alert("Erro opções extras");
        break;
    }
  }

  recommendations.totalDrinkWater = formulas.totalSJW(adults, kids);
  recommendations.totalBarbecueGrill = formulas.totalBarbecueGrill(totalMeat);
  recommendations.totalCharcoal = formulas.totalCharcoal(
    recommendations.totalBarbecueGrill
  );
  recommendations.totalCook = formulas.cook(recommendations.totalBarbecueGrill);
  recommendations.totalChair = adults + kids;
  recommendations.totalTable = formulas.totalTable(adults, kids);

  mountResult(meatResult, drinkResult, extraResult, recommendations);
}
