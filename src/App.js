import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ArrowRightCircle, CheckCircle, Instagram, Server, Users, MessageSquare, PhoneCall, ChevronUp, HelpCircle, Star, Package, BadgePercent, MessageCircle as WhatsAppIcon, Lightbulb, TrendingUp, Cpu, Gamepad2, Smartphone, Wifi, ShoppingCart as ShoppingCartIcon, Headset, Globe, Send, UserPlus, Lock, Send as TelegramIcon, Menu, X, Wallet } from 'lucide-react';

// Import komponen RegistrationSection dari file daftar.js
import RegistrationSection from './daftar.js';

// ===================================================================================
// DATA UTAMA: IFYOne - Penyedia Server Digital
// ===================================================================================
const MOCK_DATA = {
  businessName: "IFYOne",
  hero: {
    title: "Masa Depan Bisnis Digital Anda Dimulai di IFYOne",
    animatedSubtitle: [
      "Solusi Server Pulsa, PPOB & Top-Up Game Terintegrasi.",
      "Infrastruktur Andal, Transaksi Aman, Profit Maksimal.",
      "Wujudkan Potensi Bisnis Anda Bersama Kami.",
      "Solusi Satu Digital."
    ],
    cta: "Jelajahi Kami",
    imageUrls: [
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
  },
  partnerLogos: [
    { name: "Telkomsel", url: "/telkomsel.png", alt: "Logo Telkomsel" },
    { name: "Indosat Ooredoo", url: "/indosat.png", alt: "Logo Indosat" },
    { name: "XL Axiata", url: "/xl.png", alt: "Logo XL Axiata" },
    { name: "Three", url: "/three.png", alt: "Logo Three" },
    { name: "Byu", url: "/byu.png", alt: "Logo Byu" },
    { name: "Smartfren", url: "/Smartfren.png", alt: "Logo Smartfren" },
  ],
  advantages: {
    title: "Mengapa Memilih IFYOne?",
    subtitle: "Kami berkomitmen memberikan yang terbaik untuk kesuksesan bisnis Anda.",
    items: [
      {
        icon: <ShieldCheck className="h-10 w-10 text-orange-400" />,
        heading: "Keamanan Terjamin",
        description: "Sistem keamanan terbaik untuk melindungi setiap transaksi dan data pelanggan Anda.",
      },
      {
        icon: <TrendingUp className="h-10 w-10 text-orange-400" />,
        heading: "Profit Maksimal",
        description: "Struktur harga kompetitif yang dirancang untuk meningkatkan margin keuntungan bisnis Anda.",
      },
      {
        icon: <Headset className="h-10 w-10 text-orange-400" />,
        heading: "Dukungan 24/7",
        description: "Tim support profesional kami siap membantu Anda kapan saja, 24 jam sehari, 7 hari seminggu.",
      },
      {
        icon: <Cpu className="h-10 w-10 text-orange-400" />,
        heading: "Performa Optimal",
        description: "Infrastruktur server yang canggih dan handal memastikan uptime dan kecepatan tinggi.",
      },
    ],
  },
  about: {
    title: "Tentang Kami",
    subtitle: "Memimpin Inovasi Server Digital di Indonesia",
    paragraphs: [
      "IFYOne hadir sebagai jawaban atas kebutuhan akan solusi server digital yang andal dan terpercaya. Berbekal pengalaman dan komitmen pada inovasi, kami menyediakan infrastruktur terdepan untuk server pulsa, PPOB, dan top-up game. Misi kami adalah memberdayakan para pengusaha digital dengan teknologi yang efisien dan dukungan penuh, sehingga mereka dapat fokus pada pertumbuhan bisnis tanpa khawatir soal teknis.",
      "Kami percaya bahwa setiap bisnis, besar maupun kecil, berhak mendapatkan akses ke teknologi kelas dunia. Oleh karena itu, IFYOne terus berinvestasi pada riset dan pengembangan, memastikan setiap layanan kami tetap relevan dan selangkah lebih maju dari kompetitor. Bergabunglah dengan kami dan rasakan perbedaan dari partner teknologi yang sesungguhnya peduli pada kesuksesan Anda.",
    ],
  },
  services: {
    title: "Layanan Kami",
    subtitle: "Solusi Terintegrasi untuk Berbagai Kebutuhan Bisnis Anda",
    items: [
      {
        icon: <Smartphone className="h-10 w-10 text-orange-400" />,
        heading: "Server Pulsa & Kuota",
        description: "Layanan server pulsa terlengkap dengan berbagai provider dan kuota data untuk mendukung bisnis Anda.",
      },
      {
        icon: <Wifi className="h-10 w-10 text-orange-400" />,
        heading: "Server PPOB",
        description: "Kemudahan pembayaran tagihan bulanan seperti listrik, air, BPJS, dan lainnya dengan sistem yang cepat dan akurat.",
      },
      {
        icon: <Gamepad2 className="h-10 w-10 text-orange-400" />,
        heading: "Top-Up Game",
        description: "Penyedia top-up game untuk berbagai judul game populer, memastikan pengalaman gaming yang tanpa hambatan.",
      },
      {
        icon: <Wallet className="h-10 w-10 text-orange-400" />,
        heading: "E-Money & Digital Wallet",
        description: "Isi ulang saldo e-money dan dompet digital dengan harga kompetitif, mendukung transaksi non-tunai yang efisien.",
      },
      {
        icon: <PhoneCall className="h-10 w-10 text-orange-400" />,
        heading: "Pulsa Transfer & Paket Nelpon",
        description: "Isi ulang pulsa transfer, paket nelpon, dan SMS dengan pilihan fleksibel sesuai kebutuhan.",
      },
      {
        icon: <BadgePercent className="h-10 w-10 text-orange-400" />,
        heading: "Integrasi API",
        description: "API yang mudah diintegrasikan untuk pengembang dan bisnis yang ingin membangun platform sendiri.",
      },
    ],
  },
  testimonials: {
    title: "Apa Kata Mereka?",
    subtitle: "Dengar langsung dari para mitra bisnis kami yang telah merasakan manfaat IFYOne.",
    items: [
      {
        quote: "Sistemnya stabil, transaksi cepat, dan supportnya responsif. Bisnis saya naik signifikan sejak pakai IFYOne!",
        name: "Godeg",
        role: "Pemilik Gerai Pulsa",
      },
      {
        quote: "API-nya mudah diintegrasikan dan dokumentasinya lengkap. Sangat membantu untuk pengembangan aplikasi saya.",
        name: "Manda Annisa",
        role: "Developer Aplikasi",
      },
      {
        quote: "Customer service IFYOne selalu siap membantu kapan saja. Responnya cepat dan ramah, membuat saya merasa tenang menjalankan bisnis tanpa hambatan.",
        name: "Ahmad Riyadi",
        role: "Konter pulsa",
      },
    ],
  },
  faq: {
    title: "Pertanyaan yang Sering Diajukan",
    subtitle: "Temukan jawaban cepat atas pertanyaan umum tentang layanan kami.",
    items: [
      {
        question: "Bagaimana cara mendaftar di IFYOne?",
        answer: "Anda bisa mendaftar dengan mengisi formulir di halaman 'Daftar' atau menghubungi tim support kami. Proses pendaftaran cepat dan mudah."
      },
      {
        question: "Apakah ada biaya pendaftaran?",
        answer: "Tidak. Pendaftaran di IFYOne sepenuhnya gratis. Anda hanya perlu mengisi saldo untuk memulai transaksi."
      },
      {
        question: "Apa saja produk yang tersedia?",
        answer: "Kami menyediakan berbagai produk digital, mulai dari pulsa, paket data, token listrik, pembayaran PPOB, hingga top-up game dan voucher digital."
      },
      {
        question: "Bagaimana cara mengisi saldo?",
        answer: "Anda dapat mengisi saldo melalui transfer bank atau e-wallet. Panduan lengkap tersedia di dashboard setelah Anda berhasil mendaftar."
      },
      {
        question: "Apakah sistem IFYOne stabil?",
        answer: "Ya. Kami menggunakan infrastruktur server yang canggih dan handal, dirancang untuk memastikan uptime tinggi dan kecepatan transaksi yang optimal 24/7."
      },
      {
        question: "Apakah saya bisa mengintegrasikan API IFYOne ke aplikasi saya?",
        answer: "Tentu saja. Kami menyediakan API yang mudah diintegrasikan dengan dokumentasi yang lengkap, cocok untuk para developer dan bisnis yang ingin membangun platform sendiri."
      }
    ]
  },
  contact: {
    title: "Hubungi Kami",
    subtitle: "Kami siap membantu Anda memulai petualangan digital.",
    items: [
      {
        icon: <MapPin className="h-6 w-6 text-orange-400" />,
        label: "Bogor,Indonesia",
      },
      {
        icon: <Phone className="h-6 w-6 text-orange-400" />,
        label: "6289509606876",
      },
      {
        icon: <Mail className="h-6 w-6 text-orange-400" />,
        label: "contact@ifyone.com",
      },
      {
        icon: <Clock className="h-6 w-6 text-orange-400" />,
        label: "Layanan nonstop 7/24 jam",
      },
    ],
  },
  footer: {
    socialMedia: [
      { icon: <Send />, link: "https://t.me/csifyone" },
      { icon: <WhatsAppIcon />, link: "https://wa.me/6289509606876" },
      { icon: <PhoneCall />, link: "tel:+6289509606876" },
    ],
    links: [
      { heading: "Layanan", items: [{ label: "Server Pulsa", id: "layanan" }, { label: "PPOB", id: "layanan" }, { label: "Top-Up Game", id: "layanan" }, { label: "API", id: "layanan" }] },
      { heading: "Perusahaan", items: [{ label: "Tentang Kami", id: "tentang" }, { label: "Portofolio", id: "beranda" }, { label: "Karir", id: "beranda" }, { label: "Blog", id: "beranda" }] },
      { heading: "Dukungan", items: [{ label: "FAQ", id: "faq" }, { label: "Kontak Kami", id: "kontak" }, { label: "Kebijakan Privasi", id: "beranda" }, { label: "Syarat & Ketentuan", id: "beranda" }] },
      // Menambahkan kembali link "Daftar" di footer
      { heading: "Bergabung", items: [{ label: "Daftar", id: "daftar" }] },
    ],
    copyright: "© 2025 IFYOne. Semua Hak Cipta Dilindungi.",
  },
};

// ===================================================================================
// KOMPONEN-KOMPONEN REUSABLE
// ===================================================================================

const Navbar = ({ businessName, navLinks, onNavClick, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClickWrapper = (id) => {
    onNavClick(id);
    setIsMenuOpen(false); // Sembunyikan menu setelah navigasi
  };

  return (
    <header className="fixed w-full z-50 bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg">
      {/* Navbar utama */}
      <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href="#" onClick={() => handleNavClickWrapper('beranda')} className="flex items-center">
            <img src="/ifyone.png" alt="IFYOne Logo" className="h-20 w-auto mr-2" />
          </a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href="#"
              onClick={() => handleNavClickWrapper(link.id)}
              className={`text-gray-300 hover:text-orange-400 text-sm transition duration-300 relative group
              ${currentPage === link.id ? 'text-orange-400 font-bold' : ''}
              `}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        {/* Tombol menu untuk mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      {/* Menu mobile - Menggunakan max-height untuk transisi yang lebih handal */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href="#"
              onClick={() => handleNavClickWrapper(link.id)}
              className="text-gray-300 hover:text-orange-400 transition duration-300 text-lg font-semibold"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20 px-4 md:px-8">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-orange-400 mb-2">{title}</h2>
        <p className="text-gray-300 text-lg">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const HeroSection = ({ hero }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const currentText = hero.animatedSubtitle[wordIndex];
    const typingDelay = 100;
    const deletingDelay = 50;
    const pauseDelay = 2000;
    let timeoutId;

    if (isDeleting) {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, deletingDelay);
      } else {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % hero.animatedSubtitle.length);
      }
    } else {
      if (displayText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingDelay);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, wordIndex, hero.animatedSubtitle]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % hero.imageUrls.length);
    }, 6000);

    return () => clearInterval(imageInterval);
  }, [hero.imageUrls.length]);
  
  return (
    <div id="beranda" className="relative overflow-hidden pt-24 pb-12 sm:pt-40 sm:pb-24 bg-gray-900">
      <div className="absolute inset-0 z-0">
        {hero.imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Latar belakang ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === bgImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
            onError={(e) => {
              e.target.src = `https://placehold.co/1920x1080/0d0d0d/e5e5e5?text=Gambar+Tidak+Tersedia`;
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="relative w-full h-full">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 -right-1/4 w-1/3 h-1/3 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {hero.title}
          </h1>
          <div className="h-8 md:h-12 overflow-hidden relative">
            <span className="inline-block text-lg sm:text-xl text-gray-300 font-medium whitespace-nowrap">
              <span className="text-orange-400 font-medium">
                {displayText}
              </span>
              <span className="inline-block w-0.5 h-full bg-orange-400 animate-blink align-top"></span>
            </span>
          </div>
          {/* Ikon pendukung di dalam hero section */}
          <div className="flex justify-center space-x-6 mt-6 text-orange-400">
            <Smartphone className="h-10 w-10 animate-bounce" />
            <Wallet className="h-10 w-10 animate-bounce animation-delay-500" />
            <ShoppingCartIcon className="h-10 w-10 animate-bounce animation-delay-1000" />
          </div>
          <a
            href="#layanan"
            className="inline-flex items-center mt-8 px-8 py-3 bg-orange-400 text-gray-900 font-bold rounded-full transition-all duration-300 hover:bg-orange-500 hover:shadow-lg transform hover:-translate-y-1"
          >
            {hero.cta}
            <ArrowRightCircle className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

const PartnerLogosSection = ({ logos }) => (
  <section className="bg-gray-800 py-8 px-4 md:px-8 text-center">
    <div className="container mx-auto">
      <h3 className="text-base font-medium text-gray-400 mb-6">Didukung Oleh:</h3>
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
        {logos.map((logo, index) => (
          <div key={index} className="flex justify-center items-center h-10 w-24">
            <img
              src={logo.url}
              alt={logo.alt}
              className="max-h-full max-w-full object-contain transition-all duration-300 hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);


const AdvantagesSection = ({ advantages }) => {
  const [visibleItems, setVisibleItems] = useState(new Array(advantages.items.length).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    // Intersection Observer to handle scroll-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = refs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              // Stop observing once visible
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Section id="keunggulan" title={advantages.title} subtitle={advantages.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.items.map((item, index) => (
          <div 
            key={index} 
            ref={el => refs.current[index] = el}
            className={`bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transition-all duration-700 ease-in-out transform ${
              visibleItems[index]
                ? 'opacity-100 translate-y-0 hover:scale-105 hover:border-orange-400'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-center text-white mb-2">{item.heading}</h3>
            <p className="text-gray-400 text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const AboutSection = ({ about }) => (
  <Section id="tentang" title={about.title} subtitle={about.subtitle}>
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
      {/* Video di sisi kiri untuk tampilan desktop */}
      <div className="w-full lg:w-1/2">
        <video
          className="w-full aspect-[16/9] rounded-xl shadow-lg border border-gray-700 object-cover"
          src="/tentang-ifyone.mp4"
          title="Video tentang IFYOne"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      {/* Teks di sisi kanan */}
      <div className="w-full lg:w-1/2 text-lg text-gray-300 leading-relaxed space-y-6 text-center lg:text-left">
        {about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  </Section>
);

const ServiceSection = ({ services }) => {
  const [visibleItems, setVisibleItems] = useState(new Array(services.items.length).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = refs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleItems(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Section id="layanan" title={services.title} subtitle={services.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.items.map((item, index) => (
          <div
            key={index}
            ref={el => refs.current[index] = el}
            className={`flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition-all duration-700 ease-in-out transform ${
              visibleItems[index]
                ? 'opacity-100 translate-y-0 hover:scale-105 hover:border-orange-400'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex-shrink-0 mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.heading}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const TestimonialSection = ({ testimonials }) => {
  return (
    <Section id="testimoni" title={testimonials.title} subtitle={testimonials.subtitle}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:border-orange-400 flex flex-col"
          >
            <p className="text-gray-300 italic text-center flex-grow mb-6">"{item.quote}"</p>
            <div className="mt-auto flex flex-col items-center">
              <h4 className="font-bold text-white text-lg">{item.name}</h4>
              <p className="text-gray-400 text-sm">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const FAQSection = ({ faq }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section id="faq" title={faq.title} subtitle={faq.subtitle}>
      <div className="max-w-3xl mx-auto space-y-4">
        {faq.items.map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <button
              className="w-full flex justify-between items-center text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-semibold text-white">{item.question}</span>
              <ChevronUp
                className={`w-6 h-6 text-orange-400 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-400">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ContactSection = ({ contact }) => {
  return (
    <Section id="kontak" title={contact.title} subtitle={contact.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {contact.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 text-gray-300">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Hubungi Kami</h3>
          <p className="text-gray-400 mb-6">
            Anda dapat menghubungi kami melalui salah satu kontak di samping atau klik tombol di bawah untuk terhubung langsung.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/6289509606876"
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-full transition-all duration-300 hover:bg-green-600 hover:shadow-lg flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://t.me/csifyone"
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full transition-all duration-300 hover:bg-blue-600 hover:shadow-lg flex items-center space-x-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon className="h-5 w-5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ===================================================================================
// KOMPONEN BARU: Footer
// ===================================================================================
const Footer = ({ footer, onNavClick }) => (
  <footer className="bg-gray-800 py-12 px-4 md:px-8 border-t border-gray-700">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Kolom Logo & Sosial Media */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/ifyone.png" alt="IFYOne Logo" className="h-20 w-auto mb-4" />
          <p className="text-gray-400 mb-4">Solusi Terdepan untuk Bisnis Digital Anda.</p>
          <div className="flex space-x-4">
            {footer.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom Tautan Navigasi */}
        {footer.links.map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            <h4 className="text-xl font-bold text-white mb-2">{column.heading}</h4>
            <ul className="space-y-2">
              {column.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <a
                    href="#"
                    onClick={() => onNavClick(item.id)}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">{footer.copyright}</p>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('beranda');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "layanan", label: "Layanan" },
    { id: "faq", label: "FAQ" },
    { id: "kontak", label: "Kontak" },
    { id: "daftar", label: "Daftar" }
  ];

  useEffect(() => {
    const styleId = 'custom-blob-styles';
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .animate-blink { animation: blink 1s step-end infinite; }
      @keyframes blob {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
      }
      .animation-delay-2000 { animation-delay: 2s; }
      .transition-opacity { transition: opacity 1s ease-in-out; }
      .animate-bounce {
        animation: bounce 1s infinite;
      }
      .animation-delay-500 { animation-delay: 0.5s; }
      .animation-delay-1000 { animation-delay: 1s; }
    `;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  const handleNavClick = (id) => {
    if (id === 'daftar') {
      setCurrentPage('daftar');
    } else {
      setCurrentPage('beranda');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans antialiased text-white min-h-screen bg-gray-900">
      <Navbar businessName={MOCK_DATA.businessName} navLinks={navLinks} onNavClick={handleNavClick} currentPage={currentPage} />
      <main>
        {currentPage === 'daftar' ? (
          <div className="pt-24 min-h-screen">
            <RegistrationSection />
          </div>
        ) : (
          <>
            <HeroSection hero={MOCK_DATA.hero} />
            <AdvantagesSection advantages={MOCK_DATA.advantages} />
            <AboutSection about={MOCK_DATA.about} />
            <ServiceSection services={MOCK_DATA.services} />
            <TestimonialSection testimonials={MOCK_DATA.testimonials} />
            <FAQSection faq={MOCK_DATA.faq} />
            <ContactSection contact={MOCK_DATA.contact} />
            <PartnerLogosSection logos={MOCK_DATA.partnerLogos} />
          </>
        )}
      </main>
      {/* Footer dan tombol scroll-to-top hanya ditampilkan jika tidak di halaman 'daftar' */}
      {currentPage !== 'daftar' && (
        <>
          <Footer footer={MOCK_DATA.footer} onNavClick={handleNavClick} />
          {showScrollToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-orange-400 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
              aria-label="Scroll to top"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;