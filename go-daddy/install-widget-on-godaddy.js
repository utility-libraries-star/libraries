class InstallWidget{constructor(t){this.isAddedWidget=!1,this.platformUrl=t,this.currentFrame=window.frameElement,this.parentElement=this.currentFrame&&this.currentFrame.parentNode,this.body=this.parentElement&&this.parentElement.ownerDocument.body}installWidget(t,e){let i=document.createElement("div");if(i.classList.add(t),this.isAddedWidget=!0,e){this.body.prepend(i);return}this.parentElement.appendChild(i)}installPlatform(){let t=document.createElement("script");t.src=this.platformUrl,t.dataset.useServiceCore="true",this.parentElement.appendChild(t)}installStyles(){let t=document.createElement("style");t.textContent=".widget_section, .widget_section :is([data-ux=Grid],[data-ux=GridCell],[data-ux=Element],iframe) {margin: 0!important; padding: 0!important;}",this.body.appendChild(t)}getAttribute(t,e){if(t&&e){let i=t.getAttribute(e);return""===i||i}return null}getWidgetBlock(t,e){return t.querySelector('[class*="'+(e||"elfsight-app")+'"]')}removeOldCode(t){let e=this.parentElement.querySelectorAll(t);e.length&&e.forEach(function(t){t.remove()})}initial(){if(!this.currentFrame)return;let t=!this.currentFrame.baseURI.includes("editor"),e=this.getWidgetBlock(document);if(e&&t&&!this.isAddedWidget){let i=this.getAttribute(e,"class"),r=this.getAttribute(e,"floating");this.parentElement.closest("section").classList.add("widget_section"),this.installStyles(),this.getWidgetBlock(this.parentElement,i)?this.removeOldCode('iframe[srcdoc*="'+i+'"]'):requestAnimationFrame(()=>{this.installPlatform(),this.installWidget(i,r),this.currentFrame.remove()})}}}document.addEventListener("DOMContentLoaded",()=>{let t=new InstallWidget("https://static.elfsight.com/platform/platform.js");t.initial()},!0);
