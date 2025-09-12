import { blockTunesUtilsFunctions } from './_block_tunes_utils.js';

export const DEFAULT_STRIKETHROUGH_CONFIG = [
  {
    tag: 'DEL',
    label: 'Strikethrough',
    description: 'toggle strikethrough style',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough-icon lucide-strikethrough"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>',
  },
];

export const strikethroughBlockTuneFunctions = {
  ...blockTunesUtilsFunctions,

  _strikethroughConfigure({} = {}) {
    this._config.strikethroughEnabled = this._config.strikethroughEnabled !== undefined ? this._config.strikethroughEnabled : true;
    const customStrikethroughTypesProvided = Array.isArray(this._config.strikethroughTypes) && this._config.strikethroughTypes.length > 0;
    if (this._config.strikethroughTypes !== undefined && !customStrikethroughTypesProvided) {
      console.warn("(ง'̀-'́)ง Strikethrough Option: no valid types were provided.");
    }
    if (customStrikethroughTypesProvided) {
      this._config.strikethroughTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_STRIKETHROUGH_CONFIG,
        customConfig: this._config.strikethroughTypes,
        override: true,
      });
    } else {
      this._config.strikethroughTypes = DEFAULT_STRIKETHROUGH_CONFIG;
    }
  },

  _strikethroughGetOptions({} = {}) {
    const element = this._element;
    return this._config.strikethroughTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'strikethrough_block',
      isActive: this._blockTunesUtilsCheckState({
        element: element,
        tag: properties.tag,
      }),
      isDisabled: this._config.readOnly || !this._config.strikethroughEnabled,
      onActivate: () => {
        this._strikethroughChange();
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },

  _strikethroughChange() {
    if (this._config.readOnly || !this._config.strikethroughEnabled) {
      return;
    }

    const element = this._element;
    const strikethroughTag = DEFAULT_STRIKETHROUGH_CONFIG[0].tag;

    if (this._blockTunesUtilsCheckState({ element: element, tag: strikethroughTag })) {
      this._blockTunesUtilsUnwrap({
        element: element,
        tag: strikethroughTag,
      });
    } else {
      this._blockTunesUtilsWrap({
        element: element,
        tag: strikethroughTag,
      });
    }

    this._api.blocks.update(this._blockId);
  },
};