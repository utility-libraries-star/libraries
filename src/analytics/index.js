import { createEditorBanner } from '../components/banner';

((currentScript) => {
  const scriptURL = new URL(currentScript.src, document.baseURI);
  const GTM_ID = scriptURL.searchParams.get('gtm') || currentScript.dataset.gtm;

  const currentFrame = window.frameElement;

  if (!currentFrame) {
    console.error('Unable to install GTM: frame is not defined');

    return;
  }

  const parentDOM = currentFrame.ownerDocument;

  if (!parentDOM) {
    console.error('Unable to install GTM: ownerDocument is not defined');

    return;
  }

  const WARNING_BANNER_ID = 'gtm-install-warning-banner';

  function createEditorWarningBanner() {
    const banner = createEditorBanner({
      message:
        'To avoid unexpected behavior, GTM will not be installed in site editing mode.',
      type: 'warning'
    });
    banner.setAttribute('id', WARNING_BANNER_ID);
    return banner;
  }

  function showEditorWarningBanner() {
    if (document.querySelector(`#${WARNING_BANNER_ID}`)) {
      return;
    }

    const warningBanner = createEditorWarningBanner();

    document.body.style.minHeight = '80px';
    document.body.prepend(warningBanner);
  }

  const inEditor =
    currentFrame.baseURI.includes('editor') ||
    currentFrame.baseURI.includes('builder.hostinger.com');

  if (inEditor) {
    showEditorWarningBanner();

    return;
  }

  const HEAD_CODE_ID = `gtag-head-${GTM_ID}`;
  const BODY_CODE_ID = `gtag-body-${GTM_ID}`;

  const HEAD_CODE = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

  function createHeadCodeElement() {
    const scriptElem = document.createElement('script');

    scriptElem.textContent = HEAD_CODE;
    scriptElem.setAttribute('id', HEAD_CODE_ID);

    return scriptElem;
  }

  function createGAIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    return iframe;
  }

  function createBodyCodeElement() {
    const noscriptElem = document.createElement('noscript');
    const iframe = createGAIframe();

    noscriptElem.appendChild(iframe);
    noscriptElem.setAttribute('id', BODY_CODE_ID);

    return noscriptElem;
  }

  const headCodeElem = createHeadCodeElement();
  const bodyCodeElem = createBodyCodeElement();

  if (!parentDOM.querySelector(`#${HEAD_CODE_ID}`)) {
    parentDOM.head.prepend(headCodeElem);
  }

  if (!parentDOM.querySelector(`#${BODY_CODE_ID}`)) {
    parentDOM.body.prepend(bodyCodeElem);
  }
})(document.currentScript);
