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
    this._config.italicEnabled = this._config.italicEnabled !== undefined ? this._config.italicEnabled : true;
    const customItalicTypesProvided = Array.isArray(this._config.italicTypes) && this._config.italicTypes.length > 0;
    if (this._config.italicTypes !== undefined && !customItalicTypesProvided) {
      console.warn("(ง'̀-'́)ง Italic Option: no valid types were provided.");
    }
    if (customItalicTypesProvided) {
      this._config.italicTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_ITALIC_CONFIG,
        customConfig: this._config.italicTypes,
        override: true,
      });
    } else {
      this._config.italicTypes = DEFAULT_ITALIC_CONFIG;
    }
  },

  _italicGetOptions({} = {}) {
    const element = this._element;
    return this._config.italicTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'italic_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.italicEnabled,
      onActivate: () => {
        this._italicChange();
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _italicChange() {
    if (this._config.readOnly || !this._config.italicEnabled) {
      return;
    }

    const element = this._element;
    const italicTag = DEFAULT_ITALIC_CONFIG[0].tag;

    if (this._blockTunesUtilsCheckState({ element: element, tag: italicTag })) {
      this._blockTunesUtilsUnwrap({
        element: element,
        tag: italicTag,
      });
    } else {
      this._blockTunesUtilsWrap({
        element: element,
        tag: italicTag,
      });
    }

    this._api.blocks.update(this._blockId);
  },
};