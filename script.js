document.addEventListener('DOMContentLoaded', () => {

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navMenu = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item a');
    const activeLine = document.createElement('span');
    activeLine.classList.add('active-line');
    document.querySelector('.navbar-nav').appendChild(activeLine);

    function positionActiveLine() {
        const activeLink = document.querySelector('.navbar-nav .nav-item.active a');
        if (activeLink && window.innerWidth >= 900) {
            activeLine.style.width = activeLink.offsetWidth + 'px';
            activeLine.style.left = activeLink.offsetLeft + 'px';
            activeLine.style.opacity = 1;
        } else {
            activeLine.style.opacity = 0;
        }
    }

    if (navbarToggler && navMenu) {
        navbarToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navbarToggler.setAttribute('aria-expanded', isExpanded);
            navbarToggler.innerHTML = isExpanded ? '×' : '☰';
        });
    }

    // --- LÓGICA DO INTERSECTION OBSERVER (APENAS PARA NAVBAR) ---
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% da seção precisa estar visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ATIVA O LINK DA NAVBAR
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.closest('.nav-item').classList.remove('active');
                    if (link.getAttribute('href').endsWith(currentSectionId)) {
                        link.closest('.nav-item').classList.add('active');
                        positionActiveLine(); // Atualiza a "barrinha"
                    }
                });
            }
        });
    }, observerOptions);

    // Observa todas as seções
    sections.forEach(section => {
        observer.observe(section);
    });

    // Posição inicial da linha (no 'Home')
    setTimeout(() => {
        const homeLink = document.querySelector('.navbar-nav .nav-item a[href="#home-section"]');
        if (homeLink) {
            homeLink.closest('.nav-item').classList.add('active');
            positionActiveLine();
        }
    }, 100);

    // Reposiciona a linha ao redimensionar a janela
    window.addEventListener('resize', () => {
        positionActiveLine();
        if (window.innerWidth >= 900 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navbarToggler.setAttribute('aria-expanded', false);
            navbarToggler.innerHTML = '☰';
        }
    });

    // --- Lógica da Galeria de Artesanatos ---
    const galleryItems = [
        { src: 'img/artesanato1.jpg', alt: 'Cesta de palha artesanal', title: 'Cesta de Palha', description: 'Cesta tecida à mão com fibras naturais, ideal para decoração ou uso diário.' },
        { src: 'img/artesanato2.jpg', alt: 'Escultura de madeira rústica', title: 'Escultura em Madeira', description: 'Obra de arte entalhada em madeira rústica, representando a fauna local.' },
        { src: 'img/artesanato3.jpg', alt: 'Cerâmica pintada à mão', title: 'Vaso de Cerâmica', description: 'Vaso de cerâmica com pintura manual, um toque de arte para seu lar.' },
        { src: 'img/artesanato4.jpg', alt: 'Bolsa de tecido bordada', title: 'Bolsa Artesanal', description: 'Bolsa exclusiva com bordados feitos à mão, unindo tradição e estilo.' }
    ];

    const galleryContainer = document.querySelector('.artesanatos-gallery');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-button');

    if (galleryContainer) {
        galleryItems.forEach((item) => {
            const galleryItemDiv = document.createElement('div');
            galleryItemDiv.classList.add('gallery-item');
            galleryItemDiv.innerHTML = `<img src="${item.src}" alt="${item.alt}"><h3>${item.title}</h3>`;
            
            galleryItemDiv.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = item.src;
                modalTitle.textContent = item.title;
                modalDescription.textContent = item.description;
            });
            galleryContainer.appendChild(galleryItemDiv);
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

});
