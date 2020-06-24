import AbstractComponent from "./abstract-component";
import {formateDate} from "../utils/common";

const createRepositoryTemplate = (repository) => {
  const {name, updatedAt, url, stars, id} = repository;
  const repositoryName = name.split(`/`)[1];
  const shortUrl = url.split(`.com/`)[1];
  const latestUpdate = formateDate(updatedAt);

  return (
    `<article class="repository">
      <button class="repository__title" data-id="${id}">${repositoryName}</button>
      <p class="repository__rating">
        ${stars}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path fill="#ffe800" d="M9 13.435l4.038 2.123-.771-4.496 3.267-3.185-4.515-.656L9 3.13 6.98 7.22l-4.514.657 3.267 3.185-.771 4.496L9 13.435zm-5.366 3.951l1.025-5.975L.317 7.179l6-.872L9 .87l2.683 5.437 6 .872-4.342 4.232 1.025 5.975L9 14.565l-5.366 2.821z"/>
        </svg>
      </p>
      <p class="repository__commit">Latest commit: ${latestUpdate}</p>
      <a class="repository__link link" href="${url}">${shortUrl}</a>
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
