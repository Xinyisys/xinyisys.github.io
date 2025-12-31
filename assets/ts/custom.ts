// 禁用目录自动滚动，但保留高亮效果
document.addEventListener('DOMContentLoaded', () => {
    // 1. 禁用目录的自动滚动行为
    const toc = document.querySelector('.right-sidebar');
    if (toc) {
        // 拦截 scrollTo 和 scrollIntoView 方法
        const originalScrollTo = Element.prototype.scrollTo;
        const originalScrollIntoView = Element.prototype.scrollIntoView;

        Element.prototype.scrollTo = function (...args) {
            if (this.closest('.right-sidebar')) {
                return; // 阻止目录内的滚动
            }
            return originalScrollTo.apply(this, args);
        };

        Element.prototype.scrollIntoView = function (...args) {
            if (this.closest('.right-sidebar')) {
                return; // 阻止目录项自动滚动到视图
            }
            return originalScrollIntoView.apply(this, args);
        };
    }

    // 2. 禁用平滑滚动，点击目录直接跳转
    document.querySelectorAll('.right-sidebar a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    // 直接跳转，不使用平滑滚动
                    const top = target.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: top, behavior: 'auto' });
                    history.pushState(null, null, href);
                }
            }
        });
    });
});