import RepositoryComponent from "../components/repository";
import {render} from "../utils/render";

export default class Repository {
  constructor(container, api) {
    this._container = container;
    this._api = api;
    this._repositoryComponent = null;
    this._repositoryComponentDetails = null;
    this._repository = null;
  }

  render(repository) {
    this._repository = repository;
    console.log(this._repository);

    this._repositoryComponent = new RepositoryComponent(this._repository);

    this._repositoryComponent.setOpenDetailsClickHandler((repository) => {
      // console.log(repository);
    });

    render(this._container, this._repositoryComponent);
  }

  _openDetails() {

  }
}
