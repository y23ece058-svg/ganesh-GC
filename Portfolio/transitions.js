/**
 * ==========================================================================
 * ENTERPRISE PAGE-TO-PAGE TRANSITIONS & LOADING BAR
 * Curated for: Gundapuneni Ganesh Portfolio
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create or query top page progress bar
    let progressBar = document.querySelector('.page-progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'page-progress-bar';
        document.body.prepend(progressBar);
    }

    // 2. Animate entrance loading completion
    requestAnimationFrame(() => {
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => {
                progressBar.style.width = '0%';
                progressBar.style.opacity = '1';
            }, 300);
        }, 220);
    });

    // 3. Smooth Inter-page Navigation Interceptor
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Filter for local multi-page html links
        const isInternalPage = href && 
            !href.startsWith('#') && 
            !href.startsWith('mailto:') && 
            !href.startsWith('tel:') && 
            !href.startsWith('http') && 
            !href.startsWith('javascript:') &&
            link.getAttribute('target') !== '_blank';

        if (isInternalPage) {
            link.addEventListener('click', (event) => {
                // Allow browser default for new tab shortcuts
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return;
                }

                event.preventDefault();

                // Trigger top progress bar & body exit animation
                progressBar.style.opacity = '1';
                progressBar.style.width = '65%';
                document.body.classList.add('page-leaving');

                setTimeout(() => {
                    progressBar.style.width = '100%';
                    window.location.href = href;
                }, 220);
            });
        }
    });

    // 4. Handle browser back / forward cache restore
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-leaving');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }
    });
});
