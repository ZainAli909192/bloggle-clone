document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const dropZone = document.querySelector('.drop-zone');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', event => {
            event.dataTransfer.setData('type', draggable.getAttribute('data-type'));
        });
    });

    dropZone.addEventListener('dragover', event => {
        event.preventDefault();
    });

    dropZone.addEventListener('drop', event => {
        event.preventDefault();
        const type = event.dataTransfer.getData('type');
        let newElement = createElement(type);
        if (newElement) {
            newElement.classList.add('dropped-item');
            dropZone.appendChild(newElement);
        }
    });

    function createElement(type) {
        switch (type) {
            case 'heading':
                return createTextElement('h2', 'New Heading');
            case 'paragraph':
                return createTextElement('p', 'New Paragraph');
            case 'table-of-contents':
                return createTextElement('div', 'Table of Contents');
            case 'author':
                return createTextElement('div', 'Author Name');
            case 'quote':
                return createTextElement('blockquote', 'This is a quote');
            case 'image':
                let img = document.createElement('img');
                img.src = 'https://via.placeholder.com/150';
                return img;
            case 'button':
                let btn = document.createElement('button');
                btn.textContent = 'Click Me';
                return btn;
            case 'divider':
                return document.createElement('hr');
            default:
                return createTextElement('div', `New ${type}`);
        }
    }

    function createTextElement(tag, text) {
        let elem = document.createElement(tag);
        elem.textContent = text;
        return elem;
    }
});

// new js for customization
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
                element.src = 'https://via.placeholder.com/150';
                break;
            case 'button':
                element = document.createElement('button');
                element.textContent = 'Click Me';
                break;
            case 'divider':
                element = document.createElement('hr');
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

        if (element.tagName !== 'HR') {
            customizationPanel.innerHTML += `
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
            
                `;

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
            `;
            document.getElementById('img-url').addEventListener('input', (e) => {
                element.src = e.target.value;
            });
        }
    }
});
