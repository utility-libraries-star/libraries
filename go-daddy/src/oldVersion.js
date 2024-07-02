class InstallWidget {
  constructor(url) {
    this.isAddedWidget = false;
    this.platformUrl = url;

    this.currentFrame = window.frameElement;
    this.parentElement =
      this.currentFrame &&
      (this.currentFrame.parentElement.closest('[data-ux="GridCell"]') ||
        this.currentFrame.parentNode);
    this.body = this.parentElement && this.parentElement.ownerDocument.body;
  }

  installPlatform(container) {
    const scriptElement = document.createElement("script");
    scriptElement.src = this.platformUrl;
    scriptElement.dataset.useServiceCore = "true";
    scriptElement.defer = true;
    container.prepend(scriptElement);
  }

  installWidget(className, isFloating) {
    const widget = document.createElement("div");
    widget.classList.add(className);
    const container = isFloating ? this.body : this.parentElement;
    this.isAddedWidget = true;

    this.installPlatform(container);
    container.prepend(widget);
  }

  getAttribute(element, attributeName) {
    if (element && attributeName) {
      const attributeValue = element.getAttribute(attributeName);
      return attributeValue === "" || attributeValue;
    }
    return null;
  }

  getWidgetBlock(parentElement, className) {
    const currentClassName = className || "elfsight-app";
    return parentElement.querySelector('[class*="' + currentClassName + '"]');
  }

  removeOldCode(selector) {
    const nodes = this.parentElement.querySelectorAll(selector);
    if (nodes.length) {
      nodes.forEach(function (block) {
        block.remove();
      });
    }
  }

  initial() {
    if (!this.currentFrame) return;

    const isNotEditor = !this.currentFrame.baseURI.includes("editor");
    const widgetElement = this.getWidgetBlock(document);

    if (widgetElement && isNotEditor && !this.isAddedWidget) {
      const className = this.getAttribute(widgetElement, "class");
      const isFloating = this.getAttribute(widgetElement, "floating");

      if (this.getWidgetBlock(this.parentElement, className)) {
        this.removeOldCode('iframe[srcdoc*="' + className + '"]');
      } else {
        requestAnimationFrame(() => {
          this.installWidget(className, isFloating);
          this.currentFrame.remove();
        });
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const installWidget = new InstallWidget(
    "https://static.elfsight.com/platform/platform.js"
  );
  installWidget.initial();
});
