import { blockTunesUtilsFunctions } from './_block_tunes_utils.js';

export const DEFAULT_ALIGNMENT_CONFIG = [
  {
    tag: 'left',
    label: 'Left',
    description: 'change alignment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left-icon lucide-align-left"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg>',
    styleProperty: 'textAlign',
  },
  {
    tag: 'center',
    label: 'Center',
    description: 'change alignment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucude-align-center-icon lucide-align-center"><path d="M17 12H7"/><path d="M19 18H5"/><path d="M21 6H3"/></svg>',
    styleProperty: 'textAlign',
  },
  {
    tag: 'right',
    label: 'Right',
    description: 'change alignment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right-icon lucide-align-right"><path d="M21 12H9"/><path d="M21 18H7"/><path d="M21 6H3"/></svg>',
    styleProperty: 'textAlign',
  },
  {
    tag: 'justify',
    label: 'Justify',
    description: 'change alignment',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>',
    styleProperty: 'textAlign',
  },
];

export const alignmentBlockTuneFunctions = {
  // Mescla as funções utilitárias do bloco para acesso
  ...blockTunesUtilsFunctions,

  _alignmentConfigure({} = {}) {
    this._config.alignmentTunesEnabled = this._config.alignmentTunesEnabled !== undefined ? this._config.alignmentTunesEnabled : true;

    const customAlignmentTypesProvided = Array.isArray(this._config.alignmentTunesTypes) && this._config.alignmentTunesTypes.length > 0;
    if (this._config.alignmentTunesTypes !== undefined && !customAlignmentTypesProvided) {
      console.warn("(ง'̀-'́)ง Alignment Option: no valid types were provided.");
    }

    if (customAlignmentTypesProvided) {
      this._config.alignmentTunesTypes = this._blockTunesUtilsGetMergedConfig({
        defaultConfig: DEFAULT_ALIGNMENT_CONFIG,
        customConfig: this._config.alignmentTunesTypes,
        override: true,
      });
    } else {
      this._config.alignmentTunesTypes = DEFAULT_ALIGNMENT_CONFIG;
    }
  },

  _alignmentGetOptions({} = {}) {
    const element = this._element;
    const currentAlignment = element.style.textAlign || 'left';

    return this._config.alignmentTunesTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'alignments_block',
      isActive: currentAlignment.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: this._config.readOnly || !this._config.alignmentTunesEnabled,
      onActivate: () => {
        if (this._config.readOnly || !this._config.alignmentTunesEnabled) {
          return;
        }
        this._blockTunesUtilsHandleBlockClick({
          element: element,
          properties: {
            type: 'style',
            styleProperty: properties.styleProperty,
            styleValue: properties.tag,
          },
        });
        this._api.blocks.update(this._blockId);
      },
      hint: {
        title: properties.label,
        description: properties.description,
        alignment: 'start',
      },
    }));
  },
};
