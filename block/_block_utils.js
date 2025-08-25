export const blockUtilsFunctions = {
  _blockUtilsChangeOptionMenu({event, menuOptions} = {}) {
    menuOptions.forEach((element) => {
      const menuOptionClosest = element.closest('.ce-popover-item');

      menuOptionClosest.classList.remove('ce-popover-item--active');

      const titleElement = menuOptionClosest.querySelector('.ce-popover-item__title');
      if (titleElement.textContent === event.title) {
        menuOptionClosest.classList.add('ce-popover-item--active');
      }
    });
  },
  _blockUtilsGetMergedConfig({ defaultConfig, customConfig, override = false } = {}) {
    if (!customConfig) {
      return defaultConfig;
    }

    const defaultMap = new Map(defaultConfig.map((item) => [item.tag, item]));
    const customMap = new Map(customConfig.map((item) => [item.tag, item]));

    if (override) {
      // Modo 'Sobrescrever apenas': Itera sobre os padrões e sobrescreve
      const mergedMap = new Map(
        [...defaultMap.entries()].map(([key, defaultValue]) => {
          const customValue = customMap.get(key);
          if (customValue) {
            return [key, { ...defaultValue, ...customValue }];
          }
          return [key, defaultValue];
        }),
      );
      return Array.from(mergedMap.values());
    } else {
      // Modo 'Incluir novos': Combina os dois mapas, permitindo novos itens
      const mergedMap = new Map([...defaultMap, ...customMap]);
      return Array.from(mergedMap.values());
    }
  }
}