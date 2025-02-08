document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.querySelector('.drop-zone');
    const customizationPanel = document.getElementById('customization-options');

    let selectedElement = null;

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
        element.style.borderRight = '5px solid #ccc';
    
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
                <label>Border Color:</label>
                <input type="color" id="border-color">
                <label>Border Size:</label>
                <input type="number" id="border-size" min="0" max="100">
                <label>Border Radius:</label>
                <input type="number" id="border-radius" min="0" max="100">
                <button id="remove-item">Remove item</button>
            `;
    
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
    
        if (element.tagName === 'IMG') {
            customizationPanel.innerHTML += `
                <label>Image URL:</label>
                <input type="text" id="img-url" value="${element.src}">
                <label>Height:</label>
                <input type="number" id="img-height" value="${element.height}">
                <label>Width:</label>
                <input type="number" id="img-width" value="${element.width}">
            `;
            document.getElementById('img-url').addEventListener('input', (e) => {
                element.src = e.target.value;
            });
            document.getElementById('img-height').addEventListener('input', (e) => {
                element.height = e.target.value;
            });
            document.getElementById('img-width').addEventListener('input', (e) => {
                element.width = e.target.value;
            });
        }
    
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
    
        if (element.classList.contains('two-images') || element.classList.contains('three-images')) {
            const images = element.querySelectorAll('img');
            let imagesHTML = '';
        
            // Generate all input fields first
            images.forEach((img, index) => {
                imagesHTML += `
                    <label>Image ${index + 1} URL:</label>
                    <input type="text" id="img-url-${index}" value="${img.src}">
                `;
            });
        
            // Append all inputs at once (prevents overwriting)
            customizationPanel.insertAdjacentHTML('beforeend', imagesHTML);
        
            // Attach event listeners for each image input field
            images.forEach((img, index) => {
                document.getElementById(`img-url-${index}`).addEventListener('input', (e) => {
                    img.src = e.target.value;
                });
            });
        }
        
        document.getElementById('remove-item').addEventListener('click', () => {
            element.remove();
            customizationPanel.innerHTML = '';
        });
    }
    
    
    
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
        case 'image':
            element = document.createElement('img');
            element.src = 'https://via.placeholder.com/300';
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
            element.innerHTML = `<p>Sample Text</p> <img src="https://via.placeholder.com/150">`;
            break;
        case 'two-images-columns':
            element = document.createElement('div');
            element.classList.add('two-images');
            element.innerHTML = `<img src="https://via.placeholder.com/150"><img src="https://via.placeholder.com/150">`;
            break;
        case 'three-images-columns':
            element = document.createElement('div');
            element.classList.add('three-images');
            element.innerHTML = `<img src="https://via.placeholder.com/100"><img src="https://via.placeholder.com/100"><img src="https://via.placeholder.com/100">`;
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
    