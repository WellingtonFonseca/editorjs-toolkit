import { blockUtilsFunctions } from './_block_utils.js';

export class QuoteBlock {
  static get isTune() {
    return false;
  }

  static get isInline() {
    return false;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get conversionConfig() {
    return {
      export: 'text',
      import: 'text',
    };
  }

  static get toolbox() {
    return {
      title: 'Quote',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
    };
  }

  static get DEFAULT_QUOTE_CONFIG() {
    return [
      {
        tag: 'quote',
        label: 'Quote',
        iconMenu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
        iconRender: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
        styles: {
          wrapper: {
            outline: {
              backgroundColor: '#f8f9fa',
              border: '1px solid #495057',
              borderLeft: '5px solid #495057',
              color: '#495057',
            },
            solid: {
              backgroundColor: '#e9ecef',
              border: '1px solid #e9ecef',
              borderLeft: '5px solid #495057',
              color: '#495057',
            },
          },
          icon: {
            backgroundColor: 'transparent',
          },
        },
      },
    ];
  }

  static get DEFAULT_STYLES_CONFIG() {
    return [
      {
        tag: 'solid',
        label: 'Solid',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>',
      },
      {
        tag: 'outline',
        label: 'Outline',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-icon lucide-circle"><circle cx="12" cy="12" r="10"/></svg>',
      },
    ];
  }

  constructor({ data, api, block, config, readOnly }) {
    this._data = {
      text: data.text || '',
      quote: data.quote || (config && config.defaultQuote) || 'quote',
      style: data.style || (config && config.defaultStyle) || 'outline',
      use_icon: data.use_icon ?? config.useIcon ?? true,
    };

    this._element = null;
    this._api = api;
    this._blockId = block.id;

    Object.assign(this, blockUtilsFunctions);

    this._setConfig({
      config: config,
      readOnly: readOnly,
    });
  }

  _setConfig({ config, readOnly } = {}) {
    this._config = config || {};
    this._config.readOnly = readOnly;
    this._config.replaceDefaultTypes = this._config.replaceDefaultTypes ?? false;

    if (this._config.placeholderOnActive === undefined || this._config.placeholderOnActive === null) {
      this._config.placeholderOnActive = 'Typing...';
    }

    // quote
    const customQuoteTypesProvided = Array.isArray(this._config.quoteTypes) && this._config.quoteTypes.length > 0;

    if (this._config.replaceDefaultTypes === true) {
      if (customQuoteTypesProvided) {
        this._config.quoteTypes = this._config.quoteTypes;
      } else {
        console.warn("(ง'̀-'́)ง Quote Block: replaceDefaultTypes is true but no valid quote types were provided.");
        this._config.quoteTypes = [];
      }
    } else {
      if (this._config.quoteTypes !== undefined && !customQuoteTypesProvided) {
        console.warn("(ง'̀-'́)ง Quote Block: no valid quote types were provided.");
      }

      if (customQuoteTypesProvided) {
        this._config.quoteTypes = this._blockUtilsGetMergedConfig({
          defaultConfig: QuoteBlock.DEFAULT_QUOTE_CONFIG,
          customConfig: this._config.quoteTypes,
          override: false,
        });
      } else {
        this._config.quoteTypes = QuoteBlock.DEFAULT_QUOTE_CONFIG;
      }
    }

    // style
    const customQuoteStyleTypesProvided = Array.isArray(this._config.quoteStyleTypes) && this._config.quoteStyleTypes.length > 0;

    if (this._config.quoteStyleTypes !== undefined && !customQuoteStyleTypesProvided) {
      console.warn("(ง'̀-'́)ง Quote Block: no valid quote style types were provided.");
    }

    if (customQuoteStyleTypesProvided) {
      this._config.quoteStyleTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: QuoteBlock.DEFAULT_STYLES_CONFIG,
        customConfig: this._config.quoteStyleTypes,
        override: true,
      });
    } else {
      this._config.quoteStyleTypes = QuoteBlock.DEFAULT_STYLES_CONFIG;
    }
  }

  destroy() {}

  render() {
    this._elementData = this._getStylesForType({
      type: this._data.quote,
    });
    this._element = this._getTag();
    return this._element;
  }

  renderSettings() {
    if (this._config.readOnly) {
      return [];
    }

    const quoteTypeOptions = this._config.quoteTypes.map((properties) => ({
      type: 'default',
      icon: properties.iconMenu,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'quote_types',
      isActive: this._data.quote.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: false,
      onActivate: (event) => {
        this._changeType({
          newType: properties.tag,
        });
      },
      hint: {
        title: properties.label,
        description: 'change quote type',
        alignment: 'start',
      },
    }));

    const styleOptions = this._config.quoteStyleTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'quote_styles',
      isActive: this._data.style.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: false,
      onActivate: (event) => {
        this._changeStyle({
          newStyle: properties.tag,
        });
      },
      hint: {
        title: properties.label,
        description: 'change quote style',
        alignment: 'start',
      },
    }));

    return [...quoteTypeOptions, ...this._blockUtilsSeparator, ...styleOptions];
  }

  save(blockContent) {
    blockContent.normalize();
    return {
      text: blockContent.innerHTML,
      quote: this._data.quote,
      style: this._data.style,
      use_icon: this._data.use_icon,
    };
  }

  static get sanitize() {
    return {
      blockquote: {},
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

  _getStylesForType({ type } = {}) {
    if (type === undefined) {
      console.warn("(ง'̀-'́)ง Quote Block: unspecified type");
      return;
    }

    const elementData = this._config.quoteTypes.find((item) => item.tag === type);

    if (elementData === undefined) {
      console.warn("(ง'̀-'́)ง Quote Block: type specified was not found in available types");
      return this._config.quoteTypes[0];
    }
    return elementData;
  }

  _getTag() {
    const wrapper = document.createElement('blockquote');
    const iconStartWrapper = document.createElement('div');
    const textElement = document.createElement('div');

    const wrapperStyles = this._elementData.styles.wrapper[this._data.style];

    Object.assign(
      wrapper.style,
      {
        display: 'flex',
        width: '100%',
        borderRadius: '4px',
        padding: '10px',
        boxSizing: 'border-box',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      wrapperStyles,
    );

    if (this._data.use_icon === true) {
      iconStartWrapper.innerHTML = this._elementData.iconRender;

      Object.assign(
        iconStartWrapper.style,
        {
          width: '10%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        },
        this._elementData.styles.icon,
      );
    }

    textElement.innerHTML = this._data.text;
    textElement.contentEditable = this._config.readOnly === false ? true : false;

    if (this._data.text === '') {
      textElement.setAttribute('data-placeholder', this._elementData.label);
    }

    textElement.setAttribute('data-placeholder-active', this._config.placeholderOnActive);

    Object.assign(textElement.style, {
      width: this._data.use_icon === true ? '90%' : '100%',
      // paddingLeft: '10px',
    });

    if (this._data.use_icon === true) {
      wrapper.appendChild(iconStartWrapper);
    }

    wrapper.appendChild(textElement);

    return wrapper;
  }

  _changeType({ newType } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.text = this._element.querySelector('div:last-child').innerHTML;
    this._data.quote = newType;
    this._elementData = this._getStylesForType({
      type: newType,
    });
    const newElement = this._getTag();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._api.blocks.updateBlock(this._blockId);
  }

  _changeStyle({ newStyle } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.text = this._element.querySelector('div:last-child').innerHTML;
    this._data.style = newStyle;

    const newElement = this._getTag();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._api.blocks.updateBlock(this._blockId);
  }
}
