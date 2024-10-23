// ==UserScript==
// @name         Copy Markdown Link
// @namespace    http://tampermonkey.net/
// @version      2024-09-24
// @description  This script adds a button at the bottom of the page so you can copy a Markdown link automatically.
// @author       Hurj
// @match        *://*/*
// @icon         none
// @grant        GM_setClipboard
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Create a button to copy the title and URL
    const button = document.createElement('button');
    button.innerText = '🔗';
    button.style.position = 'fixed'; // Fixed positioning
    button.style.bottom = '10px'; // Position from the bottom
    button.style.left = '10px'; // Position from the left
    button.style.zIndex = '1000'; // Ensure it is on top of other elements
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50'; // Button color
    button.style.color = 'white'; // Text color
    button.style.border = '2px solid #fff'; // Added border
    button.style.borderRadius = '5px'; // Rounded corners
    button.style.cursor = 'pointer'; // Pointer cursor on hover
    button.style.fontSize = '14px'; // Font size
    button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)'; // Shadow for visibility

    // Create a tooltip for feedback
    const tooltip = document.createElement('div');
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '50px'; // Position above the button
    tooltip.style.left = '10px';
    tooltip.style.zIndex = '1001'; // Ensure it is above the button
    tooltip.style.backgroundColor = '#333'; // Dark background
    tooltip.style.color = 'white'; // Text color
    tooltip.style.padding = '5px 10px'; // Padding
    tooltip.style.borderRadius = '5px'; // Rounded corners
    tooltip.style.display = 'none'; // Initially hidden
    tooltip.style.fontSize = '12px'; // Font size

    // Append the tooltip to the body
    document.body.appendChild(tooltip);

    // Append the button to the body
    document.body.appendChild(button);

    // Add click event to the button
    button.addEventListener('click', () => {
        const title = document.title; // Get the page title
        const url = window.location.href; // Get the page URL
        const markdownLink = `[${title}](${url})`; // Format in Markdown

        // Use GM_setClipboard to copy the markdown link to clipboard
        GM_setClipboard(markdownLink);

        // Show the tooltip with feedback
        tooltip.innerText = 'Copied to clipboard!';
        tooltip.style.display = 'block'; // Show the tooltip

        // Hide the tooltip after 2 seconds
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 1000);
    });
})();
