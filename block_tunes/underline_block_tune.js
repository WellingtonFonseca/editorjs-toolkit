import { blockTunesUtilsFunctions } from './_block_tunes_utils.js';

export const DEFAULT_UNDERLINE_CONFIG = [
  {
    tag: 'U',
    label: 'Underline',
    description: 'toggle underline style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline-icon lucide-underline"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>',
  },
];

export const underlineBlockTuneFunctions = {
  ...blockTunesUtilsFunctions,

  _underlineConfigure({} = {}) {
    this._config.underlineTunesEnabled = this._config.underlineTunesEnabled !== undefined ? this._config.underlineTunesEnabled : true;
    const customUnderlineTypesProvided = Array.isArray(this._config.underlineTunesTypes) && this._config.underlineTunesTypes.length > 0;
    if (this._config.underlineTunesTypes !== undefined && !customUnderlineTypesProvided) {
      console.warn("(ง'̀-'́)ง Underline Option: no valid types were provided.");
    }
    if (customUnderlineTypesProvided) {
      this._config.underlineTunesTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_UNDERLINE_CONFIG,
        customConfig: this._config.underlineTunesTypes,
        override: true,
      });
    } else {
      this._config.underlineTunesTypes = DEFAULT_UNDERLINE_CONFIG;
    }
  },

  _underlineGetOptions({} = {}) {
    const element = this._element;
    return this._config.underlineTunesTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'underline_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.underlineTunesEnabled,
      onActivate: () => {
        if (this._config.readOnly || !this._config.underlineTunesEnabled) {
          return;
        }
        this._blockTunesUtilsHandleBlockClick({
          element: element,
          properties: {
            type: 'tag',
            tag: properties.tag,
          },
        });
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },
};
