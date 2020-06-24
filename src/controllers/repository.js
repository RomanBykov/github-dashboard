import RepositoryComponent from "../components/repository";
import RepositoryDetailsComponent from "../components/repository-details";
import {render, append, remove} from "../utils/render";

export default class Repository {
  constructor(container, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._onViewChange = onViewChange;
    this._repositoryComponent = null;
    this._repositoryComponentDetails = null;
    this._repository = null;

    this._openDetails = this._openDetails.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);

    this._pageHeaderElement = document.querySelector(`.page-header`);
  }

  render(repository) {
    this._repository = repository;

    this._repositoryComponent = new RepositoryComponent(this._repository);
    this._repositoryComponent.setOpenDetailsClickHandler(() => {
      this._openDetails();
    });

    render(this._container, this._repositoryComponent);
  }

  setDefaultView() {
    if (this._repositoryComponentDetails) {
      this._closeDetails();
    }
  }

  _openDetails() {
    this._onViewChange();

    const contributersLink = this._repository.contributors.split(`/repos/`)[1];

    this._api.loadContributers(contributersLink)
      .then((loadedContributors) => {
        this._repositoryComponentDetails = new RepositoryDetailsComponent(this._repository, loadedContributors);
        this._repositoryComponentDetails.setCloseDetailsClickHandler(() => {
          this._closeDetails();
        });

        this._pageHeaderElement.classList.add(`page-header--details`);
        append(this._repositoryComponentDetails);
        document.addEventListener(`keydown`, this._onEscKeydown);
      });
  }

  _closeDetails() {
    remove(this._repositoryComponentDetails);
    this._pageHeaderElement.classList.remove(`page-header--details`);
    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  _onEscKeydown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetails();
    }
  }
}
