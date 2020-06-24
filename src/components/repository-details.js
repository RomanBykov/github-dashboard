import AbstractComponent from "./abstract-component";
import {formateDate} from "../utils/common";

const createContributorsMarkup = (contributors) => {
  return contributors.map((contributor) => {
    const name = contributor.login;
    const url = contributor.url;
    const avatar = contributor.avatar_url;

    return (
      `<li class="repository-details__contributor">
        <img class="repository-details__contributor-avatar" src="${avatar}" alt="${name}'s avatar">
        <a class="repository-details__contributor-link link" href="${url}">${name}</a>
      </li>`
    );
  }).join(`\n`);
};

const createRepositoryDetailsTemplate = (repository, activeContributors) => {
  const {
    name,
    stars,
    updatedAt,
    description,
    language,
    owner: {
      avatar,
      login,
      url
    }
  } = repository;

  const contributorsMarkup = createContributorsMarkup(activeContributors);
  const lastUpdate = formateDate(updatedAt);

  return (
    `<section class="repository-details">
      <button class="repository-details__close-btn" type="button">
        <span class="visually-hidden">Close details</span>
      </button>
      <div class="repository-details__user">
        <img class="repository-details__user-avatar" src="${avatar}" alt="${login}'s avatar">
        <div class="repository-details__user-wrapper">
          <div class="repository-details__header">
            <h2 class="repository-details__title">${name}</h2>
            <p class="repository-details__stars">
              ${stars}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path fill="#ffe800" d="M9 13.435l4.038 2.123-.771-4.496 3.267-3.185-4.515-.656L9 3.13 6.98 7.22l-4.514.657 3.267 3.185-.771 4.496L9 13.435zm-5.366 3.951l1.025-5.975L.317 7.179l6-.872L9 .87l2.683 5.437 6 .872-4.342 4.232 1.025 5.975L9 14.565l-5.366 2.821z"/>
              </svg>
            </p>
          </div>
          <h3 class="repository-details__small-title">Latest commit:</h3>
          <p class="repository-details__latest-commit">${lastUpdate}</p>
          <h3 class="repository-details__small-title">Owner:</h3>
          <a class="repository-details__user-nickname link" href="${url}">${login}</a>
          <h3 class="repository-details__small-title">Languages:</h3>
          <ul class="repository-details__langs">
            <li class="repository-details__lang-item">${language}</li>
          </ul>
          <h3 class="repository-details__small-title">Description:</h3>
          <p class="repository-details__description">${description}</p>
          <h3 class="repository-details__small-title">Contributors:</h3>
          <ul class="repository-details__contributors">
            ${contributorsMarkup}
          </ul>
        </div>
      </div>
    </section>`
  );
};

export default class RepositoryDetails extends AbstractComponent {
  constructor(repository, contributors) {
    super();

    this._repository = repository;
    this._contributors = contributors;
  }

  getTemplate() {
    return createRepositoryDetailsTemplate(this._repository, this._contributors);
  }

  setCloseDetailsClickHandler(handler) {
    this.getElement().querySelector(`.repository-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
