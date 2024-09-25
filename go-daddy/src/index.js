((currentScript) => {
  const FLOATING_ATTRIBUTE = 'floating';
  const DEFAULT_PLATFORM_URL =
    'https://static.elfsight.com/platform/platform.js';

  const createBanner = () => {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.zIndex = '9999';
    banner.style.padding = '10px 20px';
    banner.style.color = '#fff';
    banner.style.backgroundColor = '#f44336';
    banner.style.borderRadius = '5px';
    banner.style.fontFamily = 'Arial, sans-serif';
    banner.style.fontSize = '16px';
    banner.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    banner.textContent = 'Widget(s) are hidden in editing mode';
    document.body.style.minHeight = '50px';
    document.body.prepend(banner);
  };

  const generatePlatform = (platformURL) => {
    const platform = document.createElement('script');
    platform.src = platformURL;
    platform.dataset.useServiceCore = 'true';
    platform.defer = true;
    return platform;
  };

  const generateWidget = (className) => {
    const widget = document.createElement('div');
    widget.classList.add(className);
    return widget;
  };

  const initializeWidgets = () => {
    const currentFrame = window.frameElement;

    if (!currentFrame) return;

    const widgets = [...document.querySelectorAll('[class*="elfsight-app"]')];
    const isEditor =
      currentFrame.baseURI.includes('editor') ||
      currentFrame.baseURI.includes('builder.hostinger.com');

    if (isEditor || !widgets.length) {
      if (isEditor) {
        const withBanner = currentScript.dataset.banner !== undefined;
        if (withBanner) {
          createBanner();
        }
      }
      return;
    }

    const parentDOM = currentFrame.ownerDocument;
    const parentElement =
      currentFrame.closest("[data-ux='GridCell']") || currentFrame.parentNode;
    const platformScript = document.querySelector("script[src*='platform.js']");
    const platformURL = platformScript
      ? platformScript.src
      : DEFAULT_PLATFORM_URL;

    if (!parentDOM.head.querySelector(`script[src*="${platformURL}"]`)) {
      parentDOM.head.appendChild(generatePlatform(platformURL));
    }

    widgets.forEach((widget) => {
      const widgetId = widget.className;
      const isFloating =
        widget.getAttribute(FLOATING_ATTRIBUTE) === 'true' ||
        widget.hasAttribute(FLOATING_ATTRIBUTE);

      if (parentDOM[widgetId] === 'installed') return;

      const widgetBlock = generateWidget(widgetId);
      if (isFloating) {
        parentDOM.body.prepend(widgetBlock);
      } else {
        parentElement.appendChild(widgetBlock);
      }

      parentDOM[widgetId] = 'installed';
    });

    currentFrame.remove();
  };

  window.addEventListener('load', initializeWidgets);
})(document.currentScript);
