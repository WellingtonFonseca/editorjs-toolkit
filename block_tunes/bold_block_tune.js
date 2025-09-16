import { blockTunesUtilsFunctions } from './_block_tunes_utils.js';

export const DEFAULT_BOLD_CONFIG = [
  {
    tag: 'B',
    label: 'Bold',
    description: 'toggle bold style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>',
  },
];

export const boldBlockTuneFunctions = {
  ...blockTunesUtilsFunctions,

  _boldConfigure({} = {}) {
    this._config.boldTunesEnabled = this._config.boldTunesEnabled !== undefined ? this._config.boldTunesEnabled : true;
    const customBoldTypesProvided = Array.isArray(this._config.boldTunesTypes) && this._config.boldTunesTypes.length > 0;
    if (this._config.boldTunesTypes !== undefined && !customBoldTypesProvided) {
      console.warn("(ง'̀-'́)ง Bold Option: no valid types were provided.");
    }
    if (customBoldTypesProvided) {
      this._config.boldTunesTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_BOLD_CONFIG,
        customConfig: this._config.boldTunesTypes,
        override: true,
      });
    } else {
      this._config.boldTunesTypes = DEFAULT_BOLD_CONFIG;
    }
  },

  _boldGetOptions({} = {}) {
    const element = this._element;
    return this._config.boldTunesTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'bold_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.boldTunesEnabled,
      onActivate: () => {
        if (this._config.readOnly || !this._config.boldTunesEnabled) {
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
