import { alignmentBlockTuneFunctions } from '../block_tunes/alignment_block_tune.js';
import { underlineBlockTuneFunctions } from '../block_tunes/underline_block_tune.js';
import { strikethroughBlockTuneFunctions } from '../block_tunes/strikethrough_block.js';
import { italicBlockTuneFunctions } from '../block_tunes/italic_block_tunes.js';
import { boldBlockTuneFunctions } from '../block_tunes/bold_block_tune.js';
import { blockUtilsFunctions } from './_block_utils.js';

export class ParagraphBlock {
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
      title: 'Paragraph',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pilcrow-icon lucide-pilcrow"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>',
    };
  }

  constructor({ data, api, block, config, readOnly }) {
    this._data = {
      text: data.text || '',
      align: data.align || (config && config.defaultAlign) || 'left',
    };

    this._element = null;
    this._api = api;
    this._blockId = block.id;

    Object.assign(this, alignmentBlockTuneFunctions);
    Object.assign(this, boldBlockTuneFunctions);
    Object.assign(this, underlineBlockTuneFunctions);
    Object.assign(this, strikethroughBlockTuneFunctions);
    Object.assign(this, italicBlockTuneFunctions);

    Object.assign(this, blockUtilsFunctions);

    this._setConfig({
      config: config,
      readOnly: readOnly,
    });
  }

  _setConfig({ config, readOnly }) {
    this._config = config || {};
    this._config.readOnly = readOnly;

    // paragraph
    if (this._config.placeholder === undefined || this._config.placeholder === null) {
      this._config.placeholder = 'Paragraph';
    }

    if (this._config.placeholderOnActive === undefined || this._config.placeholderOnActive === null) {
      this._config.placeholderOnActive = 'Typing...';
    }

    // aligment
    this._alignmentConfigure({});

    // bold
    this._boldConfigure({});

    // underline
    this._underlineConfigure({});

    // strikethrough
    this._strikethroughConfigure({});

    // italic
    this._italicConfigure({});
  }

  destroy() {}

  render() {
    this._element = this._getTag();
    return this._element;
  }

  renderSettings() {
    if (this._config.readOnly) {
      return [];
    }

    const alignmentOptions = this._alignmentGetOptions({});

    const boldOptions = this._boldGetOptions({});
    const underlineOptions = this._underlineGetOptions({});
    const strikethroughOptions = this._strikethroughGetOptions({});
    const italicOptions = this._italicGetOptions({});

    return [...boldOptions, ...italicOptions, ...underlineOptions, ...strikethroughOptions, ...this._blockUtilsSeparator, ...alignmentOptions];
  }

  save(blockContent) {
    blockContent.normalize();

    return {
      text: blockContent.innerHTML,
      align: this._data.align,
    };
  }

  static get sanitize() {
    return {
      p: {},
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

  _getTag() {
    const tag = document.createElement('P');
    tag.innerHTML = this._data.text;
    tag.contentEditable = this._config.readOnly === false ? true : false;

    if (this._data.text === '') {
      tag.setAttribute('data-placeholder', this._config.placeholder);
    }

    tag.setAttribute('data-placeholder-active', this._config.placeholderOnActive);

    Object.assign(tag.style, {
      textAlign: this._data.align,
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
    });

    return tag;
  }
}
