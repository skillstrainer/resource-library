let _id = 0;
let registeredElements = {};

export const clickByPriority = (callback, priority) => (element) => {
  if (element) {
    if (!element.dataset.clickId) {
      const id = _id++ + "";
      element.dataset.clickId = id;
      registeredElements[id] = callback;
    }
    element.dataset.clickPriority = priority + "";
  }
};

export const stopPropagation = (e) => e.stopPropagation();

export let appContainer;
export const setAppContainer = (e) => (appContainer = e);
