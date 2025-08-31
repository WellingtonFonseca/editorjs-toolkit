import { inlineUtilsFunctions } from './_inline_utils.js';

export class BoldInline {
  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    this._button.classList.toggle(this._api.styles.inlineToolButtonActive, state);
  }

  static get TAG() {
    return 'B';
  }

  constructor({ api, config, readOnly }) {
    this._api = api;
    this._button = null;
    this._state = false;

    Object.assign(this, inlineUtilsFunctions);

    this._setConfig({
      config: config,
      readOnly: readOnly,
    });
  }

  _setConfig({ config, readOnly } = {}) {
    this._config = config || {};
    this._config.readOnly = readOnly;

    if (this._config.icon === undefined) {
      this._config.icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bold-icon lucide-bold"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg>';
    }
  }

  render() {
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.innerHTML = this._config.icon;
    this._button.classList.add(this._api.styles.inlineToolButton);
    this._button.addEventListener('click', (event) =>
      this._inlineUtilsHandleButtonClick({
        event: event,
        tag: BoldInline.TAG,
        style: {},
      }),
    );
    return this._button;
  }

  checkState() {
    const mark = this._api.selection.findParentTag(BoldInline.TAG);
    if (mark) {
      this.state = true;
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const blockElement = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer.parentElement : range.commonAncestorContainer;
      const blockHolder = blockElement.closest('.ce-block');
      if (blockHolder) {
        // Encontrar o elemento editável (com contentEditable=true ou texto principal)
        const editableElement = blockHolder.querySelector('[contentEditable="true"]');
        if (editableElement && (editableElement.style.fontWeight === 'bold' || editableElement.querySelector('b'))) {
          this.state = true;
          return;
        }
      }
    }

    this.state = false;
  }

  static get sanitize() {
    return {
      [BoldInline.TAG]: {},
    };
  }
}
