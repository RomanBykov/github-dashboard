import SearchComponent from "../components/search";
import RepositoryController from "../controllers/repository";
import RepositoriesComponent from "../components/repositories";
import Pagination from "../components/pagination";
import {render, remove, RenderPosition} from "../utils/render";
import RepositoryModel from "../models/repository";
import Cookie from "js-cookie";

const renderRepositories = (container, repositories, onViewChange, api) => {
  return repositories.map((repository) => {
    const repositoryController = new RepositoryController(container, onViewChange, api);
    repositoryController.render(repository);

    return repositoryController;
  });
};

const getPagesCount = (count) => {
  const totalCount = count > 100 ? 100 : count;
  return Math.floor(totalCount / 10);
};

export default class Search {
  constructor(container, mainContainer, api) {
    this._container = container;
    this._mainContainer = mainContainer;
    this._api = api;
    this._searchController = this;

    this._searchComponent = null;
    this._paginationComponent = null;
    this._repositories = [];
    this._repositoriesControllers = [];
    this._repositoriesContainerComponent = new RepositoriesComponent();

    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    this._searchComponent = new SearchComponent();
    render(this._container, this._searchComponent);
    render(this._mainContainer, this._repositoriesContainerComponent, RenderPosition.AFTERBEGIN);

    if (Cookie.get(`query`) && Cookie.get(`page`)) {
      const query = Cookie.get(`query`);
      const page = parseInt(Cookie.get(`page`), 10);
      const totalPages = Cookie.get(`total-pages`);

      this._searchRepository(query, page, totalPages);

    } else {
      this._loadMostPopularRepositories();
    }

    this._searchComponent.setSearchSubmitHandler((query) => {
      this._searchRepository(query);
    });
  }

  _loadMostPopularRepositories() {
    this._api.loadMostPopularRepositories()
      .then((response) => response.items)
      .then(RepositoryModel.parseRepositories)
      .then((popularRepositories) => {
        const repositoriesContainer = this._repositoriesContainerComponent.getElement();
        this._repositories = popularRepositories;

        this._repositoriesControllers = renderRepositories(repositoriesContainer, this._repositories, this._onViewChange, this._api);
      });
  }


  _searchRepository(query, pageNumber = 1, totalPages = 1) {
    this._api.searchRepositories(query, pageNumber)
    .then((response) => {
      this._removePagination();
      totalPages = getPagesCount(response.total_count);
      this._renderPagination(query, totalPages, pageNumber);

      Cookie.set(`query`, query);
      Cookie.set(`total-pages`, totalPages);
      Cookie.set(`page`, pageNumber);

      return response.items;
    })
    .then(RepositoryModel.parseRepositories)
    .then((foundedRepositories) => {
      this._removeRepositories();
      const repositoriesContainer = this._repositoriesContainerComponent.getElement();

      this._repositories = foundedRepositories;

      this._repositoriesControllers = renderRepositories(repositoriesContainer, this._repositories, this._onViewChange, this._api);

      this._searchComponent.disableForm(false);
    });
  }

  _removePagination() {
    if (this._paginationComponent) {
      remove(this._paginationComponent);
    }
  }

  _removeRepositories() {
    if (this._repositoriesControllers) {
      this._repositoriesContainerComponent.getElement().innerHTML = ``;
      this._repositories = [];
      this._repositoriesControllers = [];
    }
  }

  _renderPagination(query, totalPages, currentPage = 1) {
    this._paginationComponent = new Pagination(totalPages, currentPage);

    this._paginationComponent.setPageClickHandler((pageNumber) => {
      this._searchRepository(query, pageNumber);
    });

    render(this._mainContainer, this._paginationComponent);
  }

  _onViewChange() {
    this._repositoriesControllers.forEach((repository) => {
      repository.setDefaultView();
    });
  }
}
