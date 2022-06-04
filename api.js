function fetchdata() {
  // datani api den cekmek ucun
  fetch("https://api.npoint.io/ec21414b0e15972dbfde/data")
    .then((response) => {
      if (!response.ok) {
        document.body.innerHTML = "Erororororororo";
        throw Error("erroreeeeee");
      }
      return response.json();
    })
    .then((data) => {
      // sehife yuklenerken ilkin melumati usere gostermek ucun

      CreditAccaunts(data);
    })
    .catch((error) => console.log(error));
}

fetchdata();

// userleri load etmek ucun funksiyasi
function LoadUserComponent(obj) {
  obj.loans.map((loan) => {
    let ContainerForCredit = document.createElement("div");
    ContainerForCredit.classList.add("cont");
    let loanerComp = document.createElement("div");
    loanerComp.classList.add("alert-primary");
    loanerComp.classList.add("alert");
    let amountComp = document.createElement("p");
    amountComp.classList.add("alert-secondary");
    amountComp.classList.add("alert");
    let isActiveComp = document.createElement("p");

    isActiveComp.classList.add("alert-success");
    isActiveComp.classList.add("alert");

    let MonthlyPayComp = document.createElement("div");

    MonthlyPayComp.classList.add("alert-info");
    MonthlyPayComp.classList.add("alert");

    let DuemontComp = document.createElement("div");

    DuemontComp.classList.add("alert-light");
    DuemontComp.classList.add("alert");

    let StartEnd = document.createElement("div");

    StartEnd.classList.add("alert-warning");
    StartEnd.classList.add("alert");

    let loaner = loan.loaner;
    let amount = loan.amount.value;
    let currency = loan.amount.currency;
    let isActive = loan.closed;

    if (loan.perMonth) {
      let monthlyPay = loan.perMonth.value;
      MonthlyPayComp.innerHTML = `Ayliq odenishi ${monthlyPay} ${currency}`;
    }

    let dueamount = loan.dueAmount.value;
    let start = loan.loanPeriod.start;
    let end = loan.loanPeriod.end;

    loanerComp.innerHTML = `Loaner ---- ${loaner}`;
    amountComp.innerHTML = `Amount ---- ${amount} ${currency}`;
    isActiveComp.innerHTML = `Is Closed ---- ${isActive}`;

    DuemontComp.innerHTML = `Due Amount ---- ${dueamount} ${currency}`;
    StartEnd.innerHTML = `Baslangic tarix  -${start}  Bitme tarixi - ${end}`;

    ContainerForCredit.appendChild(loanerComp);
    ContainerForCredit.appendChild(amountComp);

    ContainerForCredit.appendChild(isActiveComp);

    ContainerForCredit.appendChild(MonthlyPayComp);

    ContainerForCredit.appendChild(DuemontComp);

    ContainerForCredit.appendChild(StartEnd);

    modal.appendChild(ContainerForCredit);
  });
}

function ActiveCredits(obj) {
  obj.map((user) => {
    let name = user.name;
    let namefield = document.createElement("h4");

    namefield.innerHTML = name;
    namefield.classList.add("bg-primary");
    modal.appendChild(namefield);
    user.loans.map((loan) => {
      if (!loan.closed) {
        let ContainerForCredit = document.createElement("div");
        ContainerForCredit.classList.add("cont");
        let loanerComp = document.createElement("div");
        loanerComp.classList.add("alert-primary");
        loanerComp.classList.add("alert");
        let amountComp = document.createElement("p");
        amountComp.classList.add("alert-secondary");
        amountComp.classList.add("alert");
        let isActiveComp = document.createElement("p");

        isActiveComp.classList.add("alert-success");
        isActiveComp.classList.add("alert");

        let MonthlyPayComp = document.createElement("div");

        MonthlyPayComp.classList.add("alert-info");
        MonthlyPayComp.classList.add("alert");

        let DuemontComp = document.createElement("div");

        DuemontComp.classList.add("alert-light");
        DuemontComp.classList.add("alert");

        let StartEnd = document.createElement("div");

        StartEnd.classList.add("alert-warning");
        StartEnd.classList.add("alert");

        let loaner = loan.loaner;
        let amount = loan.amount.value;
        let currency = loan.amount.currency;
        let isActive = loan.closed;

        if (loan.perMonth) {
          let monthlyPay = loan.perMonth.value;
          MonthlyPayComp.innerHTML = `Ayliq odenishi ${monthlyPay} ${currency}`;
        }

        let dueamount = loan.dueAmount.value;
        let start = loan.loanPeriod.start;
        let end = loan.loanPeriod.end;

        loanerComp.innerHTML = `Loaner ---- ${loaner}`;
        amountComp.innerHTML = `Amount ---- ${amount} ${currency}`;
        isActiveComp.innerHTML = `Is Closed ---- ${isActive}`;

        DuemontComp.innerHTML = `Due Amount ---- ${dueamount} ${currency}`;
        StartEnd.innerHTML = `Baslangic tarix  -${start}  Bitme tarixi - ${end}`;

        ContainerForCredit.appendChild(loanerComp);
        ContainerForCredit.appendChild(amountComp);

        ContainerForCredit.appendChild(isActiveComp);

        ContainerForCredit.appendChild(MonthlyPayComp);

        ContainerForCredit.appendChild(DuemontComp);

        ContainerForCredit.appendChild(StartEnd);

        modal.appendChild(ContainerForCredit);
      }
    });
  });
}

function CreditAccaunts(obj) {
  let main = document.querySelector("#app");
  let modal = document.querySelector("#modal");

  let closeModal = document.createElement("button");

  closeModal.innerText = "Bagla";
  modal.appendChild(closeModal);
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  obj.map((user) => {
    let container = document.createElement("div");
    container.classList.add("mato");
    let name = document.createElement("p");

    name.classList.add("h3");
    name.innerText = ` ${user.name} ${user.surname}`;
    let image = document.createElement("img");
    image.classList.add("img-thumbnail");
    image.src = user.img;
    let salary = document.createElement("div");
    salary.classList.add("bg-primary");
    salary.innerText = `Monthly Salary :: ${user.salary.value} ${user.salary.currency}`;
    let loanclosed = document.createElement("div");
    loanclosed.classList.add("bg-danger");
    let monthlyPay = document.createElement("div");
    monthlyPay.classList.add("bg-secondary");
    let vla = 0;
    let canApplyLoan = document.createElement("div");

    canApplyLoan.classList.add("bg-warning");
    let currency45 = (user.salary.value * 45) / 100;

    // userin cemi ayliq odenishini hesablamaq ucun  ve eger aktiv krediti varsa onu tapmaq ucun

    user.loans.map((loan) => {
      if (!loan.closed) {
        vla += loan.perMonth.value;
        loanclosed.innerHTML = `Aktiv krediti var`;
      }
    });

    monthlyPay.innerHTML = `Total monthly pay ${vla} ${user.salary.currency}`;
    // eger userin ayliq odenisi onun maashinin 45% den yuxari deyilse
    if (vla <= currency45) {
      canApplyLoan.innerText = `${user.name} ${user.surname} yeniden kredit sifarishi vere biler`;
      canApplyLoan.classList.add("bg-success");
      canApplyLoan.classList.remove("bg-warning");
    } else {
      canApplyLoan.innerText = `${user.name} ${user.surname} yeniden kredit sifarishi vere bilmez`;
      canApplyLoan.classList.remove("bg-warning");
      canApplyLoan.classList.add("bg-danger");
    }

    container.appendChild(name);
    container.appendChild(image);
    container.appendChild(salary);
    container.appendChild(loanclosed);
    container.appendChild(monthlyPay);
    container.appendChild(canApplyLoan);

    main.appendChild(container);

    container.addEventListener("click", function () {
      modal.style.display = "block";
      modal.innerHTML = "";
      let cont = document.createElement("div");
      cont.classList.add("cont");

      let search = document.createElement("input");

      search.classList.add("form-control");
      search.placeholder =
        "Search by name or surname...(Please after typing click enter)";

      closeModal.classList.add("btn");
      closeModal.classList.add("btn-warning");

      let aktiv = document.createElement("button");
      aktiv.classList.add("btn");
      aktiv.classList.add("btn-info");
      aktiv.classList.add("but");
      aktiv.innerText = "Aktiv kreditler";

      modal.appendChild(cont);
      cont.appendChild(search);
      modal.appendChild(aktiv);
      modal.appendChild(closeModal);

      //   search olunduqda  kredit tarixcesini tapmaq

      search.addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
          modal.innerHTML = "";
          modal.appendChild(closeModal);
          if (search.value) {
            let val = search.value.trim().toUpperCase();

            obj.map((user) => {
              if (
                val === user.name.toUpperCase() ||
                val === user.surname.toUpperCase()
              ) {
                LoadUserComponent(user);
              }
            });
          }
        }
      });

      //   Aktiv kreditler butona klikde yalniz aktivleri gostersin
      aktiv.addEventListener("click", function () {
        modal.style.display = "block";
        modal.innerHTML = "";

        closeModal.innerText = "Bagla";
        modal.appendChild(closeModal);
        let aktiv = document.createElement("button");
        aktiv.innerText = "Aktiv kreditler";

        ActiveCredits(obj);
      });

      obj.map((user) => {
        // userlere klik olarken butun kredit tarixcelerini ekrana getirmek ucun
        let name = user.name;
        let namefield = document.createElement("h4");

        namefield.innerHTML = name;
        namefield.classList.add("bg-primary");
        modal.appendChild(namefield);

        LoadUserComponent(user);
      });
    });
  });
}
