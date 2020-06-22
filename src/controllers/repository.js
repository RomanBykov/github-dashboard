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

    this._repositoryComponentDetails = new RepositoryDetailsComponent(this._repository);
    this._repositoryComponentDetails.setCloseDetailsClickHandler(() => {
      this._closeDetails();
    });

    append(this._repositoryComponentDetails);
  }

  _closeDetails() {
    remove(this._repositoryComponentDetails);
  }
}
