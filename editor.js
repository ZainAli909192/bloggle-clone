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
            case 'quote':
                element = document.createElement('blockquote');
                element.textContent = 'This is a quote';
                break;
            case 'image':
                element = document.createElement('img');
                element.src = 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D';
                break;
            case 'button':
                element = document.createElement('button');
                element.textContent = 'Click Me';
                break;
            case 'divider':
                element = document.createElement('hr');
                break;
            case 'summary':
                element = document.createElement('details');
                let summary = document.createElement('summary');
                summary.textContent = 'Summary';
                element.appendChild(summary);
                let content = document.createElement('div');
                content.textContent = 'This is a summary';
                element.appendChild(content);
                break;
            default:
                element = document.createElement('div');
                element.textContent = `New ${type}`;
        }
        return element;
    }

    // Function to Show Customization Options
    function showCustomizationOptions(element) {
        customizationPanel.innerHTML = '';
        element.style.borderRight = '5px solid #ccc';
        if (element.tagName !== 'HR') {
            customizationPanel.innerHTML += `
                <label>Text:</label>
                <input type="text" id="text">
                <label>Font Size:</label>
                <input type="number" id="font-size" value="16">
                <label>Text Color:</label>
                <input type="color" id="text-color">
                <label>Background Color:</label>
                <input type="color" id="bg-color">
                <label>Font family:</label>
                <select id="font-family">
                    <option value="Times new Roman">Times new Roman</option>
                    <option value="Sensirf">Sensirf</option>
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
            
                <button id="remove-item">Remove item </button>
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
            const children = [...customizationPanel.children];
            customizationPanel.innerHTML = '';
            for (let i = Math.max(0, children.length - 6); i < children.length; i++) {
                customizationPanel.appendChild(children[i]);
            }
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
        document.getElementById('remove-item').addEventListener('click', () => {
            element.remove();
        });
    }
    
});
