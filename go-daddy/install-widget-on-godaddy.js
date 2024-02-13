var WIDGET_BASE_URL = 'https://static.elfsight.com/platform/platform.js',
  insertWidget = function t(e, i, r) {
    var a = document.createElement('div');
    return (
      a.classList.add(i),
      r ? e.ownerDocument.body.appendChild(a) : e.appendChild(a)
    );
  },
  loadPlatformScript = function t(e) {
    var i = document.createElement('script');
    (i.src = WIDGET_BASE_URL),
      (i.dataset.useServiceCore = 'true'),
      e.appendChild(i);
  },
  insertStyles = function t(e) {
    var i = document.createElement('style');
    (i.textContent =
      '.section_with_elfsigth_widget, .section_with_elfsigth_widget :is([data-ux=Grid],[data-ux=GridCell],[data-ux=Element],iframe) {margin: 0!important; padding: 0!important;}'),
      e.prepend(i);
  },
  getAttributeValue = function t(e, i) {
    return (e && i && e.getAttribute(i)) || null;
  },
  initializeWidgetSetup = function t() {
    var e = window.frameElement;
    if (e) {
      var i = !e.baseURI.includes('editor'),
        r = document.querySelector('[class*="elfsight-app"]');
      if (r && i) {
        var a = getAttributeValue(r, 'class'),
          n = getAttributeValue(r, 'floating') !== null,
          l = e.parentNode;
        (l.closest('section').classList.add('section_with_elfsigth_widget'),
        insertStyles(l),
        l.querySelector('.'.concat(a)))
          ? l
              .querySelectorAll('iframe[srcdoc*="'.concat(a, '"]'))
              .forEach(function (t) {
                return t.remove();
              })
          : (loadPlatformScript(l), insertWidget(l, a, n), e.remove());
      }
    }
  };
document.addEventListener('DOMContentLoaded', initializeWidgetSetup);