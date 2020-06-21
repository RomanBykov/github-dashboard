import API from "./api";
import SearchController from "./controllers/search";


const END_POINT = `https://api.github.com/`;

const api = new API(END_POINT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const searchController = new SearchController(headerElement, mainElement, api);
searchController.render();
