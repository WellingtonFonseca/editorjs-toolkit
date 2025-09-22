import { blockTunesUtilsFunctions } from './_block_tunes_utils.js';

export const DEFAULT_ITALIC_CONFIG = [
  {
    tag: 'I',
    label: 'Italic',
    description: 'toggle italic style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>',
  },
];

export const italicBlockTuneFunctions = {
  ...blockTunesUtilsFunctions,

  _italicConfigure({} = {}) {
    this._config.italicTunesEnabled = this._config.italicTunesEnabled !== undefined ? this._config.italicTunesEnabled : true;
    const customItalicTypesProvided = Array.isArray(this._config.italicTunesTypes) && this._config.italicTunesTypes.length > 0;
    if (this._config.italicTunesTypes !== undefined && !customItalicTypesProvided) {
      console.warn('(•̀o•́)ง Italic Option: no valid types were provided.');
    }
    if (customItalicTypesProvided) {
      this._config.italicTunesTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_ITALIC_CONFIG,
        customConfig: this._config.italicTunesTypes,
        override: true,
      });
    } else {
      this._config.italicTunesTypes = DEFAULT_ITALIC_CONFIG;
    }
  },

  _italicGetOptions({} = {}) {
    const element = this._element;
    return this._config.italicTunesTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'italic_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.italicTunesEnabled,
      onActivate: () => {
        if (this._config.readOnly || !this._config.italicTunesEnabled) {
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
