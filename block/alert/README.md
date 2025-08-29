```js
tools: {
    alert: {
        class: AlertBlock,
        toolbox: {
            title: "Alerta",
        },
        inlineToolbar: true,
        config: {
            useIcon: false,
            replaceAlertDefaultTypes: false,
            alertTypes: [
              {
                tag: 'warning',
                label: "Aviso",
                iconMenu:
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
                iconRender:
                  '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10" fill="#8fbc8f"/><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10" /></svg>',
                styles: {
                  wrapper: {
                    backgroundColor: "#e6f7ff",
                    border: "1px solid #91d5ff",
                    color: "#000",
                  },
                  icon: {
                    backgroundColor: "transparent",
                    color: "red",
                  },
                },
              },
            ],
            useIconTypes: [
              {
                tag: "true",
                label: "Usar",
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
              },
            ],
        },
    },
}