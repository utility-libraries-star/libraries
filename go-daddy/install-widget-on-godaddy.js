class InstallWidget {
  constructor(url) {
    this.isAddedWidget = false;
    this.platformUrl = url;

    this.currentFrame = window.frameElement;
    this.parentElement = this.currentFrame && this.currentFrame.parentNode;
    this.body = this.parentElement && this.parentElement.ownerDocument.body;
  }

  installWidget(className, isFloating) {
    const container = document.createElement('div');
    container.classList.add(className);
    this.isAddedWidget = true;

    if (isFloating) {
      this.body.prepend(container);
      return;
    }
    this.parentElement.appendChild(container);
  }

  installPlatform() {
    const scriptElement = document.createElement('script');
    scriptElement.src = this.platformUrl;
    scriptElement.dataset.useServiceCore = 'true';
    this.parentElement.appendChild(scriptElement);
  }

  installStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent =
      '.widget_section, .widget_section :is([data-ux=Grid],[data-ux=GridCell],[data-ux=Element],iframe) {margin: 0!important; padding: 0!important;}';
    this.body.prepend(styleElement);
  }

  getAttribute(element, attributeName) {
    if (element && attributeName) {
      const attributeValue = element.getAttribute(attributeName);
      return attributeValue === '' || attributeValue;
    }
    return null;
  }

  getWidgetBlock(parentElement, className) {
    const currentClassName = className || 'elfsight-app';
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

    const isNotEditor = !this.currentFrame.baseURI.includes('editor');
    const widgetElement = this.getWidgetBlock(document);

    if (widgetElement && isNotEditor && !this.isAddedWidget) {
      const className = this.getAttribute(widgetElement, 'class');
      const isFloating = this.getAttribute(widgetElement, 'floating');

      this.parentElement.closest('section').classList.add('widget_section');
      this.installStyles();

      if (this.getWidgetBlock(this.parentElement, className)) {
        this.removeOldCode('iframe[srcdoc*="' + className + '"]');
      } else {
        requestAnimationFrame(() => {
          this.installPlatform();
          this.installWidget(className, isFloating);
          this.currentFrame.remove();
        });
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const installWidget = new InstallWidget(
    'https://static.elfsight.com/platform/platform.js'
  );
  installWidget.initial();
});
