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
    this._config.boldEnabled = this._config.boldEnabled !== undefined ? this._config.boldEnabled : true;
    const customBoldTypesProvided = Array.isArray(this._config.boldTypes) && this._config.boldTypes.length > 0;
    if (this._config.boldTypes !== undefined && !customBoldTypesProvided) {
      console.warn("(ง'̀-'́)ง Bold Option: no valid types were provided.");
    }
    if (customBoldTypesProvided) {
      this._config.boldTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_BOLD_CONFIG,
        customConfig: this._config.boldTypes,
        override: true,
      });
    } else {
      this._config.boldTypes = DEFAULT_BOLD_CONFIG;
    }
  },

  _boldGetOptions({} = {}) {
    const element = this._element;
    return this._config.boldTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'bold_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.boldEnabled,
      onActivate: () => {
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

    const element = this._element;
    const boldTag = DEFAULT_BOLD_CONFIG[0].tag;

    if (this._blockTunesUtilsCheckState({ element: element, tag: boldTag })) {
      this._blockTunesUtilsUnwrap({
        element: element,
        tag: boldTag,
      });
    } else {
      this._blockTunesUtilsWrap({
        element: element,
        tag: boldTag,
      });
    }

    this._api.blocks.update(this._blockId);
  },
};