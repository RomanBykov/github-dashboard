export default class Repository {
  constructor(repositoryData) {
    this.id = repositoryData.id;
    this.url = repositoryData.html_url;
    this.name = repositoryData.full_name;
    this.language = repositoryData.language;
    this.stars = repositoryData.stargazers_count;
    this.description = repositoryData.description;
    this.updatedAt = repositoryData.pushed_at;
    this.contributors = repositoryData.contributors_url;
    this.owner = {
      login: repositoryData.owner.login,
      avatar: repositoryData.owner.avatar_url,
      url: repositoryData.owner.url
    };
  }

  static parseRepository(repositoryData) {
    return new Repository(repositoryData);
  }

  static parseRepositories(repositoryData) {
    return repositoryData.map(Repository.parseRepository);
  }
}
