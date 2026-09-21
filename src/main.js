import './style.css'

// 1. Smooth Scroll Reveal Animation for Text, Cards & Images
const revealElements = document.querySelectorAll('.reveal-init')

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  )

  revealElements.forEach(el => revealObserver.observe(el))
} else {
  // Fallback if IntersectionObserver not supported
  revealElements.forEach(el => el.classList.add('revealed'))
}

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('#mobile-menu-btn')
const mobileMenu = document.querySelector('#mobile-menu')

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })

  // Close when clicking links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
    })
  })
}

// 3. Toast Notification System
const toast = document.querySelector('#toast-msg')
const toastTitle = document.querySelector('#toast-title')
const toastDesc = document.querySelector('#toast-desc')

function showToast(title, desc) {
  if (!toast) return
  if (title) toastTitle.textContent = title
  if (desc) toastDesc.textContent = desc

  toast.classList.remove('translate-y-24', 'opacity-0')
  toast.classList.add('translate-y-0', 'opacity-100')

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100')
    toast.classList.add('translate-y-24', 'opacity-0')
  }, 4000)
}

// 4. Property Category Filter Tabs with Warm Brown Theme
const filterTabs = document.querySelectorAll('.filter-tab')
const plotCards = document.querySelectorAll('.plot-card')

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => {
      t.classList.remove('active', 'bg-[#38261c]', 'text-[#faf6f0]', 'shadow-md')
      t.classList.add('text-[#69503f]')
    })
    tab.classList.add('active', 'bg-[#38261c]', 'text-[#faf6f0]', 'shadow-md')
    tab.classList.remove('text-[#69503f]')

    const category = tab.getAttribute('data-category')
    plotCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block'
        card.classList.add('revealed')
      } else {
        card.style.display = 'none'
      }
    })
  })
})

// 5. Interactive ROI & Land Appreciation Calculator
const sizeSlider = document.querySelector('#calc-size-slider')
const sizeVal = document.querySelector('#calc-size-val')
const totalInitial = document.querySelector('#calc-total-initial')
const totalFuture = document.querySelector('#calc-total-future')
const tierButtons = document.querySelectorAll('.calc-tier-btn')

let currentRate = 2850
let currentCAGR = 18

function updateCalculator() {
  if (!sizeSlider) return
  const size = parseInt(sizeSlider.value, 10)
  sizeVal.textContent = `${size} Sq. Yd`

  const initialAmount = size * currentRate
  // Compound Growth over 5 years
  const futureAmount = Math.round(initialAmount * Math.pow(1 + currentCAGR / 100, 5))

  totalInitial.textContent = `₹${initialAmount.toLocaleString('en-IN')}`
  totalFuture.textContent = `₹${futureAmount.toLocaleString('en-IN')}`
}

if (sizeSlider) {
  sizeSlider.addEventListener('input', updateCalculator)
}

tierButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tierButtons.forEach(b => {
      b.classList.remove('active', 'border-[#dfa76a]/60', 'bg-[#8a5327]/25', 'text-[#dfa76a]')
      b.classList.add('border-[#4d3322]', 'bg-[#1d120a]/70', 'text-[#d5c3b1]')
    })
    btn.classList.add('active', 'border-[#dfa76a]/60', 'bg-[#8a5327]/25', 'text-[#dfa76a]')
    btn.classList.remove('border-[#4d3322]', 'bg-[#1d120a]/70', 'text-[#d5c3b1]')

    currentRate = parseInt(btn.getAttribute('data-rate'), 10)
    currentCAGR = parseInt(btn.getAttribute('data-cagr'), 10)
    updateCalculator()
  })
})

// 6. Enquiry Modal & Form Handling
const enquiryModal = document.querySelector('#enquiry-modal')
const modalTitle = document.querySelector('#modal-title')
const modalPlotInput = document.querySelector('#modal-plot-input')
const closeEnquiryModal = document.querySelector('#close-enquiry-modal')
const openModalButtons = document.querySelectorAll('.open-enquiry-modal')

openModalButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const plotName = btn.getAttribute('data-plot') || 'Exclusive Land Inquiry'
    if (modalTitle) modalTitle.textContent = plotName
    if (modalPlotInput) modalPlotInput.value = plotName
    if (enquiryModal) enquiryModal.classList.remove('hidden')
  })
})

if (closeEnquiryModal && enquiryModal) {
  closeEnquiryModal.addEventListener('click', () => {
    enquiryModal.classList.add('hidden')
  })
  enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) enquiryModal.classList.add('hidden')
  })
}

// Form submissions
const modalForm = document.querySelector('#modal-form')
if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    enquiryModal.classList.add('hidden')
    modalForm.reset()
    showToast('Inspection Booked', 'Brochure & GPS layout map sent to your phone.')
  })
}

const leadForm = document.querySelector('#lead-enquiry-form')
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault()
    leadForm.reset()
    showToast('Site Visit Scheduled', 'Our advisor will call to coordinate luxury cab pickup.')
  })
}

const heroSearchForm = document.querySelector('#hero-search-form')
if (heroSearchForm) {
  heroSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const plotsSection = document.querySelector('#plots')
    if (plotsSection) {
      plotsSection.scrollIntoView({ behavior: 'smooth' })
    }
  })
}
