(()=>{"use strict";function e(t){return{error:{color:"#FFFFFF",background:"#F44336"},warning:{color:"#111111",background:"#FCCA46"},info:{color:"#111111",background:"#FFFFFF"}}[t]||e("info")}function t({message:t,type:n}){const{color:o,background:r}=e(n),i=document.createElement("div");return i.style.position="fixed",i.style.top="50%",i.style.left="50%",i.style.transform="translate(-50%, -50%)",i.style.zIndex="9999",i.style.padding="10px 20px",i.style.color=o,i.style.backgroundColor=r,i.style.borderRadius="10px",i.style.fontFamily="Arial, sans-serif",i.style.fontSize="18px",i.style.lineHeight="24px",i.style.textAlign="center",i.style.boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)",i.textContent=t,i}(e=>{const n=new URL(e.src,document.baseURI).searchParams.get("gtm")||e.dataset.gtm,o=window.frameElement;if(!o)return void console.error("Unable to install GTM: frame is not defined");const r=o.ownerDocument;if(!r)return void console.error("Unable to install GTM: ownerDocument is not defined");const i="gtm-install-warning-banner";if(o.baseURI.includes("editor")||o.baseURI.includes("builder.hostinger.com"))return void function(){if(document.querySelector(`#${i}`))return;const e=function(){const e=t({message:"To avoid unexpected behavior, GTM will not be installed in site editing mode.",type:"warning"});return e.setAttribute("id",i),e}();document.body.style.minHeight="80px",document.body.prepend(e)}();const s=`gtag-head-${n}`,l=`gtag-body-${n}`,a=`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','${n}');`;const d=function(){const e=document.createElement("script");return e.textContent=a,e.setAttribute("id",s),e}(),c=function(){const e=document.createElement("noscript"),t=function(){const e=document.createElement("iframe");return e.src=`https://www.googletagmanager.com/ns.html?id=${n}`,e.height=0,e.width=0,e.style.display="none",e.style.visibility="hidden",e}();return e.appendChild(t),e.setAttribute("id",l),e}();r.querySelector(`#${s}`)||r.head.prepend(d),r.querySelector(`#${l}`)||r.body.prepend(c)})(document.currentScript)})();