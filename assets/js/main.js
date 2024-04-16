const darkBtn = document.getElementById("color_scheme");
const dropMenu = document.getElementById("menu-button");
const Menu = document.getElementById("dropMenu");
const countriesDiv = document.querySelector(".countary-container");
const headDiv = document.querySelector(".head");
const searchBar = document.getElementById("Search");
const searchBtn = document.getElementById("searchBtn");
const backbtn = document.getElementById("back");
const regions = document.querySelectorAll("#dropMenu a");

dropMenu.addEventListener("click", () => Menu.classList.toggle("hidden"));

searchBtn.addEventListener("click", () => {
  if (searchBar.value != "israel") {
    countrySearch(
      `https://restcountries.com/v3.1/name/${searchBar.value}?fullText=true`
    );
  }
  searchBar.value = "";
});

searchBar.parentElement.addEventListener("keyup", (e) => {
  if (e.code == "Enter" || e.code == "NumpadEnter") {
    countrySearch(
      `https://restcountries.com/v3.1/name/${searchBar.value}?fullText=true`
    );
    searchBar.value = "";
  }
});

darkBtn.addEventListener("click", () =>
  document.querySelector("html").classList.toggle("dark")
);

const getdata = async function (url) {
  const res = await fetch(url);
  const [data] = await res.json();

  apendCountry(
    data.name.common,
    data.population.toLocaleString("en-US", {
      style: "decimal",
    }),
    data.flags.svg,
    data.region,
    [data.capital]
  );

  if (res.ok) {
    document.querySelector("main").classList.remove("loading");
    document.querySelector(".loader").classList.add("opacity-0");
    setTimeout(() => {
      document.querySelector(".loader").classList.add("hidden");
      document
        .querySelectorAll(".country")
        .forEach((e) => e.classList.remove("opacity-0"));
    }, 700);
  }
};

const apendCountry = function (name, population, flag, region, Capital) {
  const countryHtml = `
  <div
  class="country dark:bg-D_Dark_blue max-h-[450px] w-[400px] scale-75 tablet:scale-[1] laptop:w-[315px] laptop:scale-[0.9] shadow-lg rounded-lg flex flex-col gap-[10px] mb-[30px] pb-[10px] duration-500 opacity-0 cursor-pointer"
  onclick="clickFun('${name}')"
  >
  <div class="flag w-[400px] desktop:w-[400px] laptop:w-[315px] min-h-[230px] bg-cover bg-no-repeat bg-center rounded-t-lg">
  </div>
  <div
    class="info px-[30px] my-[10px] dark:dark:text-gray-300 font-light capitalize"
  >
    <h1 class="text-[1.5em] font-semibold my-[5px] dark:text-D_White">
      ${name}
    </h1>
    <h3 class="font-light text-[1.2em]">
      <span class="mr-[10px] dark:text-D_White">Population:</span
      >${population}
    </h3>
    <h3 class="font-light text-[1.2em]">
      <span class="mr-[10px] dark:text-D_White">Region:</span>${region}
    </h3>
    <h3 class="font-light text-[1.2em]">
      <span class="mr-[10px] dark:text-D_White">Capital:</span>${Capital}
    </h3>
  </div>
  </div>
  `;

  countriesDiv.insertAdjacentHTML("afterbegin", countryHtml);
  document.querySelector(".flag").style.backgroundImage = `url(${flag})`;
};

const countrySearch = async function (url) {
  const res = await fetch(url);
  const [data] = await res.json();
  if (res.ok) {
    console.log(data);
    countriesDiv.classList.add("hidden");
    headDiv.classList.add("hidden");
    document.querySelector(".loader").classList.remove("hidden");
    setTimeout(() => {
      document.querySelector(".loader").classList.remove("opacity-0");
      document
        .querySelectorAll(".country")
        .forEach((e) => e.classList.add("opacity-0"));
    }, 500);

    setTimeout(() => {
      document.querySelector(".loader").classList.add("opacity-0");
      document.querySelector(".loader").classList.add("hidden");
      document
        .querySelectorAll(".country")
        .forEach((e) => e.classList.remove("opacity-0"));

      if (data.borders == undefined) {
        data.borders = "";
      }
      apendSearch(
        data.name.common,
        data.flags.svg,
        data.name.official,
        data.population.toLocaleString("en-US", {
          style: "decimal",
        }),
        data.region,
        data.subregion,
        [data.capital],
        data.tld[0],
        Object.values(data.currencies)[0].name,
        Object.values(data.languages)[0],
        data.borders[0],
        data.borders[1],
        data.borders[2],
        data.borders[3]
      );
    }, 3000);
  }
};

const borderName = async function (code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
  const [data] = await res.json();
  let name = data.name.common.split(" ");
  let borderBtn;
  if (name.length >= 2) {
    borderBtn = `   <button
  class="shadow-lg bg-white dark:bg-D_Dark_blue py-[10px] px-[15px] tablet:px-[25px] rounded-md dark:text-gray-300 text-[8px] tablet:text-[18px] duration-500 hover:opacity-75 text-nowrap"
  onclick="borderfun('${code}')"
  >
  ${data.name.common.split(" ")[0] + " " + data.name.common.split(" ")[1]}
  </button>`;
  } else {
    borderBtn = `   <button
    class="shadow-lg bg-white dark:bg-D_Dark_blue py-[10px] px-[15px] tablet:px-[25px] rounded-md dark:text-gray-300 text-[8px] tablet:text-[18px] duration-500 hover:opacity-75 text-nowrap"
    onclick="borderfun('${code}')"
    >
    ${data.name.common}
    </button>`;
  }
  document
    .querySelector(".border-countries")
    .insertAdjacentHTML("afterBegin", borderBtn);
};

const apendSearch = function (
  name,
  flag,
  nativeName,
  population,
  region,
  subRegion,
  capital,
  domain,
  currency,
  lang = null,
  b1 = null,
  b2 = null,
  b3 = null,
  b4 = null
) {
  const detail = `
<div class="detail-container my-[100px] ">
<button
  id="back"
  onclick="backfun()"
  class="shadow-lg  dark:bg-D_Dark_blue py-[10px] px-[25px] ml-[40px] rounded-md dark:text-gray-300 text-[15px] duration-500 hover:opacity-75"
>
  <i class="fa-solid fa-arrow-left mr-[7px]"></i> Back
</button>
<div class="detail flex flex-col laptop:flex-row laptop:py-[50px] ">
  <div class="scale-75 laptop:scale-90 laptop:w-1/2 max-h-[300px] tablet:max-h-max rounded-lg shadow-lg dark:shadow-D_Very_Dark_blue shadow-L_Dark_Gray max-w-[900px]">
    <img src="${flag}" alt="flag" class="rounded-lg w-full"/>
  </div>
  <div class="px-[30px] tablet:px-[60px] dark:text-D_Very_Light_Gray laptop:w-1/2">
    <h1 class="font-semibold text-[1.5em] my-[20px] laptop:text-[2em]">${name}</h1>
    <h3 class="font-semibold text-[0.9em] my-[4px] laptop:text-[1.2em]">
      Native Name:<span class="font-medium dark:text-gray-300 ml-[7px] "
        >${nativeName}</span
      >
    </h3>
    <h3 class="font-semibold text-[0.9em] my-[4px] laptop:text-[1.2em]">
      Population:<span class="font-medium dark:text-gray-300 ml-[7px]"
        >${population}</span
      >
    </h3>
    <h3 class="font-semibold text-[0.9em] my-[4px] laptop:text-[1.2em]">
      Region:<span class="font-medium dark:text-gray-300 ml-[7px]"
        >${region}</span
      >
    </h3>
    <h3 class="font-semibold text-[0.9em] my-[4px] laptop:text-[1.2em]">
      Sub Region:<span class="font-medium dark:text-gray-300 ml-[7px]"
        >${subRegion}</span
      >
    </h3>
    <h3 class="font-semibold text-[0.9em] my-[4px] laptop:text-[1.2em]">
      Capital:<span class="font-medium dark:text-gray-300 ml-[7px]"
        >${capital}</span
      >
    </h3>
    <div class="my-[20px]">
      <h3 class="font-semibold text-[0.9em] my-[4px ]">
        Top Level Domain:<span
          class="font-medium dark:text-gray-300 ml-[7px]"
          >${domain}</span
        >
      </h3>
      <h3 class="font-semibold text-[0.9em] my-[4px] ">
        Currencies:<span class="font-medium dark:text-gray-300 ml-[7px]"
          >${currency}</span
        >
      </h3>
      <h3 class="font-semibold text-[0.9em] my-[4px] ">
        Languages:<span class="font-medium dark:text-gray-300 ml-[7px]"
          >${lang}</span
        >
      </h3>
    </div>

    <div
      class="border-countries flex gap-[10px] tablet:gap-[25px] justify-center laptop:justify-start items-center my-[7px]"
    >
   
    </div>
  </div>
</div>
</div>
`;
  document.querySelector("main").insertAdjacentHTML("beforeend", detail);
  const borders = [b1, b2, b3, b4];
  for (b in borders) {
    if (borders[b] == "ISR" || borders[b] == null || borders[b] == undefined) {
      continue;
    }
    borderName(borders[b]);
  }
};

const backfun = function () {
  document.querySelector(".detail-container").classList.add("opacity-0");

  document.querySelector(".loader").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector(".loader").classList.remove("opacity-0");
    document
      .querySelectorAll(".country")
      .forEach((e) => e.classList.add("opacity-0"));
  }, 500);

  setTimeout(() => {
    document.querySelector(".detail-container").remove();
    countriesDiv.classList.remove("hidden");
    headDiv.classList.remove("hidden");
  }, 1000);

  setTimeout(() => {
    document.querySelector(".loader").classList.add("opacity-0");
    document
      .querySelectorAll(".country")
      .forEach((e) => e.classList.remove("opacity-0"));
  }, 2000);
};

const borderfun = function (code) {
  document.querySelector(".detail-container").remove();
  countrySearch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
};

const clickFun = function (name) {
  countrySearch(`https://restcountries.com/v3.1/name/${name}`);
};

const regionFun = async function (region, oceania) {
  const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  const data = await res.json();

  const countries = [
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
    data[randomNum(oceania)],
  ];

  if (res.ok) {
    document.querySelector("main").classList.remove("loading");
    document.querySelector(".loader").classList.remove("opacity-0", "hidden");
    countriesDiv.classList.add("opacity-0");
    setTimeout(() => {
      countriesDiv.classList.add("hidden");
      document
        .querySelectorAll(".country")
        .forEach((e) => e.classList.remove("opacity-0"));
      countriesDiv.classList.remove("hidden", "opacity-0");
      document.querySelector(".loader").classList.add("hidden", "opacity-0");
    }, 1000);
    countriesDiv.textContent = "";

    countries.forEach((e) => {
      apendCountry(
        e.name.common,
        e.population.toLocaleString("en-US", {
          style: "decimal",
        }),
        e.flags.svg,
        e.region,
        [e.capital]
      );
    });
  }
};

regions.forEach((e) => {
  e.addEventListener("click", () => {
    const region = e.textContent;
    const svg = `              <svg
    class="h-5 w-5 ml-[30px] text-L_Very_Dark_blue dark:text-D_Very_Light_Gray"
    viewbox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      clip-rule="evenodd"
    />
  </svg>`;

    document.getElementById("menu-button").textContent = region;
    document.getElementById("menu-button").insertAdjacentHTML("beforeEnd", svg);

    if (region == "Oceania") {
      regionFun(region, true);
    } else {
      regionFun(region);
    }
    Menu.classList.toggle("hidden");
  });
});

const randomNum = function (oceania = false) {
  if (oceania) return (Math.random() * 20).toFixed(0);
  else return (Math.random() * 50).toFixed(0);
};

const generateCountries = function () {
  getdata("https://restcountries.com/v3.1/name/Egypt");
  getdata("https://restcountries.com/v3.1/name/Germany");
  getdata("https://restcountries.com/v3.1/name/Saudi");
  getdata("https://restcountries.com/v3.1/name/Palestine");
  getdata("https://restcountries.com/v3.1/name/Argentina");
  getdata("https://restcountries.com/v3.1/name/usa");
  getdata("https://restcountries.com/v3.1/name/australia");
  getdata("https://restcountries.com/v3.1/name/russia");
  getdata("https://restcountries.com/v3.1/name/spain");
  getdata("https://restcountries.com/v3.1/name/qatar");
  getdata("https://restcountries.com/v3.1/name/canada");
  getdata("https://restcountries.com/v3.1/name/japan");
};
generateCountries();
