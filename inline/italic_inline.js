import { inlineUtilsFunctions } from './_inline_utils.js';

export class ItalicInline {
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
    return 'EM';
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
      this._config.icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-italic"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>';
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
        tag: ItalicInline.TAG,
        style: {},
      }),
    );
    return this._button;
  }

  checkState() {
    const mark = this._api.selection.findParentTag(ItalicInline.TAG);
    this.state = !!mark;
  }

  static get sanitize() {
    return {
      [ItalicInline.TAG]: {},
    };
  }
}
