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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    }
  )

  revealElements.forEach(el => revealObserver.observe(el))
} else {
  revealElements.forEach(el => el.classList.add('revealed'))
}

// 2. Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('#mobile-menu-btn')
const mobileMenu = document.querySelector('#mobile-menu')

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })

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

export function showToast(title, desc) {
  if (!toast) return
  if (title) toastTitle.textContent = title
  if (desc) toastDesc.textContent = desc

  toast.classList.remove('translate-y-24', 'opacity-0')
  toast.classList.add('translate-y-0', 'opacity-100')

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100')
    toast.classList.add('translate-y-24', 'opacity-0')
  }, 4500)
}

// 4. Property Category Filter Tabs
const filterTabs = document.querySelectorAll('.filter-tab')
const plotCards = document.querySelectorAll('.plot-card')

export function setCategoryFilter(category) {
  filterTabs.forEach(t => {
    if (t.getAttribute('data-category') === category) {
      t.classList.add('active', 'bg-[#38261c]', 'text-[#faf6f0]', 'shadow-md')
      t.classList.remove('text-[#69503f]')
    } else {
      t.classList.remove('active', 'bg-[#38261c]', 'text-[#faf6f0]', 'shadow-md')
      t.classList.add('text-[#69503f]')
    }
  })

  plotCards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex'
      card.classList.add('revealed')
    } else {
      card.style.display = 'none'
    }
  })
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category')
    setCategoryFilter(category)
  })
})

// 5. Interactive ROI & Land Appreciation Calculator
const sizeSlider = document.querySelector('#calc-size-slider')
const sizeVal = document.querySelector('#calc-size-val')
const totalInitial = document.querySelector('#calc-total-initial')
const totalFuture = document.querySelector('#calc-total-future')
const calcRateLabel = document.querySelector('#calc-rate-label')
const calcGrowthPct = document.querySelector('#calc-growth-pct')
const tierButtons = document.querySelectorAll('.calc-tier-btn')

let currentRate = 2850
let currentCAGR = 18

function updateCalculator() {
  if (!sizeSlider) return
  const size = parseInt(sizeSlider.value, 10)
  if (sizeVal) sizeVal.textContent = `${size} Sq. Yd`

  const initialAmount = size * currentRate
  // Compound Growth over 5 years: A = P * (1 + r)^5
  const futureAmount = Math.round(initialAmount * Math.pow(1 + currentCAGR / 100, 5))
  const profitPercentage = Math.round(((futureAmount - initialAmount) / initialAmount) * 100)

  if (totalInitial) totalInitial.textContent = `₹${initialAmount.toLocaleString('en-IN')}`
  if (totalFuture) totalFuture.textContent = `₹${futureAmount.toLocaleString('en-IN')}`
  if (calcRateLabel) calcRateLabel.textContent = `@ ₹${currentRate.toLocaleString('en-IN')}/sq.yd`
  if (calcGrowthPct) calcGrowthPct.textContent = `+${profitPercentage}% Projected Gain`
}

if (sizeSlider) {
  sizeSlider.addEventListener('input', updateCalculator)
}

tierButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tierButtons.forEach(b => {
      b.classList.remove('active', 'border-[#dfa76a]', 'bg-[#8a5327]/30', 'text-[#dfa76a]')
      b.classList.add('border-[#4d3322]', 'bg-[#1d120a]/70', 'text-[#d5c3b1]')
    })
    btn.classList.add('active', 'border-[#dfa76a]', 'bg-[#8a5327]/30', 'text-[#dfa76a]')
    btn.classList.remove('border-[#4d3322]', 'bg-[#1d120a]/70', 'text-[#d5c3b1]')

    currentRate = parseInt(btn.getAttribute('data-rate'), 10)
    currentCAGR = parseInt(btn.getAttribute('data-cagr'), 10)
    updateCalculator()
  })
})

// Initialize calculator display
updateCalculator()

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

// Modal Form Submission
const modalForm = document.querySelector('#modal-form')
if (modalForm) {
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const plot = modalPlotInput ? modalPlotInput.value : 'Land Plot'
    if (enquiryModal) enquiryModal.classList.add('hidden')
    modalForm.reset()
    showToast('Inspection Booked!', `GPS layout map and RERA certificate for ${plot} sent to your phone.`)
  })
}

// Main Lead Enquiry Form Submission
const leadForm = document.querySelector('#lead-enquiry-form')
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault()
    leadForm.reset()
    showToast('Site Visit Scheduled!', 'Our senior land advisor will call within 15 minutes to confirm luxury cab pickup.')
  })
}

// 7. Hero Search Form: Filters and Smooth Scrolls to Plots Section
const heroSearchForm = document.querySelector('#hero-search-form')
if (heroSearchForm) {
  heroSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const locationSelect = document.querySelector('#hero-location-select')
    const typeSelect = document.querySelector('#hero-type-select')
    
    let targetCategory = 'all'
    if (locationSelect && locationSelect.value !== 'all') {
      targetCategory = locationSelect.value
    } else if (typeSelect && typeSelect.value !== 'all') {
      targetCategory = typeSelect.value
    }

    setCategoryFilter(targetCategory)

    const plotsSection = document.querySelector('#plots')
    if (plotsSection) {
      plotsSection.scrollIntoView({ behavior: 'smooth' })
    }
  })
}
