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
    
        if (element.tagName !== 'HR') {
            customizationPanel.innerHTML += `
                <label>Text:</label>
                <input type="text" id="text" value="${element.textContent || ''}">
                <label>Font Size:</label>
                <input type="number" id="font-size" value="16">
                <label>Text Color:</label>
                <input type="color" id="text-color">
                <label>Background Color:</label>
                <input type="color" id="bg-color">
                <label>Font family:</label>
                <select id="font-family">
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Sans-serif">Sans-serif</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Tahoma">Tahoma</option>
                </select>
                <label>Border:</label>
                <label>Border Color:</label>
                <input type="color" id="border-color">
                <label>Border Size:</label>
                <input type="number" id="border-size" min="0" max="100">
                <label>Border Radius:</label>
                <input type="number" id="border-radius" min="0" max="100">
                <label>Outline:</label>
                <label>Outline Style:</label>
                <select id="outline-style">
                    <option value="">None</option>
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                    <option value="double">Double</option>
                </select>
                <label>Outline Color:</label>
                <input type="color" id="outline-color">
                <label>Outline Width:</label>
                <input type="number" id="outline-width" min="0" max="100">
                <button id="remove-item">Remove item</button>
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
    }
    
        // Customization options for images
        if (element.tagName === 'IMG') {
            customizationPanel.innerHTML += `
                <label>Image URL:</label>
                <input type="text" id="img-url" value="${element.src}">
                <label>Alt Text:</label>
                <input type="text" id="img-alt" value="${element.alt}">
                <label>Height:</label>
                <input type="number" id="img-height" value="${element.height}">
                <label>Width:</label>
                <input type="number" id="img-width" value="${element.width}">
                <label>Object Fit:</label>
                <select id="img-object-fit">
                    <option value="fill">Fill</option>
                    <option value="contain">Contain</option>
                    <option value="cover">Cover</option>
                    <option value="none">None</option>
                    <option value="scale-down">Scale Down</option>
                </select>
                <label>Object Position:</label>
                <input type="text" id="img-object-position" value="50% 50%">
            `;
    
            // Event listeners for image-specific options
            
            document.getElementById('img-url').addEventListener('click', (e) => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*'; // Optional: Restrict to image files
            
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
            document.getElementById('img-alt').addEventListener('input', (e) => {
                element.alt = e.target.value;
            });
            document.getElementById('img-height').addEventListener('input', (e) => {
                element.height = e.target.value;
            });
            document.getElementById('img-width').addEventListener('input', (e) => {
                element.width = e.target.value;
            });
            document.getElementById('img-object-fit').addEventListener('input', (e) => {
                element.style.objectFit = e.target.value;
            });
            document.getElementById('img-object-position').addEventListener('input', (e) => {
                element.style.objectPosition = e.target.value;
            });
        }
    
        // Customization options for videos
        if (element.tagName === 'VIDEO') {
            customizationPanel.innerHTML += `
                <label>Video URL:</label>
                <input type="text" id="video-url" value="${element.src}">
                <label>Height:</label>
                <input type="number" id="video-height" value="${element.height}">
                <label>Width:</label>
                <input type="number" id="video-width" value="${element.width}">
                <label>Controls:</label>
                <input type="checkbox" id="video-controls" ${element.controls ? 'checked' : ''}>
                <label>Autoplay:</label>
                <input type="checkbox" id="video-autoplay" ${element.autoplay ? 'checked' : ''}>
                <label>Loop:</label>
                <input type="checkbox" id="video-loop" ${element.loop ? 'checked' : ''}>
                <label>Muted:</label>
                <input type="checkbox" id="video-muted" ${element.muted ? 'checked' : ''}>
            `;
    
            // Event listeners for video-specific options
            document.getElementById('video-url').addEventListener('click', (e) => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'video/*'; // Optional: Restrict to video files
            
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
            document.getElementById('video-height').addEventListener('input', (e) => {
                element.height = e.target.value;
            });
            document.getElementById('video-width').addEventListener('input', (e) => {
                element.width = e.target.value;
            });
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
        }
    
        // Customization options for text-image and text-video elements
        if (element.classList.contains('text-image') || element.classList.contains('text-video')) {
            customizationPanel.innerHTML += `
                <label>Text Content:</label>
                <input type="text" id="text-content" value="${element.querySelector('p').textContent}">
                <label>Image URL:</label>
                <input type="text" id="img-url" value="${element.querySelector('img').src}">
            `;
            document.getElementById('text-content').addEventListener('input', (e) => {
                element.querySelector('p').textContent = e.target.value;
            });
            document.getElementById('img-url').addEventListener('input', (e) => {
                element.querySelector('img').src = e.target.value;
            });
        }
    
        // Customization options for text-video elements
        if (element.classList.contains('text-video')) {
            customizationPanel.innerHTML += `
                <label>Video URL:</label>
                <input type="text" id="video-url" value="${element.querySelector('video').src}">
            `;
            document.getElementById('video-url').addEventListener('input', (e) => {
                element.querySelector('video').src = e.target.value;
            });
        }
    
        // Customization options for two-images and three-images elements
        if (element.classList.contains('two-images') || element.classList.contains('three-images')) {
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

