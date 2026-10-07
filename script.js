const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

const formatStars = (stars) => new Intl.NumberFormat("en-US").format(stars);

const createRepositoryItem = (repository) => {
  const item = document.createElement("li");
  item.className = "repository-card";

  const title = document.createElement("h2");
  title.className = "repository-name";

  const link = document.createElement("a");
  link.href = `https://github.com/${repository.owner}/${repository.name}`;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = `${repository.owner}/${repository.name}`;

  const meta = document.createElement("p");
  meta.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const updated = document.createElement("span");
  updated.textContent = `Updated ${repository.updated}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const stars = document.createElement("span");
  stars.className = "repository-stars";
  stars.textContent = formatStars(repository.stars);

  title.append(link);
  meta.append(language, updated);
  item.append(title, stars, meta, description);

  return item;
};

const renderRepositories = (repositories) => {
  const fragment = document.createDocumentFragment();

  repositories.forEach((repository) => {
    fragment.append(createRepositoryItem(repository));
  });

  repositoryList.replaceChildren(fragment);
  status.textContent = `${repositories.length} starred repositories`;
};

const loadRepositories = async () => {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    console.error(error);
    status.className = "status error";
    status.textContent = "Unable to load the starred repositories. Please refresh and try again.";
  }
};

loadRepositories();
