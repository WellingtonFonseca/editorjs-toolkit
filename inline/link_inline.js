import { inlineUtilsFunctions } from './_inline_utils.js';

export class LinkInline {
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
    return 'A';
  }

  constructor({ api, config, readOnly }) {
    this._api = api;
    this._config = config || {};
    this._readOnly = readOnly;
    this._button = null;
    this._state = false;
    this._linkTag = LinkInline.TAG;

    // Mescla as funções utilitárias ao objeto da classe
    Object.assign(this, inlineUtilsFunctions);
    this._configure();
  }

  _configure() {
    this._config.icon = this._config.icon || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    this._config.color = this._config.color || '#388ae5';
    this._config.promptText = this._config.promptText || 'Enter the URL:';
  }

  render() {
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.innerHTML = this._config.icon;
    this._button.classList.add(this._api.styles.inlineToolButton);
    this._button.addEventListener('click', (event) => {
      const selection = window.getSelection();
      if (selection.rangeCount === 0 || selection.isCollapsed) {
        return;
      }
      const mark = this._api.selection.findParentTag(this._linkTag);

      const tag = this._linkTag;
      const style = { color: this._config.color };

      if (!mark) {
        const url = prompt(this._config.promptText);
        if (url) {
          this._inlineUtilsHandleButtonClick({
            event,
            tag,
            style,
            attributes: { href: url },
          });
          this.state = true;
        }
      } else {
        this._inlineUtilsHandleButtonClick({
          event,
          tag,
          style,
          attributes: {},
        });
        this.state = false;
      }
    });
    return this._button;
  }

  checkState() {
    const mark = this._api.selection.findParentTag(this._linkTag);
    this.state = !!mark;
  }

  static get sanitize() {
    return {
      [LinkInline.TAG]: {
        href: true, // Permite o atributo href
      },
    };
  }
}
