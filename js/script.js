// script.js - Simple JS functionality

document.addEventListener('DOMContentLoaded', () => {
    console.log("Website loaded successfully!");
    
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
