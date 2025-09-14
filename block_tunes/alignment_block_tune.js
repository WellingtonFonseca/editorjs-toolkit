export const DEFAULT_ALIGNMENT_CONFIG = [
  {
    tag: 'left',
    label: 'Left',
    description: 'change alingnment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left-icon lucide-align-left"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg>',
  },
  {
    tag: 'center',
    label: 'Center',
    description: 'change alingnment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucude-align-center-icon lucide-align-center"><path d="M17 12H7"/><path d="M19 18H5"/><path d="M21 6H3"/></svg>',
  },
  {
    tag: 'right',
    label: 'Right',
    description: 'change alingnment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right-icon lucide-align-right"><path d="M21 12H9"/><path d="M21 18H7"/><path d="M21 6H3"/></svg>',
  },
];

export const alignmentBlockTuneFunctions = {
  _alignmentConfigure({} = {}) {
    this._config.alingnmentEnabled = this._config.alingnmentEnabled !== undefined ? this._config.alingnmentEnabled : true;

    const customAlignmentTypesProvided = Array.isArray(this._config.alignmentTunesTypes) && this._config.alignmentTunesTypes.length > 0;

    if (this._config.alignmentTunesTypes !== undefined && !customAlignmentTypesProvided) {
      console.warn("(ง'̀-'́)ง Alignment Option: no valid types were provided.");
    }

    if (customAlignmentTypesProvided) {
      this._config.alignmentTunesTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: DEFAULT_ALIGNMENT_CONFIG,
        customConfig: this._config.alignmentTunesTypes,
        override: true,
      });
    } else {
      this._config.alignmentTunesTypes = DEFAULT_ALIGNMENT_CONFIG;
    }
  },

  _alignmentGetOptions({} = {}) {
    return this._config.alignmentTunesTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'alingnments_block',
      isActive: this._data.align.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: this._config.readOnly || !this._config.alingnmentEnabled,
      onActivate: (event) => {
        this._alignmentChange({
          newAlign: properties.tag,
        });
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _alignmentChange({ newAlign } = {}) {
    if (this._config.readOnly || !this._config.alingnmentEnabled) {
      return;
    }
    this._data.align = newAlign;
    this._element.style.textAlign = newAlign;
    this._api.blocks.updateBlock(this._blockId);
  },
};
