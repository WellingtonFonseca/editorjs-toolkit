import { inlineUtilsFunctions } from './_inline_utils.js';

export class MarkerInline {
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
    return 'MARK';
  }

  static get DEFAULT_MARKER_CONFIG() {
    return [
      {
        tag: 'yellow',
        name: 'yellow',
        style: {
          backgroundColor: '#ffec5e',
        },
      },
      {
        tag: 'green',
        name: 'green',
        style: {
          backgroundColor: '#a2ed93',
        },
      },
      {
        tag: 'blue',
        name: 'blue',
        style: {
          backgroundColor: '#a3d8f4',
        },
      },
      {
        tag: 'pink',
        name: 'pink',
        style: {
          backgroundColor: '#ffb3c1',
        },
      },
      {
        tag: 'gray',
        name: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
      },
    ];
  }

  constructor({ api, config, readOnly }) {
    this._api = api;
    this._button = null;
    this._palette = null;
    this._paletteVisible = false;
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
      this._config.icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-highlighter-icon lucide-highlighter"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>';
    }

    const customMarkerTypesProvided = Array.isArray(this._config.markerTypes) && this._config.markerTypes.length > 0;

    if (this._config.replaceMarkerDefaultTypes === true) {
      if (customMarkerTypesProvided) {
        this._config.markerTypes = this._config.markerTypes;
      } else {
        console.warn("(ง'̀-'́)ง Marker Inline: replaceMarkerDefaultTypes is true but no valid markers types were provided.");
        this._config.markerTypes = [];
      }
    } else {
      if (this._config.markerTypes !== undefined && !customMarkerTypesProvided) {
        console.warn("(ง'̀-'́)ง Marker Inline: no valid markers types were provided.");
      }

      if (customMarkerTypesProvided) {
        this._config.markerTypes = this._inlineUtilsGetMergedConfig({
          defaultConfig: MarkerInline.DEFAULT_MARKER_CONFIG,
          customConfig: this._config.markerTypes,
          override: false,
        });
      } else {
        this._config.markerTypes = MarkerInline.DEFAULT_MARKER_CONFIG;
      }
    }
  }

  render() {
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.innerHTML = this._config.icon;
    this._button.classList.add(this._api.styles.inlineToolButton);
    this._button.addEventListener('click', (event) =>
      this._handleButtonClick({
        event: event,
      }),
    );

    this._palette = document.createElement('div');
    this._palette.classList.add('color-palette');
    this._palette.style.display = 'none';

    this._config.markerTypes.forEach((markerType) => {
      const colorButton = document.createElement('button');
      colorButton.type = 'button';
      colorButton.classList.add('color-button');
      Object.assign(colorButton.style, markerType.style);
      colorButton.dataset.color = markerType.style.backgroundColor;
      colorButton.addEventListener('click', (event) => {
        this._applyColor({
          event: event,
          style: markerType.style,
        });
      });
      this._palette.appendChild(colorButton);
    });

    return this._button;
  }

  destroy() {
    document.removeEventListener('click', (event) =>
      this._hidePaletteOnClickOutside({
        event: event,
      }),
    );
    if (this._palette && this._palette.parentElement) {
      this._palette.remove();
    }
  }

  _handleButtonClick({ event } = {}) {
    event.preventDefault();
    event.stopPropagation();

    if (this._config.readOnly) {
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount === 0 || selection.isCollapsed) {
      this._hidePalette();
      return;
    }

    const range = selection.getRangeAt(0);
    const mark = this._api.selection.findParentTag(MarkerInline.TAG);

    if (mark) {
      this._inlineUtilsUnwrap({
        range: range,
        tag: MarkerInline.TAG,
      });
      this._hidePalette();
      this.state = false;
    } else {
      this._togglePalette();
    }
  }

  _togglePalette() {
    if (!this._palette.parentElement) {
      document.body.appendChild(this._palette);
    }

    this._paletteVisible = !this._paletteVisible;
    this._palette.style.display = this._paletteVisible ? 'flex' : 'none';

    if (this._paletteVisible) {
      const buttonRect = this._button.getBoundingClientRect();
      this._palette.style.top = `${buttonRect.bottom + 5}px`;
      this._palette.style.left = `${buttonRect.left}px`;
      document.addEventListener('click', (event) =>
        this._hidePaletteOnClickOutside({
          event: event,
        }),
      );
    } else {
      document.removeEventListener('click', (event) =>
        this._hidePaletteOnClickOutside({
          event: event,
        }),
      );
    }
  }

  _hidePalette() {
    this._paletteVisible = false;
    this._palette.style.display = 'none';
    document.removeEventListener('click', (event) =>
      this._hidePaletteOnClickOutside({
        event: event,
      }),
    );
  }

  _hidePaletteOnClickOutside({ event }) {
    if (!this._palette.contains(event.target) && !this._button.contains(event.target)) {
      this._hidePalette();
    }
  }

  _applyColor({ event, style } = {}) {
    event.preventDefault();
    event.stopPropagation();

    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      this._hidePalette();
      return;
    }

    const range = selection.getRangeAt(0);
    this._inlineUtilsWrap({
      range: range,
      tag: MarkerInline.TAG,
      style: style,
    });

    this._hidePalette();
    this.state = true;
  }

  // _wrap({ range, color }) {
  //   const selectedText = range.extractContents();
  //   const mark = document.createElement(MarkerInline.TAG);
  //   Object.assign(mark.style, {
  //     backgroundColor: color,
  //   });
  //   mark.appendChild(selectedText);
  //   range.insertNode(mark);
  //   this._api.selection.expandToTag(mark);
  // }

  // _unwrap({ range }) {
  //   const mark = this._api.selection.findParentTag(MarkerInline.TAG);

  //   if (!mark) {
  //     return;
  //   }

  //   const parentNode = mark.parentNode;
  //   const fragment = document.createDocumentFragment();

  //   while (mark.firstChild) {
  //     fragment.appendChild(mark.firstChild);
  //   }

  //   const lastInsertedNode = fragment.lastChild;

  //   parentNode.insertBefore(fragment, mark);
  //   mark.remove();

  //   if (lastInsertedNode) {
  //     const selection = window.getSelection();
  //     const newRange = new Range();
  //     newRange.setStartAfter(lastInsertedNode);
  //     newRange.collapse(true);
  //     selection.removeAllRanges();
  //     selection.addRange(newRange);
  //   }
  // }

  checkState() {
    const mark = this._api.selection.findParentTag(MarkerInline.TAG);
    this.state = !!mark;
  }

  static get sanitize() {
    return {
      mark: {
        style: true,
      },
    };
  }
}
