// Custom JavaScript for Programming Techniques Guide

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCustomFeatures();
        initializeCodeCopy();
        initializeScrollToTop();
        initializeSearchEnhancements();
    });

    // Custom features initialization
    function initializeCustomFeatures() {
        console.log('🚀 Programming Techniques Guide loaded');
        
        // Add custom classes to code blocks
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(function(block) {
            block.classList.add('custom-code-block');
        });

        // Add loading animation to images
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }

    // Enhanced code copy functionality
    function initializeCodeCopy() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(function(block) {
            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.innerHTML = '📋 Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', function() {
                copyToClipboard(block.textContent);
                button.innerHTML = '✅ Copied!';
                button.classList.add('copied');
                
                setTimeout(function() {
                    button.innerHTML = '📋 Copy';
                    button.classList.remove('copied');
                }, 2000);
            });
            
            block.parentElement.style.position = 'relative';
            block.parentElement.appendChild(button);
        });
    }

    // Copy to clipboard utility
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                console.log('Code copied to clipboard');
            }).catch(function(err) {
                console.error('Failed to copy code:', err);
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    // Fallback copy method
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Code copied to clipboard (fallback)');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Scroll to top functionality
    function initializeScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #3f51b5;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollButton);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Search enhancements
    function initializeSearchEnhancements() {
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                highlightSearchResults(query);
            });
        }
    }

    // Highlight search results
    function highlightSearchResults(query) {
        if (!query) return;
        
        const content = document.querySelector('.md-content');
        if (!content) return;
        
        const walker = document.createTreeWalker(
            content,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(function(textNode) {
            const text = textNode.textContent;
            const regex = new RegExp(`(${query})`, 'gi');
            
            if (regex.test(text)) {
                const highlightedText = text.replace(regex, '<mark>$1</mark>');
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    }

    // Utility functions
    window.ProgrammingGuide = {
        copyCode: copyToClipboard,
        scrollToTop: function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        highlightText: function(query) {
            highlightSearchResults(query);
        }
    };

})();
