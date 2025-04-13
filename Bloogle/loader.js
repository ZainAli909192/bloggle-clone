// loader.js
async function includeLoader() {
    try {
        const response = await fetch('./loader.html');
        if (!response.ok) throw new Error('Failed to load loader');
        
        const loaderHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', loaderHTML);
        
        // Return loader control functions
        return {
            show: (duration = 2000) => {
                const overlay = document.getElementById('loader-overlay');
                overlay.classList.remove('hidden'); // Remove hidden class
                
                if (duration) {
                    setTimeout(() => this.hide(), duration);
                }
            },
            hide: () => {
                const overlay = document.getElementById('loader-overlay');
                overlay.classList.add('hidden'); // Add hidden class
            }
        };
    } catch (error) {
        console.error('Loader error:', error);
        return {
            show: () => console.log('Loader unavailable'),
            hide: () => console.log('Loader unavailable')
        };
    }
}

// Initialize loader and make it globally available
let loader;

includeLoader().then(loaderControl => {
    loader = loaderControl;
    
    // Auto-show loader on page load for 3 seconds (optional)
    loader.show(3000);  
});

setTimeout(() => {
    const overlay = document.getElementById('loader-overlay');
    overlay.classList.add('hidden');
    
    // Remove from DOM after fadeout completes
    setTimeout(() => {
        overlay.remove();
    }, 500); // Match this with the CSS transition time
}, 1500);