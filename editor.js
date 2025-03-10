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
        element.style.border = '1px solid #ccc';
    
    
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
    
        else if (element.tagName !== 'HR' || element.classList.contains('text-image')) {
            customizationPanel.innerHTML = `
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
                    <br>

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
            element2.textContent = 'New Summary';
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
        case 'list':
            element = document.createElement('ul');
            for (let i = 0; i < 5; i++) {
                const li = document.createElement('li');
                li.textContent = `Item ${i + 1}`;
                element.appendChild(li);
            }
            break;
        case 'quote':
            element = document.createElement('blockquote');
            element.textContent = 'New Quote';
            break;
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

