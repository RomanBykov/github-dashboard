const Method = {
  GET: `GET`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class API {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  searchRepositories(queryString, page) {
    return this._load({url: `search/repositories?q=${queryString}&sort=stars&order=desc&page=${page}&per_page=10`})
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null}) {
    return fetch(`${this._endPoint}${url}`, {method, body})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
