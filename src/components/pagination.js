import AbstractComponent from "./abstract-component";

const createPagesMarkup = (count, pageNumber) => {
  let pages = [];

  for (let pageCount = 1; pageCount <= count; pageCount++) {
    pages.push(
        `<li class="paginator__item">
          <a class="paginator__link ${pageCount === pageNumber ? `paginator__link--active` : ``}">${pageCount}</a>
        </li>`
    );
  }

  return pages.join(`\n`);
};


const createPaginationTemplate = (count, pageNumber) => {
  const pagesCount = count;
  const pagesMarkup = pagesCount ? createPagesMarkup(pagesCount, pageNumber) : ``;

  return (
    `<ul class="paginator">${pagesMarkup}</ul>`
  );
};

export default class Pagination extends AbstractComponent {
  constructor(count, pageNumber) {
    super();

    this._count = count;
    this._pageNumber = pageNumber;
  }

  getTemplate() {
    return createPaginationTemplate(this._count, this._pageNumber);
  }

  setPageClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.matches(`.paginator__link`)) {
        const pageNumber = parseInt(evt.target.textContent, 10);
        handler(pageNumber);
      }
    });
  }
}
