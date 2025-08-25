export const DEFAULT_ALIGNMENT_CONFIG = [
  {
    tag: 'left',
    label: 'Left',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left-icon lucide-align-left"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg>',
  },
  {
    tag: 'center',
    label: 'Center',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucude-align-center-icon lucide-align-center"><path d="M17 12H7"/><path d="M19 18H5"/><path d="M21 6H3"/></svg>',
  },
  {
    tag: 'right',
    label: 'Right',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right-icon lucide-align-right"><path d="M21 12H9"/><path d="M21 18H7"/><path d="M21 6H3"/></svg>',
  },
];

export const alignmentBlockTuneFunctions = {
  _alignmentConfigure({ prefixIndentify } = {}) {
    this._config.aligmentOptionIdentify = `${prefixIndentify}-aligment-option`;

    const customAlignmentTypesProvided = Array.isArray(this._config.alignmentTypes) && this._config.alignmentTypes.length > 0;

    if (this._config.alignmentTypes !== undefined && !customAlignmentTypesProvided) {
      console.warn("(ง'̀-'́)ง Alignment Option: no valid types were provided.");
    }

    if (customAlignmentTypesProvided) {
      this._config.alignmentTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: DEFAULT_ALIGNMENT_CONFIG,
        customConfig: this._config.alignmentTypes,
        override: true,
      });
    } else {
      this._config.alignmentTypes = DEFAULT_ALIGNMENT_CONFIG;
    }
  },

  _alignmentGetOptions({} = {}) {
    return this._config.alignmentTypes.map((properties) => ({
      icon: `<span class="${this._config.aligmentOptionIdentify}">${properties.icon}</span>`,
      label: properties.label,
      onActivate: (event) => {
        this._blockUtilsChangeOptionMenu({
          event: event,
          menuOptions: document.querySelectorAll(`.${this._config.aligmentOptionIdentify}`),
        });
        this._alignmentChange({
          newAlign: properties.tag,
        });
      },
      isActive: this._data.align.toUpperCase() === properties.tag.toUpperCase(),
      closeOnActivate: false,
    }));
  },

  _alignmentChange({ newAlign } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.align = newAlign;
    this._element.style.textAlign = newAlign;
    this._api.blocks.updateBlock(this._blockId);
  },
};
