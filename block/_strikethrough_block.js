export const DEFAULT_STRIKETHROUGH_CONFIG = [
  {
    tag: 'strikethrough',
    label: 'Strikethrough',
    description: 'toggle strikethrough style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4M10 20h4a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/><line x1="4" x2="20" y1="12" y2="12"/></svg>',
  },
];

export const strikethroughBlockTuneFunctions = {
  _strikethroughConfigure({} = {}) {
    this._config.strikethroughEnabled = this._config.strikethroughEnabled !== undefined ? this._config.strikethroughEnabled : true;

    const customStrikethroughTypesProvided = Array.isArray(this._config.strikethroughTypes) && this._config.strikethroughTypes.length > 0;

    if (this._config.strikethroughTypes !== undefined && !customStrikethroughTypesProvided) {
      console.warn("(ง'̀-'́)ง Strikethrough Option: no valid types were provided.");
    }

    if (customStrikethroughTypesProvided) {
      this._config.strikethroughTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: DEFAULT_STRIKETHROUGH_CONFIG,
        customConfig: this._config.strikethroughTypes,
        override: true,
      });
    } else {
      this._config.strikethroughTypes = DEFAULT_STRIKETHROUGH_CONFIG;
    }
  },

  _strikethroughGetOptions({} = {}) {
    return this._config.strikethroughTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'strikethrough_block',
      isActive: this._data.strikethrough === true,
      isDisabled: this._config.readOnly || !this._config.strikethroughEnabled,
      onActivate: (event) => {
        this._strikethroughChange();
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _strikethroughChange() {
    if (this._config.readOnly || !this._config.strikethroughEnabled) {
      return;
    }

    // Altera o estado
    this._data.strikethrough = !this._data.strikethrough;

    // Para evitar aninhamento, remove as tags existentes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this._element.innerHTML;
    const strikethroughElements = tempDiv.querySelectorAll('s, del');
    strikethroughElements.forEach((el) => {
      el.replaceWith(...el.childNodes);
    });
    this._element.innerHTML = tempDiv.innerHTML;

    // Obtém o conteúdo atual do elemento
    let content = this._element.innerHTML;

    // Verifica se o conteúdo já está dentro de uma tag <del>
    const isStrikethrough = content.startsWith('<del>') && content.endsWith('</del>');

    if (this._data.strikethrough && !isStrikethrough) {
      // Se a função foi ativada e o texto ainda não tem a tag, adiciona
      this._element.innerHTML = `<del>${content}</del>`;
    } else if (!this._data.strikethrough && isStrikethrough) {
      // Se a função foi desativada e o texto tem a tag, remove
      this._element.innerHTML = content.substring(5, content.length - 6);
    }

    // Atualiza o bloco
    this._api.blocks.update(this._blockId);
  },
};