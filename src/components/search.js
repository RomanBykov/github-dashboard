import AbstractComponent from "./abstract-component";

const createSearchTemplate = () => {
  return (
    `<form class="header__form">
      <div class="header__search">
        <input class="header__search-input" type="search" placeholder="Search repository by name">
      </div>
    </form>`
  );
};

export default class Search extends AbstractComponent {
  getTemplate() {
    return createSearchTemplate();
  }

  disableForm(isDisabled) {
    this.getElement().querySelector(`.header__search-input`)
      .disabled = isDisabled;
  }

  setSearchSubmitHandler(handler) {
    this.getElement().querySelector(`.header__search-input`)
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
