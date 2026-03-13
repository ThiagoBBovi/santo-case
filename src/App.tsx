import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import "./App.css";
import whatsappIcon from "./assets/icons/whatsapp.svg";
import santoCaseLogo from "./assets/icons/Logo_Santo_Case_vetorizado.svg";
import arrowLeftIcon from "./assets/icons/arrow-left.svg";
import arrowRightIcon from "./assets/icons/arrow-right.svg";
import menuHamburgerIcon from "./assets/icons/menu-hamburger.svg";
import closeIcon from "./assets/icons/close.svg";
import instagramFooterIcon from "./assets/icons/instagram-footer.svg";
import facebookFooterIcon from "./assets/icons/facebook-footer.svg";
import whatsappFooterIcon from "./assets/icons/whatsapp-footer.svg";
import heroImage from "./assets/images/image-hero.webp";
import productTestImage from "./assets/images/imagem-teste.jpeg";

const products = [
  {
    name: "Capinhas Premium",
    description: "Modelos para proteção e estilo no dia a dia.",
    tag: "Mais procuradas",
  },
  {
    name: "Películas de Vidro",
    description: "Proteção para tela com ótima transparência.",
    tag: "Proteção",
  },
  {
    name: "Carregadores e Cabos",
    description: "Acessórios de energia para vários modelos.",
    tag: "Acessórios",
  },
  {
    name: "Fones e Áudio Bluetooth",
    description: "Fones, caixas de som e opções sem fio para sua rotina.",
    tag: "Tecnologia",
  },
  {
    name: "Smartwatches e Gadgets",
    description:
      "Relógios inteligentes e itens de tecnologia para o dia a dia.",
    tag: "Novidades",
  },
];

const whatsappLink =
  "https://wa.me/5554999574767?text=Olá!%20Vim%20pelo%20site%20da%20Santo%20Case%20e%20quero%20mais%20informações.";

const businessName =
  "Assistência Técnica e Acessórios Celulares - Santo Case Caxias";

const storeInfo = {
  phoneDisplay: "(54) 99957-4767",
  phoneHref: "tel:+5554999574767",
  city: "Caxias do Sul - RS",
  address:
    "Rua Luiz Michielon, 2201 - sala 101 - Nossa Sra. de Lourdes, Caxias do Sul - RS, 95074-001",
  hours: [
    {
      label: "Segunda-feira",
      value: "09:00–11:45, 13:30–18:30",
    },
    {
      label: "Terça-feira",
      value: "09:00–11:45, 13:30–18:30",
    },
    {
      label: "Quarta-feira",
      value: "09:00–11:45, 13:30–18:30",
    },
    {
      label: "Quinta-feira",
      value: "09:00–11:45, 13:30–18:30",
    },
    {
      label: "Sexta-feira",
      value: "09:00–11:45, 13:30–18:30",
    },
    {
      label: "Sábado",
      value: "09:00–13:00",
    },
    {
      label: "Domingo",
      value: "Fechado",
    },
  ],
  mapSrc:
    "https://www.google.com/maps?q=Rua%20Luiz%20Michielon%2C%202201%20-%20sala%20101%20-%20Nossa%20Sra.%20de%20Lourdes%2C%20Caxias%20do%20Sul%20-%20RS%2C%2095074-001&output=embed",
};

const reviews = [
  {
    text: "Atendimento muito bom, deu bastante atenção pro meu problema e resolveu. Recomendo!",
    author: "Tarcisio K Savariz",
  },
  {
    text: "Atendimento ótimo, muito prestativos. Boa variedade de produtos. Super recomendo.",
    author: "Maira Tonetta",
  },
  {
    text: "Ótimo atendimento, produtos e serviços de alto padrão, indico e recomendo!",
    author: "Thiago Felipe Osmainchi",
  },
  {
    text: "Lugar excepcional, ótimo atendimento e ótimos serviços.",
    author: "Igor Roveda",
  },
];

const googleReviewsLink =
  "https://www.google.com/search?q=santo+case&oq=santo+case&gs_lcrp=EgRlZGdlKgkIABBFGDsYgAQyCQgAEEUYOxiABDIKCAEQABixAxiABDIGCAIQRRg7MgcIAxAAGIAEMgcIBBAAGIAEMgcIBRAAGIAEMgYIBhBFGDwyBggHEEUYPDIGCAgQRRg90gEIMTI1NWowajGoAgCwAgE&sourceid=chrome&ie=UTF-8#lrd=0x951c1fa23afdb7b3:0x94c12daf8775d6c,1,,,,";

function App() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchMoveX = useRef<number | null>(null);
  const resumeTimeout = useRef<number | null>(null);

  const prevProduct = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  }, []);

  const nextProduct = useCallback(() => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  }, []);

  const scheduleAutoPlayResume = useCallback(() => {
    if (resumeTimeout.current) {
      window.clearTimeout(resumeTimeout.current);
    }
    resumeTimeout.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    if (resumeTimeout.current) {
      window.clearTimeout(resumeTimeout.current);
    }
    touchStartX.current = event.touches[0].clientX;
    touchMoveX.current = null;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    touchMoveX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchMoveX.current === null) {
      scheduleAutoPlayResume();
      return;
    }

    const delta = touchStartX.current - touchMoveX.current;
    const threshold = 35;

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        nextProduct();
      } else {
        prevProduct();
      }
    }

    touchStartX.current = null;
    touchMoveX.current = null;
    scheduleAutoPlayResume();
  }, [nextProduct, prevProduct, scheduleAutoPlayResume]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (!isPaused) {
        nextProduct();
      }
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused, nextProduct]);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) {
        window.clearTimeout(resumeTimeout.current);
      }
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container header-content">
          <a
            className="brand"
            href="#inicio"
            aria-label={`${businessName} - Página inicial`}
          >
            <img
              className="brand-logo"
              src={santoCaseLogo}
              alt={`Logo da ${businessName}`}
              width={160}
              height={48}
            />
          </a>

          <nav
            id="menu-principal"
            className={`header-nav ${isMenuOpen ? "is-open" : ""}`}
            aria-label="Navegação principal"
          >
            <a href="#inicio" onClick={closeMenu}>
              Início
            </a>
            <a href="#servicos" onClick={closeMenu}>
              Serviços
            </a>
            <a href="#avaliacoes" onClick={closeMenu}>
              Avaliações
            </a>
            <a href="#produtos" onClick={closeMenu}>
              Produtos
            </a>
            <a href="#sobre" onClick={closeMenu}>
              Sobre
            </a>
            <a href="#localizacao" onClick={closeMenu}>
              Localização
            </a>
          </nav>

          <a
            className="cta-button header-cta"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-principal"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <img
              src={isMenuOpen ? closeIcon : menuHamburgerIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-text">
              <h1>Assistência técnica e acessórios para celulares em Caxias do Sul</h1>
              <p>
                Especialistas em iPhone, Samsung, Motorola e Xiaomi, com troca
                de tela, bateria, conector de carga e outros reparos com
                garantia. Também temos películas, capas, carregadores, fones e
                outros acessórios para o seu dia a dia.
              </p>
              <a
                className="cta-button"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Falar agora
              </a>
            </div>
            <div className="hero-image">
              <img
                src={heroImage}
                alt="Assistência técnica e acessórios na Santo Case em Caxias do Sul"
                width={900}
                height={600}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="services section" id="servicos">
          <div className="container">
            <h2>Assistência Técnica</h2>
            <p className="section-description">
              Diagnóstico rápido, peças de qualidade e atendimento direto em
              Caxias do Sul.
            </p>

            <div className="services-grid">
              <div className="video-wrapper">
                {/* Quando o vídeo estiver pronto, substitua o .video-placeholder abaixo.
                    Opção 1 — MP4 local (coloque o arquivo em /public):
                    <video controls poster="/video-poster.webp" preload="none">
                      <source src="/assistencia-tecnica.mp4" type="video/mp4" />
                    </video>
                    Opção 2 — YouTube embed (troque SEU_VIDEO_ID):
                    <iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                      title="Assistência técnica Santo Case"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                */}
                <div className="video-placeholder">
                  <div className="video-play-btn" aria-hidden="true" />
                  <p>Vídeo em breve</p>
                  <span>Assistência técnica em ação</span>
                </div>
              </div>

              <div className="services-details">
                <ul className="services-list">
                  <li>Troca de tela</li>
                  <li>Troca de bateria</li>
                  <li>Reparo de conector de carga</li>
                  <li>Reparo de placa</li>
                  <li>Desoxidação</li>
                  <li>Atendimento com garantia</li>
                </ul>
                <a
                  className="cta-button"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Solicitar assistência
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews section" id="avaliacoes">
          <div className="container">
            <h2>Avaliações de clientes</h2>
            <p className="section-description">
              O que nossos clientes de Caxias do Sul falam sobre a assistência
              técnica e o atendimento da Santo Case.
            </p>

            <div className="reviews-grid">
              {reviews.map((review) => (
                <article key={review.author} className="review-card">
                  <p className="review-stars" aria-label="Avaliação cinco estrelas">
                    ★★★★★
                  </p>
                  <p className="review-text">“{review.text}”</p>
                  <p className="review-author">— {review.author}</p>
                </article>
              ))}
            </div>

            <a
              className="cta-button reviews-cta"
              href={googleReviewsLink}
              target="_blank"
              rel="noreferrer"
            >
              Ver mais avaliações no Google
            </a>
          </div>
        </section>

        <section className="products section" id="produtos">
          <div className="container">
            <h2>Acessórios e tecnologia</h2>
            <p className="section-description">
              Conheça alguns itens que você encontra na Santo Case.
            </p>

            <div
              className="carousel"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <button
                className="carousel-control carousel-control--prev"
                onClick={prevProduct}
                aria-label="Produto anterior"
              >
                <img src={arrowLeftIcon} alt="" aria-hidden="true" />
              </button>

              <article className="product-card" key={products[current].name}>
                <div className="product-content">
                  <span className="product-tag">{products[current].tag}</span>
                  <h3>{products[current].name}</h3>
                  <p>{products[current].description}</p>
                </div>
                <div className="product-placeholder">
                  <img
                    src={productTestImage}
                    alt={`Imagem de ${products[current].name}`}
                    width={800}
                    height={800}
                    loading="lazy"
                  />
                </div>
              </article>

              <button
                className="carousel-control carousel-control--next"
                onClick={nextProduct}
                aria-label="Próximo produto"
              >
                <img src={arrowRightIcon} alt="" aria-hidden="true" />
              </button>
            </div>

            <div className="carousel-dots" aria-hidden="true">
              {products.map((_, index) => (
                <span
                  key={index}
                  className={index === current ? "dot active" : "dot"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="about section" id="sobre">
          <div className="container about-grid">
            <div>
              <h2>Sobre a Santo Case</h2>
              <p>
                A Santo Case é especializada em assistência técnica e acessórios
                para celulares em Caxias do Sul. Atendemos com rapidez,
                utilizamos peças de qualidade e mantemos um relacionamento
                próximo com cada cliente.
              </p>
            </div>
            <ul>
              <li>Assistência técnica especializada</li>
              <li>Atendimento direto e rápido</li>
              <li>Grande variedade de acessórios e tecnologia</li>
              <li>Opções para vários modelos de celular</li>
            </ul>
          </div>
        </section>

        <section className="location section" id="localizacao">
          <div className="container">
            <h2>Onde estamos</h2>
            <p className="section-description">
              Localização da loja no Google Maps.
            </p>

            <div className="location-grid">
              <div className="map-wrapper">
                <iframe
                  title="Mapa da loja Santo Case em Caxias do Sul"
                  src={storeInfo.mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <aside className="local-info" aria-label="Informações da loja">
                <h3>Informações da loja</h3>
                <ul>
                  <li>
                    <strong>Telefone:</strong>{" "}
                    <a href={storeInfo.phoneHref}>{storeInfo.phoneDisplay}</a>
                  </li>
                  <li>
                    <strong>Cidade:</strong> {storeInfo.city}
                  </li>
                  <li>
                    <strong>Endereço:</strong> {storeInfo.address}
                  </li>
                  <li>
                    <strong>Horário de funcionamento:</strong>
                    <div className="hours-list">
                      {storeInfo.hours.map((item) => (
                        <div key={item.label} className="hours-row">
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-links">
            <a
              href="https://www.instagram.com/santocase_br/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramFooterIcon} alt="Instagram" />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/p/Santo-Case-Caxias-do-Sul-61553608185906/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebookFooterIcon} alt="Facebook" />
              Facebook
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <img src={whatsappFooterIcon} alt="WhatsApp" />
              WhatsApp
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} {businessName}. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Entrar em contato no WhatsApp"
      >
        <span className="whatsapp-icon">
          <img src={whatsappIcon} alt="WhatsApp Icon" />
        </span>
      </a>
    </div>
  );
}

export default App;
