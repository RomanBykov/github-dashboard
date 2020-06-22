import AbstractComponent from "./abstract-component";

const createRepositoryTemplate = (repository) => {
  const {name, updatedAt, url, stars, id} = repository;
  const repositoryName = name.split(`/`)[1];
  const shortUrl = url.split(`.com/`)[1];

  return (
    `<article class="repository">
      <button class="repository__title" data-id="${id}">${repositoryName}</button>
      <p class="repository__rating">${stars} stars on Github</p>
      <p class="repository__commit">Latest commit: ${updatedAt}</p>
      <a class="repository__link" href="${url}" target="_blank">${shortUrl}</a>
    </article>`
  );
};

export default class Repository extends AbstractComponent {
  constructor(repository) {
    super();

    this._repository = repository;
  }

  getTemplate() {
    return createRepositoryTemplate(this._repository);
  }

  setOpenDetailsClickHandler(handler) {
    this.getElement().querySelector(`.repository__title`)
      .addEventListener(`click`, handler);
  }
}
