import AbstractComponent from "./abstract-component";

const createSearchTemplate = () => {
  return (
    `<form class="page-header__form">
      <div class="page-header__search">
        <input class="page-header__search-input" type="search" placeholder="Search repository by name">
      </div>
    </form>`
  );
};

export default class Search extends AbstractComponent {
  getTemplate() {
    return createSearchTemplate();
  }

  disableForm(isDisabled) {
    this.getElement().querySelector(`.page-header__search-input`)
      .disabled = isDisabled;
  }

  setSearchSubmitHandler(handler) {
    this.getElement().querySelector(`.page-header__search-input`)
      .addEventListener(`keydown`, (evt) => {

        if (evt.key === `Enter`) {
          evt.preventDefault();
          const query = evt.target.value;
          this.disableForm(true);

          handler(query);
        }
      });
  }
}
