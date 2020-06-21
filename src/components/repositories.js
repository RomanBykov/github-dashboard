import AbstractComponent from "./abstract-component";

const createRepositoriesTemplate = () => {
  return (
    `<section class="repositories"></section>`
  );
};

export default class Repositories extends AbstractComponent {
  getTemplate() {
    return createRepositoriesTemplate();
  }
}
