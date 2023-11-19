const storage = {
  get(key) {
    try {
      const valueLocal = localStorage.getItem(key);
      return valueLocal ? JSON.parse(valueLocal) : null;
    } catch (error) {
      console.error(`Error while parsing JSON for key ${key}:`, error);
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(key, value);
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  removeTask(index) {
    const tasks = this.get('tasks') || [];
    console.log(tasks);
    tasks.splice(index, 1);
    console.log('update', tasks);
    this.set('tasks', tasks);
  },
};

export default storage;
