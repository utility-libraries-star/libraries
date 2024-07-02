const FLOATING_ATTRIBUTE = "floating";
const DEFAULT_PLATFORM_URL = "https://static.elfsight.com/platform/platform.js";

const generatePlatform = (platformURL) => {
  const platform = document.createElement("script");
  platform.src = platformURL;
  platform.dataset.useServiceCore = "true";
  platform.defer = true;
  return platform;
};

const generateWidget = (className) => {
  const widget = document.createElement("div");
  widget.classList.add(className);
  return widget;
};

const initializeWidgets = () => {
  const currentFrame = window.frameElement;

  if (!currentFrame) return;

  const widgets = [...document.querySelectorAll('[class*="elfsight-app"]')];
  const isEditor = currentFrame.baseURI.includes("editor");

  if (isEditor || !widgets.length) return;

  const parentDOM = currentFrame.ownerDocument;
  const parentElement = currentFrame.closest("[data-ux='GridCell']");
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
      widget.getAttribute(FLOATING_ATTRIBUTE) === "true" ||
      widget.hasAttribute(FLOATING_ATTRIBUTE);

    if (parentDOM[widgetId] === "installed") return;

    const widgetBlock = generateWidget(widgetId);
    if (isFloating) {
      parentDOM.body.prepend(widgetBlock);
    } else {
      parentElement.appendChild(widgetBlock);
    }

    parentDOM[widgetId] = "installed";
  });

  currentFrame.remove();
};

window.addEventListener("load", initializeWidgets);
