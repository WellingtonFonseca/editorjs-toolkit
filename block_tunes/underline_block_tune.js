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
    this._config.underlineEnabled = this._config.underlineEnabled !== undefined ? this._config.underlineEnabled : true;
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
      isDisabled: this._config.readOnly || !this._config.underlineEnabled,
      onActivate: () => {
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

    const element = this._element;
    const underlineTag = DEFAULT_UNDERLINE_CONFIG[0].tag;

    if (this._blockTunesUtilsCheckState({ element: element, tag: underlineTag })) {
      this._blockTunesUtilsUnwrap({
        element: element,
        tag: underlineTag,
      });
    } else {
      this._blockTunesUtilsWrap({
        element: element,
        tag: underlineTag,
      });
    }
    this._api.blocks.update(this._blockId);
  },
};
