import AbstractComponent from "./abstract-component";

const createRepositoryDetailsTemplate = (repository) => {
  // console.log(repository);
  const {
    name,
    stars,
    updatedAt,
    description,
    language,
    contributors,
    owner: {
      avatar,
      login,
      url
    }
  } = repository;

  return (
    `<section class="repository-details">
      <div class="repository-details__header">
        <h2 class="repository-details__title">${name}</h2>
        <p  class="repository-details__stars">${stars}</p>
        <p  class="repository-details__stars">Latest commit: ${updatedAt}</p>
      </div>
      <div class="repository-details__user">
        <img class="repository-details__user-avatar" src="${avatar}" alt="${login}'s avatar">
        <h2 class="repository-details__user-nickname">Nick</h2>
        <a class="repository-details__user-link" href="#">link</a>
      </div>
      <ul class="repository-details__langs">
        <li class="repository-details__lang-item">Javascript</li>
      </ul>
      <p class="repository-details__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quis expedita quae aspernatur omnis. Reiciendis magnam consectetur nulla ab esse animi nobis deleniti. Doloremque voluptatem modi dolore, impedit totam placeat!</p>
      <ul class="repository-details__contributors">
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
        <li class="repository-details__contributor">
          <a class="repository-details__contributor-link" href="#">Alex</a>
        </li>
      </ul>

    </section>`
  );
};

export default class RepositoryDetails extends AbstractComponent {
  constructor(repository) {
    super();

    this._repository = repository;
  }

  getTemplate() {
    return createRepositoryDetailsTemplate(this._repository);
  }
}
