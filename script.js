// Complete Dataset with HD Unsplash Pictures for every item
const menuData = [
  {
    id: 'sub-01',
    name: 'Italian B.M.T.® Footlong',
    category: 'Footlong Subs',
    price: '$9.49',
    calories: '720 Cal',
    description: 'An Italian classic packed with Genoa salami, spicy pepperoni, and Black Forest ham on freshly baked bread.',
    dietary: 'Signature Cured Meats',
    popular: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-02',
    name: 'Oven Roasted Turkey Breast',
    category: 'Footlong Subs',
    price: '$8.99',
    calories: '560 Cal',
    description: 'Lean sliced oven-roasted turkey breast topped with crisp veggies on your favorite freshly baked sub bread.',
    dietary: 'Fresh Fit Choice',
    popular: true,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-03',
    name: 'Philly Steak & Cheese',
    category: 'Footlong Subs',
    price: '$10.25',
    calories: '760 Cal',
    description: 'Mouthwatering shaved steak melted with American cheese, green peppers, and red onions served hot.',
    dietary: 'Warm & Toasted',
    popular: true,
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-04',
    name: 'Meatball Marinara (6-Inch)',
    category: '6-Inch Subs',
    price: '$6.49',
    calories: '480 Cal',
    description: 'Italian-style meatballs drenched in rich marinara sauce, sprinkled with Parmesan cheese and toasted.',
    dietary: 'Classic Warm Sub',
    popular: false,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-05',
    name: 'Chipotle Chicken Wrap',
    category: 'Wraps & Bowls',
    price: '$9.15',
    calories: '670 Cal',
    description: 'Grilled chicken, Chipotle Southwest sauce, shredded cheddar, lettuce, and tomatoes wrapped in a soft wrap.',
    dietary: 'Spicy & Flavorful',
    popular: false,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-06',
    name: 'Veggie Delite® Protein Bowl',
    category: 'Wraps & Bowls',
    price: '$8.45',
    calories: '140 Cal',
    description: 'A crisp bed of lettuce loaded with spinach, cucumbers, green peppers, tomatoes, and red onions with zero bread.',
    dietary: 'Vegetarian & Low-Carb',
    popular: false,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-07',
    name: 'Chocolate Chip Cookies (3 Pack)',
    category: 'Sides & Cookies',
    price: '$2.99',
    calories: '630 Cal',
    description: 'Subway iconic soft-baked cookies filled with rich semi-sweet chocolate chips.',
    dietary: 'Baked Fresh Daily',
    popular: true,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sub-08',
    name: 'Fountain Drink (21 oz)',
    category: 'Drinks',
    price: '$2.49',
    calories: '0 - 240 Cal',
    description: 'Cold ice fountain beverage choice including Coca-Cola, Sprite, Zero Sugar, or Iced Tea.',
    dietary: 'Ice-Cold Refreshment',
    popular: false,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
  }
];

const categories = ['All', 'Footlong Subs', '6-Inch Subs', 'Wraps & Bowls', 'Sides & Cookies', 'Drinks'];

let currentCategory = 'All';
let searchQuery = '';

const productGrid = document.getElementById('productGrid');
const popularGrid = document.getElementById('popularGrid');
const categoryContainer = document.getElementById('categoryContainer');
const menuSearch = document.getElementById('menuSearch');
const clearSearchBtn = document.getElementById('clearSearch');
const resultsInfo = document.getElementById('resultsInfo');
const resultsCount = document.getElementById('resultsCount');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const emptyState = document.getElementById('emptyState');
const emptyResetBtn = document.getElementById('emptyResetBtn');

// Modal Elements
const productModal = document.getElementById('productModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImg = document.getElementById('modalImg');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalCalories = document.getElementById('modalCalories');
const modalDesc = document.getElementById('modalDesc');
const modalDietary = document.getElementById('modalDietary');

// Navigation Elements
const header = document.getElementById('header');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const closeDrawerBtn = document.getElementById('closeDrawer');
const backToTopBtn = document.getElementById('backToTop');
const searchToggleBtn = document.getElementById('searchToggle');

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  renderPopularProducts();
  setupEventListeners();
});

function renderCategories() {
  categoryContainer.innerHTML = categories.map(cat => `
    <button class="cat-pill ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');
}

function renderProducts() {
  const filtered = menuData.filter(item => {
    const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (searchQuery !== '' || currentCategory !== 'All') {
    resultsInfo.classList.remove('hidden');
    resultsCount.textContent = `Showing ${filtered.length} item(s)`;
  } else {
    resultsInfo.classList.add('hidden');
  }

  if (filtered.length === 0) {
    productGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
  } else {
    productGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    productGrid.innerHTML = filtered.map(item => `
      <div class="product-card">
        <div class="card-img-wrapper">
          ${item.popular ? `<span class="badge-popular">Popular</span>` : ''}
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>${item.category}</span>
            <span>${item.calories}</span>
          </div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <div class="card-footer">
            <span class="card-price">${item.price}</span>
            <button class="btn-card" onclick="openProductModal('${item.id}')">View Details</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function renderPopularProducts() {
  const popularItems = menuData.filter(item => item.popular).slice(0, 3);
  popularGrid.innerHTML = popularItems.map(item => `
    <div class="product-card">
      <div class="card-img-wrapper">
        <span class="badge-popular">Top Order</span>
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span>${item.category}</span>
          <span>${item.calories}</span>
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer">
          <span class="card-price">${item.price}</span>
          <button class="btn-card" onclick="openProductModal('${item.id}')">View Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

window.openProductModal = function(id) {
  const item = menuData.find(p => p.id === id);
  if (!item) return;

  modalImg.src = item.image;
  modalImg.alt = item.name;
  modalCategory.textContent = item.category;
  modalTitle.textContent = item.name;
  modalPrice.textContent = item.price;
  modalCalories.textContent = item.calories;
  modalDesc.textContent = item.description;
  modalDietary.textContent = item.dietary;

  productModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  productModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

function setupEventListeners() {
  categoryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-pill')) {
      currentCategory = e.target.dataset.category;
      renderCategories();
      renderProducts();
    }
  });

  menuSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    clearSearchBtn.classList.toggle('hidden', searchQuery === '');
    renderProducts();
  });

  clearSearchBtn.addEventListener('click', () => {
    menuSearch.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    renderProducts();
  });

  const resetAll = () => {
    currentCategory = 'All';
    searchQuery = '';
    menuSearch.value = '';
    clearSearchBtn.classList.add('hidden');
    renderCategories();
    renderProducts();
  };

  resetFilterBtn.addEventListener('click', resetAll);
  emptyResetBtn.addEventListener('click', resetAll);

  modalCloseBtn.addEventListener('click', closeModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !productModal.classList.contains('hidden')) closeModal();
  });

  const toggleDrawer = (open) => {
    mobileDrawer.classList.toggle('open', open);
    drawerOverlay.classList.toggle('open', open);
  };

  hamburgerBtn.addEventListener('click', () => toggleDrawer(true));
  closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
  drawerOverlay.addEventListener('click', () => toggleDrawer(false));

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  searchToggleBtn.addEventListener('click', () => {
    document.getElementById('menu-catalog').scrollIntoView({ behavior: 'smooth' });
    menuSearch.focus();
  });

  // Accordion Toggle
  document.querySelectorAll('.accordion-header').forEach(headerBtn => {
    headerBtn.addEventListener('click', () => {
      const item = headerBtn.parentElement;
      const isOpen = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.acc-icon').textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('active');
        headerBtn.querySelector('.acc-icon').textContent = '−';
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}