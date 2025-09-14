export const blockTunesUtilsFunctions = {
  _blockTunesUtilsWrap({ element, tag }) {
    const newTag = document.createElement(tag);

    while (element.firstChild) {
      newTag.appendChild(element.firstChild);
    }

    element.appendChild(newTag);
  },

  _blockTunesUtilsUnwrap({ element, tag }) {
    const existingTag = element.querySelector(tag);
    if (!existingTag) {
      return;
    }

    const parentNode = existingTag.parentNode;
    const fragment = document.createDocumentFragment();

    while (existingTag.firstChild) {
      fragment.appendChild(existingTag.firstChild);
    }

    parentNode.insertBefore(fragment, existingTag);
    existingTag.remove();
  },

  _blockTunesUtilsCheckState({ element, tag }) {
    return element.querySelector(tag) !== null;
  },

  _blockTunesUtilsGetMergedConfig({ defaultConfig, customConfig, override = false } = {}) {
    if (!customConfig) {
      return defaultConfig;
    }

    const defaultMap = new Map(defaultConfig.map((item) => [item.tag, item]));
    const customMap = new Map(customConfig.map((item) => [item.tag, item]));

    if (override) {
      const mergedMap = new Map(
        [...defaultMap.entries()].map(([key, defaultValue]) => {
          const customValue = customMap.get(key);
          if (customValue) {
            return [key, { ...defaultValue, ...customValue }];
          }
          return [key, defaultValue];
        }),
      );
      return Array.from(mergedMap.values());
    } else {
      const mergedMap = new Map([...defaultMap, ...customMap]);
      return Array.from(mergedMap.values());
    }
  },
};