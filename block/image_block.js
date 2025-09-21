import { alignmentBlockTuneFunctions } from '../block_tunes/alignment_block_tune.js';
import { blockUtilsFunctions } from './_block_utils.js';

export class ImageBlock {
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
      title: 'Image',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-icon lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    };
  }

  constructor({ data, api, block, config, readOnly }) {
    this._data = {
      url: data.url || '',
      caption: data.caption || '',
      alt: data.alt || '',
      link: data.link || '',
      align: data.align || (config && config.defaultAlign) || 'center',
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

    if (this._config.captionPlaceholderOnActive === undefined || this._config.captionPlaceholderOnActive === null) {
      this._config.captionPlaceholderOnActive = 'Typing...';
    }

    if (this._config.captionPlaceholder === undefined || this._config.captionPlaceholder === null) {
      this._config.captionPlaceholder = 'Image caption...';
    }

    this._alignmentConfigure({});
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

    return alignmentOptions;
  }

  save(blockContent) {
    const imageElement = blockContent.querySelector('.cdx-image-element');
    const captionElement = blockContent.querySelector('.cdx-image-caption');

    return {
      url: imageElement ? imageElement.src : '',
      caption: captionElement ? captionElement.innerHTML : '',
      alt: imageElement ? imageElement.alt : '',
      align: this._data.align,
    };
  }

  static get sanitize() {
    return {
      div: {
        class: true,
        style: true,
      },
      img: {
        src: true,
        alt: true,
        style: true,
      },
      a: {
        href: true,
        style: true,
      },
      figcaption: {
        style: true,
      },
    };
  }

  validate(savedData) {
    return savedData.url.trim() !== '';
  }

  _getTag() {
    const wrapper = document.createElement('figure');
    const imageContainer = document.createElement('div');
    const imageElement = document.createElement('img');
    const captionElement = document.createElement('figcaption');

    Object.assign(wrapper.style, {
      textAlign: this._data.align,
      margin: '0',
      width: '100%',
    });

    Object.assign(imageContainer.style, {
      display: 'flex',
      justifyContent: this._data.align === 'center' ? 'center' : this._data.align,
    });

    imageElement.src = this._data.url;
    imageElement.alt = this._data.alt;
    imageElement.classList.add('cdx-image-element');

    Object.assign(imageElement.style, {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '4px',
    });

    captionElement.innerHTML = this._data.caption;
    captionElement.contentEditable = this._config.readOnly === false ? true : false;
    captionElement.classList.add('cdx-image-caption');

    if (this._data.caption === '') {
      captionElement.setAttribute('data-placeholder', this._config.captionPlaceholder);
    }

    captionElement.setAttribute('data-placeholder-active', this._config.captionPlaceholderOnActive);
    Object.assign(captionElement.style, {
      marginTop: '5px',
      fontSize: '12px',
      color: '#6c757d',
      fontStyle: 'italic',
      textAlign: 'center',
    });

    if (this._data.url) {
      imageContainer.appendChild(imageElement);
      wrapper.appendChild(imageContainer);
      wrapper.appendChild(captionElement);
    } else {
      const uploadArea = this._createUploadArea();
      wrapper.appendChild(uploadArea);
    }

    return wrapper;
  }

  _createUploadArea() {
    const uploadWrapper = document.createElement('div');
    const placeholderText = document.createElement('div');

    Object.assign(uploadWrapper.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '150px',
      border: '2px dashed #ced4da',
      borderRadius: '4px',
      backgroundColor: '#f8f9fa',
      cursor: 'pointer',
    });

    placeholderText.innerHTML = 'Drag & Drop an image here or click to upload';
    Object.assign(placeholderText.style, {
      color: '#6c757d',
      fontSize: '14px',
    });

    uploadWrapper.appendChild(placeholderText);

    uploadWrapper.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        if (input.files && input.files[0]) {
          this._handleUpload(input.files[0]);
        }
      };
      input.click();
    });

    uploadWrapper.addEventListener('dragover', (event) => {
      event.preventDefault();
      uploadWrapper.style.backgroundColor = '#e9ecef';
    });

    uploadWrapper.addEventListener('dragleave', () => {
      uploadWrapper.style.backgroundColor = '#f8f9fa';
    });

    uploadWrapper.addEventListener('drop', (event) => {
      event.preventDefault();
      uploadWrapper.style.backgroundColor = '#f8f9fa';
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this._handleUpload(file);
      }
    });

    return uploadWrapper;
  }

  _handleUpload(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      // 1. Atualiza os dados do bloco com a nova URL da imagem.
      this._data.url = event.target.result;

      // 2. Salva o conteúdo atual da legenda antes de re-renderizar.
      const currentCaptionElement = this._element.querySelector('.cdx-image-caption');
      if (currentCaptionElement) {
        this._data.caption = currentCaptionElement.innerHTML;
      }

      // 3. Recria o elemento do bloco com os dados atualizados.
      const newElement = this._getTag();

      // 4. Substitui o elemento antigo pelo novo no DOM, se ele ainda estiver presente.
      if (this._element && this._element.parentNode) {
        this._element.parentNode.replaceChild(newElement, this._element);
        // 5. Atualiza a referência para o novo elemento.
        this._element = newElement;
      }
    };
    reader.readAsDataURL(file);
  }

  _changeAlign({ newAlign } = {}) {
    if (this._config.readOnly) {
      return;
    }
    this._data.align = newAlign;
    const newElement = this._getTag();
    this._element.parentNode.replaceChild(newElement, this._element);
    this._element = newElement;
    this._api.blocks.updateBlock(this._blockId);
  }
}
