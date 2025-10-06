// Analytics and tracking for Programming Techniques Guide

(function() {
    'use strict';

    // Configuration
    const ANALYTICS_CONFIG = {
        enabled: true,
        debug: false,
        trackPageViews: true,
        trackCodeCopies: true,
        trackSearchQueries: true,
        trackScrollDepth: true
    };

    // Initialize analytics
    function initializeAnalytics() {
        if (!ANALYTICS_CONFIG.enabled) return;

        console.log('📊 Analytics initialized');

        if (ANALYTICS_CONFIG.trackPageViews) {
            trackPageView();
        }

        if (ANALYTICS_CONFIG.trackCodeCopies) {
            trackCodeCopies();
        }

        if (ANALYTICS_CONFIG.trackSearchQueries) {
            trackSearchQueries();
        }

        if (ANALYTICS_CONFIG.trackScrollDepth) {
            trackScrollDepth();
        }
    }

    // Track page views
    function trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        logEvent('page_view', pageData);
    }

    // Track code copy events
    function trackCodeCopies() {
        document.addEventListener('click', function(event) {
            if (event.target.classList.contains('copy-code-btn')) {
                const codeBlock = event.target.parentElement.querySelector('code');
                const language = codeBlock.className.match(/language-(\w+)/);
                
                const copyData = {
                    language: language ? language[1] : 'unknown',
                    codeLength: codeBlock.textContent.length,
                    timestamp: new Date().toISOString(),
                    page: window.location.pathname
                };

                logEvent('code_copy', copyData);
            }
        });
    }

    // Track search queries
    function trackSearchQueries() {
        const searchInput = document.querySelector('.md-search__input');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    const query = searchInput.value.trim();
                    if (query.length > 2) {
                        const searchData = {
                            query: query,
                            length: query.length,
                            timestamp: new Date().toISOString(),
                            page: window.location.pathname
                        };

                        logEvent('search_query', searchData);
                    }
                }, 500);
            });
        }
    }

    // Track scroll depth
    function trackScrollDepth() {
        const depths = [25, 50, 75, 90, 100];
        const trackedDepths = new Set();
        
        function trackScroll() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            depths.forEach(function(depth) {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    
                    const scrollData = {
                        depth: depth,
                        scrollPercent: scrollPercent,
                        timestamp: new Date().toISOString(),
                        page: window.location.pathname
                    };

                    logEvent('scroll_depth', scrollData);
                }
            });
        }

        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(trackScroll, 100);
        });
    }

    // Log events (placeholder for actual analytics service)
    function logEvent(eventName, eventData) {
        if (ANALYTICS_CONFIG.debug) {
            console.log('📊 Event:', eventName, eventData);
        }

        // Here you would integrate with your analytics service
        // Examples: Google Analytics, Mixpanel, Amplitude, etc.
        
        // Example Google Analytics 4 integration:
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }

        // Example custom analytics endpoint:
        if (typeof fetch !== 'undefined') {
            fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event: eventName,
                    data: eventData,
                    session: getSessionId()
                })
            }).catch(function(error) {
                console.error('Analytics error:', error);
            });
        }
    }

    // Generate session ID
    function getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }

    // Track performance metrics
    function trackPerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            
            const perfData = {
                loadTime: loadTime,
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstPaint: timing.responseEnd - timing.requestStart,
                timestamp: new Date().toISOString()
            };

            logEvent('performance', perfData);
        }
    }

    // Track errors
    function trackErrors() {
        window.addEventListener('error', function(event) {
            const errorData = {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            };

            logEvent('javascript_error', errorData);
        });

        window.addEventListener('unhandledrejection', function(event) {
            const errorData = {
                reason: event.reason,
                timestamp: new Date().toISOString(),
                page: window.location.pathname
            };

            logEvent('promise_rejection', errorData);
        });
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeAnalytics();
        trackPerformance();
        trackErrors();
    });

    // Export for external use
    window.Analytics = {
        track: logEvent,
        config: ANALYTICS_CONFIG
    };

})();
