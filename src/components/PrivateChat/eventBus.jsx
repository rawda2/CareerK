const eventBus = {
  listeners: {},

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set(); // Using Set to prevent duplicates
    }
    this.listeners[event].add(callback);
  },

  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
          this.off(event, callback); // Remove faulty listener
        }
      });
    }
  },

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].delete(callback);
      if (this.listeners[event].size === 0) {
        delete this.listeners[event];
      }
    }
  },

  clear() {
    this.listeners = {};
  }
};

export default eventBus;