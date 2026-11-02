/**
 * ALOY FOUNDATION - OFFICIAL JAVASCRIPT
 * Multi-Page & Global Engine
 * Features:
 * 1. Smooth Carousel Initializer
 * 2. Instant Bilingual Switcher (Bangla <-> English) across all pages
 * 3. Multi-Currency Switcher (BDT ৳ <-> USD $)
 * 4. Cause-Based Targeted Donation Engine
 * 5. Animated Impact Counters
 * 6. Global Donation Modal with Local & International Gateways
 * 7. Active Nav Link Detection
 */

// Global State Management
const appState = {
  lang: localStorage.getItem('aloy_lang') || 'bn',
  currency: localStorage.getItem('aloy_currency') || 'BDT',
  selectedCause: 'education',
  donationType: 'one-time',
  selectedAmount: 1000,
  customAmount: null,
  paymentMethod: 'bkash'
};

// Preset Amounts & Impact Descriptions
const impactData = {
  BDT: {
    symbol: '৳',
    presets: [500, 1000, 2500, 5000],
    impacts: {
      education: {
        500: { bn: '১ জন শিশুর এক মাসের স্কুল স্টেশনারি ও খাতা-কলম।', en: '1 month of school stationery & notebooks for 1 child.' },
        1000: { bn: '১ জন ঝরে পড়া শিশুর ১ মাসের স্কুল ফিডিং ও শিক্ষা সহায়তা।', en: '1 month of school feeding & educational support for 1 at-risk child.' },
        2500: { bn: '১ জন মেধাবী শিক্ষার্থীর পূর্ণাঙ্গ বার্ষিক শিক্ষা উপকরণ ও পোশাক।', en: 'Full annual uniform, bag & study kit for a meritorious student.' },
        5000: { bn: '১ জন উচ্চমাধ্যমিক শিক্ষার্থীর ৩ মাসের পরীক্ষার পূর্ণ বৃত্তি।', en: '3 months full scholarship for a higher secondary student.' }
      },
      healthcare: {
        500: { bn: '১ জন দরিদ্র প্রবীণের প্রাথমিক ডায়াবেটিস ও প্রেশার টেস্ট কিট।', en: 'Basic diabetes & blood pressure diagnostic test for 1 elder.' },
        1000: { bn: '১ জন মায়ের প্রসবকালীন জরুরি ওষুধ ও পুষ্টি সহায়তা।', en: 'Maternal prenatal care medicines and nutrition pack for 1 mother.' },
        2500: { bn: 'একটি ফ্রন্টলাইন মেডিকেল ক্যাম্পে ২০ জন রোগীকে বিনামূল্যে ওষুধ প্রদান।', en: 'Free prescribed emergency medicines for 20 rural camp patients.' },
        5000: { bn: '১ জন ছানি পড়া রোগীর সম্পূর্ণ বিনামূল্যে চক্ষু অপারেশন ও লেন্স।', en: 'Complete free cataract eye surgery & replacement lens for 1 patient.' }
      },
      poverty: {
        500: { bn: 'দরিদ্র পরিবারের ১ সপ্তাহের পুষ্টিকর খাদ্য সহায়তা প্যাক।', en: '1 week emergency food & nutrition package for an ultra-poor family.' },
        1000: { bn: 'ক্ষুদ্র হস্তশিল্প তৈরির কাঁচামাল প্রদান ও প্রশিক্ষণ সহায়তা।', en: 'Raw craft materials & skill training for an aspiring woman artisan.' },
        2500: { bn: 'ক্ষুদ্র সবজি বিক্রেতার জন্য পুঁজি সহায়তা ও ওজন মাপক যন্ত্র।', en: 'Working capital & digital scale for an aspiring street micro-vendor.' },
        5000: { bn: 'স্বাবলম্বী সেলাই মেশিন বা জীবিকা নির্বাহ কিটের বড় অংশ অনুদান।', en: 'Major co-funding for a livelihood sewing machine or rickshaw toolkit.' }
      },
      general: {
        500: { bn: 'আলোয় সাধারণ তহবিলে জরুরি মাঠপর্যায়ের ত্রাণ ও লজিস্টিক সহায়তা।', en: 'Supports urgent field logistics & emergency relief deployment.' },
        1000: { bn: 'সবচেয়ে ঝুঁকিপূর্ণ এলাকায় অবিলম্বে মানবিক সহায়তা প্রদান।', en: 'Deploys critical humanitarian support to the most vulnerable pockets.' },
        2500: { bn: 'জরুরি পুনর্বাসন কার্যক্রমে সরাসরি অবদান।', en: 'Direct contribution to emergency rehab & sustainable welfare.' },
        5000: { bn: 'কমিউনিটি উন্নয়ন ও মাঠপর্যায়ের টেকসই সেবাকেন্দ্র পরিচালনা।', en: 'Operational sustaining of rural community transformation hubs.' }
      }
    }
  },
  USD: {
    symbol: '$',
    presets: [10, 25, 50, 100],
    impacts: {
      education: {
        10: { bn: '১ জন শিশুর এক মাসের স্কুল স্টেশনারি ও খাতা-কলম।', en: '1 month of school stationery & notebooks for 1 child.' },
        25: { bn: '১ জন ঝরে পড়া শিশুর ১ মাসের স্কুল ফিডিং ও শিক্ষা সহায়তা।', en: '1 month of school feeding & educational support for 1 at-risk child.' },
        50: { bn: '১ জন মেধাবী শিক্ষার্থীর পূর্ণাঙ্গ বার্ষিক শিক্ষা উপকরণ ও পোশাক।', en: 'Full annual uniform, bag & study kit for a meritorious student.' },
        100: { bn: '১ জন উচ্চমাধ্যমিক শিক্ষার্থীর ৩ মাসের পরীক্ষার পূর্ণ বৃত্তি।', en: '3 months full scholarship for a higher secondary student.' }
      },
      healthcare: {
        10: { bn: '১ জন দরিদ্র প্রবীণের প্রাথমিক ডায়াবেটিস ও প্রেশার টেস্ট কিট।', en: 'Basic diabetes & blood pressure diagnostic test for 1 elder.' },
        25: { bn: '১ জন মায়ের প্রসবকালীন জরুরি ওষুধ ও পুষ্টি সহায়তা।', en: 'Maternal prenatal care medicines and nutrition pack for 1 mother.' },
        50: { bn: 'একটি ফ্রন্টলাইন মেডিকেল ক্যাম্পে ২০ জন রোগীকে বিনামূল্যে ওষুধ প্রদান।', en: 'Free prescribed emergency medicines for 20 rural camp patients.' },
        100: { bn: '১ জন ছানি পড়া রোগীর সম্পূর্ণ বিনামূল্যে চক্ষু অপারেশন ও লেন্স।', en: 'Complete free cataract eye surgery & replacement lens for 1 patient.' }
      },
      poverty: {
        10: { bn: 'দরিদ্র পরিবারের ১ সপ্তাহের পুষ্টিকর খাদ্য সহায়তা প্যাক।', en: '1 week emergency food & nutrition package for an ultra-poor family.' },
        25: { bn: 'ক্ষুদ্র হস্তশিল্প তৈরির কাঁচামাল প্রদান ও প্রশিক্ষণ সহায়তা।', en: 'Raw craft materials & skill training for an aspiring woman artisan.' },
        50: { bn: 'ক্ষুদ্র সবজি বিক্রেতার জন্য পুঁজি সহায়তা ও ওজন মাপক যন্ত্র।', en: 'Working capital & digital scale for an aspiring street micro-vendor.' },
        100: { bn: 'একটি সম্পূর্ণ স্বাবলম্বী সেলাই মেশিন উপহার প্রদান।', en: 'Gifts a brand new heavy-duty sewing machine for family self-reliance.' }
      },
      general: {
        10: { bn: 'জরুরি মাঠপর্যায়ের ত্রাণ সহায়তা।', en: 'Direct field humanitarian support.' },
        25: { bn: 'সবচেয়ে ঝুঁকিপূর্ণ এলাকায় অবিলম্বে সহায়তা।', en: 'Immediate support to families in critical need.' },
        50: { bn: 'টেকসই পুনর্বাসন কর্মসূচিতে অবদান।', en: 'Major support for sustainable livelihood programs.' },
        100: { bn: 'আলোয় ফাউন্ডেশনের প্রধান উন্নয়ন কার্যক্রম পরিচালনা।', en: 'Substantial co-funding for key development operations.' }
      }
    }
  }
};

// Cause Labels Localization
const causeLabels = {
  education: { bn: 'শিক্ষা সহায়তা ও স্কুল ফিডিং', en: 'Child Education & School Feeding' },
  healthcare: { bn: 'স্বাস্থ্যসেবা, ফ্রি ওষুধ ও চক্ষু ক্যাম্প', en: 'Healthcare, Medicines & Eye Camp' },
  poverty: { bn: 'দারিদ্র্য বিমোচন, সেলাই মেশিন ও রিকশা', en: 'Poverty Alleviation & Livelihood' },
  general: { bn: 'সাধারণ জরুরি মানবিক তহবিল', en: 'General Humanitarian Relief Fund' }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initCurrency();
  initHeroCarousel();
  initCauseSelector();
  initAmountButtons();
  initCounters();
  initDonationModal();
  initForms();
  highlightActiveNav();
  initVideoPlayer();
});

/* -------------------------------------------------------------
 * 1. HERO CAROUSEL INITIALIZATION
 * ------------------------------------------------------------- */
function initHeroCarousel() {
  const carouselEl = document.getElementById('heroBannerCarousel');
  if (carouselEl && typeof bootstrap !== 'undefined') {
    new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: 'carousel',
      pause: 'hover',
      wrap: true
    });
  }
}

/* -------------------------------------------------------------
 * 2. BILINGUAL TRANSLATION LOGIC
 * ------------------------------------------------------------- */
function initLanguage() {
  setLanguage(appState.lang);

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.getAttribute('data-lang-target');
      if (selected) {
        setLanguage(selected);
      }
    });
  });
}

function setLanguage(lang) {
  appState.lang = lang;
  localStorage.setItem('aloy_lang', lang);
  document.documentElement.lang = lang;

  if (lang === 'en') {
    document.body.classList.add('lang-en');
  } else {
    document.body.classList.remove('lang-en');
  }

  // Update switcher button active state
  document.querySelectorAll('.btn-lang').forEach(btn => {
    if (btn.getAttribute('data-lang-target') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update all elements with data-bn and data-en
  document.querySelectorAll('[data-bn][data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.innerHTML = text;
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-bn][data-placeholder-en]').forEach(el => {
    const ph = el.getAttribute(`data-placeholder-${lang}`);
    if (ph) {
      el.setAttribute('placeholder', ph);
    }
  });

  updateImpactPreview();
}

/* -------------------------------------------------------------
 * 3. CURRENCY SWITCHER LOGIC
 * ------------------------------------------------------------- */
function initCurrency() {
  const select = document.getElementById('currencySelector');
  if (select) {
    select.value = appState.currency;
    select.addEventListener('change', (e) => {
      appState.currency = e.target.value;
      localStorage.setItem('aloy_currency', appState.currency);
      appState.selectedAmount = impactData[appState.currency].presets[1];
      renderAmountButtons();
      updateImpactPreview();
    });
  }
  renderAmountButtons();
}

/* -------------------------------------------------------------
 * 4. CAUSE-BASED TARGETED DONATION
 * ------------------------------------------------------------- */
function initCauseSelector() {
  // Hero quick donation cause pills
  document.querySelectorAll('.cause-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cause-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.selectedCause = pill.getAttribute('data-cause');
      updateImpactPreview();
    });
  });

  // Frequency toggle (One-time vs Monthly)
  document.querySelectorAll('.freq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.freq-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.donationType = btn.getAttribute('data-freq');
    });
  });
}

function renderAmountButtons() {
  const container = document.getElementById('amountButtonsContainer');
  if (!container) return;

  const data = impactData[appState.currency];
  container.innerHTML = '';

  data.presets.forEach((amt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `amount-btn ${amt === appState.selectedAmount ? 'active' : ''}`;
    btn.textContent = `${data.symbol}${amt.toLocaleString()}`;
    btn.dataset.amount = amt;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedAmount = amt;
      appState.customAmount = null;
      const customInput = document.getElementById('customAmountInput');
      if (customInput) customInput.value = '';
      updateImpactPreview();
    });
    container.appendChild(btn);
  });
}

function initAmountButtons() {
  const customInput = document.getElementById('customAmountInput');
  if (customInput) {
    customInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (val && val > 0) {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
        appState.selectedAmount = val;
        appState.customAmount = val;
        updateImpactPreview();
      }
    });
  }
}

function updateImpactPreview() {
  const previewEl = document.getElementById('impactPreviewText');
  if (!previewEl) return;

  const curr = appState.currency;
  const cause = appState.selectedCause;
  const amt = appState.selectedAmount;
  const lang = appState.lang;

  const data = impactData[curr];
  const presets = data.presets;
  let matchedPreset = presets[0];

  for (let i = presets.length - 1; i >= 0; i--) {
    if (amt >= presets[i]) {
      matchedPreset = presets[i];
      break;
    }
  }

  const impactObj = data.impacts[cause] && data.impacts[cause][matchedPreset];
  if (impactObj) {
    previewEl.innerHTML = `<strong>${lang === 'bn' ? 'অনুদানের প্রভাব: ' : 'Impact: '}</strong> ${impactObj[lang]}`;
  }
}

/* -------------------------------------------------------------
 * 5. ANIMATED COUNTERS
 * ------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-value');
  if (!counterElements.length) return;
  let animated = false;

  const startAnimation = () => {
    if (animated) return;
    animated = true;
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const duration = 1800;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  };

  const statsSection = document.getElementById('impactStats') || document.querySelector('.stats-ribbon');
  if (statsSection && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(statsSection);
  } else {
    startAnimation();
  }
}

/* -------------------------------------------------------------
 * 6. DONATION MODAL LOGIC
 * ------------------------------------------------------------- */
function initDonationModal() {
  const modalEl = document.getElementById('donationModal');
  if (!modalEl) return;

  // Trigger from program cards & buttons
  document.querySelectorAll('.btn-donate-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cause = e.currentTarget.getAttribute('data-cause');
      if (cause) {
        appState.selectedCause = cause;
      }
      openDonationModal();
    });
  });

  // Payment method selection cards
  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      appState.paymentMethod = card.getAttribute('data-method');

      const bkashGuide = document.getElementById('bkashInstructions');
      const cardGuide = document.getElementById('cardInstructions');
      if (appState.paymentMethod === 'bkash' || appState.paymentMethod === 'nagad' || appState.paymentMethod === 'rocket') {
        if (bkashGuide) bkashGuide.classList.remove('d-none');
        if (cardGuide) cardGuide.classList.add('d-none');
      } else {
        if (bkashGuide) bkashGuide.classList.add('d-none');
        if (cardGuide) cardGuide.classList.remove('d-none');
      }
    });
  });

  // Modal Donate Submit
  const donateSubmitBtn = document.getElementById('btnSubmitDonation');
  if (donateSubmitBtn) {
    donateSubmitBtn.addEventListener('click', () => {
      const donorName = document.getElementById('donorFullName')?.value || (appState.lang === 'bn' ? 'সম্মানিত শুভাকাঙ্ক্ষী' : 'Valued Donor');
      const symbol = impactData[appState.currency].symbol;
      const formattedAmt = `${symbol}${appState.selectedAmount.toLocaleString()}`;
      const causeName = causeLabels[appState.selectedCause][appState.lang];

      const formStep = document.getElementById('donationFormStep');
      const receiptStep = document.getElementById('donationReceiptStep');
      
      if (formStep && receiptStep) {
        formStep.classList.add('d-none');
        receiptStep.classList.remove('d-none');

        document.getElementById('receiptDonorName').textContent = donorName;
        document.getElementById('receiptAmount').textContent = formattedAmt;
        document.getElementById('receiptCause').textContent = causeName;
        document.getElementById('receiptTxnId').textContent = 'AF-' + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('receiptDate').textContent = new Date().toLocaleDateString(appState.lang === 'bn' ? 'bn-BD' : 'en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    });
  }

  // Reset modal on close
  modalEl.addEventListener('hidden.bs.modal', () => {
    const formStep = document.getElementById('donationFormStep');
    const receiptStep = document.getElementById('donationReceiptStep');
    if (formStep && receiptStep) {
      formStep.classList.remove('d-none');
      receiptStep.classList.add('d-none');
    }
  });
}

function openDonationModal() {
  const modalEl = document.getElementById('donationModal');
  if (!modalEl) return;

  const causeSelect = document.getElementById('modalCauseSelect');
  if (causeSelect) {
    causeSelect.value = appState.selectedCause;
  }

  const modalAmtInput = document.getElementById('modalDonationAmount');
  if (modalAmtInput) {
    modalAmtInput.value = appState.selectedAmount;
  }

  const modalCurrencySymbol = document.getElementById('modalCurrencySymbol');
  if (modalCurrencySymbol) {
    modalCurrencySymbol.textContent = impactData[appState.currency].symbol;
  }

  const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  bsModal.show();
}

/* -------------------------------------------------------------
 * 7. FORM SUBMISSIONS
 * ------------------------------------------------------------- */
function initForms() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(appState.lang === 'bn' 
        ? 'ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন।' 
        : 'Thank you! Your message has been sent successfully. Our team will contact you shortly.');
      contactForm.reset();
    });
  }

  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(appState.lang === 'bn' 
        ? 'অভিনন্দন! আলোয় ফাউন্ডেশনের স্বেচ্ছাসেবী পরিবারে আপনাকে স্বাগতম। আমরা ইমেইলে পরবর্তী নির্দেশনা পাঠাচ্ছি।' 
        : 'Congratulations! Welcome to the Aloy Foundation volunteer community. Details have been emailed to you.');
      const modal = bootstrap.Modal.getInstance(document.getElementById('volunteerModal'));
      if (modal) modal.hide();
      volunteerForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(appState.lang === 'bn' 
        ? 'আলোয় ফাউন্ডেশনের বুলেটিনে যুক্ত হওয়ার জন্য ধন্যবাদ!' 
        : 'Thank you for subscribing to the Aloy Foundation Bulletin!');
      newsletterForm.reset();
    });
  }
}

/* -------------------------------------------------------------
 * 8. ACTIVE NAV LINK DETECTION
 * ------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* -------------------------------------------------------------
 * 9. DYNAMIC YOUTUBE EMBED & INLINE VIDEO PLAYER
 * Automatically detects YouTube links, auto-fetches HQ thumbnails,
 * and plays video directly inside the card thumbnail spot (no modal!).
 * ------------------------------------------------------------- */
function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
  return match ? match[1] : null;
}

function initVideoPlayer() {
  const videoCards = document.querySelectorAll('.m-card.video');
  if (!videoCards.length) return;

  videoCards.forEach(card => {
    const rawUrl = card.getAttribute('href') || card.getAttribute('data-video-url');
    const videoId = extractYouTubeId(rawUrl);

    if (videoId) {
      // 1. Auto-set YouTube thumbnail if placeholder or default
      const img = card.querySelector('.m-media img');
      if (img) {
        if (!img.src || img.src.includes('YOUTUBE_ID') || img.src.includes('placeholder') || img.src === '') {
          img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          img.alt = card.querySelector('.m-title')?.textContent?.trim() || 'Video Thumbnail';
        }
      }

      // 2. Play video INLINE right inside the card (no modal popup)
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const media = card.querySelector('.m-media');
        if (!media) return;

        // If this video is already playing, do nothing
        if (media.querySelector('iframe')) return;

        // Stop any other currently playing video on the page
        document.querySelectorAll('.m-card.video.is-playing').forEach(activeCard => {
          if (activeCard !== card) {
            const activeMedia = activeCard.querySelector('.m-media');
            const origHtml = activeCard.getAttribute('data-original-media');
            if (activeMedia && origHtml) {
              activeMedia.innerHTML = origHtml;
              activeCard.classList.remove('is-playing');
            }
          }
        });

        // Save original thumbnail markup so we can restore if needed
        card.setAttribute('data-original-media', media.innerHTML);
        card.classList.add('is-playing');

        // Insert responsive inline YouTube iframe directly in the card
        media.innerHTML = `
          <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            style="width: 100%; height: 100%; position: absolute; inset: 0; border: none; z-index: 10;"
          ></iframe>
        `;
      });
    }
  });
}

// Copy to Clipboard utility for Donate Section
function copyDonateText(text, btnElement) {
  if (!text) return;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(err => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }

  if (btnElement) {
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '<i class="bi bi-check2"></i> <span style="font-size:0.75rem;">Copied!</span>';
    btnElement.classList.add('copied');
    setTimeout(() => {
      btnElement.innerHTML = originalContent;
      btnElement.classList.remove('copied');
    }, 1800);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (e) {
    console.error('Failed to copy', e);
  }
  document.body.removeChild(textarea);
}
