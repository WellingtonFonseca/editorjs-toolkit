import { blockUtilsFunctions } from '../_block_utils.js';

export class AlertBlock {
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
      title: 'Alert',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone-icon lucide-megaphone"><path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/></svg>',
    };
  }

  static get DEFAULT_ALERT_CONFIG() {
    return [
      {
        tag: 'warning',
        label: 'Warning',
        iconMenu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
        iconRender: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path fill="#f0ad4e" d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
        styles: {
          wrapper: {
            outline: {
              backgroundColor: '#fffbe6',
              border: '1px solid #ffe58f',
              color: '#000',
            },
            solid: {
              backgroundColor: '#ffe58f',
              border: '1px solid #ffe58f',
              color: '#000',
            },
          },
          icon: {
            backgroundColor: 'transparent',
          },
        },
      },
      {
        tag: 'info',
        label: 'Information',
        iconMenu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
        iconRender: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10" fill="#5bc0de"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
        styles: {
          wrapper: {
            outline: {
              backgroundColor: '#e6f7ff',
              border: '1px solid #91d5ff',
              color: '#000',
            },
            solid: {
              backgroundColor: '#91d5ff',
              border: '1px solid #91d5ff',
              color: '#000',
            },
          },
          icon: {
            backgroundColor: 'transparent',
          },
        },
      },
      {
        tag: 'success',
        label: 'Success',
        iconMenu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
        iconRender: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" fill="#8fbc8f"/><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10" /></svg>',
        styles: {
          wrapper: {
            outline: {
              backgroundColor: '#f6ffed',
              border: '1px solid #b7eb8f',
              color: '#000',
            },
            solid: {
              backgroundColor: '#b7eb8f',
              border: '1px solid #b7eb8f',
              color: '#000',
            },
          },
          icon: {
            backgroundColor: 'transparent',
          },
        },
      },
      {
        tag: 'error',
        label: 'Error',
        iconMenu: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
        iconRender: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10" fill="#f08080"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/><circle cx="12" cy="12" r="10"/></svg>',
        styles: {
          wrapper: {
            outline: {
              backgroundColor: '#fff1f0',
              border: '1px solid #ffa39e',
              color: '#000',
            },
            solid: {
              backgroundColor: '#ffa39e',
              border: '1px solid #ffa39e',
              color: '#000',
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

  static get DEFAULT_USEICON_CONFIG() {
    return [
      {
        tag: 'true',
        label: 'Icon',
        use: true,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',
      },
      {
        tag: 'false',
        label: 'No Icon',
        use: false,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>',
      },
    ];
  }

  constructor({ data, api, block, config, readOnly }) {
    this._data = {
      text: data.text || '',
      alert: data.alert || (config && config.defaultAlert) || 'warning',
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
    this._config.replaceAlertDefaultTypes = this._config.replaceAlertDefaultTypes ?? false;

    if (this._config.placeholderOnActive === undefined || this._config.placeholderOnActive === null) {
      this._config.placeholderOnActive = 'Typing...';
    }

    // alert
    const customAlertTypesProvided = Array.isArray(this._config.alertTypes) && this._config.alertTypes.length > 0;

    if (this._config.replaceAlertDefaultTypes === true) {
      if (customAlertTypesProvided) {
        this._config.alertTypes = this._config.alertTypes;
      } else {
        console.warn("(ง'̀-'́)ง Alert Block: replaceAlertDefaultTypes is true but no valid alert types were provided.");
        this._config.alertTypes = [];
      }
    } else {
      if (this._config.alertTypes !== undefined && !customAlertTypesProvided) {
        console.warn("(ง'̀-'́)ง Alert Block: no valid alert types were provided.");
      }

      if (customAlertTypesProvided) {
        this._config.alertTypes = this._blockUtilsGetMergedConfig({
          defaultConfig: AlertBlock.DEFAULT_ALERT_CONFIG,
          customConfig: this._config.alertTypes,
          override: false,
        });
      } else {
        this._config.alertTypes = AlertBlock.DEFAULT_ALERT_CONFIG;
      }
    }

    // style
    const customAlertStyleTypesProvided = Array.isArray(this._config.alertStyleTypes) && this._config.alertStyleTypes.length > 0;

    if (this._config.alertStyleTypes !== undefined && !customAlertStyleTypesProvided) {
      console.warn("(ง'̀-'́)ง Alert Block: no valid alert style types were provided.");
    }

    if (customAlertStyleTypesProvided) {
      this._config.alertStyleTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: AlertBlock.DEFAULT_STYLES_CONFIG,
        customConfig: this._config.alertStyleTypes,
        override: true,
      });
    } else {
      this._config.alertStyleTypes = AlertBlock.DEFAULT_STYLES_CONFIG;
    }

    // icon
    const customAlertUseIconTypesProvided = Array.isArray(this._config.alertUseIconTypes) && this._config.alertUseIconTypes.length > 0;

    if (this._config.alertUseIconTypes !== undefined && !customAlertUseIconTypesProvided) {
      console.warn("(ง'̀-'́)ง Alert Block: no valid alert use icons types were provided.");
    }

    if (customAlertUseIconTypesProvided) {
      this._config.alertUseIconTypes = this._blockUtilsGetMergedConfig({
        defaultConfig: AlertBlock.DEFAULT_USEICON_CONFIG,
        customConfig: this._config.alertUseIconTypes,
        override: true,
      });
    } else {
      this._config.alertUseIconTypes = AlertBlock.DEFAULT_USEICON_CONFIG;
    }
  }

  destroy() {}

  render() {
    this._elementData = this._getStylesForType({
      type: this._data.alert,
    });
    this._element = this._getTag();
    return this._element;
  }

  renderSettings() {
    if (this._config.readOnly) {
      return [];
    }

    const alertTypeOptions = this._config.alertTypes.map((properties) => ({
      type: 'default',
      icon: properties.iconMenu,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'alert_types',
      isActive: this._data.alert.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: false,
      onActivate: (event) => {
        this._changeType({
          newType: properties.tag,
        });
      },
      hint: {
        title: properties.label,
        description: 'change alert type',
        alignment: 'start',
      },
    }));

    const styleOptions = this._config.alertStyleTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'alert_styles',
      isActive: this._data.style.toUpperCase() === properties.tag.toUpperCase(),
      isDisabled: false,
      onActivate: (event) => {
        this._changeStyle({
          newStyle: properties.tag,
        });
      },
      hint: {
        title: properties.label,
        description: 'change alert style',
        alignment: 'start',
      },
    }));

    const useIconOptions = this._config.alertUseIconTypes.map((properties) => ({
      type: 'default',
      icon: properties.icon,
      label: properties.label,
      closeOnActivate: false,
      toggle: 'alert_use_icon',
      isActive: this._data.use_icon === properties.use,
      isDisabled: false,
      onActivate: (event) => {
        this._changeUseIcon({
          newState: properties.use,
        });
      },
    }));

    return [...alertTypeOptions, ...this._blockUtilsSeparator, ...styleOptions, ...this._blockUtilsSeparator, ...useIconOptions];
  }

  save(blockContent) {
    blockContent.normalize();
    return {
      text: blockContent.innerHTML,
      alert: this._data.alert,
      style: this._data.style,
      use_icon: this._data.use_icon,
    };
  }

  static get sanitize() {
    return {
      div: {},
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
      console.warn("(ง'̀-'́)ง Alert Block: unspecified type");
      return;
    }

    const elementData = this._config.alertTypes.find((item) => item.tag === type);

    if (elementData === undefined) {
      console.warn("(ง'̀-'́)ง Alert Block: type specified was not found in available types");
      return this._config.alertTypes[0];
    }
    return elementData;
  }

  _getTag() {
    const wrapper = document.createElement('div');
    const iconWrapper = document.createElement('div');
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
      iconWrapper.innerHTML = this._elementData.iconRender;

      Object.assign(
        iconWrapper.style,
        {
          width: '10%',
          display: 'flex',
          alignItems: 'center',
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

    wrapper.appendChild(iconWrapper);
    wrapper.appendChild(textElement);

    return wrapper;
  }

  _changeType({ newType } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.text = this._element.querySelector('div:last-child').innerHTML;
    this._data.alert = newType;
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

  _changeUseIcon({ newState } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.text = this._element.querySelector('div:last-child').innerHTML;
    this._data.use_icon = newState;

    const newElement = this._getTag();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._api.blocks.updateBlock(this._blockId);
  }
}
