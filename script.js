/**
 * Plataforma Livre Nação Yuxibu – Script principal
 * Organizado em funções puras para facilitar manutenção.
 * Dependência: Swiper (carregado via CDN)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------
  // 1. Menu de navegação (hambúrguer)
  // ------------------------------------------------------------
  function configurarMenuNavegacao() {
    const botaoMenu = document.querySelector('.botao-menu');
    const linksNavegacao = document.querySelector('.links-navegacao');

    if (!botaoMenu || !linksNavegacao) return;

    const alternarMenu = (abrir) => {
      linksNavegacao.classList.toggle('ativo', abrir);
      botaoMenu.textContent = abrir ? '✕' : '☰';
      botaoMenu.setAttribute('aria-expanded', String(abrir));
      botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    };

    alternarMenu(false);

    botaoMenu.addEventListener('click', () => {
      const estaAberto = !linksNavegacao.classList.contains('ativo');
      alternarMenu(estaAberto);
    });

    linksNavegacao.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => alternarMenu(false));
    });
  }

  // ------------------------------------------------------------
  // 2. Carrossel de cards do movimento (scroll horizontal)
  // ------------------------------------------------------------
  function configurarCarrosselMovimento() {
    const grade = document.getElementById('gradeMovimento');
    const botaoAnterior = document.querySelector('.botao-movimento-anterior');
    const botaoProximo = document.querySelector('.botao-movimento-proximo');
    const paginacao = document.getElementById('paginacaoMovimento');
    const cards = Array.from(document.querySelectorAll('.card-movimento'));

    if (!grade || !botaoAnterior || !botaoProximo || !paginacao || cards.length === 0) return;

    const obterPasso = () => {
      if (cards.length < 2) return cards[0].offsetWidth;
      return cards[1].offsetLeft - cards[0].offsetLeft;
    };

    // Cria bolinhas de paginação
    cards.forEach((card, indice) => {
      const bolinha = document.createElement('button');
      bolinha.type = 'button';
      bolinha.classList.add('bolinha');
      bolinha.setAttribute('aria-label', `Ir para o card ${indice + 1}`);
      bolinha.addEventListener('click', () => {
        grade.scrollTo({ left: card.offsetLeft - grade.offsetLeft, behavior: 'smooth' });
      });
      paginacao.appendChild(bolinha);
    });

    const atualizarPaginacao = () => {
      const passo = obterPasso();
      const indice = Math.round(grade.scrollLeft / passo);
      paginacao.querySelectorAll('.bolinha').forEach((bolinha, i) => {
        bolinha.classList.toggle('ativa', i === indice);
      });
    };

    if (paginacao.firstElementChild) paginacao.firstElementChild.classList.add('ativa');
    grade.addEventListener('scroll', atualizarPaginacao);

    botaoProximo.addEventListener('click', () => grade.scrollBy({ left: obterPasso(), behavior: 'smooth' }));
    botaoAnterior.addEventListener('click', () => grade.scrollBy({ left: -obterPasso(), behavior: 'smooth' }));
  }

  // ------------------------------------------------------------
  // 3. Cards com efeito flip (movimento)
  // ------------------------------------------------------------
  function configurarFlipCardsMovimento() {
    const cards = document.querySelectorAll('.card-movimento');
    if (cards.length === 0) return;

    const sincronizarBotao = (card, deveVirar) => {
      const botao = card.querySelector('.botao-alternar-card');
      if (!botao) return;
      card.classList.toggle('virado', deveVirar);
      botao.textContent = deveVirar ? 'Mostrar menos' : 'Saiba mais';
      botao.setAttribute('aria-expanded', String(deveVirar));
    };

    cards.forEach(card => sincronizarBotao(card, false));

    document.querySelectorAll('.botao-alternar-card').forEach(botao => {
      botao.addEventListener('click', () => {
        const card = botao.closest('.card-movimento');
        if (!card) return;
        const deveVirar = !card.classList.contains('virado');

        cards.forEach(outro => { if (outro !== card) sincronizarBotao(outro, false); });
        sincronizarBotao(card, deveVirar);
      });
    });
  }

  // ------------------------------------------------------------
  // 4. Pilares da plataforma (flip individual)
  // ------------------------------------------------------------
  function configurarFlipPilares() {
    const pilares = document.querySelectorAll('.pilar');
    if (pilares.length === 0) return;

    const sincronizarBotao = (pilar, deveVirar) => {
      const botao = pilar.querySelector('.botao-alternar-pilar');
      if (!botao) return;
      pilar.classList.toggle('virado', deveVirar);
      botao.textContent = deveVirar ? 'Mostrar menos' : 'Saiba mais';
      botao.setAttribute('aria-expanded', String(deveVirar));
    };

    pilares.forEach(pilar => sincronizarBotao(pilar, false));

    document.querySelectorAll('.botao-alternar-pilar').forEach(botao => {
      botao.addEventListener('click', () => {
        const pilar = botao.closest('.pilar');
        if (!pilar) return;
        const deveVirar = !pilar.classList.contains('virado');

        pilares.forEach(outro => { if (outro !== pilar) sincronizarBotao(outro, false); });
        sincronizarBotao(pilar, deveVirar);
      });
    });
  }

  // ------------------------------------------------------------
  // 5. Equipe – Carrossel + Detalhe
  // ------------------------------------------------------------
  function configurarSecaoEquipe() {
    const container = document.getElementById('listaMembrosEquipe');
    const cardDetalhe = document.getElementById('cardDetalheEquipe');
    const imgDetalhe = document.getElementById('imagemDetalheEquipe');
    const categoriaDetalhe = document.getElementById('categoriaDetalheEquipe');
    const nomeDetalhe = document.getElementById('nomeDetalheEquipe');
    const cargoDetalhe = document.getElementById('cargoDetalheEquipe');
    const textoDetalhe = document.getElementById('textoDetalheEquipe');

    // Base de dados dos membros (facilmente editável)
    const membros = [
      { nome: 'Allan Thales', cargo: 'Analista de TI', descricao: 'Perfil em atualização pela equipe.', foto: './Membros/Allan.jpeg' },
      { nome: 'Aurélio Heckert', cargo: 'Programador', descricao: 'Perfil em atualização pela equipe.', foto: './Membros/Aurelio.jpeg' },
      { nome: 'Caio Almeida', cargo: 'Engenheiro de software', descricao: 'Perfil em atualização pela equipe.', foto: './Membros/Caio.jpeg' },
      { nome: 'Débora Abdalla', cargo: 'Coordenação Geral', descricao: 'Professora Doutora Titular do Departamento de Computação Interdisciplinar da UFBA.', foto: './Membros/Debora.jpeg' },
      { nome: 'Diego Zabot', cargo: 'Pesquisador IHC', descricao: 'Professor Doutor - UFBA', foto: './Membros/Diego.jpeg' },
      { nome: 'Emily Mendes', cargo: 'Psicóloga', descricao: 'Psicóloga (CRP 03/29752). Atua no cuidado ético.', foto: './Membros/Emily.jpg' },
      { nome: 'Gabriela Almeida', cargo: 'Bolsista de extensão', descricao: 'Pesquisadora do grupo Onda Digital.', foto: './Membros/Gabriela.jpeg' },
      { nome: 'Ise Prazeres', cargo: 'Designer gráfico', descricao: 'Designer e profissional de marketing.', foto: './Membros/IsePrazeres.jpeg' },
      { nome: 'Leonardo César', cargo: 'Desenvolvedor', descricao: 'Desenvolvedor da Plataforma Livre Nação Yuxibu.', foto: './Membros/Cesar.png' },
      { nome: 'Pedro Tupinambá', cargo: 'Bolsista de extensão', descricao: 'Pesquisador do Onda Digital.', foto: './Membros/Pedro.jpeg' },
      { nome: 'Solon', cargo: 'Indigenista', descricao: 'Coordenador da comunicação.', foto: './Membros/Solon.PNG' },
      { nome: 'Thiago Magalhães', cargo: 'Advogado', descricao: 'OAB/BA 40748. Pesquisador da plataforma.', foto: './Membros/Thiago.jpeg' },
      { nome: 'Túlio Augustos', cargo: 'Bolsista de extensão', descricao: 'Analista de sistema e pesquisador em Codesign.', foto: './Membros/Tulio.jpeg' },
      { nome: 'Valeria Rosa', cargo: 'Pesquisadora IHC', descricao: 'Professora Doutora da UESB.', foto: './Membros/valeria.jpeg' }
    ];

    // Renderiza slides dinamicamente
    if (container) {
      container.innerHTML = membros.map(membro => `
        <div class="swiper-slide slide-equipe">
          <article class="card-foto-equipe" data-nome="${membro.nome}" data-cargo="${membro.cargo}" data-descricao="${membro.descricao}" data-foto="${membro.foto}">
            <img src="${membro.foto}" alt="${membro.nome}" loading="lazy">
            <button class="botao-mais-equipe" type="button" aria-label="Saiba mais sobre ${membro.nome}">+</button>
          </article>
        </div>
      `).join('');
    }

    // Swiper da equipe
    if (document.querySelector('.carrossel-equipe')) {
      new Swiper('.carrossel-equipe', {
        slidesPerView: 1.9,
        spaceBetween: 12,
        speed: 900,
        loop: true,
        grabCursor: true,
        autoplay: { delay: 2600, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: '.paginacao-equipe', clickable: true },
        breakpoints: {
          360: { slidesPerView: 2.2, spaceBetween: 12 },
          480: { slidesPerView: 2.8, spaceBetween: 14 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 18 },
          1280: { slidesPerView: 6, spaceBetween: 18 }
        }
      });
    }

    // Evento dos botões "+"
    document.querySelectorAll('.botao-mais-equipe').forEach(botao => {
      botao.addEventListener('click', () => {
        const card = botao.closest('.card-foto-equipe');
        if (!card || !cardDetalhe) return;

        // Destaca o card ativo
        document.querySelectorAll('.card-foto-equipe').forEach(c => c.classList.remove('ativo'));
        card.classList.add('ativo');

        cardDetalhe.classList.remove('vazio');
        categoriaDetalhe.textContent = 'Equipe Nação Yuxibu';
        nomeDetalhe.textContent = card.dataset.nome || 'Integrante';
        cargoDetalhe.textContent = card.dataset.cargo || 'Colaborador(a)';
        textoDetalhe.textContent = card.dataset.descricao || 'Perfil em atualização.';
        imgDetalhe.src = card.dataset.foto || './Fotos/nacao-yuxibu.png';
        imgDetalhe.alt = card.dataset.nome || 'Integrante';

        if (window.innerWidth <= 768) {
          cardDetalhe.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // ------------------------------------------------------------
  // 6. Animação de revelação ao rolar a página
  // ------------------------------------------------------------
  function configurarAnimacoesRevelacao() {
    const elementos = document.querySelectorAll('.revelar');
    if (elementos.length === 0) return;

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelado');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementos.forEach(el => observador.observe(el));
  }

  // ------------------------------------------------------------
  // 7. Efeito parallax no hero
  // ------------------------------------------------------------
  function configurarParallaxHero() {
    const hero = document.querySelector('.secao-hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
      hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
    });
  }

  // ------------------------------------------------------------
  // Inicialização de todos os módulos
  // ------------------------------------------------------------
  function iniciar() {
    configurarMenuNavegacao();
    configurarCarrosselMovimento();
    configurarFlipCardsMovimento();
    configurarFlipPilares();
    configurarSecaoEquipe();
    configurarAnimacoesRevelacao();
    configurarParallaxHero();

    // Swiper do povo (simples, sem lógica complexa)
    if (document.querySelector('.carrossel-povo')) {
      new Swiper('.carrossel-povo', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        on: { slideChange: () => document.querySelectorAll('video').forEach(v => v.pause()) }
      });
    }
  }

  iniciar();
});