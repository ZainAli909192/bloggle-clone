document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.querySelector('.drop-zone');
    const customizationPanel = document.getElementById('customization-options');

    let selectedElement = null;
    // Customization Options for Drop Zone
  
    // Drag Start Event
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            event.dataTransfer.setData('type', draggable.getAttribute('data-type'));
        });
    });

    // Allow Drop
    dropZone.addEventListener('dragover', event => {
        event.preventDefault();
    });

    // Handle Drop Event
    dropZone.addEventListener('drop', event => {
        event.preventDefault();

        const type = event.dataTransfer.getData('type');
        if (!type) return; // Prevent empty drops

        let newElement = createElement(type);
        if (newElement) {
            newElement.classList.add('dropped-item');
            dropZone.appendChild(newElement);

            // Click to Edit
            newElement.addEventListener('click', () => {
                selectedElement = newElement;
                showCustomizationOptions(newElement);
            });
        }
    });

    // Function to Create Elements
  // Function to Create Elements
     // Function to Create Elements
   

    // Function to Show Customization Options
    function showCustomizationOptions(element) {
        customizationPanel.innerHTML = '';
        element.style.border = '1px solid transparent';
    
    
        // Customization options for images
        if (element.tagName === 'IMG') {
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>Image Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-url"><i class="fas fa-image"></i> Image URL:</label>
                            <input type="text" id="img-url" value="${element.src}">
                        </div>
                        <div>
                            <label for="img-alt"><i class="fas fa-font"></i> Alt Text:</label>
                            <input type="text" id="img-alt" value="${element.alt}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                            <input type="number" id="img-height" value="${element.height}">
                        </div>
                        <div>
                            <label for="img-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                            <input type="number" id="img-width" value="${element.width}">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="img-object-fit"><i class="fas fa-expand"></i> Object Fit:</label>
                            <select id="img-object-fit">
                                <option value="fill" ${element.style.objectFit === 'fill' ? 'selected' : ''}>Fill</option>
                                <option value="contain" ${element.style.objectFit === 'contain' ? 'selected' : ''}>Contain</option>
                                <option value="cover" ${element.style.objectFit === 'cover' ? 'selected' : ''}>Cover</option>
                                <option value="none" ${element.style.objectFit === 'none' ? 'selected' : ''}>None</option>
                                <option value="scale-down" ${element.style.objectFit === 'scale-down' ? 'selected' : ''}>Scale Down</option>
                            </select>
                        </div>
                        <div>
                            <label for="img-object-position"><i class="fas fa-crosshairs"></i> Object Position:</label>
                            <input type="text" id="img-object-position" value="${element.style.objectPosition || '50% 50%'}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Border Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                            <input type="color" id="img-border-color" value="${getComputedStyle(element).borderColor}">
                        </div>
                        <div>
                            <label for="img-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                            <input type="number" id="img-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                            <select id="img-border-style">
                                <option value="none" ${getComputedStyle(element).borderStyle === 'none' ? 'selected' : ''}>None</option>
                                <option value="solid" ${getComputedStyle(element).borderStyle === 'solid' ? 'selected' : ''}>Solid</option>
                                <option value="dotted" ${getComputedStyle(element).borderStyle === 'dotted' ? 'selected' : ''}>Dotted</option>
                                <option value="dashed" ${getComputedStyle(element).borderStyle === 'dashed' ? 'selected' : ''}>Dashed</option>
                                <option value="double" ${getComputedStyle(element).borderStyle === 'double' ? 'selected' : ''}>Double</option>
                            </select>
                        </div>
                        <div>
                            <label for="img-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="img-border-radius" value="${parseInt(getComputedStyle(element).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Spacing Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-padding"><i class="fas fa-spacing"></i> Padding:</label>
                            <input type="number" id="img-padding" value="${parseInt(getComputedStyle(element).padding)}">
                        </div>
                        <div>
                            <label for="img-margin"><i class="fas fa-spacing"></i> Margin:</label>
                            <input type="number" id="img-margin" value="${parseInt(getComputedStyle(element).margin)}">
                        </div>
                        <!-- Row 2 -->
                     
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Box Shadow Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                            <input type="number" id="img-box-shadow-x" value="0">
                        </div>
                        <div>
                            <label for="img-box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                            <input type="number" id="img-box-shadow-y" value="0">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                            <input type="number" id="img-box-shadow-blur" value="0">
                        </div>
                        <div>
                            <label for="img-box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                            <input type="number" id="img-box-shadow-spread" value="0">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="img-box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                            <input type="color" id="img-box-shadow-color" value="#000000">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Transform Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                            <input type="number" id="img-rotate" value="0">
                        </div>
                        <div>
                            <label for="img-scale"><i class="fas fa-expand"></i> Scale:</label>
                            <input type="number" id="img-scale" value="1" step="0.1">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                            <input type="number" id="img-translate-x" value="0">
                        </div>
                        <div>
                            <label for="img-translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                            <input type="number" id="img-translate-y" value="0">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-item"><i class="fas fa-trash"></i> Remove Item</button>
                </div>
            `;
        
            // Event listeners for image-specific options
            document.getElementById('img-url').addEventListener('click', (e) => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
        
                fileInput.addEventListener('change', (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            element.src = e.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                });
        
                fileInput.click();
                e.preventDefault();
            });
        
            document.getElementById('img-alt').addEventListener('input', (e) => {
                element.alt = e.target.value;
            });
        
            document.getElementById('img-height').addEventListener('input', (e) => {
                element.height = e.target.value;
            });
        
            document.getElementById('img-width').addEventListener('input', (e) => {
                element.width = e.target.value;
            });
        
            document.getElementById('img-object-fit').addEventListener('change', (e) => {
                element.style.objectFit = e.target.value;
            });
        
            document.getElementById('img-object-position').addEventListener('input', (e) => {
                element.style.objectPosition = e.target.value;
            });
        
            document.getElementById('img-border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
        
            document.getElementById('img-border-size').addEventListener('input', (e) => {
                element.style.borderWidth = e.target.value + 'px';
            });
        
            document.getElementById('img-border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = e.target.value + 'px';
            });
        
            document.getElementById('img-border-style').addEventListener('change', (e) => {
                element.style.borderStyle = e.target.value;
            });
        
            // Padding
            document.getElementById('img-padding').addEventListener('input', (e) => {
                element.style.padding = e.target.value + 'px';
            });
        
            // Margin
            document.getElementById('img-margin').addEventListener('input', (e) => {
                element.style.margin = e.target.value + 'px';
            });
        
        
            // Box Shadow
            
        // new  
        
        document.getElementById('img-box-shadow-x').addEventListener('input', (e) => {
            // element.style.boxShadow = boxShadow.join(' ';
            // alert(element.style.boxShadow.value)
            const boxShadow = element.style.boxShadow.split(' ');
            boxShadow[0] = e.target.value+'px';

            element.style.boxShadow = `${e.target.value}px 0 0 0`;
        });
        document.getElementById('img-box-shadow-y').addEventListener('input', (e) => {
            // element.style.boxShadow = `0 ${e.target.value}px 0 0`;                
            const boxShadow = element.style.boxShadow.split(' ');
            boxShadow[1] = e.target.value+'px';
            element.style.boxShadow = boxShadow.join(' ');
        });
        document.getElementById('img-box-shadow-blur').addEventListener('input', (e) => {
            // element.style.boxShadow = `0 0 ${e.target.value}px 0`;
            const boxShadow = element.style.boxShadow.split(' ');
            boxShadow[2] = e.target.value+'px';
            element.style.boxShadow = boxShadow.join(' ');
       
        });
        document.getElementById('img-box-shadow-spread').addEventListener('input', (e) => {
            // element.style.boxShadow = `0 0 0 ${e.target.value}px`;
            const boxShadow = element.style.boxShadow.split(' ');
            boxShadow[3] = e.target.value+'px';
            element.style.boxShadow = boxShadow.join(' ');
       
        });
        document.getElementById('img-box-shadow-color').addEventListener('input', (e) => {
            // element.style.boxShadow = `0 0 0 0 ${e.target.value}`;
            const boxShadow = element.style.boxShadow.split(' ');
            boxShadow[4] = e.target.value;
            element.style.boxShadow = boxShadow.join(' ');
        });
            // Transform
            document.getElementById('img-rotate').addEventListener('input', (e) => {
                element.style.transform = `rotate(${e.target.value}deg)`;
            });
        
            document.getElementById('img-scale').addEventListener('input', (e) => {
                element.style.transform = `scale(${e.target.value})`;
            });
        
            document.getElementById('img-translate-x').addEventListener('input', (e) => {
                const transform = element.style.transform || '';
                const translateY = transform.match(/translateY\(([^)]+)\)/)?.[1] || '0px';
                element.style.transform = `translateX(${e.target.value}px) translateY(${translateY})`;
            });
        
            document.getElementById('img-translate-y').addEventListener('input', (e) => {
                const transform = element.style.transform || '';
                const translateX = transform.match(/translateX\(([^)]+)\)/)?.[1] || '0px';
                element.style.transform = `translateX(${translateX}) translateY(${e.target.value}px)`;
            });
        
            // Remove item
            document.getElementById('remove-item').addEventListener('click', () => {
                element.remove();
                customizationPanel.innerHTML = '';
            });
        }
        else if (element.classList.contains('one-product')) {
            // Get the product elements
            const productImage = element.querySelector('img');
            const productName = element.querySelector('h4');
            const productPrice = element.querySelector('p:nth-of-type(1)');
            const productDescription = element.querySelector('p:nth-of-type(2)');
        
            // Generate customization options
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>Product Details</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="product-name"><i class="fas fa-font"></i> Product Name:</label>
                            <input type="text" id="product-name" value="${productName.textContent}">
                        </div>
                        <div>
                            <label for="product-price"><i class="fas fa-dollar-sign"></i> Product Price:</label>
                            <input type="number" id="product-price" value="${productPrice.textContent.replace('$', '')}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="product-image"><i class="fas fa-image"></i> Image URL:</label>
                            <input type="url" id="product-image" value="${productImage.src}">
                        </div>
                        <div>
                            <label for="product-description"><i class="fas fa-align-left"></i> Description:</label>
                            <input type="text" id="product-description" value="${productDescription.textContent}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Container Size</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="container-width"><i class="fas fa-arrows-alt-h"></i> Width (%):</label>
                            <input type="number" id="container-width" value="${parseInt(getComputedStyle(element).width)}">
                        </div>
                        <div>
                            <label for="container-height"><i class="fas fa-arrows-alt-v"></i> Height (%):</label>
                            <input type="number" id="container-height" value="${parseInt(getComputedStyle(element).height)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Image Size</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="image-width"><i class="fas fa-arrows-alt-h"></i> Width (%):</label>
                            <input type="number" id="image-width" value="${parseInt(getComputedStyle(productImage).width)}">
                        </div>
                        <div>
                            <label for="image-height"><i class="fas fa-arrows-alt-v"></i> Height (%):</label>
                            <input type="number" id="image-height" value="${parseInt(getComputedStyle(productImage).height)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Spacing Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="product-padding"><i class="fas fa-spacing"></i> Padding:</label>
                            <input type="number" id="product-padding" value="${parseInt(getComputedStyle(element).padding)}">
                        </div>
                        <div>
                            <label for="product-margin"><i class="fas fa-spacing"></i> Margin:</label>
                            <input type="number" id="product-margin" value="${parseInt(getComputedStyle(element).margin)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Border Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="product-border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                            <select id="product-border-style">
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                        <div>
                            <label for="product-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                            <input type="color" id="product-border-color" value="${getComputedStyle(element).borderColor}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="product-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                            <input type="number" id="product-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                        </div>
                        <div>
                            <label for="product-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="product-border-radius" value="${parseInt(getComputedStyle(element).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Box Shadow Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                            <input type="number" id="box-shadow-x" value="0">
                        </div>
                        <div>
                            <label for="box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                            <input type="number" id="box-shadow-y" value="0">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                            <input type="number" id="box-shadow-blur" value="0">
                        </div>
                        <div>
                            <label for="box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                            <input type="number" id="box-shadow-spread" value="0">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                            <input type="color" id="box-shadow-color" value="#000000">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Transform Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                            <input type="number" id="rotate" value="0">
                        </div>
                        <div>
                            <label for="skew"><i class="fas fa-slash"></i> Skew (degrees):</label>
                            <input type="number" id="skew" value="0">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                            <input type="number" id="translate-x" value="0">
                        </div>
                        <div>
                            <label for="translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                            <input type="number" id="translate-y" value="0">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="scale"><i class="fas fa-expand"></i> Scale:</label>
                            <input type="number" id="scale" value="1" step="0.1">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-one-product"><i class="fas fa-trash"></i> Remove Product</button>
                </div>
            `;
        
            // Event listeners for product details
            document.getElementById('product-name').addEventListener('input', (e) => {
                productName.textContent = e.target.value;
            });
        
            document.getElementById('product-price').addEventListener('input', (e) => {
                productPrice.textContent = `$${e.target.value}`;
            });
        
            document.getElementById('product-image').addEventListener('input', (e) => {
                productImage.src = e.target.value;
            });
        
            document.getElementById('product-description').addEventListener('input', (e) => {
                productDescription.textContent = e.target.value;
            });
        
            // Event listeners for container size
            document.getElementById('container-width').addEventListener('input', (e) => {
                element.style.width = `${e.target.value}%`;
            });
        
            document.getElementById('container-height').addEventListener('input', (e) => {
                element.style.height = `${e.target.value}%`;
            });
        
            // Event listeners for image size
            document.getElementById('image-width').addEventListener('input', (e) => {
                productImage.style.width = `${e.target.value}%`;
            });
        
            document.getElementById('image-height').addEventListener('input', (e) => {
                productImage.style.height = `${e.target.value}%`;
            });
        
            // Event listeners for spacing customization
            document.getElementById('product-padding').addEventListener('input', (e) => {
                element.style.padding = `${e.target.value}px`;
            });
        
            document.getElementById('product-margin').addEventListener('input', (e) => {
                element.style.margin = `${e.target.value}px`;
            });
        
            // Event listeners for border customization
            document.getElementById('product-border-style').addEventListener('change', (e) => {
                element.style.borderStyle = e.target.value;
            });
        
            document.getElementById('product-border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
        
            document.getElementById('product-border-size').addEventListener('input', (e) => {
                element.style.borderWidth = `${e.target.value}px`;
            });
        
            document.getElementById('product-border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = `${e.target.value}px`;
            });
        
            // Event listeners for box-shadow customization
            document.getElementById('box-shadow-x').addEventListener('input', (e) => updateBoxShadow(element));
            document.getElementById('box-shadow-y').addEventListener('input', (e) => updateBoxShadow(element));
            document.getElementById('box-shadow-blur').addEventListener('input', (e) => updateBoxShadow(element));
            document.getElementById('box-shadow-spread').addEventListener('input', (e) => updateBoxShadow(element));
            document.getElementById('box-shadow-color').addEventListener('input', (e) => updateBoxShadow(element));
        
            // Event listeners for transform customization
            document.getElementById('rotate').addEventListener('input', (e) => {
                const rotate = e.target.value;
                const transform = element.style.transform.replace(/rotate\([^)]+\)/, '').trim();
                element.style.transform = `${transform} rotate(${rotate}deg)`;
            });
        
            document.getElementById('skew').addEventListener('input', (e) => {
                const skew = e.target.value;
                const transform = element.style.transform.replace(/skew\([^)]+\)/, '').trim();
                element.style.transform = `${transform} skew(${skew}deg)`;
            });
        
            document.getElementById('translate-x').addEventListener('input', (e) => {
                const translateX = e.target.value;
                const transform = element.style.transform.replace(/translateX\([^)]+\)/, '').trim();
                element.style.transform = `${transform} translateX(${translateX}px)`;
            });
        
            document.getElementById('translate-y').addEventListener('input', (e) => {
                const translateY = e.target.value;
                const transform = element.style.transform.replace(/translateY\([^)]+\)/, '').trim();
                element.style.transform = `${transform} translateY(${translateY}px)`;
            });
        
            document.getElementById('scale').addEventListener('input', (e) => {
                const scale = e.target.value;
                const transform = element.style.transform.replace(/scale\([^)]+\)/, '').trim();
                element.style.transform = `${transform} scale(${scale})`;
            });
        
            // Remove the product
            document.getElementById('remove-one-product').addEventListener('click', () => {
                element.remove();
                customizationPanel.innerHTML = '';
            });
        }
  else if (element.tagName === 'VIDEO') {
      customizationPanel.innerHTML = `
          <div class="customization-card">
              <h4>Video Customization</h4>
              <div class="two-column-grid">
                  <div>
                      <label for="video-url"><i class="fas fa-video"></i> Video URL:</label>
                      <input type="text" id="video-url" value="${element.src}">
                  </div>
                  <div>
                      <label for="video-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                      <input type="number" id="video-height" value="${element.height}">
                  </div>
                  <div>
                      <label for="video-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                      <input type="number" id="video-width" value="${element.width}">
                  </div>
                  <div>
                      <label for="video-controls"><i class="fas fa-toggle-on"></i> Controls:</label>
                      <input type="checkbox" id="video-controls" ${element.controls ? 'checked' : ''}>
                  </div>
                  <div>
                      <label for="video-autoplay"><i class="fas fa-play-circle"></i> Autoplay:</label>
                      <input type="checkbox" id="video-autoplay" ${element.autoplay ? 'checked' : ''}>
                  </div>
                  <div>
                      <label for="video-loop"><i class="fas fa-redo"></i> Loop:</label>
                      <input type="checkbox" id="video-loop" ${element.loop ? 'checked' : ''}>
                  </div>
                  <div>
                      <label for="video-muted"><i class="fas fa-volume-mute"></i> Muted:</label>
                      <input type="checkbox" id="video-muted" ${element.muted ? 'checked' : ''}>
                  </div>
              </div>
          </div>
          <div class="customization-card">
              <h4>Border Customization</h4>
              <div class="two-column-grid">
                  <div>
                      <label for="video-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                      <input type="color" id="video-border-color" value="${getComputedStyle(element).borderColor}">
                  </div>
                  <div>
                      <label for="video-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                      <input type="number" id="video-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                  </div>
                  <div>
                      <label for="video-border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                      <select id="video-border-style">
                          <option value="none" ${getComputedStyle(element).borderStyle === 'none' ? 'selected' : ''}>None</option>
                          <option value="solid" ${getComputedStyle(element).borderStyle === 'solid' ? 'selected' : ''}>Solid</option>
                          <option value="dotted" ${getComputedStyle(element).borderStyle === 'dotted' ? 'selected' : ''}>Dotted</option>
                          <option value="dashed" ${getComputedStyle(element).borderStyle === 'dashed' ? 'selected' : ''}>Dashed</option>
                          <option value="double" ${getComputedStyle(element).borderStyle === 'double' ? 'selected' : ''}>Double</option>
                      </select>
                  </div>
              </div>
          </div>
          <div class="customization-card">
              <h4>Box Shadow Customization</h4>
              <div class="two-column-grid">
                  <div>
                      <label for="video-box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                      <input type="number" id="video-box-shadow-x" value="0">
                  </div>
                  <div>
                      <label for="video-box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                      <input type="number" id="video-box-shadow-y" value="0">
                  </div>
                  <div>
                      <label for="video-box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                      <input type="number" id="video-box-shadow-blur" value="0">
                  </div>
                  <div>
                      <label for="video-box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                      <input type="number" id="video-box-shadow-spread" value="0">
                  </div>
                  <div>
                      <label for="video-box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                      <input type="color" id="video-box-shadow-color" value="#000000">
                  </div>
              </div>
          </div>
          <div class="customization-card">
              <h4>Transform Customization</h4>
              <div class="two-column-grid">
                  <div>
                      <label for="video-rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                      <input type="number" id="video-rotate" value="0">
                  </div>
                  <div>
                      <label for="video-scale"><i class="fas fa-expand"></i> Scale:</label>
                      <input type="number" id="video-scale" value="1" step="0.1">
                  </div>
                  <div>
                      <label for="video-translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                      <input type="number" id="video-translate-x" value="0">
                  </div>
                  <div>
                      <label for="video-translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                      <input type="number" id="video-translate-y" value="0">
                  </div>
              </div>
          </div>
          <div class="customization-card">
              <h4>Spacing Customization</h4>
              <div class="two-column-grid">
                  <div>
                      <label for="video-padding"><i class="fas fa-spacing"></i> Padding:</label>
                      <input type="number" id="video-padding" value="${parseInt(getComputedStyle(element).padding)}">
                  </div>
                  <div>
                      <label for="video-margin"><i class="fas fa-spacing"></i> Margin:</label>
                      <input type="number" id="video-margin" value="${parseInt(getComputedStyle(element).margin)}">
                  </div>
              </div>
          </div>
      `;
  
      // Event listeners for video-specific options
      document.getElementById('video-url').addEventListener('click', (e) => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'video/*';
  
          fileInput.addEventListener('change', (event) => {
              const file = event.target.files[0];
              if (file) {
                  const reader = new FileReader();
  
                  reader.onload = (e) => {
                      element.src = e.target.result; // Set the video source to the selected file
                  }
  
                  reader.readAsDataURL(file); // Read the file as a data URL.
              }
          });
  
          fileInput.click(); // Programmatically open the file chooser
          e.preventDefault(); // Prevent the default input behavior
      });
  
      // Event listeners for height and width
      document.getElementById('video-height').addEventListener('input', (e) => {
          element.height = e.target.value;
      });
      document.getElementById('video-width').addEventListener('input', (e) => {
          element.width = e.target.value;
      });
  
      // Event listeners for controls
      document.getElementById('video-controls').addEventListener('change', (e) => {
          element.controls = e.target.checked;
      });
      document.getElementById('video-autoplay').addEventListener('change', (e) => {
          element.autoplay = e.target.checked;
      });
      document.getElementById('video-loop').addEventListener('change', (e) => {
          element.loop = e.target.checked;
      });
      document.getElementById('video-muted').addEventListener('change', (e) => {
          element.muted = e.target.checked;
      });
  
      // Event listeners for border customization
      document.getElementById('video-border-color').addEventListener('input', (e) => {
          element.style.borderColor = e.target.value;
      });
      document.getElementById('video-border-size').addEventListener('input', (e) => {
          element.style.borderWidth = e.target.value + 'px';
      });
      document.getElementById('video-border-style').addEventListener('change', (e) => {
          element.style.borderStyle = e.target.value;
      });
  
      // Event listeners for box shadow customization
      document.getElementById('video-box-shadow-x').addEventListener('input', (e) => {
          element.style.boxShadow = `${e.target.value}px ${document.getElementById('video-box-shadow-y').value}px ${document.getElementById('video-box-shadow-blur').value}px ${document.getElementById('video-box-shadow-spread').value}px ${document.getElementById('video-box-shadow-color').value}`;
      });
      document.getElementById('video-box-shadow-y').addEventListener('input', (e) => {
          element.style.boxShadow = `${document.getElementById('video-box-shadow-x').value}px ${e.target.value}px ${document.getElementById('video-box-shadow-blur').value}px ${document.getElementById('video-box-shadow-spread').value}px ${document.getElementById('video-box-shadow-color').value}`;
      });
      document.getElementById('video-box-shadow-blur').addEventListener('input', (e) => {
          element.style.boxShadow = `${document.getElementById('video-box-shadow-x').value}px ${document.getElementById('video-box-shadow-y').value}px ${e.target.value}px ${document.getElementById('video-box-shadow-spread').value}px ${document.getElementById('video-box-shadow-color').value}`;
      });
      document.getElementById('video-box-shadow-spread').addEventListener('input', (e) => {
          element.style.boxShadow = `${document.getElementById('video-box-shadow-x').value}px ${document.getElementById('video-box-shadow-y').value}px ${document.getElementById('video-box-shadow-blur').value}px ${e.target.value}px ${document.getElementById('video-box-shadow-color').value}`;
      });
      document.getElementById('video-box-shadow-color').addEventListener('input', (e) => {
          element.style.boxShadow = `${document.getElementById('video-box-shadow-x').value}px ${document.getElementById('video-box-shadow-y').value}px ${document.getElementById('video-box-shadow-blur').value}px ${document.getElementById('video-box-shadow-spread').value}px ${e.target.value}`;
      });
  
      // Event listeners for transform customization
      document.getElementById('video-rotate').addEventListener('input', (e) => {
          element.style.transform = `rotate(${e.target.value}deg) scale(${document.getElementById('video-scale').value}) translate(${document.getElementById('video-translate-x').value}px, ${document.getElementById('video-translate-y').value}px)`;
      });
      document.getElementById('video-scale').addEventListener('input', (e) => {
          element.style.transform = `rotate(${document.getElementById('video-rotate').value}deg) scale(${e.target.value}) translate(${document.getElementById('video-translate-x').value}px, ${document.getElementById('video-translate-y').value}px)`;
      });
      document.getElementById('video-translate-x').addEventListener('input', (e) => {
          element.style.transform = `rotate(${document.getElementById('video-rotate').value}deg) scale(${document.getElementById('video-scale').value}) translate(${e.target.value}px, ${document.getElementById('video-translate-y').value}px)`;
      });
      document.getElementById('video-translate-y').addEventListener('input', (e) => {
          element.style.transform = `rotate(${document.getElementById('video-rotate').value}deg) scale(${document.getElementById('video-scale').value}) translate(${document.getElementById('video-translate-x').value}px, ${e.target.value}px)`;
      });
  
      // Event listeners for spacing customization
      document.getElementById('video-padding').addEventListener('input', (e) => {
          element.style.padding = e.target.value + 'px';
      });
      document.getElementById('video-margin').addEventListener('input', (e) => {
          element.style.margin = e.target.value + 'px';
      });
  }
  
        // Customization options for text-image and text-video elements
        else if (element.classList.contains('text-image')) {
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>Text Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="text-content"><i class="fas fa-font"></i> Text Content:</label>
                            <input type="text" id="text-content" value="${element.querySelector('p').textContent}">
                        </div>
                        <div>
                            <label for="text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="text-color" value="${getComputedStyle(element.querySelector('p')).color}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                            <input type="number" id="font-size" value="${parseInt(getComputedStyle(element.querySelector('p')).fontSize)}">
                        </div>
                        <div>
                            <label for="font-family"><i class="fas fa-font"></i> Font Family:</label>
                            <select id="font-family">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Image Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-url"><i class="fas fa-image"></i> Image URL:</label>
                            <input type="text" id="img-url" value="${element.querySelector('img').src}">
                        </div>
                        <div>
                            <label for="img-alt"><i class="fas fa-font"></i> Alt Text:</label>
                            <input type="text" id="img-alt" value="${element.querySelector('img').alt}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                            <input type="number" id="img-height" value="${element.querySelector('img').height}">
                        </div>
                        <div>
                            <label for="img-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                            <input type="number" id="img-width" value="${element.querySelector('img').width}">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="img-padding"><i class="fas fa-spacing"></i> Padding:</label>
                            <input type="number" id="img-padding" value="${parseInt(getComputedStyle(element.querySelector('img')).padding)}">
                        </div>
                        <div>
                            <label for="img-margin"><i class="fas fa-spacing"></i> Margin:</label>
                            <input type="number" id="img-margin" value="${parseInt(getComputedStyle(element.querySelector('img')).margin)}">
                        </div>
                        <!-- Row 4 -->
                        <div>
                            <label for="img-border"><i class="fas fa-border-all"></i> Border:</label>
                            <input type="number" id="img-border" value="${parseInt(getComputedStyle(element.querySelector('img')).borderWidth)}">
                        </div>
                        <div>
                            <label for="img-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="img-border-radius" value="${parseInt(getComputedStyle(element.querySelector('img')).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Box Shadow Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                            <input type="number" id="img-box-shadow-x" value="0">
                        </div>
                        <div>
                            <label for="img-box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                            <input type="number" id="img-box-shadow-y" value="0">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                            <input type="number" id="img-box-shadow-blur" value="0">
                        </div>
                        <div>
                            <label for="img-box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                            <input type="number" id="img-box-shadow-spread" value="0">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="img-box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                            <input type="color" id="img-box-shadow-color" value="#000000">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Transform Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="img-rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                            <input type="number" id="img-rotate" value="0">
                        </div>
                        <div>
                            <label for="img-scale"><i class="fas fa-expand"></i> Scale:</label>
                            <input type="number" id="img-scale" value="1" step="0.1">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="img-translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                            <input type="number" id="img-translate-x" value="0">
                        </div>
                        <div>
                            <label for="img-translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                            <input type="number" id="img-translate-y" value="0">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-item"><i class="fas fa-trash"></i> Remove Item</button>
                </div>
            `;
        
            // Event listeners for text customization
            document.getElementById('text-content').addEventListener('input', (e) => {
                element.querySelector('p').textContent = e.target.value;
            });
        
            document.getElementById('text-color').addEventListener('input', (e) => {
                element.querySelector('p').style.color = e.target.value;
            });
        
            document.getElementById('font-size').addEventListener('input', (e) => {
                element.querySelector('p').style.fontSize = e.target.value + 'px';
            });
        
            document.getElementById('font-family').addEventListener('change', (e) => {
                element.querySelector('p').style.fontFamily = e.target.value;
            });
        
            // Event listeners for image customization
            document.getElementById('img-url').addEventListener('input', (e) => {
                element.querySelector('img').src = e.target.value;
            });
        
            document.getElementById('img-alt').addEventListener('input', (e) => {
                element.querySelector('img').alt = e.target.value;
            });
        
            document.getElementById('img-height').addEventListener('input', (e) => {
                element.querySelector('img').height = e.target.value;
            });
        
            document.getElementById('img-width').addEventListener('input', (e) => {
                element.querySelector('img').width = e.target.value;
            });
        
            document.getElementById('img-padding').addEventListener('input', (e) => {
                element.querySelector('img').style.padding = e.target.value + 'px';
            });
        
            document.getElementById('img-margin').addEventListener('input', (e) => {
                element.querySelector('img').style.margin = e.target.value + 'px';
            });
        
            document.getElementById('img-border').addEventListener('input', (e) => {
                element.querySelector('img').style.borderWidth = e.target.value + 'px';
            });
        
            document.getElementById('img-border-radius').addEventListener('input', (e) => {
                element.querySelector('img').style.borderRadius = e.target.value + 'px';
            });
        
            // Box Shadow
            document.getElementById('img-box-shadow-x').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('img').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[0] = `${e.target.value}px`;
                element.querySelector('img').style.boxShadow = parts.join(' ');
            });
        
            document.getElementById('img-box-shadow-y').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('img').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[1] = `${e.target.value}px`;
                element.querySelector('img').style.boxShadow = parts.join(' ');
            });
        
            document.getElementById('img-box-shadow-blur').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('img').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[2] = `${e.target.value}px`;
                element.querySelector('img').style.boxShadow = parts.join(' ');
            });
        
            document.getElementById('img-box-shadow-spread').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('img').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[3] = `${e.target.value}px`;
                element.querySelector('img').style.boxShadow = parts.join(' ');
            });
        
            document.getElementById('img-box-shadow-color').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('img').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[4] = e.target.value;
                element.querySelector('img').style.boxShadow = parts.join(' ');
            });
        
            // Transform
            document.getElementById('img-rotate').addEventListener('input', (e) => {
                element.querySelector('img').style.transform = `rotate(${e.target.value}deg)`;
            });
        
            document.getElementById('img-scale').addEventListener('input', (e) => {
                element.querySelector('img').style.transform = `scale(${e.target.value})`;
            });
        
            document.getElementById('img-translate-x').addEventListener('input', (e) => {
                const transform = element.querySelector('img').style.transform || '';
                const translateY = transform.match(/translateY\(([^)]+)\)/)?.[1] || '0px';
                element.querySelector('img').style.transform = `translateX(${e.target.value}px) translateY(${translateY})`;
            });
        
            document.getElementById('img-translate-y').addEventListener('input', (e) => {
                const transform = element.querySelector('img').style.transform || '';
                const translateX = transform.match(/translateX\(([^)]+)\)/)?.[1] || '0px';
                element.querySelector('img').style.transform = `translateX(${translateX}) translateY(${e.target.value}px)`;
            });
        
            // Remove item
            document.getElementById('remove-item').addEventListener('click', () => {
                element.remove();
                customizationPanel.innerHTML = '';
            });
        }
        // Customization options for text-video elements
        else if (element.classList.contains('text-video')) {
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>Text Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="text-content"><i class="fas fa-font"></i> Text Content:</label>
                            <input type="text" id="text-content" value="${element.querySelector('p').textContent}">
                        </div>
                        <div>
                            <label for="text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="text-color" value="${getComputedStyle(element.querySelector('p')).color}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                            <input type="number" id="font-size" value="${parseInt(getComputedStyle(element.querySelector('p')).fontSize)}">
                        </div>
                        <div>
                            <label for="font-family"><i class="fas fa-font"></i> Font Family:</label>
                            <select id="font-family">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Video Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="video-url"><i class="fas fa-video"></i> Video URL:</label>
                            <input type="text" id="video-url" value="${element.querySelector('video').src}">
                        </div>
                        <div>
                            <label for="video-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                            <input type="number" id="video-height" value="${element.querySelector('video').height}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="video-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                            <input type="number" id="video-width" value="${element.querySelector('video').width}">
                        </div>
                        <div>
                            <label for="video-controls"><i class="fas fa-sliders-h"></i> Controls:</label>
                            <input type="checkbox" id="video-controls" ${element.querySelector('video').controls ? 'checked' : ''}>
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="video-autoplay"><i class="fas fa-play"></i> Autoplay:</label>
                            <input type="checkbox" id="video-autoplay" ${element.querySelector('video').autoplay ? 'checked' : ''}>
                        </div>
                        <div>
                            <label for="video-loop"><i class="fas fa-redo"></i> Loop:</label>
                            <input type="checkbox" id="video-loop" ${element.querySelector('video').loop ? 'checked' : ''}>
                        </div>
                        <!-- Row 4 -->
                        <div>
                            <label for="video-muted"><i class="fas fa-volume-mute"></i> Muted:</label>
                            <input type="checkbox" id="video-muted" ${element.querySelector('video').muted ? 'checked' : ''}>
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Border Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="video-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                            <input type="color" id="video-border-color" value="${getComputedStyle(element.querySelector('video')).borderColor}">
                        </div>
                        <div>
                            <label for="video-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                            <input type="number" id="video-border-size" value="${parseInt(getComputedStyle(element.querySelector('video')).borderWidth)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="video-border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                            <select id="video-border-style">
                                <option value="none" ${getComputedStyle(element.querySelector('video')).borderStyle === 'none' ? 'selected' : ''}>None</option>
                                <option value="solid" ${getComputedStyle(element.querySelector('video')).borderStyle === 'solid' ? 'selected' : ''}>Solid</option>
                                <option value="dotted" ${getComputedStyle(element.querySelector('video')).borderStyle === 'dotted' ? 'selected' : ''}>Dotted</option>
                                <option value="dashed" ${getComputedStyle(element.querySelector('video')).borderStyle === 'dashed' ? 'selected' : ''}>Dashed</option>
                                <option value="double" ${getComputedStyle(element.querySelector('video')).borderStyle === 'double' ? 'selected' : ''}>Double</option>
                            </select>
                        </div>
                        <div>
                            <label for="video-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="video-border-radius" value="${parseInt(getComputedStyle(element.querySelector('video')).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Spacing Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="video-padding"><i class="fas fa-spacing"></i> Padding:</label>
                            <input type="number" id="video-padding" value="${parseInt(getComputedStyle(element.querySelector('video')).padding)}">
                        </div>
                        <div>
                            <label for="video-margin"><i class="fas fa-spacing"></i> Margin:</label>
                            <input type="number" id="video-margin" value="${parseInt(getComputedStyle(element.querySelector('video')).margin)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Box Shadow Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="video-box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                            <input type="number" id="video-box-shadow-x" value="0">
                        </div>
                        <div>
                            <label for="video-box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                            <input type="number" id="video-box-shadow-y" value="0">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="video-box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                            <input type="number" id="video-box-shadow-blur" value="0">
                        </div>
                        <div>
                            <label for="video-box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                            <input type="number" id="video-box-shadow-spread" value="0">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="video-box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                            <input type="color" id="video-box-shadow-color" value="#000000">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Transform Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="video-rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                            <input type="number" id="video-rotate" value="0">
                        </div>
                        <div>
                            <label for="video-scale"><i class="fas fa-expand"></i> Scale:</label>
                            <input type="number" id="video-scale" value="1" step="0.1">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="video-translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                            <input type="number" id="video-translate-x" value="0">
                        </div>
                        <div>
                            <label for="video-translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                            <input type="number" id="video-translate-y" value="0">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-item"><i class="fas fa-trash"></i> Remove Item</button>
                </div>
            `;
        
            // Event listeners for text customization
            document.getElementById('text-content').addEventListener('input', (e) => {
                element.querySelector('p').textContent = e.target.value;
            });
        
            document.getElementById('text-color').addEventListener('input', (e) => {
                element.querySelector('p').style.color = e.target.value;
            });
        
            document.getElementById('font-size').addEventListener('input', (e) => {
                element.querySelector('p').style.fontSize = e.target.value + 'px';
            });
        
            document.getElementById('font-family').addEventListener('change', (e) => {
                element.querySelector('p').style.fontFamily = e.target.value;
            });
        
            // Event listeners for video customization
            document.getElementById('video-url').addEventListener('input', (e) => {
                element.querySelector('video').src = e.target.value;
            });
        
            document.getElementById('video-height').addEventListener('input', (e) => {
                element.querySelector('video').height = e.target.value;
            });
        
            document.getElementById('video-width').addEventListener('input', (e) => {
                element.querySelector('video').width = e.target.value;
            });
        
            document.getElementById('video-controls').addEventListener('change', (e) => {
                element.querySelector('video').controls = e.target.checked;
            });
        
            document.getElementById('video-autoplay').addEventListener('change', (e) => {
                element.querySelector('video').autoplay = e.target.checked;
            });
        
            document.getElementById('video-loop').addEventListener('change', (e) => {
                element.querySelector('video').loop = e.target.checked;
            });
        
            document.getElementById('video-muted').addEventListener('change', (e) => {
                element.querySelector('video').muted = e.target.checked;
            });
        
            // Border Customization
            document.getElementById('video-border-color').addEventListener('input', (e) => {
                element.querySelector('video').style.borderColor = e.target.value;
            });
        
            document.getElementById('video-border-size').addEventListener('input', (e) => {
                element.querySelector('video').style.borderWidth = e.target.value + 'px';
            });
        
            document.getElementById('video-border-style').addEventListener('change', (e) => {
                element.querySelector('video').style.borderStyle = e.target.value;
            });
        
            document.getElementById('video-border-radius').addEventListener('input', (e) => {
                element.querySelector('video').style.borderRadius = e.target.value + 'px';
            });
        
            // Spacing Customization
            document.getElementById('video-padding').addEventListener('input', (e) => {
                element.querySelector('video').style.padding = e.target.value + 'px';
            });
        
            document.getElementById('video-margin').addEventListener('input', (e) => {
                element.querySelector('video').style.margin = e.target.value + 'px';
            });
        
            // Box Shadow Customization
            // document.getElementById('video-box-shadow-x').addEventListener('input', (e) => {
            //     const boxShadow = element.querySelector('video').style.boxShadow || '0px 0px 0px 0px #000000';
            //     const parts = boxShadow.split(' ');
            //     parts[0] = `${e.target.value}px`;
            //     element.querySelector('video').style.boxShadow = parts.join(' ');
            // });
        
            document.getElementById('video-box-shadow-y').addEventListener('input', (e) => {
                const boxShadow = element.querySelector('video').style.boxShadow || '0px 0px 0px 0px #000000';
                const parts = boxShadow.split(' ');
                parts[1] = `${e.target.value}px`;
                element.querySelector('video').style.boxShadow = parts.join(' ');
            });
            document.getElementById('video-box-shadow-x').addEventListener('input', (e) => {
                // element.style.boxShadow = boxShadow.join(' ';
                // alert(element.style.boxShadow.value)
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[0] = e.target.value+'px';

                element.style.boxShadow = `${e.target.value}px 0 0 0`;
            });
            document.getElementById('video-box-shadow-y').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 ${e.target.value}px 0 0`;                
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[1] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('video-box-shadow-blur').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 ${e.target.value}px 0`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[2] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('video-box-shadow-spread').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 ${e.target.value}px`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[3] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('video-box-shadow-color').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 0 ${e.target.value}`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[4] = e.target.value;
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('video-rotate').addEventListener('input', (e) => {
                element.style.transform = `rotate(${e.target.value}deg)`;
            });
            document.getElementById('video-scale').addEventListener('input', (e) => {
                element.style.transform = `scale(${e.target.value})`;
            });
            document.getElementById('video-translate-x').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateY = '0px'; // Default translateY value
            
                // Check if translateY exists in the transform property
                if (transform.length > 1 && transform[1].includes('translateY')) {
                    translateY = transform[1].match(/translateY\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the new translateX and existing translateY
                element.style.transform = `translateX(${e.target.value}px) translateY(${translateY})`;
            });
            
            document.getElementById('video-translate-y').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateX = '0px'; // Default translateX value
            
                // Check if translateX exists in the transform property
                if (transform.length > 0 && transform[0].includes('translateX')) {
                    translateX = transform[0].match(/translateX\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the existing translateX and new translateY
                element.style.transform = `translateX(${translateX}) translateY(${e.target.value}px)`;
            });
            document.getElementById('video-skew').addEventListener('input', (e) => {
                element.style.transform = `skew(${e.target.value}deg)`;
            });

        } 
    
        // Customization options for two-images and three-images elements
        else if (element.classList.contains('two-images') || element.classList.contains('three-images')) {
            const images = element.querySelectorAll('img');
            let imagesHTML = '';
    
            images.forEach((img, index) => {
                imagesHTML += `
                    <label>Image ${index + 1} URL:</label>
                    <input type="text" id="img-url-${index}" value="${img.src}">
                `;
            });
    
            customizationPanel.insertAdjacentHTML('beforeend', imagesHTML);
    
            images.forEach((img, index) => {
                document.getElementById(`img-url-${index}`).addEventListener('input', (e) => {
                    img.src = e.target.value;
                });
            });
        }
        else if (element.tagName === 'UL') {
            // Generate input fields for each list item
            const listItemsHTML = Array.from(element.querySelectorAll('li'))
                .map((li, index) => `
                    <div class="list-item-control">
                        <label for="item-text-${index}">List Item ${index + 1}:</label>
                        <input type="text" id="item-text-${index}" value="${li.textContent}">
                        <button class="delete-item" data-index="${index}"><i class="fas fa-trash"></i> Delete</button>
                        <br>
                    </div>
                `)
                .join('');
        
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>List Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="list-style-type"><i class="fas fa-list"></i> List Style Type:</label>
                            <select id="list-style-type">
                                <option value="disc">Disc</option>
                                <option value="circle">Circle</option>
                                <option value="square">Square</option>
                                <option value="decimal">Decimal</option>
                                <option value="Upper-alpha">ABC</option>
                                <option value="lower-alpha">abc</option>
                                <option value="upper-roman">Upper Roman</option>
                                <option value="lower-roman">Lower Roman</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div>
                            <label for="list-bg-color"><i class="fas fa-palette"></i>  Bg Color:</label>
                            <input type="color" id="list-bg-color" value="${getComputedStyle(element).backgroundColor}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                        <label for="list-padding"><i class="fas fa-spacing"></i> List Padding:</label>
                        <input type="number" id="list-padding" value="${parseInt(getComputedStyle(element).padding)}">
                        </div>
                        <div>
                        <label for="list-margin"><i class="fas fa-spacing"></i> List Margin:</label>
                        <input type="number" id="list-margin" value="${parseInt(getComputedStyle(element).margin)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>List Item Customization</h4>
                    <div id="list-items-container">
                        ${listItemsHTML}
                    </div>
                    <br>
                    <button id="add-item"><i class="fas fa-plus"></i> Add New Item</button>
                    <br>
                    <br>
                </div>
        
                <div class="customization-card">
                    <h4>List Item Styles</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="item-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="item-text-color" value="${getComputedStyle(element.querySelector('li')).color}">
                        </div>
                        <div>
                            <label for="item-font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                            <input type="number" id="item-font-size" value="${parseInt(getComputedStyle(element.querySelector('li')).fontSize)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="item-font-family"><i class="fas fa-font"></i> Font Family:</label>
                            <select id="item-font-family">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                            </select>
                        </div>
                        <div>
                            <label for="item-line-height"><i class="fas fa-text-height"></i> Line Height:</label>
                            <input type="number" id="item-line-height" value="${parseFloat(getComputedStyle(element.querySelector('li')).lineHeight)}">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="item-padding"><i class="fas fa-spacing"></i> Item Padding:</label>
                            <input type="number" id="item-padding" value="${parseInt(getComputedStyle(element.querySelector('li')).padding)}">
                        </div>
                        <div>
                            <label for="item-margin"><i class="fas fa-spacing"></i> Item Margin:</label>
                            <input type="number" id="item-margin" value="${parseInt(getComputedStyle(element.querySelector('li')).margin)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Border Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="list-border-style"><i class="fas fa-border-all"></i> Border Style:</label>
                            <select id="list-border-style">
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                        <div>
                            <label for="list-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                            <input type="number" id="list-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="list-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                            <input type="color" id="list-border-color" value="${getComputedStyle(element).borderColor}">
                        </div>
                        <div>
                            <label for="list-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="list-border-radius" value="${parseInt(getComputedStyle(element).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-list"><i class="fas fa-trash"></i> Remove List</button>
                </div>
            `;
        
            // Event listeners for list customization
            document.getElementById('list-style-type').addEventListener('change', (e) => {
                element.style.listStyleType = e.target.value;
            
                // Ensure all existing list items (from 'table-of-contents' or otherwise) inherit the new style
                element.querySelectorAll('ul').forEach((ul) => {
                    ul.style.listStyleType = e.target.value;
                });
            });
            
        
            document.getElementById('list-padding').addEventListener('input', (e) => {
                element.style.padding = `${e.target.value}px`;
            });
        
            document.getElementById('list-margin').addEventListener('input', (e) => {
                element.style.margin = `${e.target.value}px`;
            });
        
            document.getElementById('list-bg-color').addEventListener('input', (e) => {
                element.style.backgroundColor = e.target.value;
            });
        
            // Event listeners for list item text updates
            const listItems = element.querySelectorAll('li');
            listItems.forEach((li, index) => {
                document.getElementById(`item-text-${index}`).addEventListener('input', (e) => {
                    li.textContent = e.target.value;
                });
            });
        
            // Event listener for adding a new list item
            document.getElementById('add-item').addEventListener('click', () => {
                const newLi = document.createElement('li');
                newLi.textContent = 'New Item';
                element.appendChild(newLi);
        
                // Refresh the customization panel to include the new item
                const event = new Event('click');
                element.dispatchEvent(event);
            });
        
            // Event listeners for deleting list items
            document.querySelectorAll('.delete-item').forEach((button) => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    const liToRemove = element.querySelectorAll('li')[index];
                    if (liToRemove) {
                        liToRemove.remove();
                        // Refresh the customization panel
                        const event = new Event('click');
                        element.dispatchEvent(event);
                    }
                });
            });
        
            // Event listeners for list item styles
            document.getElementById('item-text-color').addEventListener('input', (e) => {
                listItems.forEach((li) => {
                    li.style.color = e.target.value;
                });
            });
        
            document.getElementById('item-font-size').addEventListener('input', (e) => {
                listItems.forEach((li) => {
                    li.style.fontSize = `${e.target.value}px`;
                });
            });
        
            document.getElementById('item-font-family').addEventListener('change', (e) => {
                listItems.forEach((li) => {
                    li.style.fontFamily = e.target.value;
                });
            });
        
            document.getElementById('item-line-height').addEventListener('input', (e) => {
                listItems.forEach((li) => {
                    li.style.lineHeight = `${e.target.value}`;
                });
            });
        
            document.getElementById('item-padding').addEventListener('input', (e) => {
                listItems.forEach((li) => {
                    li.style.padding = `${e.target.value}px`;
                });
            });
        
            document.getElementById('item-margin').addEventListener('input', (e) => {
                listItems.forEach((li) => {
                    li.style.margin = `${e.target.value}px`;
                });
            });
        
            // Event listeners for border customization
            document.getElementById('list-border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
        
            document.getElementById('list-border-size').addEventListener('input', (e) => {
                element.style.borderWidth = `${e.target.value}px`;
            });
        
            document.getElementById('list-border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = `${e.target.value}px`;
            });
        
            // Remove the entire list
            document.getElementById('remove-list').addEventListener('click', () => {
                element.remove();
                customizationPanel.innerHTML = '';
            });
        }

        // Check if the element is a <details> with <summary> and <p>
       else if (element.tagName === 'DETAILS' && element.querySelector('summary') && element.querySelector('p')) {
            const summaryElement = element.querySelector('summary');
            const pElement = element.querySelector('p');
            let customizationHTML = '';

            customizationHTML += `
                <div class="customization-card">
                    <h4>Summary Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="summary-text"><i class="fas fa-font"></i> Summary Text:</label>
                            <input type="text" id="summary-text" value="${summaryElement.textContent}">
                        </div>
                        <div>
                            <label for="summary-font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                            <input type="number" id="summary-font-size" value="${parseInt(getComputedStyle(summaryElement).fontSize)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="summary-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="summary-text-color" value="${getComputedStyle(summaryElement).color}">
                        </div>
                        <div>
                            <label for="summary-bg-color"><i class="fas fa-fill-drip"></i> Background Color:</label>
                            <input type="color" id="summary-bg-color" value="${getComputedStyle(summaryElement).backgroundColor}">
                        </div>
                    </div>
                </div>
    
                <div class="customization-card">
                    <h4>Paragraph Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="paragraph-text"><i class="fas fa-font"></i> Paragraph Text:</label>
                            <input type="text" id="paragraph-text" value="${pElement.textContent}">
                        </div>
                        <div>
                            <label for="paragraph-font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                            <input type="number" id="paragraph-font-size" value="${parseInt(getComputedStyle(pElement).fontSize)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="paragraph-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="paragraph-text-color" value="${getComputedStyle(pElement).color}">
                        </div>
                        <div>
                            <label for="paragraph-bg-color"><i class="fas fa-fill-drip"></i> Background Color:</label>
                            <input type="color" id="paragraph-bg-color" value="${getComputedStyle(pElement).backgroundColor}">
                        </div>
                    </div>
                </div>
            `;

            customizationHTML += `
          
            <div class="customization-card">
                <h4>Border Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                        <select id="border-style">
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
                            <option value="groove">Groove</option>
                            <option value="ridge">Ridge</option>
                            <option value="inset">Inset</option>
                            <option value="outset">Outset</option>
                        </select>
                        
                        </div>

                        <div>
                        <label for="border-color"><i class="fas fa-palette"></i> Border Color:</label>
                        <input type="color" id="border-color">
                        </div>
                        
                        <div>
                        <label for="border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                        <input type="number" id="border-size" min="0" max="100">
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <label for="border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                        <input type="number" id="border-radius" min="0" max="100">
                    </div>
                </div>
                <div class="two-column-grid">
                    <div>
                        <label for="outline-style"><i class="fas fa-border-style"></i> Outline Style:</label>
                        <select id="outline-style">
                            <option value="">None</option>
                            <option value="solid">Solid</option>
                            <option value="dotted">Dotted</option>
                            <option value="dashed">Dashed</option>
                            <option value="double">Double</option>
                        </select>
                    </div>
                    <!-- Row 3 -->
                    <div>
                        <label for="outline-color"><i class="fas fa-palette"></i> Outline Color:</label>
                        <input type="color" id="outline-color">
                    </div>
                    <div>
                        <label for="outline-width"><i class="fas fa-border-all"></i> Outline Width:</label>
                        <input type="number" id="outline-width" min="0" max="100">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Spacing Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="padding"><i class="fas fa-arrows-alt"></i> Padding:</label>
                        <input type="number" id="padding" value="0">
                    </div>
                    <div>
                        <label for="margin"><i class="fas fa-arrows-alt"></i> Margin:</label>
                        <input type="number" id="margin" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Transform Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                        <input type="number" id="rotate" value="0">
                    </div>
                    <div>
                        <label for="skew"><i class="fas fa-slash"></i> Skew (degrees):</label>
                        <input type="number" id="skew" value="0">
                    </div>
                </div>
                <div class="two-column-grid">
                    <!-- Row 2 -->
                    <div>
                        <label for="translate-x"><i class="fas fa-sync-alt"></i> Translate X (px):</label>
                        <input type="number" id="translate-x" value="0">
                    </div>
                    <div>
                        <label for="translate-y"><i class="fas fa-slash"></i> Translate Y (px):</label>
                        <input type="number" id="translate-y" value="0">
                    </div>
                </div>
                <div class="two-column-grid">
                    <!-- Row 2 -->
                    <div>
                        <label for="scale"><i class="fas fa-sync-alt"></i> Scale (px):</label>
                        <input type="number" id="scale" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Box Shadow Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                        <input type="number" id="box-shadow-x" value="0">
                    </div>
                    <div>
                        <label for="box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                        <input type="number" id="box-shadow-y" value="0">
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <label for="box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                        <input type="number" id="box-shadow-blur" value="0">
                    </div>
                    <div>
                        <label for="box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                        <input type="number" id="box-shadow-spread" value="0">
                    </div>
                    <!-- Row 3 -->
                    <div>
                        <label for="box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                        <input type="color" id="box-shadow-color">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Transition Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="transition-duration"><i class="fas fa-clock"></i> Duration:</label>
                        <input type="number" id="transition-duration" value="0">
                    </div>
                    <div>
                        <label for="transition-delay"><i class="fas fa-clock"></i> Delay:</label>
                        <input type="number" id="transition-delay" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Actions</h4>
                <button id="remove-item"><i class="fas fa-trash"></i> Remove Item</button>
            </div>
        `;

        
            // Set the inner HTML of the customization panel
    customizationPanel.innerHTML = customizationHTML;

 
            // Event listeners for border style customization
            document.getElementById('border-style').addEventListener('input', (e) => {
                element.style.borderStyle = e.target.value;
            });
            

   // Add event listeners for summary and paragraph customizations
   if (element.tagName === 'DETAILS' && element.querySelector('summary') && element.querySelector('p')) {
    const summaryElement = element.querySelector('summary');
    const pElement = element.querySelector('p');

    // Event listeners for summary customization
    document.getElementById('summary-text').addEventListener('input', (e) => {
        summaryElement.textContent = e.target.value;
    });

    document.getElementById('summary-font-size').addEventListener('input', (e) => {
        summaryElement.style.fontSize = `${e.target.value}px`;
    });

    document.getElementById('summary-text-color').addEventListener('input', (e) => {
        summaryElement.style.color = e.target.value;
    });

    document.getElementById('summary-bg-color').addEventListener('input', (e) => {
        summaryElement.style.backgroundColor = e.target.value;
    });

    // Event listeners for paragraph customization
    document.getElementById('paragraph-text').addEventListener('input', (e) => {
        pElement.textContent = e.target.value;
    });

    document.getElementById('paragraph-font-size').addEventListener('input', (e) => {
        pElement.style.fontSize = `${e.target.value}px`;
    });

    document.getElementById('paragraph-text-color').addEventListener('input', (e) => {
        pElement.style.color = e.target.value;
    });

    document.getElementById('paragraph-bg-color').addEventListener('input', (e) => {
        pElement.style.backgroundColor = e.target.value;
    });
}
               
            document.getElementById('border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
            document.getElementById('border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = e.target.value + 'px';
            });
            document.getElementById('border-size').addEventListener('input', (e) => {
                element.style.borderWidth = e.target.value + 'px';
        });
            document.getElementById('outline-style').addEventListener('input', (e) => {
                element.style.outlineStyle = e.target.value;
            });
            document.getElementById('outline-color').addEventListener('input', (e) => {
                element.style.outlineColor = e.target.value;
            });
            document.getElementById('outline-width').addEventListener('input', (e) => {
                element.style.outlineWidth = e.target.value + 'px';
            });
            document.getElementById('padding').addEventListener('input', (e) => {
                element.style.padding = `${e.target.value}px ${e.target.value}px ${e.target.value}px ${e.target.value}px`;   
            });
            document.getElementById('line-height').addEventListener('input', (e) => {
                element.style.lineHeight = e.target.value+'px';
            });
            document.getElementById('margin').addEventListener('input', (e) => {
                element.style.margin = e.target.value+'px';
            });
            document.getElementById('rotate').addEventListener('input', (e) => {
                element.style.transform = `rotate(${e.target.value}deg)`;
            });
            document.getElementById('scale').addEventListener('input', (e) => {
                element.style.transform = `scale(${e.target.value})`;
            });
            document.getElementById('translate-x').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateY = '0px'; // Default translateY value
            
                // Check if translateY exists in the transform property
                if (transform.length > 1 && transform[1].includes('translateY')) {
                    translateY = transform[1].match(/translateY\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the new translateX and existing translateY
                element.style.transform = `translateX(${e.target.value}px) translateY(${translateY})`;
            });
            
            document.getElementById('translate-y').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateX = '0px'; // Default translateX value
            
                // Check if translateX exists in the transform property
                if (transform.length > 0 && transform[0].includes('translateX')) {
                    translateX = transform[0].match(/translateX\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the existing translateX and new translateY
                element.style.transform = `translateX(${translateX}) translateY(${e.target.value}px)`;
            });
            document.getElementById('skew').addEventListener('input', (e) => {
                element.style.transform = `skew(${e.target.value}deg)`;
            });
            document.getElementById('box-shadow-x').addEventListener('input', (e) => {
                // element.style.boxShadow = boxShadow.join(' ';
                // alert(element.style.boxShadow.value)
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[0] = e.target.value+'px';

                element.style.boxShadow = `${e.target.value}px 0 0 0`;
            });
            document.getElementById('box-shadow-y').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 ${e.target.value}px 0 0`;                
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[1] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('box-shadow-blur').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 ${e.target.value}px 0`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[2] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('box-shadow-spread').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 ${e.target.value}px`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[3] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('box-shadow-color').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 0 ${e.target.value}`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[4] = e.target.value;
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('transition-duration').addEventListener('input', (e) => {
                if (!element.style.transition) {
                    element.style.transition = 'all 0s ease-in-out'; // Initialize if not set
                }
                const transitionParts = element.style.transition.split(' ');
                transitionParts[1] = `${e.target.value}s`; // Update duration
                element.style.transition = transitionParts.join(' ');
                console.log('Updated transition:', element.style.transition); // Debugging
            });
            document.getElementById('transition-delay').addEventListener('input', (e) => {
                element.style.transitionDelay = `${e.target.value}s`;
            });

        }
  
        else if (element.classList.contains('faq')) {
            // Generate input fields for each question and answer pair
            const qaPairsHTML = Array.from(element.querySelectorAll('.qa-pair'))
                .map((qaPair, index) => {
                    const question = qaPair.querySelector('p:nth-child(1)').textContent;
                    const answer = qaPair.querySelector('p:nth-child(2)').textContent;
                    return `
                        <div class="qa-pair-control">
                            <label for="question-${index}">Question ${index + 1}:</label>
                            <input type="text" id="question-${index}" value="${question}">
                            <label for="answer-${index}">Answer ${index + 1}:</label>
                            <textarea id="answer-${index}">${answer}</textarea>
                            <button class="delete-qa-pair" data-index="${index}"><i class="fas fa-trash"></i> Delete</button>
                            <br>
                        </div>
                    `;
                })
                .join('');
        
            customizationPanel.innerHTML = `
                <div class="customization-card">
                    <h4>FAQ Container Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="faq-padding"><i class="fas fa-spacing"></i> FAQ Padding:</label>
                            <input type="number" id="faq-padding" value="${parseInt(getComputedStyle(element).padding)}">
                        </div>
                        <div>
                            <label for="faq-margin"><i class="fas fa-spacing"></i> FAQ Margin:</label>
                            <input type="number" id="faq-margin" value="${parseInt(getComputedStyle(element).margin)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="faq-bg-color"><i class="fas fa-palette"></i> Background Color:</label>
                            <input type="color" id="faq-bg-color" value="${getComputedStyle(element).backgroundColor}">
                        </div>
                        <div>
                            <label for="faq-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                            <input type="color" id="faq-text-color" value="${getComputedStyle(element).color}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Q & A Customization</h4>
                    <div id="qa-pairs-container">
                        ${qaPairsHTML}
                    </div>
                    <br>
                    <button id="add-qa-pair"><i class="fas fa-plus"></i> Add New Q&A Pair</button>
                    <br>
                    <br>
                </div>
        
                <div class="customization-card">
                    <h4>Question & Answer Styles</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="question-text-color"><i class="fas fa-palette"></i> Question Text Color:</label>
                            <input type="color" id="question-text-color" value="${getComputedStyle(element.querySelector('.qa-pair p:nth-child(1)')).color}">
                        </div>
                        <div>
                            <label for="answer-text-color"><i class="fas fa-palette"></i> Answer Text Color:</label>
                            <input type="color" id="answer-text-color" value="${getComputedStyle(element.querySelector('.qa-pair p:nth-child(2)')).color}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="question-font-size"><i class="fas fa-text-height"></i> Question Font Size:</label>
                            <input type="number" id="question-font-size" value="${parseInt(getComputedStyle(element.querySelector('.qa-pair p:nth-child(1)')).fontSize)}">
                        </div>
                        <div>
                            <label for="answer-font-size"><i class="fas fa-text-height"></i> Answer Font Size:</label>
                            <input type="number" id="answer-font-size" value="${parseInt(getComputedStyle(element.querySelector('.qa-pair p:nth-child(2)')).fontSize)}">
                        </div>
                        <!-- Row 3 -->
                        <div>
                            <label for="question-font-family"><i class="fas fa-font"></i> Question Font Family:</label>
                            <select id="question-font-family">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                            </select>
                        </div>
                        <div>
                            <label for="answer-font-family"><i class="fas fa-font"></i> Answer Font Family:</label>
                            <select id="answer-font-family">
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                            </select>
                        </div>
                        <!-- Row 4 -->
                        <div>
                            <label for="question-padding"><i class="fas fa-spacing"></i> Question Padding:</label>
                            <input type="number" id="question-padding" value="${parseInt(getComputedStyle(element.querySelector('.qa-pair p:nth-child(1)')).padding)}">
                        </div>
                        <div>
                            <label for="answer-padding"><i class="fas fa-spacing"></i> Answer Padding:</label>
                            <input type="number" id="answer-padding" value="${parseInt(getComputedStyle(element.querySelector('.qa-pair p:nth-child(2)')).padding)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Border Customization</h4>
                    <div class="two-column-grid">
                        <!-- Row 1 -->
                        <div>
                            <label for="faq-border-style"><i class="fas fa-border-all"></i> Border Style:</label>
                            <select id="faq-border-style">
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                                <option value="double">Double</option>
                            </select>
                        </div>
                        <div>
                            <label for="faq-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                            <input type="number" id="faq-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                        </div>
                        <!-- Row 2 -->
                        <div>
                            <label for="faq-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                            <input type="color" id="faq-border-color" value="${getComputedStyle(element).borderColor}">
                        </div>
                        <div>
                            <label for="faq-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                            <input type="number" id="faq-border-radius" value="${parseInt(getComputedStyle(element).borderRadius)}">
                        </div>
                    </div>
                </div>
        
                <div class="customization-card">
                    <h4>Actions</h4>
                    <button id="remove-faq"><i class="fas fa-trash"></i> Remove FAQ</button>
                </div>
            `;
        
            // Event listeners for FAQ container customization
            document.getElementById('faq-padding').addEventListener('input', (e) => {
                element.style.padding = `${e.target.value}px`;
            });
        
            document.getElementById('faq-margin').addEventListener('input', (e) => {
                element.style.margin = `${e.target.value}px`;
            });
        
            document.getElementById('faq-bg-color').addEventListener('input', (e) => {
                element.style.backgroundColor = e.target.value;
            });
        
            document.getElementById('faq-text-color').addEventListener('input', (e) => {
                element.style.color = e.target.value;
            });
        
            // Event listeners for question and answer text updates
            const qaPairs = element.querySelectorAll('.qa-pair');
            qaPairs.forEach((qaPair, index) => {
                document.getElementById(`question-${index}`).addEventListener('input', (e) => {
                    qaPair.querySelector('p:nth-child(1)').textContent = e.target.value;
                });
        
                document.getElementById(`answer-${index}`).addEventListener('input', (e) => {
                    qaPair.querySelector('p:nth-child(2)').textContent = e.target.value;
                });
            });
        
            // Event listener for adding a new Q&A pair
            document.getElementById('add-qa-pair').addEventListener('click', () => {
                const newQAPair = document.createElement('div');
                newQAPair.classList.add('qa-pair');
        
                const newQuestion = document.createElement('p');
                newQuestion.textContent = 'New Question';
                newQAPair.appendChild(newQuestion);
        
                const newAnswer = document.createElement('p');
                newAnswer.textContent = 'New Answer';
                newQAPair.appendChild(newAnswer);
        
                element.appendChild(newQAPair);
        
                // Refresh the customization panel to include the new Q&A pair
                const event = new Event('click');
                element.dispatchEvent(event);
            });
        
            // Event listeners for deleting Q&A pairs
            document.querySelectorAll('.delete-qa-pair').forEach((button) => {
                button.addEventListener('click', (e) => {
                    const index = e.target.getAttribute('data-index');
                    const qaPairToRemove = element.querySelectorAll('.qa-pair')[index];
                    if (qaPairToRemove) {
                        qaPairToRemove.remove();
                        // Refresh the customization panel
                        const event = new Event('click');
                        element.dispatchEvent(event);
                    }
                });
            });
        
            // Event listeners for question and answer styles
            document.getElementById('question-text-color').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(1)').style.color = e.target.value;
                });
            });
        
            document.getElementById('answer-text-color').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(2)').style.color = e.target.value;
                });
            });
        
            document.getElementById('question-font-size').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(1)').style.fontSize = `${e.target.value}px`;
                });
            });
        
            document.getElementById('answer-font-size').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(2)').style.fontSize = `${e.target.value}px`;
                });
            });
        
            document.getElementById('question-font-family').addEventListener('change', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(1)').style.fontFamily = e.target.value;
                });
            });
        
            document.getElementById('answer-font-family').addEventListener('change', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(2)').style.fontFamily = e.target.value;
                });
            });
        
            document.getElementById('question-padding').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(1)').style.padding = `${e.target.value}px`;
                });
            });
        
            document.getElementById('answer-padding').addEventListener('input', (e) => {
                qaPairs.forEach((qaPair) => {
                    qaPair.querySelector('p:nth-child(2)').style.padding = `${e.target.value}px`;
                });
            });
        
            // Event listeners for border customization
            document.getElementById('faq-border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
        
            document.getElementById('faq-border-size').addEventListener('input', (e) => {
                element.style.borderWidth = `${e.target.value}px`;
            });
        
            document.getElementById('faq-border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = `${e.target.value}px`;
            });
        
            // Remove the entire FAQ section
            document.getElementById('remove-faq').addEventListener('click', () => {
                element.remove();
                customizationPanel.innerHTML = '';
            });
        }

// Customization for two-text-columns
else if (element.classList.contains('two-text-columns')) {
    // Initialize boxShadow if it's empty
if (!element.style.boxShadow) {
    element.style.boxShadow = '0px 0px 0px 0px #000000';
}
    // Generate input fields for each column's text
    const column1 = element.querySelector('.column:nth-child(1)');
    const column2 = element.querySelector('.column:nth-child(2)');

    if (!column1 || !column2) {
        console.error('Columns not found!');
        return;
    }

    const column1Text = column1.querySelector('p').textContent;
    const column2Text = column2.querySelector('p').textContent;

    customizationPanel.innerHTML = `
        <div class="customization-card">
            <h4>Column Text Customization</h4>
            <div class="two-column-grid">
                <!-- Column 1 -->
                <div>
                    <label for="column1-text"><i class="fas fa-font"></i> Column 1 Text:</label>
                    <input type="text" id="column1-text" value="${column1Text}">
                </div>
                <!-- Column 2 -->
                <div>
                    <label for="column2-text"><i class="fas fa-font"></i> Column 2 Text:</label>
                    <input type="text" id="column2-text" value="${column2Text}">
                </div>
            </div>
        </div>

        <div class="customization-card">
            <h4>Column Styles</h4>
            <div class="two-column-grid">
                <!-- Column 1 Styles -->
                <div>
                    <label for="column1-text-color"><i class="fas fa-palette"></i> Column 1 Text Color:</label>
                    <input type="color" id="column1-text-color" value="${getComputedStyle(column1.querySelector('p')).color}">
                </div>
                <div>
                    <label for="column1-font-size"><i class="fas fa-text-height"></i> Column 1 Font Size:</label>
                    <input type="number" id="column1-font-size" value="${parseInt(getComputedStyle(column1.querySelector('p')).fontSize)}">
                </div>
                <!-- Column 2 Styles -->
                <div>
                    <label for="column2-text-color"><i class="fas fa-palette"></i> Column 2 Text Color:</label>
                    <input type="color" id="column2-text-color" value="${getComputedStyle(column2.querySelector('p')).color}">
                </div>
                <div>
                    <label for="column2-font-size"><i class="fas fa-text-height"></i> Column 2 Font Size:</label>
                    <input type="number" id="column2-font-size" value="${parseInt(getComputedStyle(column2.querySelector('p')).fontSize)}">
                </div>
            </div>
        </div>

        <div class="customization-card">
            <h4>Container Customization</h4>
            <div class="two-column-grid">
                <!-- Row 1 -->
                <div>
                    <label for="container-padding"><i class="fas fa-spacing"></i> Container Padding:</label>
                    <input type="number" id="container-padding" value="${parseInt(getComputedStyle(element).padding)}">
                </div>
                <div>
                    <label for="container-margin"><i class="fas fa-spacing"></i> Container Margin:</label>
                    <input type="number" id="container-margin" value="${parseInt(getComputedStyle(element).margin)}">
                </div>
                <!-- Row 2 -->
                <div>
                    <label for="container-bg-color"><i class="fas fa-palette"></i> Background Color:</label>
                    <input type="color" id="container-bg-color" value="${getComputedStyle(element).backgroundColor}">
                </div>
                <div>
                    <label for="container-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                    <input type="color" id="container-text-color" value="${getComputedStyle(element).color}">
                </div>
            </div>
        </div>

        <div class="customization-card">
            <h4>Border Customization</h4>
            <div class="two-column-grid">
                <!-- Row 1 -->
                <div>
                    <label for="container-border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                    <select id="container-border-style">
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                        <option value="double">Double</option>
                    </select>
                </div>
                <div>
                    <label for="container-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                    <input type="color" id="container-border-color" value="${getComputedStyle(element).borderColor}">
                </div>
                <!-- Row 2 -->
                <div>
                    <label for="container-border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                    <input type="number" id="container-border-size" value="${parseInt(getComputedStyle(element).borderWidth)}">
                </div>
                <div>
                    <label for="container-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                    <input type="number" id="container-border-radius" value="${parseInt(getComputedStyle(element).borderRadius)}">
                </div>
            </div>
        </div>
  <div class="customization-card">
        <h4>Transform Customization</h4>
        <div class="two-column-grid">
            <!-- Row 1 -->
            <div>
                <label for="rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                <input type="number" id="rotate" value="0">
            </div>
            <div>
                <label for="skew"><i class="fas fa-slash"></i> Skew (degrees):</label>
                <input type="number" id="skew" value="0">
            </div>
            <!-- Row 2 -->
            <div>
                <label for="translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X (px):</label>
                <input type="number" id="translate-x" value="0">
            </div>
            <div>
                <label for="translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y (px):</label>
                <input type="number" id="translate-y" value="0">
            </div>
            <!-- Row 3 -->
            <div>
                <label for="scale"><i class="fas fa-expand"></i> Scale:</label>
                <input type="number" id="scale" value="1" step="0.1">
            </div>
        </div>
    </div>

  <div class="customization-card">
    <h4>Box Shadow Customization</h4>
    <div class="two-column-grid">
        <!-- Row 1 -->
        <div>
            <label for="box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
            <input type="number" id="box-shadow-x" value="0">
        </div>
        <div>
            <label for="box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
            <input type="number" id="box-shadow-y" value="0">
        </div>
        <!-- Row 2 -->
        <div>
            <label for="box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
            <input type="number" id="box-shadow-blur" value="0">
        </div>
        <div>
            <label for="box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
            <input type="number" id="box-shadow-spread" value="0">
        </div>
        <!-- Row 3 -->
        <div>
            <label for="box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
            <input type="color" id="box-shadow-color" value="#000000">
        </div>
    </div>
</div>
  
    <div class="customization-card">
            <h4>Actions</h4>
            <button id="remove-two-text-columns"><i class="fas fa-trash"></i> Remove Element</button>
        </div>
    `;

    // Event listeners for column text updates
    document.getElementById('column1-text').addEventListener('input', (e) => {
        column1.querySelector('p').textContent = e.target.value;
    });

    document.getElementById('column2-text').addEventListener('input', (e) => {
        column2.querySelector('p').textContent = e.target.value;
    });

    // Event listeners for column 1 styles
    document.getElementById('column1-text-color').addEventListener('input', (e) => {
        column1.querySelector('p').style.color = e.target.value;
    });

    document.getElementById('column1-font-size').addEventListener('input', (e) => {
        column1.querySelector('p').style.fontSize = `${e.target.value}px`;
    });

    // Event listeners for column 2 styles
    document.getElementById('column2-text-color').addEventListener('input', (e) => {
        column2.querySelector('p').style.color = e.target.value;
    });

    document.getElementById('column2-font-size').addEventListener('input', (e) => {
        column2.querySelector('p').style.fontSize = `${e.target.value}px`;
    });

    // Event listeners for container customization
    document.getElementById('container-padding').addEventListener('input', (e) => {
        element.style.padding = `${e.target.value}px`;
    });

    document.getElementById('container-margin').addEventListener('input', (e) => {
        element.style.margin = `${e.target.value}px`;
    });

    document.getElementById('container-bg-color').addEventListener('input', (e) => {
        element.style.backgroundColor = e.target.value;
    });

    document.getElementById('container-text-color').addEventListener('input', (e) => {
        element.style.color = e.target.value;
    });

    // Event listeners for border customization
    document.getElementById('container-border-style').addEventListener('change', (e) => {
        element.style.borderStyle = e.target.value;
    });

    document.getElementById('container-border-color').addEventListener('input', (e) => {
        element.style.borderColor = e.target.value;
    });

    document.getElementById('container-border-size').addEventListener('input', (e) => {
        element.style.borderWidth = `${e.target.value}px`;
    });

    document.getElementById('container-border-radius').addEventListener('input', (e) => {
        element.style.borderRadius = `${e.target.value}px`;
    });
     // Event listeners for transform customization
     document.getElementById('rotate').addEventListener('input', (e) => {
        const rotate = e.target.value;
        const transform = element.style.transform.replace(/rotate\([^)]+\)/, '').trim();
        element.style.transform = `${transform} rotate(${rotate}deg)`;
    });

    document.getElementById('skew').addEventListener('input', (e) => {
        const skew = e.target.value;
        const transform = element.style.transform.replace(/skew\([^)]+\)/, '').trim();
        element.style.transform = `${transform} skew(${skew}deg)`;
    });

    document.getElementById('translate-x').addEventListener('input', (e) => {
        const translateX = e.target.value;
        const transform = element.style.transform.replace(/translateX\([^)]+\)/, '').trim();
        element.style.transform = `${transform} translateX(${translateX}px)`;
    });

    document.getElementById('translate-y').addEventListener('input', (e) => {
        const translateY = e.target.value;
        const transform = element.style.transform.replace(/translateY\([^)]+\)/, '').trim();
        element.style.transform = `${transform} translateY(${translateY}px)`;
    });

    document.getElementById('scale').addEventListener('input', (e) => {
        const scale = e.target.value;
        const transform = element.style.transform.replace(/scale\([^)]+\)/, '').trim();
        element.style.transform = `${transform} scale(${scale})`;
    });

    // Event listeners for box-shadow customization

// Event listeners for box-shadow customization
document.getElementById('box-shadow-x').addEventListener('input', (e) => updateBoxShadow(element));
document.getElementById('box-shadow-y').addEventListener('input', (e) => updateBoxShadow(element));
document.getElementById('box-shadow-blur').addEventListener('input', (e) => updateBoxShadow(element));
document.getElementById('box-shadow-spread').addEventListener('input', (e) => updateBoxShadow(element));
document.getElementById('box-shadow-color').addEventListener('input', (e) => updateBoxShadow(element));

    // Remove the entire two-text-columns section
    document.getElementById('remove-two-text-columns').addEventListener('click', () => {
        element.remove();
        customizationPanel.innerHTML = '';
    });
         }

// Customization for product-grid
else if (element.classList.contains('product-grid')) {
    const gridContainer = element.querySelector('.grid-container');
    let currentProduct = null;

    // Function to show grid customization
    const showGridCustomization = () => {
        customizationPanel.innerHTML = `
            <div class="customization-card">
                <h4>Grid Settings</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="grid-columns"><i class="fas fa-th"></i> Columns:</label>
                        <input type="number" id="grid-columns" value="2" min="1" max="4">
                    </div>
                    <div>
                        <label for="grid-gap"><i class="fas fa-arrows-alt-h"></i> Gap:</label>
                        <input type="number" id="grid-gap" value="10" min="0">
                    </div>
                    <div>
                        <label for="grid-bg-color"><i class="fas fa-palette"></i> Background:</label>
                        <input type="color" id="grid-bg-color" value="#ffffff">
                    </div>
                    <div>
                        <label for="grid-text-color"><i class="fas fa-palette"></i> Text Color:</label>
                        <input type="color" id="grid-text-color" value="#000000">
                    </div>
                </div>
            </div>
            
            <div class="customization-card">
                <h4>Product Selection</h4>
                <p>Click on any product in the grid to customize it</p>
            </div>
            
            <div class="customization-card">
                <h4>Actions</h4>
                <button id="remove-product-grid"><i class="fas fa-trash"></i> Remove Grid</button>
            </div>
        `;

        // Grid customization event listeners
        document.getElementById('grid-columns').addEventListener('input', (e) => {
            gridContainer.style.gridTemplateColumns = `repeat(${e.target.value}, 1fr)`;
        });

        document.getElementById('grid-gap').addEventListener('input', (e) => {
            gridContainer.style.gap = `${e.target.value}px`;
        });

        document.getElementById('grid-bg-color').addEventListener('input', (e) => {
            gridContainer.style.backgroundColor = e.target.value;
        });

        document.getElementById('grid-text-color').addEventListener('input', (e) => {
            gridContainer.style.color = e.target.value;
        });

        document.getElementById('remove-product-grid').addEventListener('click', () => {
            element.remove();
            customizationPanel.innerHTML = '';
        });
    };

    // Function to show product customization
    const showProductCustomization = (product) => {
        currentProduct = product;
        const productImage = product.querySelector('img');
        const productName = product.querySelector('h4');
        const productPrice = product.querySelector('p:nth-of-type(1)');
        const productDesc = product.querySelector('p:nth-of-type(2)');

        // Get current styles or provide defaults
        const styles = getComputedStyle(product);
        const imageStyles = getComputedStyle(productImage);
        const textStyles = getComputedStyle(productName);

        customizationPanel.innerHTML = `
            <div class="customization-card">
                <h4>Product Content</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="prod-name"><i class="fas fa-font"></i> Name:</label>
                        <input type="text" id="prod-name" value="${productName.textContent}">
                    </div>
                    <div>
                        <label for="prod-price"><i class="fas fa-dollar-sign"></i> Price:</label>
                        <input type="text" id="prod-price" value="${productPrice.textContent.replace('$', '')}">
                    </div>
                    <div>
                        <label for="prod-image"><i class="fas fa-image"></i> Image URL:</label>
                        <input type="url" id="prod-image" value="${productImage.src}">
                    </div>
                    <div>
                        <label for="prod-desc"><i class="fas fa-align-left"></i> Description:</label>
                        <input type="text" id="prod-desc" value="${productDesc.textContent}">
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <h4>Text Styling</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="text-font-family"><i class="fas fa-font"></i> Font Family:</label>
                        <select id="text-font-family">
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                        </select>
                    </div>
                    <div>
                        <label for="text-font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                        <input type="number" id="text-font-size" value="${parseInt(textStyles.fontSize) || 16}">
                    </div>
                    <div>
                        <label for="text-font-weight"><i class="fas fa-bold"></i> Font Weight:</label>
                        <select id="text-font-weight">
                            <option value="normal" select>Normal</option>
                            <option value="bold">Bold</option>
                            <option value="bolder">Bolder</option>
                            <option value="lighter">Lighter</option>
                        </select>
                    </div>
                    <div>
                        <label for="text-font-style"><i class="fas fa-italic"></i> Font Style:</label>
                        <select id="text-font-style">
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="oblique">Oblique</option>
                        </select>
                    </div>
                    <div>
                        <label for="text-color"><i class="fas fa-palette"></i> Text Color:</label>
                        <input type="color" id="text-color" value="${textStyles.color || '#000000'}">
                    </div>
                    <div>
                        <label for="text-align"><i class="fas fa-align-left"></i> Text Align:</label>
                        <select id="text-align">
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                            <option value="justify">Justify</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <h4>Image Settings</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="image-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                        <input type="number" id="image-width" value="${parseInt(imageStyles.width) || 150}">
                    </div>
                    <div>
                        <label for="image-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                        <input type="number" id="image-height" value="${parseInt(imageStyles.height) || 150}">
                    </div>
                    <div>
                        <label for="image-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                        <input type="number" id="image-border-radius" value="${parseInt(imageStyles.borderRadius) || 0}">
                    </div>
                    <div>
                        <label for="image-object-fit"><i class="fas fa-expand"></i> Object Fit:</label>
                        <select id="image-object-fit">
                            <option value="fill">Fill</option>
                            <option value="contain">Contain</option>
                            <option value="cover">Cover</option>
                            <option value="none">None</option>
                            <option value="scale-down">Scale Down</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <h4>Layout & Spacing</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="prod-width"><i class="fas fa-arrows-alt-h"></i> Width:</label>
                        <input type="number" id="prod-width" value="${parseInt(styles.width) || 200}">
                    </div>
                    <div>
                        <label for="prod-height"><i class="fas fa-arrows-alt-v"></i> Height:</label>
                        <input type="number" id="prod-height" value="${parseInt(styles.height) || 'auto'}">
                    </div>
                    <div>
                        <label for="prod-padding"><i class="fas fa-square"></i> Padding:</label>
                        <input type="number" id="prod-padding" value="${parseInt(styles.padding) || 10}">
                    </div>
                    <div>
                        <label for="prod-margin"><i class="fas fa-arrows-alt"></i> Margin:</label>
                        <input type="number" id="prod-margin" value="${parseInt(styles.margin) || 0}">
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <h4>Border & Shadow</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="prod-border-width"><i class="fas fa-border-style"></i> Border Width:</label>
                        <input type="number" id="prod-border-width" value="${parseInt(styles.borderWidth) || 0}">
                    </div>
                    <div>
                        <label for="prod-border-color"><i class="fas fa-palette"></i> Border Color:</label>
                        <input type="color" id="prod-border-color" value="${styles.borderColor || '#000000'}">
                    </div>
                    <div>
                        <label for="prod-border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                        <input type="number" id="prod-border-radius" value="${parseInt(styles.borderRadius) || 0}">
                    </div>
                    <div>
                        <label for="prod-box-shadow"><i class="fas fa-shadow"></i> Box Shadow:</label>
                        <input type="text" id="prod-box-shadow" value="${styles.boxShadow || 'none'}" placeholder="e.g., 2px 2px 5px rgba(0,0,0,0.3)">
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <h4>Transform Effects</h4>
                <div class="two-column-grid">
                    <div>
                        <label for="prod-rotate"><i class="fas fa-undo"></i> Rotate (deg):</label>
                        <input type="number" id="prod-rotate" value="0">
                    </div>
                    <div>
                        <label for="prod-scale"><i class="fas fa-expand"></i> Scale:</label>
                        <input type="number" id="prod-scale" value="1" step="0.1">
                    </div>
                    <div>
                        <label for="prod-translate-x"><i class="fas fa-arrows-alt-h"></i> Translate X:</label>
                        <input type="number" id="prod-translate-x" value="0">
                    </div>
                    <div>
                        <label for="prod-translate-y"><i class="fas fa-arrows-alt-v"></i> Translate Y:</label>
                        <input type="number" id="prod-translate-y" value="0">
                    </div>
                </div>
            </div>

            <div class="customization-card">
                <button id="back-to-grid"><i class="fas fa-arrow-left"></i> Back to Grid</button>
                <button id="remove-product"><i class="fas fa-trash"></i> Remove Product</button>
            </div>
        `;

        // Set current values for select elements
        document.getElementById('text-font-family').value = textStyles.fontFamily.split(',')[0].replace(/["']/g, '').trim();
        document.getElementById('text-font-weight').value = textStyles.fontWeight;
        document.getElementById('text-font-style').value = textStyles.fontStyle;
        document.getElementById('text-align').value = textStyles.textAlign;
        document.getElementById('image-object-fit').value = imageStyles.objectFit || 'cover';

        // Content event listeners
        document.getElementById('prod-name').addEventListener('input', (e) => {
            productName.textContent = e.target.value;
        });

        document.getElementById('prod-price').addEventListener('input', (e) => {
            productPrice.textContent = `$${e.target.value}`;
        });

        document.getElementById('prod-image').addEventListener('input', (e) => {
            productImage.src = e.target.value;
        });

        document.getElementById('prod-desc').addEventListener('input', (e) => {
            productDesc.textContent = e.target.value;
        });

        // Text styling event listeners
        document.getElementById('text-font-family').addEventListener('change', (e) => {
            productName.style.fontFamily = productPrice.style.fontFamily = productDesc.style.fontFamily = e.target.value;
        });

        document.getElementById('text-font-size').addEventListener('input', (e) => {
            productName.style.fontSize = productPrice.style.fontSize = productDesc.style.fontSize = `${e.target.value}px`;
        });

        document.getElementById('text-font-weight').addEventListener('change', (e) => {
            productName.style.fontWeight = productPrice.style.fontWeight = productDesc.style.fontWeight = e.target.value;
        });

        document.getElementById('text-font-style').addEventListener('change', (e) => {
            productName.style.fontStyle = productPrice.style.fontStyle = productDesc.style.fontStyle = e.target.value;
        });

        document.getElementById('text-color').addEventListener('input', (e) => {
            productName.style.color = productPrice.style.color = productDesc.style.color = e.target.value;
        });

        document.getElementById('text-align').addEventListener('change', (e) => {
            product.style.textAlign = e.target.value;
        });

        // Image settings event listeners
        document.getElementById('image-width').addEventListener('input', (e) => {
            productImage.style.width = `${e.target.value}px`;
        });

        document.getElementById('image-height').addEventListener('input', (e) => {
            productImage.style.height = `${e.target.value}px`;
        });

        document.getElementById('image-border-radius').addEventListener('input', (e) => {
            productImage.style.borderRadius = `${e.target.value}px`;
        });

        document.getElementById('image-object-fit').addEventListener('change', (e) => {
            productImage.style.objectFit = e.target.value;
        });

        // Layout & spacing event listeners
        document.getElementById('prod-width').addEventListener('input', (e) => {
            product.style.width = `${e.target.value}px`;
        });

        document.getElementById('prod-height').addEventListener('input', (e) => {
            product.style.height = e.target.value === 'auto' ? 'auto' : `${e.target.value}px`;
        });

        document.getElementById('prod-padding').addEventListener('input', (e) => {
            product.style.padding = `${e.target.value}px`;
        });

        document.getElementById('prod-margin').addEventListener('input', (e) => {
            product.style.margin = `${e.target.value}px`;
        });

        // Border & shadow event listeners
        document.getElementById('prod-border-width').addEventListener('input', (e) => {
            product.style.borderWidth = `${e.target.value}px`;
        });

        document.getElementById('prod-border-color').addEventListener('input', (e) => {
            product.style.borderColor = e.target.value;
        });

        document.getElementById('prod-border-radius').addEventListener('input', (e) => {
            product.style.borderRadius = `${e.target.value}px`;
        });

        document.getElementById('prod-box-shadow').addEventListener('input', (e) => {
            product.style.boxShadow = e.target.value;
        });

        // Transform effects event listeners
        document.getElementById('prod-rotate').addEventListener('input', (e) => {
            product.style.transform = `rotate(${e.target.value}deg)`;
        });

        document.getElementById('prod-scale').addEventListener('input', (e) => {
            product.style.transform = `scale(${e.target.value})`;
        });

        document.getElementById('prod-translate-x').addEventListener('input', (e) => {
            product.style.transform = `translateX(${e.target.value}px)`;
        });

        document.getElementById('prod-translate-y').addEventListener('input', (e) => {
            product.style.transform = `translateY(${e.target.value}px)`;
        });

        // Navigation buttons
        document.getElementById('back-to-grid').addEventListener('click', showGridCustomization);
        
        document.getElementById('remove-product').addEventListener('click', () => {
            product.remove();
            showGridCustomization();
        });
    };

    // Initialize with grid customization
    showGridCustomization();

    // Add click handlers to all products
    element.querySelectorAll('.product').forEach(product => {
        product.addEventListener('click', (e) => {
            e.stopPropagation();
            showProductCustomization(product);
        });
    });
}
else if (element.classList.contains('text-product')) {
    const textSection = element.querySelector('.text-section');
    const productSection = element.querySelector('.product-section');
    const product = productSection.querySelector('.product');
    const productImage = product.querySelector('img');
    const productName = product.querySelector('h4');
    const productPrice = product.querySelector('.price');
    const productDesc = product.querySelector('.description');
    const textContent = textSection.querySelector('p');

    customizationPanel.innerHTML = `
        <div class="customization-card">
            <h4>Text Content</h4>
            <div>
                <label for="text-content"><i class="fas fa-align-left"></i> Text:</label>
                <textarea id="text-content">${textContent.textContent}</textarea>
            </div>
        </div>

        <div class="customization-card">
            <h4>Product Details</h4>
            <div class="two-column-grid">
                <div>
                    <label for="product-name"><i class="fas fa-font"></i> Name:</label>
                    <input type="text" id="product-name" value="${productName.textContent}">
                </div>
                <div>
                    <label for="product-price"><i class="fas fa-dollar-sign"></i> Price:</label>
                    <input type="text" id="product-price" value="${productPrice.textContent.replace('$', '')}">
                </div>
                <div>
                    <label for="product-image"><i class="fas fa-image"></i> Image URL:</label>
                    <input type="url" id="product-image" value="${productImage.src}">
                </div>
                <div>
                    <label for="product-desc"><i class="fas fa-align-left"></i> Description:</label>
                    <input value="${productDesc.textContent}" id="product-desc"></input>
                </div>
            </div>
        </div>

        <div class="customization-card">
            <h4>Layout Settings</h4>
            <div class="two-column-grid">
                <div>
                    <label for="layout-direction"><i class="fas fa-arrows-alt-h"></i> Layout:</label>
                    <select id="layout-direction">
                        <option value="row">Text + Product</option>
                        <option value="row-reverse">Product + Text</option>
                        <option value="column">Text above Product</option>
                        <option value="column-reverse">Product above Text</option>
                    </select>
                </div>
                <div>
                    <label for="section-gap"><i class="fas fa-arrows-alt-h"></i> Gap Between Sections:</label>
                    <input type="number" id="section-gap" value="20">
                </div>
            </div>
        </div>

        <div class="customization-card">
            <h4>Actions</h4>
            <button id="remove-text-product"><i class="fas fa-trash"></i> Remove Section</button>
        </div>
    `;

    // Set current layout direction
    const currentDirection = getComputedStyle(element).flexDirection;
    document.getElementById('layout-direction').value = currentDirection;

    // Event listeners
    document.getElementById('text-content').addEventListener('input', (e) => {
        textContent.textContent = e.target.value;
    });

    document.getElementById('product-name').addEventListener('input', (e) => {
        productName.textContent = e.target.value;
    });

    document.getElementById('product-price').addEventListener('input', (e) => {
        productPrice.textContent = `$${e.target.value}`;
    });

    document.getElementById('product-image').addEventListener('input', (e) => {
        productImage.src = e.target.value;
    });

    document.getElementById('product-desc').addEventListener('input', (e) => {
        productDesc.textContent = e.target.value;
    });

    document.getElementById('layout-direction').addEventListener('change', (e) => {
        element.style.flexDirection = e.target.value;
    });

    document.getElementById('section-gap').addEventListener('input', (e) => {
        element.style.gap = `${e.target.value}px`;
    });

    document.getElementById('remove-text-product').addEventListener('click', () => {
        element.remove();
        customizationPanel.innerHTML = '';
    });
}
        else if (element.tagName !== 'HR' 
            || element.classList.contains('text-image')) {
                    // Check if the element is a <details> with <summary> and <p>
                 
                
    customizationHTML = `
            <div class="customization-card">
                <h4>Text Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="text"><i class="fas fa-font"></i> Text:</label>
                        <input type="text" id="text" value="${element.textContent || ''}">
                    </div>
                    <div>
                        <label for="font-size"><i class="fas fa-text-height"></i> Font Size:</label>
                        <input type="number" id="font-size" value="16">
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <label for="text-color"><i class="fas fa-palette"></i> Text Color:</label>
                        <input type="color" id="text-color">
                    </div>
                    <div>
                        <label for="bg-color"><i class="fas fa-fill-drip"></i> Background Color:</label>
                        <input type="color" id="bg-color">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Font Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="font-family"><i class="fas fa-font"></i> Font Family:</label>
                        <select id="font-family">
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Sans-serif">Sans-serif</option>
                            <option value="Arial">Arial</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Tahoma">Tahoma</option>
                        </select>
                    </div>
                    <div>
                        <label for="line-height"><i class="fas fa-text-height"></i> Line Height:</label>
                        <input type="number" id="line-height" value="1">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Border Customization</h4>
                <div class="two-column-grid">
                
                    <!-- Row 1 -->
                    <div>
                        <label for="border-style"><i class="fas fa-border-style"></i> Border Style:</label>
                        <select id="border-style">
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                            <option value="double">Double</option>
                            <option value="groove">Groove</option>
                            <option value="ridge">Ridge</option>
                            <option value="inset">Inset</option>
                            <option value="outset">Outset</option>
                        </select>
                    </div>
                    <div>
                        <label for="border-color"><i class="fas fa-palette"></i> Border Color:</label>
                        <input type="color" id="border-color">
                    </div>
                    <div>
                        <label for="border-size"><i class="fas fa-border-all"></i> Border Size:</label>
                        <input type="number" id="border-size" min="0" max="100">
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <label for="border-radius"><i class="fas fa-circle"></i> Border Radius:</label>
                        <input type="number" id="border-radius" min="0" max="100">
                    </div>

                    <div>
                        <label for="outline-style"><i class="fas fa-border-style"></i> Outline Style:</label>
                        <select id="outline-style">
                            <option value="">None</option>
                            <option value="solid">Solid</option>
                            <option value="dotted">Dotted</option>
                            <option value="dashed">Dashed</option>
                            <option value="double">Double</option>
                        </select>
                    </div>
                    <!-- Row 3 -->
                    <div>
                        <label for="outline-color"><i class="fas fa-palette"></i> Outline Color:</label>
                        <input type="color" id="outline-color">
                    </div>
                    <div>
                        <label for="outline-width"><i class="fas fa-border-all"></i> Outline Width:</label>
                        <input type="number" id="outline-width" min="0" max="100">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Spacing Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="padding"><i class="fas fa-arrows-alt"></i> Padding:</label>
                        <input type="number" id="padding" value="0">
                    </div>
                    <div>
                        <label for="margin"><i class="fas fa-arrows-alt"></i> Margin:</label>
                        <input type="number" id="margin" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Transform Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="rotate"><i class="fas fa-sync-alt"></i> Rotate (degrees):</label>
                        <input type="number" id="rotate" value="0">
                    </div>
                    <div>
                        <label for="skew"><i class="fas fa-slash"></i> Skew (degrees):</label>
                        <input type="number" id="skew" value="0">
                    </div>
                </div>
                <div class="two-column-grid">
                    <!-- Row 2 -->
                    <div>
                        <label for="translate-x"><i class="fas fa-sync-alt"></i> Translate X (px):</label>
                        <input type="number" id="translate-x" value="0">
                    </div>
                    <div>
                        <label for="translate-y"><i class="fas fa-slash"></i> Translate Y (px):</label>
                        <input type="number" id="translate-y" value="0">
                    </div>
                </div>
                <div class="two-column-grid">
                    <!-- Row 2 -->
                    <div>
                        <label for="scale"><i class="fas fa-sync-alt"></i> Scale (px):</label>
                        <input type="number" id="scale" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Box Shadow Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="box-shadow-x"><i class="fas fa-arrows-alt-h"></i> Horizontal Offset:</label>
                        <input type="number" id="box-shadow-x" value="0">
                    </div>
                    <div>
                        <label for="box-shadow-y"><i class="fas fa-arrows-alt-v"></i> Vertical Offset:</label>
                        <input type="number" id="box-shadow-y" value="0">
                    </div>
                    <!-- Row 2 -->
                    <div>
                        <label for="box-shadow-blur"><i class="fas fa-blur"></i> Blur:</label>
                        <input type="number" id="box-shadow-blur" value="0">
                    </div>
                    <div>
                        <label for="box-shadow-spread"><i class="fas fa-expand"></i> Spread:</label>
                        <input type="number" id="box-shadow-spread" value="0">
                    </div>
                    <!-- Row 3 -->
                    <div>
                        <label for="box-shadow-color"><i class="fas fa-palette"></i> Color:</label>
                        <input type="color" id="box-shadow-color">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Transition Customization</h4>
                <div class="two-column-grid">
                    <!-- Row 1 -->
                    <div>
                        <label for="transition-duration"><i class="fas fa-clock"></i> Duration:</label>
                        <input type="number" id="transition-duration" value="0">
                    </div>
                    <div>
                        <label for="transition-delay"><i class="fas fa-clock"></i> Delay:</label>
                        <input type="number" id="transition-delay" value="0">
                    </div>
                </div>
            </div>
        
            <div class="customization-card">
                <h4>Actions</h4>
                <button id="remove-item"><i class="fas fa-trash"></i> Remove Item</button>
            </div>
        `;

        
            // Set the inner HTML of the customization panel
    customizationPanel.innerHTML = customizationHTML;

 
                
            // Event listeners for common options
            document.getElementById('text').addEventListener('input', (e) => {
                element.textContent = e.target.value;
            });
            document.getElementById('font-size').addEventListener('input', (e) => {
                element.style.fontSize = e.target.value + 'px';
            });
            document.getElementById('text-color').addEventListener('input', (e) => {
                element.style.color = e.target.value;
            });
            document.getElementById('bg-color').addEventListener('input', (e) => {
                element.style.backgroundColor = e.target.value;
            });
            document.getElementById('font-family').addEventListener('input', (e) => {
                element.style.fontFamily = e.target.value;
            });
            document.getElementById('border-color').addEventListener('input', (e) => {
                element.style.borderColor = e.target.value;
            });
            document.getElementById('border-radius').addEventListener('input', (e) => {
                element.style.borderRadius = e.target.value + 'px';
            });
            document.getElementById('border-size').addEventListener('input', (e) => {
                element.style.borderWidth = e.target.value + 'px';
        });
            document.getElementById('outline-style').addEventListener('input', (e) => {
                element.style.outlineStyle = e.target.value;
            });
            document.getElementById('outline-color').addEventListener('input', (e) => {
                element.style.outlineColor = e.target.value;
            });
            document.getElementById('outline-width').addEventListener('input', (e) => {
                element.style.outlineWidth = e.target.value + 'px';
            });
            document.getElementById('padding').addEventListener('input', (e) => {
                element.style.padding = `${e.target.value}px ${e.target.value}px ${e.target.value}px ${e.target.value}px`;   
            });
            document.getElementById('line-height').addEventListener('input', (e) => {
                element.style.lineHeight = e.target.value+'px';
            });
            document.getElementById('margin').addEventListener('input', (e) => {
                element.style.margin = e.target.value+'px';
            });
            document.getElementById('rotate').addEventListener('input', (e) => {
                element.style.transform = `rotate(${e.target.value}deg)`;
            });
            document.getElementById('scale').addEventListener('input', (e) => {
                element.style.transform = `scale(${e.target.value})`;
            });
            document.getElementById('translate-x').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateY = '0px'; // Default translateY value
            
                // Check if translateY exists in the transform property
                if (transform.length > 1 && transform[1].includes('translateY')) {
                    translateY = transform[1].match(/translateY\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the new translateX and existing translateY
                element.style.transform = `translateX(${e.target.value}px) translateY(${translateY})`;
            });
            
            document.getElementById('translate-y').addEventListener('input', (e) => {
                const transform = element.style.transform.split(' ');
                let translateX = '0px'; // Default translateX value
            
                // Check if translateX exists in the transform property
                if (transform.length > 0 && transform[0].includes('translateX')) {
                    translateX = transform[0].match(/translateX\(([^)]+)\)/)[1];
                }
            
                // Update the transform property with the existing translateX and new translateY
                element.style.transform = `translateX(${translateX}) translateY(${e.target.value}px)`;
            });
            document.getElementById('skew').addEventListener('input', (e) => {
                element.style.transform = `skew(${e.target.value}deg)`;
            });
            document.getElementById('box-shadow-x').addEventListener('input', (e) => {
                // element.style.boxShadow = boxShadow.join(' ';
                // alert(element.style.boxShadow.value)
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[0] = e.target.value+'px';

                element.style.boxShadow = `${e.target.value}px 0 0 0`;
            });
            document.getElementById('box-shadow-y').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 ${e.target.value}px 0 0`;                
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[1] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('box-shadow-blur').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 ${e.target.value}px 0`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[2] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('box-shadow-spread').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 ${e.target.value}px`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[3] = e.target.value+'px';
                element.style.boxShadow = boxShadow.join(' ');
           
            });
            document.getElementById('box-shadow-color').addEventListener('input', (e) => {
                // element.style.boxShadow = `0 0 0 0 ${e.target.value}`;
                const boxShadow = element.style.boxShadow.split(' ');
                boxShadow[4] = e.target.value;
                element.style.boxShadow = boxShadow.join(' ');
            });
            document.getElementById('transition-duration').addEventListener('input', (e) => {
                if (!element.style.transition) {
                    element.style.transition = 'all 0s ease-in-out'; // Initialize if not set
                }
                const transitionParts = element.style.transition.split(' ');
                transitionParts[1] = `${e.target.value}s`; // Update duration
                element.style.transition = transitionParts.join(' ');
                console.log('Updated transition:', element.style.transition); // Debugging
            });
            document.getElementById('transition-delay').addEventListener('input', (e) => {
                element.style.transitionDelay = `${e.target.value}s`;
            });

    }
       
        // Remove item functionality
        document.getElementById('remove-item').addEventListener('click', () => {
            element.remove();
            customizationPanel.innerHTML = '';
        });
  
    }
      
        // Common customization options for most elements
       
    
});

// Function to update box-shadow
function updateBoxShadow(element) {
    try {
        const offsetX = document.getElementById('box-shadow-x').value || 0;
        const offsetY = document.getElementById('box-shadow-y').value || 0;
        const blur = document.getElementById('box-shadow-blur').value || 0;
        const spread = document.getElementById('box-shadow-spread').value || 0;
        const color = document.getElementById('box-shadow-color').value || '#000000';
        

        // Ensure the element exists
        if (!element) {
            console.error("Element not found!");
            return;
        }

        // Apply boxShadow
        element.style.boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
    } catch (error) {
        console.error("Error updating boxShadow:", error);
    }
}


function createElement(type) {
    let element;
    switch (type) {
        case 'heading':
            element = document.createElement('h2');
            element.textContent = 'New Heading';
            break;
        case 'paragraph':
            element = document.createElement('p');
            element.textContent = 'New Paragraph';
            break;
        case 'summary':
                element = document.createElement('details');
                let element2 = document.createElement('summary');
                let element3 = document.createElement('p');
                element2.textContent = 'Summary';
                element3.textContent = 'New Summary';
                element.appendChild(element2);
                element.appendChild(element3);
                break;
        case 'image':
            element = document.createElement('img');
            element.src = 'https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid';
            break;
        case 'button':
            element = document.createElement('button');
            element.textContent = 'Click Me';
            break;
        case 'divider':
            element = document.createElement('hr');
            break;
        case 'text-image':
            element = document.createElement('div');
            element.classList.add('text-image');
            element.innerHTML = `<p>Sample Text</p> <img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid">`;
            break;
        case 'two-images-columns':
            element = document.createElement('div');
            element.classList.add('two-images');
            element.innerHTML = `<img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid"><img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid">`;
            break;
        case 'three-images-columns':
            element = document.createElement('div');
            element.classList.add('three-images');
            element.innerHTML = `<img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid"><img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid"><img src="https://img.freepik.com/free-photo/businesswoman-looking-important-contact-phone_1163-4256.jpg?ga=GA1.1.572590152.1728395548&semt=ais_hybrid">`;
            break;
        case 'video':
            element = document.createElement('video');
            element.src = 'https://videocdn.cdnpk.net/videos/e2b614a8-38a2-4d1c-97f4-fa66c125f851/horizontal/previews/clear/small.mp4?token=exp=1739946236~hmac=5c13cf5abb966ea095890d23470177deb28075214397f6ee45dadb5e3d414166';
            element.controls = true;
            element.autoplay = true;   
            element.width = 300;
            element.height = 200;
            break;
        case 'text-video':
            element = document.createElement('div');
            element.classList.add('text-video');
            element.innerHTML = `<p>Sample Text</p> <video src="https://videocdn.cdnpk.net/videos/e2b614a8-38a2-4d1c-97f4-fa66c125f851/horizontal/previews/clear/small.mp4?token=exp=1739946236~hmac=5c13cf5abb966ea095890d23470177deb28075214397f6ee45dadb5e3d414166" controls width="200" height="150"></video>`;
            break;
        case 'text':
            element = document.createElement('p');
            element.textContent = 'New Text';
            break;
        case 'table-of-contents':
                // // Create a container div
                element = document.createElement('div');
                element.classList.add('table-of-contents');
                // Create a list and add list items
                const ul = document.createElement('ul');
                element = document.createElement('ul');
                for (let i = 0; i < 5; i++) {
                    const li = document.createElement('li');
                    li.textContent = `Item ${i + 1}`;
                    ul.appendChild(li);
                }

            
                // Append the list to the container
                element.appendChild(ul);
                break;
        case 'quote':
            element = document.createElement('blockquote');
            element.textContent = 'New Quote';
            break;
        case 'two-text-columns':
                // Create a container div
                element = document.createElement('div');
                element.classList.add('two-text-columns', 'separated');
            
                const column1 = document.createElement('div');
                column1.classList.add('column');
                column1.innerHTML = `<p>Column 1 Text</p>`;
            
                const column2 = document.createElement('div');
                column2.classList.add('column');
                column2.innerHTML = `<p>Column 2 Text</p>`;
            
                element.appendChild(column1);
                element.appendChild(column2);
                break
        case 'faq':
                // Create a container div
                element = document.createElement('div');
                element.classList.add('faq');
            
                // Create a question and answer pair
                const qaPair1 = document.createElement('div');
                qaPair1.classList.add('qa-pair');
            
                const question1 = document.createElement('p');
                question1.textContent = 'Question 1';
                qaPair1.appendChild(question1);
            
                const answer1 = document.createElement('p');
                answer1.textContent = 'Answer 1';
                qaPair1.appendChild(answer1);
            
                element.appendChild(qaPair1);
            
                // Create another question and answer pair
                const qaPair2 = document.createElement('div');
                qaPair2.classList.add('qa-pair');
            
                const question2 = document.createElement('p');
                question2.textContent = 'Question 2';
                qaPair2.appendChild(question2);
            
                const answer2 = document.createElement('p');
                answer2.textContent = 'Answer 2';
                qaPair2.appendChild(answer2);
            
                element.appendChild(qaPair2);
            
                // You can add more question and answer pairs here following the same pattern
            
                break; 
        case 'product-grid':
            // Create a container for the product grid
            element = document.createElement('div');
            element.classList.add('product-grid');

            // Add a heading for the product grid
            const heading = document.createElement('h3');
            heading.textContent = '';
            element.appendChild(heading);

            // Create a grid container
            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid-container');

            // Add placeholder products to the grid
            for (let i = 1; i <= 4; i++) {
                const product = document.createElement('div');
                product.classList.add('product');
                product.innerHTML = `
                    <img src="https://via.placeholder.com/150" alt="Product ${i}">
                    <h4>Product ${i}</h4>
                    <p>Description of Product ${i}</p>
                    <p>$19.99</p>
                `;
                gridContainer.appendChild(product);

                // Add click event to each product
                product.addEventListener('click', () => openProductModal(product));
            }

            // Append the grid container to the product grid
            element.appendChild(gridContainer);
            break;
        case 'text-product':
                // Create container
                element = document.createElement('div');
                element.classList.add('text-product');
                
                // Create text section
                const textSection = document.createElement('div');
                textSection.classList.add('text-section');
                textSection.innerHTML = `
                    <h3>Product related text</h3>
                    <p>Any highlights or features of the product.</p>
                `;
                
                // Create product section
                const productSection = document.createElement('div');
                productSection.classList.add('product-section');
                productSection.innerHTML = `
                    <div class="product">
                        <img src="https://via.placeholder.com/200" alt="Featured Product">
                        <h4>Premium Product</h4>
                        <p class="price">$99.99</p>
                        <p class="description">High-quality product with excellent features</p>
                    </div>
                `;
                
                // Append sections
                element.appendChild(textSection);
                element.appendChild(productSection);
                break;
        case 'one-product':
                // Create a container for the single product
                element = document.createElement('div');
                element.classList.add('one-product');
            
                // Add product image
                const productImage = document.createElement('img');
                productImage.src = 'https://via.placeholder.com/150';
                productImage.alt = 'Product Image';
                element.appendChild(productImage);
            
                // Add product name
                const productName = document.createElement('h4');
                productName.textContent = 'Product Name';
                element.appendChild(productName);
            
                // Add product price
                const productPrice = document.createElement('p');
                productPrice.textContent = '$19.99';
                element.appendChild(productPrice);
            
                // Add product description
                const productDescription = document.createElement('p');
                productDescription.textContent = 'Description of the product.';
                element.appendChild(productDescription);
                break;
            default:
            element = document.createElement('div');
            element.textContent = `New ${type}`;
    } 
    return element;
}
// save editor 
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.querySelector('.drop-zone');
    const publishButton = document.querySelector('.btn-success');

    publishButton.addEventListener('click', () => {
        const content = dropZone.innerHTML; // Get everything inside the editor
        localStorage.setItem('publishedContent', content); // Store it in localStorage
        window.location.href = './published.html'; // Redirect to the show page
    });
});


// view (mob, tab) toggle js
 function changeView(view) {
        const editor = document.getElementById("editor");
        editor.classList.remove("mobile-view", "tablet-view", "desktop-view");
       
        console.warn(view);
        
        if (view === "mobile") {
            editor.classList.add("mobile-view");
        } else if (view === "tablet") {
            editor.classList.add("tablet-view");
        } else {
            editor.classList.add("desktop-view");
        }
    }
// toggle active class 
    function toggleActiveClass(element) {
        const activeElement = document.querySelector('.view-toggle .active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }
        element.classList.add('active');
    }