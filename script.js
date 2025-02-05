document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
            question.nextElementSibling.classList.toggle("faq-answer");
            question.nextElementSibling.style.display =
                question.nextElementSibling.style.display === "block"
                    ? "none"
                    : "block";
        });
    });
});

// image scrolling 
document.addEventListener("DOMContentLoaded", () => {
    const blogImages = document.querySelectorAll(".blog-image");

    blogImages.forEach((img) => {
        img.addEventListener("mouseover", () => {
            img.style.transform = `translateY(-${img.scrollHeight / 2}px)`;
        });

        img.addEventListener("mouseleave", () => {
            img.style.transform = "translateY(0)";
        });
    });
});


// smarter js 
document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');
    let currentIndex = 0;
    const switchInterval = 2000; // 10 seconds

    const switchTab = (index) => {
        tabLinks.forEach((link, i) => {
            link.classList.toggle('active', i === index);
        });
        tabPanels.forEach((panel, i) => {
            panel.classList.toggle('active', i === index);
        });
    };

    tabLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            currentIndex = index;
            switchTab(currentIndex);
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % tabLinks.length;
        switchTab(currentIndex);
    }, switchInterval);
});
