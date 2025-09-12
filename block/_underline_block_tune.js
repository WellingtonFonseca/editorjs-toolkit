export const DEFAULT_UNDERLINE_CONFIG = [
  {
    tag: 'underline',
    label: 'Underline',
    description: 'toggle underline style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline-icon lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>',
  },
];

export const underlineBlockTuneFunctions = {
  _underlineConfigure({} = {}) {
    this._config.underlineEnabled = this._config.underlineEnabled !== undefined ? this._config.underlineEnabled : true;

    const customUnderlineTypesProvided = Array.isArray(this._config.underlineTypes) && this._config.underlineTypes.length > 0;

    if (this._config.underlineTypes !== undefined && !customUnderlineTypesProvided) {
      console.warn("(ง'̀-'́)ง Underline Option: no valid types were provided.");
    }

    if (customUnderlineTypesProvided) {
      this._config.underlineTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: DEFAULT_UNDERLINE_CONFIG,
        customConfig: this._config.underlineTypes,
        override: true,
      });
    } else {
      this._config.underlineTypes = DEFAULT_UNDERLINE_CONFIG;
    }
  },

  _underlineGetOptions({} = {}) {
    return this._config.underlineTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'underline_block',
      isActive: this._data.underline === true,
      isDisabled: this._config.readOnly || !this._config.underlineEnabled,
      onActivate: (event) => {
        this._underlineChange();
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _underlineChange() {
    if (this._config.readOnly || !this._config.underlineEnabled) {
      return;
    }
    this._data.underline = !this._data.underline;

    // Remove existing underline tags (<u>) to avoid nesting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this._element.innerHTML;
    const underlineElements = tempDiv.querySelectorAll('u');
    underlineElements.forEach((el) => {
      el.replaceWith(...el.childNodes);
    });
    this._element.innerHTML = tempDiv.innerHTML;

    // Apply or remove the underline style
    if (this._data.underline) {
      this._element.style.textDecoration = 'underline';
    } else {
      this._element.style.textDecoration = 'none';
    }

    this._api.blocks.update(this._blockId);
  },
};
