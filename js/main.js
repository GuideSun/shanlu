// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });
    
    // 初始化咨询弹框
    const consultationModal = new bootstrap.Modal(document.getElementById('consultationModal'));
    
    // 为所有咨询按钮添加点击事件
    const consultationButtons = document.querySelectorAll('.consultation-btn, a[href="contact.html#consultation"], a[href="services.html#training"]');
    
    consultationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            consultationModal.show();
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // 排除下拉菜单触发器和咨询按钮
            if (!this.classList.contains('dropdown-toggle') && !this.classList.contains('consultation-btn')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // 如果是空锚点或仅为#，则滚动到顶部
                if (targetId === '#' || targetId === '') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 获取导航栏高度，用于偏移
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // 如果是移动设备且导航菜单是展开的，则关闭导航菜单
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
    
    // 初始化工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});


function initImageFallback() {
    const fallbackSrc = 'assets/images/AIbanner.png';
    document.querySelectorAll('img').forEach(img => {
        // 统一懒加载
        if (!img.loading) img.loading = 'lazy';
        // 统一回退
        img.addEventListener('error', function handler() {
            if (img.src !== fallbackSrc) {
                img.src = fallbackSrc;
            }
            img.removeEventListener('error', handler);
        });
        // 占位底色在 CSS 已设置
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initImageFallback();
});