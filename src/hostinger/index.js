import { createEditorBanner } from '../components/banner';

((currentScript) => {
  const FLOATING_ATTRIBUTE = 'floating';
  const DEFAULT_PLATFORM_URL =
    'https://static.elfsight.com/platform/platform.js';
  const EDITOR_PATHS = ['editor', 'builder.hostinger.com'];

  const createBanner = () => {
    const banner = createEditorBanner({
      message: 'Widget(s) are hidden in editing mode',
      type: 'error'
    });
    document.body.style.minHeight = '50px';
    document.body.prepend(banner);
  };

  const generatePlatform = (platformURL) => {
    const platform = document.createElement('script');
    platform.src = platformURL;
    platform.async = true;
    return platform;
  };

  const generateWidget = (className) => {
    const widget = document.createElement('div');
    widget.classList.add(className);
    return widget;
  };

  const checkEditor = () => {
    const currentFrame = window.frameElement;
    const parentURL = window.location.ancestorOrigins[0];

    if (!currentFrame && !parentURL) {
      return false;
    }

    if (currentFrame) {
      return EDITOR_PATHS.some((path) => currentFrame.baseURI.includes(path));
    }

    if (parentURL) {
      return EDITOR_PATHS.some((path) => parentURL.includes(path));
    }

    return false;
  };

  const initializeWidgets = () => {
    const currentFrame = window.frameElement;

    const widgets = [...document.querySelectorAll('[class*="elfsight-app"]')];
    const isEditor = checkEditor();

    if (isEditor || !widgets.length) {
      if (isEditor) {
        const withBanner = currentScript.dataset.banner !== undefined;
        if (withBanner) {
          createBanner();
        }
      }
      return;
    }

    if (!isEditor && !currentFrame) {
      const platform = generatePlatform(DEFAULT_PLATFORM_URL);
      document.head.appendChild(platform);

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
