(e=>{const t="floating";window.addEventListener("load",(()=>{const r=window.frameElement;if(!r)return;const s=[...document.querySelectorAll('[class*="elfsight-app"]')],n=r.baseURI.includes("editor")||r.baseURI.includes("builder.hostinger.com");if(n||!s.length)return void(n&&void 0!==e.dataset.banner&&(()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.zIndex="9999",e.style.padding="10px 20px",e.style.color="#fff",e.style.backgroundColor="#f44336",e.style.borderRadius="5px",e.style.fontFamily="Arial, sans-serif",e.style.fontSize="16px",e.style.boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)",e.textContent="Widget(s) are hidden in editing mode",document.body.style.minHeight="50px",document.body.prepend(e)})());const o=r.ownerDocument,d=r.closest("[data-ux='GridCell']")||r.parentNode,l=document.querySelector("script[src*='platform.js']"),i=l?l.src:"https://static.elfsight.com/platform/platform.js";o.head.querySelector(`script[src*="${i}"]`)||o.head.appendChild((e=>{const t=document.createElement("script");return t.src=e,t.dataset.useServiceCore="true",t.defer=!0,t})(i)),s.forEach((e=>{const r=e.className,s="true"===e.getAttribute(t)||e.hasAttribute(t);if("installed"===o[r])return;const n=(e=>{const t=document.createElement("div");return t.classList.add(e),t})(r);s?o.body.prepend(n):d.appendChild(n),o[r]="installed"})),r.remove()}))})(document.currentScript);