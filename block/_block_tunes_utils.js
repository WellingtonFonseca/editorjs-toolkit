/**
 * @fileoverview Utils for Block Tunes.
 */
export const blockTunesUtilsFunctions = {
  /**
   * Envolve o conteúdo do bloco com uma tag específica.
   *
   * @param {HTMLElement} element O elemento do bloco a ser modificado.
   * @param {string} tag A tag HTML a ser usada (ex: 'B', 'U', 'DEL').
   */
  _blockTunesUtilsWrap({ element, tag }) {
    const newTag = document.createElement(tag);

    // Move todos os filhos do elemento para a nova tag
    while (element.firstChild) {
      newTag.appendChild(element.firstChild);
    }

    // Adiciona a nova tag ao elemento principal
    element.appendChild(newTag);
  },

  /**
   * Remove a tag específica do conteúdo do bloco.
   *
   * @param {HTMLElement} element O elemento do bloco a ser modificado.
   * @param {string} tag A tag HTML a ser removida (ex: 'B', 'U', 'DEL').
   */
  _blockTunesUtilsUnwrap({ element, tag }) {
    const existingTag = element.querySelector(tag);
    if (!existingTag) {
      return;
    }

    const parentNode = existingTag.parentNode;
    const fragment = document.createDocumentFragment();

    // Move todos os filhos da tag para um fragmento
    while (existingTag.firstChild) {
      fragment.appendChild(existingTag.firstChild);
    }

    // Insere o fragmento no lugar da tag
    parentNode.insertBefore(fragment, existingTag);
    existingTag.remove();
  },

  /**
   * Checa se a tag especificada existe em qualquer nível de aninhamento dentro do bloco.
   *
   * @param {HTMLElement} element O elemento do bloco.
   * @param {string} tag A tag a ser checada.
   * @returns {boolean}
   */
  _blockTunesUtilsCheckState({ element, tag }) {
    return element.querySelector(tag) !== null;
  },

  /**
   * Mescla configurações padrão com as personalizadas.
   */
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