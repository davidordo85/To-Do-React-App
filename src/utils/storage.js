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
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  removeTask(index) {
    const tasks = this.get('tasks') || [];
    tasks.splice(index, 1);
    this.set('tasks', tasks);
  },
};

export default storage;
