/**
 * Portfolio JavaScript Interactions
 * - Mobile Navigation Toggle
 * - Header Scroll Effect
 * - Portfolio Category Filter
 * - Contact Form Handling
 * - Dynamic Year Update
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('show')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
        navMenu.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 2. Header shadow on scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 3. Portfolio Category Filtering (for portfolio.html)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterButtons.length > 0 && portfolioCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.35s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Contact Form Submission (for contact.html)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const subject = document.getElementById('subject')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !subject || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง';
        return;
      }

      // Simulate sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังส่งข้อความ...';

      setTimeout(() => {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> ขอบคุณสำหรับการติดต่อ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว เราจะตอบกลับโดยเร็วที่สุด';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Auto-hide alert after 6 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }, 1000);
    });
  }

  // 5. Update Current Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

