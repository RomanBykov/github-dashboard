import AbstractComponent from "./abstract-component";

const createPagesMarkup = (count) => {
  let pages = [];

  for (let pageCount = 1; pageCount <= count; pageCount++) {
    pages.push(`<li class="paginator__item"><a class="paginator__link" href="#">${pageCount}</a></li>`);
  }

  return pages.join(`\n`);
};

const getPagesCount = (count) => {
  const totalCount = count > 100 ? 100 : count;
  return Math.floor(totalCount / 10);
};

const createPaginationTemplate = (count) => {
  const pagesCount = getPagesCount(count);
  const pagesMarkup = pagesCount ? createPagesMarkup(pagesCount) : ``;

  return (
    `<ul class="paginator">${pagesMarkup}</ul>`
  );
};

export default class Pagination extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createPaginationTemplate(this._count);
  }

  setPageClickHandler(handler) {
    this.getElement().querySelector(`ul`)
      addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `A`) {
          evt.preventDefault();
          const pageNumber = evt.target.textContent;

          handler(pageNumber);
        }
      });
  }
}
