import { mainWindow } from '../main';

function createFiltersObject(todoTxtObjects) {
  const filters = {
    projects: {},
    contexts: {},
    due: {},
    t: {},
    rec: {},
  };

  Object.values(todoTxtObjects).forEach((items) => {
    items.forEach((item) => {
      const { projects, contexts, due, t, rec } = item;

      projects.forEach((project) => {
        if (project !== null) {
          filters.projects[project] = (filters.projects[project] || 0) + 1;
        }
      });

      contexts.forEach((context) => {
        if (context !== null) {
          filters.contexts[context] = (filters.contexts[context] || 0) + 1;
        }
      });

      incrementCount(filters.due, due);
      incrementCount(filters.t, t);
      incrementCount(filters.rec, rec);
    });
  });

  return filters;
}

function incrementCount(countObject, key) {
  if (key !== null) {
    countObject[key] = (countObject[key] || 0) + 1;
  }
}

export { createFiltersObject };