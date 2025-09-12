export const inlineUtilsFunctions = {
  _inlineUtilsHandleButtonClick({ event, tag, style }) {
    event.preventDefault();
    event.stopPropagation();

    if (this._config.readOnly) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }
    const range = selection.getRangeAt(0);

    const mark = this._api.selection.findParentTag(tag);

    if (mark) {
      this._inlineUtilsUnwrap({
        range: range,
        tag: tag,
      });
      this.state = false;
    } else {
      this._inlineUtilsWrap({
        range: range,
        tag: tag,
        style: style,
      });
      this.state = true;
    }
  },
  _inlineUtilsWrap({ range, tag, style }) {
    const selectedContent = range.extractContents();
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(selectedContent);

    const identifyTags = tempDiv.querySelectorAll(tag);
    identifyTags.forEach((existingTag) => {
      const parent = existingTag.parentNode;
      while (existingTag.firstChild) {
        parent.insertBefore(existingTag.firstChild, existingTag);
      }
      parent.removeChild(existingTag);
    });

    const newTag = document.createElement(tag);
    Object.assign(newTag.style, style);

    while (tempDiv.firstChild) {
      newTag.appendChild(tempDiv.firstChild);
    }

    range.insertNode(newTag);
    this._api.selection.expandToTag(newTag);
  },

  _inlineUtilsUnwrap({ range, tag }) {
    const mark = this._api.selection.findParentTag(tag);
    if (!mark) {
      return;
    }
    const parentNode = mark.parentNode;
    const fragment = document.createDocumentFragment();
    while (mark.firstChild) {
      fragment.appendChild(mark.firstChild);
    }
    const lastInsertedNode = fragment.lastChild;
    parentNode.insertBefore(fragment, mark);
    mark.remove();
    if (lastInsertedNode) {
      const selection = window.getSelection();
      const newRange = new Range();
      newRange.setStartAfter(lastInsertedNode);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  },
  _inlineUtilsGetMergedConfig({ defaultConfig, customConfig, override = false } = {}) {
    if (!customConfig) {
      return defaultConfig;
    }

    const defaultMap = new Map(defaultConfig.map((item) => [item.tag, item]));
    const customMap = new Map(customConfig.map((item) => [item.tag, item]));

    if (override) {
      // Modo 'Sobrescrever apenas': Itera sobre os padrões e sobrescreve
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
      // Modo 'Incluir novos': Combina os dois mapas, permitindo novos itens
      const mergedMap = new Map([...defaultMap, ...customMap]);
      return Array.from(mergedMap.values());
    }
  },
};
