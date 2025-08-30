import { alignmentBlockTuneFunctions } from '../_alignment_block_tune.js';
import { blockUtilsFunctions } from '../_block_utils.js';

export class HeaderBlock {
  static get isTune() {
    return false;
  }

  static get isInline() {
    return false;
  }

  static get enableLineBreaks() {
    return false;
  }

  static get conversionConfig() {
    return {
      export: 'text',
      import: 'text',
    };
  }

  static get toolbox() {
    return {
      title: 'Header',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>',
    };
  }

  static get DEFAULT_HEADER_CONFIG() {
    return [
      {
        tag: 'h2',
        label: 'H2',
        style: {
          fontWeight: 'bold',
          fontSize: '24px',
          fontFamily: 'Arial, sans-serif',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>',
      },
      {
        tag: 'h3',
        label: 'H3',
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
          fontFamily: 'Arial, sans-serif',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>',
      },
      {
        tag: 'h4',
        label: 'H4',
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heading-icon lucide-heading"><path d="M6 12h12"/><path d="M6 20V4"/><path d="M18 20V4"/></svg>',
      },
    ];
  }

  constructor({ data, api, block, config, readOnly }) {
    this._data = {
      text: data.text || '',
      tag: data.tag || (config && config.defaultHeader) || 'h2',
      align: data.align || (config && config.defaultAlign) || 'left',
    };

    this._element = null;
    this._api = api;
    this._blockId = block.id;

    Object.assign(this, alignmentBlockTuneFunctions);
    Object.assign(this, blockUtilsFunctions);

    this._setConfig({
      config: config,
      readOnly: readOnly,
    });
  }

  _setConfig({ config, readOnly }) {
    this._config = config || {};
    this._config.readOnly = readOnly;

    // header
    this._config.headerOptionIdentify = 'header-option';

    const customHeaderTypesProvided = Array.isArray(this._config.headerTypes) && this._config.headerTypes.length > 0;

    if (this._config.replaceHeaderDefaultTypes === true) {
      if (customHeaderTypesProvided) {
        this._config.headerTypes = this._config.headerTypes;
      } else {
        console.warn("(ง'̀-'́)ง Header Block: replaceHeaderDefaultTypes is true but no valid alert types were provided.");
        this._config.headerTypes = [];
      }
    } else {
      if (this._config.headerTypes !== undefined && !customHeaderTypesProvided) {
        console.warn("(ง'̀-'́)ง Alert Block: no valid alert types were provided.");
      }

      if (customHeaderTypesProvided) {
        this._config.headerTypes = this._blockUtilsGetMergedConfig({
          defaultConfig: HeaderBlock.DEFAULT_HEADER_CONFIG,
          customConfig: this._config.headerTypes,
          override: false,
        });
      } else {
        this._config.headerTypes = HeaderBlock.DEFAULT_HEADER_CONFIG;
      }
    }

    // aligment
    this._alignmentConfigure({ prefixIndentify: 'header' });
  }

  destroy() {}

  render() {
    this._elementData = this._getStylesForTag({
      tag: this._data.tag,
    });
    this._element = this._getTag();
    return this._element;
  }

  renderSettings() {
    if (this._config.readOnly) {
      return [];
    }

    const headingOptions = this._config.headerTypes.map((properties) => ({
      icon: `<span class="${this._config.headerOptionIdentify}">${properties.icon}</span>`,
      label: properties.label,
      onActivate: (event) => {
        this._blockUtilsChangeOptionMenu({
          event: event,
          menuOptions: document.querySelectorAll(`.${this._config.headerOptionIdentify}`),
        });
        this._changeElement({ newTag: properties.tag });
      },
      isActive: this._data.tag.toUpperCase() === properties.tag.toUpperCase(),
      closeOnActivate: false,
    }));

    const alignmentOptions = this._alignmentGetOptions({});

    return [...headingOptions, ...alignmentOptions];
  }

  save(blockContent) {
    blockContent.normalize();

    return {
      text: blockContent.innerHTML,
      tag: this._data.tag,
      align: this._data.align,
    };
  }

  static get sanitize() {
    return {
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      b: {},
      em: {},
      del: {},
      u: {},
      mark: {
        style: true,
      },
      span: {
        style: true,
      },
    };
  }

  validate(savedData) {
    return savedData.text.trim() !== '';
  }

  _getStylesForTag({ tag } = {}) {
    if (tag === undefined) {
      console.warn("(ง'̀-'́)ง Header Inline: unspecified tag");
      return;
    }

    const elementData = this._config.headerTypes.find((item) => item.tag === tag);

    if (elementData === undefined) {
      console.warn("(ง'̀-'́)ง Header Inline: tag specified was not found in available levels");
      return this._elementData;
    }

    return elementData;
  }

  _getTag() {
    const tag = document.createElement(this._elementData.tag.toUpperCase());
    tag.innerHTML = this._data.text;
    tag.contentEditable = this._config.readOnly === false ? true : false;

    if (this._data.text === '') {
      tag.setAttribute('data-placeholder', this._elementData.label);
    }

    Object.assign(tag.style, this._elementData.style, {
      textAlign: this._data.align,
    });

    return tag;
  }

  _changeElement({ newTag } = {}) {
    if (this._config.readOnly) {
      return;
    }

    this._data.text = this._element.innerHTML;
    this._data.tag = newTag;

    this._elementData = this._getStylesForTag({
      tag: newTag,
    });
    const newElement = this._getTag();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;

    this._api.blocks.updateBlock(this._blockId);
  }
}
