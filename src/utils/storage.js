const storage = {
  getList(key) {
    try {
      const valueLocal = localStorage.getItem(key);
      return valueLocal ? JSON.parse(valueLocal) : null;
    } catch (error) {
      console.error(`Error while parsing JSON for key ${key}:`, error);
      return null;
    }
  },

  setList(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeLists(key) {
    localStorage.removeItem(key);
  },

  removeList(index) {
    const lists = this.getList('lists') || [];
    lists.splice(index, 1);
    this.setList('lists', lists);
  },

  getListTasks(listName) {
    const lists = this.getList('lists');
    console.log('lists:', lists, 'listName:', listName);
    const list = lists.find(list => list.name === listName);
    console.log('list:', list);
    return list ? list.tasks || [] : [];
  },

  setListTasks(listName, tasks) {
    const lists = this.getList('lists') || [];
    const updatedLists = lists.map(list => {
      if (list.name === listName) {
        list.tasks = tasks;
      }
      return list;
    });
    this.setList('lists', updatedLists);
  },
};

export default storage;
