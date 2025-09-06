export const DEFAULT_BOLD_CONFIG = [
  {
    tag: 'bold',
    label: 'Bold',
    description: 'toggle bold style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>',
  },
];

export const boldBlockTuneFunctions = {
  _boldConfigure({} = {}) {
    this._config.boldEnabled = this._config.boldEnabled !== undefined ? this._config.boldEnabled : true;

    const customBoldTypesProvided = Array.isArray(this._config.boldTypes) && this._config.boldTypes.length > 0;

    if (this._config.boldTypes !== undefined && !customBoldTypesProvided) {
      console.warn("(ง'̀-'́)ง Bold Option: no valid types were provided.");
    }

    if (customBoldTypesProvided) {
      this._config.boldTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: DEFAULT_BOLD_CONFIG,
        customConfig: this._config.boldTypes,
        override: true,
      });
    } else {
      this._config.boldTypes = DEFAULT_BOLD_CONFIG;
    }
  },

  _boldGetOptions({} = {}) {
    return this._config.boldTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'bold_block',
      isActive: this._data.bold === true,
      isDisabled: this._config.readOnly || !this._config.boldEnabled,
      onActivate: (event) => {
        this._boldChange();
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _boldChange() {
    if (this._config.readOnly || !this._config.boldEnabled) {
      return;
    }
    this._data.bold = !this._data.bold;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this._element.innerHTML;
    const boldElements = tempDiv.querySelectorAll('b, strong');
    boldElements.forEach((el) => {
      el.replaceWith(...el.childNodes);
    });
    this._element.innerHTML = tempDiv.innerHTML;

    this._element.style.fontWeight = this._data.bold ? 'bold' : 'normal';
    this._api.blocks.update(this._blockId);
  },
};
