
export class CarefreeButton extends HTMLElement {
  // 需要监听变化的属性
  static get observedAttributes() {
    return ['c', 'l'];
  }
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
    <style>
        :host{ 
            display:inline-flex; 
        }
        :host(:not([type="primary"]):not([type="danger"])) .btn::after{ 
            background-image: radial-gradient(circle, var(--themeColor,#42b983) 10%, transparent 10.01%); 
        }
        .btn{ 
            background:none; 
            outline:0; 
            border:0; 
            left:0; 
            top:0;
            width:100%;
            height:100%;
            padding:0;
            user-select: none;
            cursor: unset;
            position:relative; 
            display:inline-flex; 
            padding: .25em .625em;
            box-sizing:border-box; 
            vertical-align: middle;
            line-height: 1.8;
            overflow:hidden; 
            align-items:center;
            justify-content: center;
            border:1px solid var(--borderColor,rgba(0,0,0,.2)); 
            font-size: 14px; 
            color: var(--fontColor,#333);  
            border-radius: var(--borderRadius,.25em); 
            transition:background .3s,box-shadow .3s,border-color .3s,color .3s;
        }
        .btn::after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            left: var(--x,0); 
            top: var(--y,0);
            pointer-events: none;
            background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: translate(-50%,-50%) scale(10);
            opacity: 0;
            transition: transform .3s, opacity .8s;
        }
        .btn:not([disabled]):active::after {
            transform: translate(-50%,-50%) scale(0);
            opacity: .3;
            transition: 0s;
        }
        </style>
    <button id='btn' class="btn" ><slot></slot></button>
    `
    console.log(this, this.getAttribute("style"))
  }

  updateStyle() {
    const shadow = this.shadowRoot;
    if (shadow) {
      const styles = shadow.querySelector('style')
      if (styles) {
        styles.textContent = `
          ${styles.textContent}
          .btn {
            width: ${this.getAttribute('l')}px;
            height: ${this.getAttribute('l')}px;
            background-color: ${this.getAttribute('c')};
          }
        `
      }
    }
  }
  connectedCallback() {
    console.log('Custom square element added to page.');
    this.updateStyle();
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    this.updateStyle()
  }
}

if (!customElements.get('carefree-button')) {
  customElements.define('carefree-button', CarefreeButton);
}