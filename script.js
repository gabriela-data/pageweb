document.addEventListener('DOMContentLoaded', () => {
    // 1. MENU TOGGLE (DESLIZAR)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Alterna ícone entre hambúrguer e X
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Fecha o menu ao clicar em um link para navegação suave
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }
    // 2. CARROSSEL MOVIMENTO (PASSA 1 CARD POR VEZ COM SLIDE)
    const movimentoGrid = document.querySelector('.cards-grid.movimento-grid');
    if (movimentoGrid) {
        const movimentoCards = movimentoGrid.children;
        let currentIndex = 0;
        const cardsPerPage = 3;
        const totalCards = movimentoCards.length;
        
        const showMovimentoCards = (startIndex) => {
            // Anima a saída e entrada dos cards com efeito slide
            Array.from(movimentoCards).forEach((card, index) => {
                if (index >= startIndex && index < startIndex + cardsPerPage) {
                    // Mostra cards visíveis
                    card.classList.remove('hidden');
                    card.offsetHeight; // Force reflow para disparar animação
                } else {
                    // Esconde cards que não estão visíveis
                    card.classList.add('hidden');
                }
            });
        };
        
        // Mostra primeiro grupo de cards
        showMovimentoCards(0);
        
        // Botões de navegação
        const btnPrev = document.querySelector('.movimento-btn-prev');
        const btnNext = document.querySelector('.movimento-btn-next');
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                showMovimentoCards(currentIndex);
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalCards;
                showMovimentoCards(currentIndex);
            });
        }
    }
    
    // CARROSSEL EQUIPE (SCROLL HORIZONTAL COM BOTÕES)
    const equipoCarousel = document.querySelector('.equipe-grid.equipe-carousel');
    if (equipoCarousel) {
        const equipoBtnPrev = document.querySelector('.equipe-btn-prev');
        const equipoBtnNext = document.querySelector('.equipe-btn-next');
        
        if (equipoBtnPrev && equipoBtnNext) {
            const scrollAmount = 280; // Largura do card + gap
            
            equipoBtnPrev.addEventListener('click', () => {
                equipoCarousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            equipoBtnNext.addEventListener('click', () => {
                equipoCarousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // CARROSSEL AUTOMÁTICO NETFLIX (SCROLL HORIZONTAL)
    const carrosselSelectors = ['.eventos-options.carousel-container', '.arte-options.carousel-container'];
    
    carrosselSelectors.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            const items = container.children;
            let currentIndex = 0;
            
            if (items.length > 0) {
                // Função para fazer scroll automático
                const autoScroll = () => {
                    // Calcula largura de um item + gap
                    const itemWidth = items[0].offsetWidth;
                    const gap = 20;
                    const scrollAmount = itemWidth + gap;
                    
                    // Scroll suave para o próximo item
                    container.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                    
                    currentIndex++;
                    
                    // Reset quando chegar ao fim
                    if (currentIndex >= items.length - 2) {
                        currentIndex = 0;
                        // Volta ao início com delay
                        setTimeout(() => {
                            container.scrollTo({
                                left: 0,
                                behavior: 'smooth'
                            });
                        }, 5000);
                    }
                };
                
                // Inicia o carrossel automático a cada 5 segundos
                setInterval(autoScroll, 5000);
            }
        }
    });
});

// 3. Efeito de Revelação ao Rolar (Scroll Reveal)
const observerOptions = {
    threshold: 0.15 // O elemento aparece quando 15% dele está visível
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Para de observar após revelar
        }
    });
}, observerOptions);

// Seleciona as seções e elementos que queremos animar
const elementsToReveal = document.querySelectorAll('.manifesto-grid, .povo-section, .equipe-grid, .pilar, .eventos-box');

elementsToReveal.forEach(el => {
    el.classList.add('reveal-hidden'); // Estado inicial oculto
    revealObserver.observe(el);
});

// 4. Efeito Parallax no Hero
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    const heroSection = document.querySelector('.hero');

    // Move o fundo em 50% da velocidade do scroll
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`;
    }
});
// 5. Botão CTA com Animação ao Passar o Mouse
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.classList.add('hovered');
    });

    ctaButton.addEventListener('mouseout', () => {
        ctaButton.classList.remove('hovered');
    });
}
