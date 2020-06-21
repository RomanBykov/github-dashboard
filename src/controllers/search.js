import SearchComponent from "../components/search";
import RepositoryController from "../controllers/repository";
import RepositoriesComponent from "../components/repositories";
import Pagination from "../components/pagination";
import {render, remove, RenderPosition} from "../utils/render";
import RepositoryModel from "../models/repository";


const renderRepositories = (container, repositories, api) => {
  return repositories.map((repository) => {
    const repositoryController = new RepositoryController(container, api);
    repositoryController.render(repository);

    return repositoryController;
  });
};

export default class Search {
  constructor(container, mainContainer, api) {
    this._container = container;
    this._mainContainer = mainContainer;
    this._api = api;

    this._searchComponent = null;
    this._paginationComponent = null;
    this._repositories = [];
    this._repositoriesContainerComponent = new RepositoriesComponent();
  }

  render() {
    this._searchComponent = new SearchComponent();
    render(this._container, this._searchComponent);
    render(this._mainContainer, this._repositoriesContainerComponent, RenderPosition.AFTERBEGIN);

    this._searchComponent.setSearchSubmitHandler((query) => {
      this._searchRepository(query);
    });
  }

  _searchRepository(query, pageNumber = 1) {
    this._api.searchRepositories(query, pageNumber)
    .then((response) => {
      this._removePagination();
      this._renderPagination(query, response.total_count);

      return response.items;
    })
    .then(RepositoryModel.parseRepositories)
    .then((foundedRepositories) => {
      this._removeRepositories();

      this._repositories = foundedRepositories;
      renderRepositories(this._repositoriesContainerComponent.getElement(), this._repositories, this._api);

      this._searchComponent.disableForm(false);
    });
  }

  _removePagination() {
    if (this._paginationComponent) {
      remove(this._paginationComponent);
    }
  }

  _removeRepositories() {
    if (this._repositories) {
      this._repositoriesContainerComponent.getElement().innerHTML = ``;
      this._repositories = [];
    }
  }

  _renderPagination(query, count) {
    this._paginationComponent = new Pagination(count);
    this._paginationComponent.setPageClickHandler((pageNumber) => {
      this._searchRepository(query, pageNumber);
    });

    render(this._mainContainer, this._paginationComponent);
  }
}
