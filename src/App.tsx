import React, { useEffect, useMemo, useRef, useState } from 'react';
import Wakaf from './Wakaf';
import {
  Menu,
  X,
  ChevronRight,
  Check,
  Star,
  ChevronLeft,
  MessageCircle,
  BookOpen,
  Award,
  Shield,
  Truck,
  ArrowRight,
  Clock,
  User,
  ShoppingBag,
  Phone,
  Store,
  Users
} from 'lucide-react';

// Types
type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
  avatarUrl?: string;
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type NavItem = { name: string; href: string };

// Intersection Observer helper
const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options ?? { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView } as const;
};

// Contact and marketplace links
const CONTACT = {
  whatsapp: "https://wa.me/6287879713808?text=Saya%20ingin%20memesan%20Al-Qur%27an%20Kharisma",
  shopee: "#",
  tokopedia: "#",
} as const;

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(delay, 700)}ms` }}
      className={[
        'transform transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className || ''
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [splashExit, setSplashExit] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(true);
  const [countdown, setCountdown] = useState<{days:number; hours:number; minutes:number; seconds:number}>({days:0,hours:0,minutes:0,seconds:0});
  const [currentPage, setCurrentPage] = useState(0);
  const [route, setRoute] = useState<string>(typeof window !== 'undefined' ? window.location.hash || '#' : '#');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Splash screen once on initial load (with exit animation)
  useEffect(() => {
    const t1 = setTimeout(() => setSplashExit(true), 1800); // start exit after 1.8s
    const t2 = setTimeout(() => setShowSplash(false), 2400); // remove after exit ~0.6s
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Countdown to a target promo date (example: 5 Nov 2025 23:59:59 local time)
  useEffect(() => {
    const target = new Date('2025-11-05T23:59:59');
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({days:d, hours:h, minutes:m, seconds:s});
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navItems: NavItem[] = useMemo(() => ([
    { name: 'Masalah', href: '#masalah' },
    { name: 'Solusi', href: '#solusi' },
    { name: 'Fitur', href: '#fitur' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'Harga', href: '#harga' },
  ]), []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Muhammad Faqih',
      role: 'Santri Pesantren',
      rating: 4.5,
      content:
        "Al-Qur’an Kharisma benar-benar istimewa. Desainnya elegan, tulisannya jelas dan nyaman dibaca, bahkan ada panduan tajwid warna-warni yang sangat membantu. Saya merasa lebih semangat mengaji setiap harinya. Cocok banget untuk hadiah atau dipakai pribadi. Mantap!",
      avatar: 'MF',
    },
    {
      id: 2,
      name: 'Muhammad Abriel',
      role: 'Santri Pesantren',
      rating: 5,
      content:
        "Sejak pakai Al-Qur’an tajwid berwarna ini, bacaan jadi lebih mudah dan terarah. Setiap warna jelas menuntun cara baca—tahan, dengung, atau panjang. Tulisannya nyaman dipandang, nggak bikin lelah. Alhamdulillah, kini lebih yakin dan semangat perbaiki tajwid tiap hari!",
      avatar: 'MA',
    },
    {
      id: 3,
      name: 'Abaikeun',
      role: 'Mahasiswa',
      rating: 4.0,
      content:
        "sungguh berterima kasih kepada pabrik yang telah membuat kharisma Quran ini, saya jadi bener bener terbantu, kenapa? karena fitur nya lengkap, ada tajwid berwarna, terjemahan, dan metode cara menghafal yang mudah",
      avatar: 'A',
    },
    {
      id: 4,
      name: 'Muhammad Tamma',
      role: 'Santri Pesantren',
      rating: 4.5,
      content:
        'Alhamdulillah, sejak pakai Al-Qur’an Kharisma, belajar tajwid jadi lebih mudah dan menyenangkan. Warna-warna hukum bacaan membantu saya cepat pahami idgham, ikhfa, dan mad. Tampilannya jelas, bikin fokus saat murojaah, dan kini saya lebih percaya diri baca di depan guru dan teman. Bagi saya, ini bukan cuma mushaf—tapi sahabat belajar yang memudahkan perbaikan bacaan.',
      avatar: 'MT',
    },
     {
      id: 5,
      name: 'Ibrahim Abdillah',
      role: 'Santri Pesantren',
      rating: 4.0,
      content:
        'Sejak pakai Al-Qur’an Kharisma, bacaan saya jadi lebih lancar dan tepat. Tajwid berwarna sangat mudah dipahami—bahkan untuk pemula—ditambah desain elegan, kertas nyaman, terjemah, dan asbabun nuzul yang memperdalam pemahaman. Bukan cuma mushaf, tapi guru tajwid dalam genggaman. Alhamdulillah, setiap bacaan terasa lebih tenang dan dekat dengan-Nya.',
      avatar: 'IA',
    },
    {
      id: 6,
      name: 'Muhammad Nizar',
      role: 'Santri Pesantren',
      rating: 4.5,
      content:
        'Sejak pakai Al-Qur’an Kharisma, bacaan saya jauh lebih percaya diri dan tepat. Tajwid warnanya bikin gampang bedain hukum bacaan—nggak pusing lagi saat tilawah. Desainnya estetik, kertasnya lembut di mata, dan ada terjemah plus asbabun nuzul yang bikin ngerti konteks ayat. Bukan cuma mushaf biasa, tapi teman belajar yang selalu mengingatkan cara membaca dengan benar. Alhamdulillah, setiap baca, rasanya lebih khusyuk dan nyaman di hati.',
      avatar: 'MN',
      avatarUrl: '/muhammad-nizar.jpg',
    },
    {
      id: 7,
      name: 'Putri aliani',
      role: 'Mahasiswi',
      rating: 4.5,
      content:
        'Sejak pakai Al-Qur’an berwarna tajwid ini, bacaannya jadi lebih tenang dan lancar. Warna-warnanya bantu banget buat tahu kapan harus panjang, berhenti, atau dengung. Jadi lebih semangat tilawah tiap hari 😇',
      avatar: 'PA',
    },
    {
      id: 8,
      name: 'Muhammad Iqbal',
      role: 'Karyawan',
      rating: 4.0,
      content:
        'Dulu sering bingung pas baca, takut salah panjang pendeknya. Sekarang lebih pede karena warnanya jelas banget. Desainnya juga cantik, bikin pengen buka terus 💖',
      avatar: 'MI',
    },
    {
      id: 9,
      name: 'Dede Anya',
      role: 'Pelajar',
      rating: 4.5,
      content:
        'Nggak nyangka, ternyata warna tajwid itu ngaruh banget! Jadi lebih cepat hafal cara bacanya. Cocok banget buat yang masih belajar kayak aku, nggak bikin pusing 😍',
      avatar: 'DA',
    },
    {
      id: 10,
      name: 'Mas Rehan',
      role: 'Guru',
      rating: 4.0,
      content:
        'Al-Qur’an ini bener-bener ngebantu aku istiqamah tilawah. Hurufnya jelas, warnanya lembut di mata, dan tiap baca rasanya tenang banget. Worth it pokoknya!',
      avatar: 'MR',
    },
    {
      id: 11,
      name: 'Mas Dimas',
      role: 'Orang Tua',
      rating: 5.0,
      content:
        'Anak saya jadi lebih rajin baca karena warna-warni tajwidnya menarik. Sekalian belajar hukum bacaan juga. Seneng banget lihat dia makin cinta sama Al-Qur’an 💕',
      avatar: 'MD',
    },
  ];

  const features: Feature[] = [
    {
      icon: <MessageCircle className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Tajwid berwarna',
      description: 'Setiap warna mewakili hukum tajwid berbeda untuk memudahkan pelafalan yang tepat.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Terjemah 15 Baris',
      description: 'Terjemah yang tepat membantu memahami makna tanpa kehilangan konteks.',
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Standar Kemenag RI',
      description: 'Rasm Utsmani sesuai standar Kemenag RI, akurat dan terpercaya.',
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Kertas Premium HVS',
      description: 'Tidak mudah tembus, nyaman di mata, dan tahan lama untuk penggunaan harian.',
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Cover Hardcover Eksklusif',
      description: 'Desain elegan dengan kualitas cover yang kuat dan berkelas.',
    },
    {
      icon: <Truck className="w-8 h-8 text-emerald-600" aria-hidden />,
      title: 'Pengiriman Aman',
      description: 'Dikemas rapi dengan perlindungan maksimal hingga sampai di tangan Anda.',
    },
  ];

  const renderStars = (rating: number) => {
    const clamped = Math.max(0, Math.min(5, rating));
    return (
      <div className="flex" aria-label={`Rating ${clamped} dari 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, clamped - i)); // 0..1
          const isEmpty = fill <= 0;
          return (
            <div key={i} className="relative w-5 h-5 mr-1" aria-hidden>
              <Star className="w-5 h-5 text-gray-300" />
              {!isEmpty && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const pageSize = 6;
  const totalPages = Math.ceil(testimonials.length / pageSize) || 1;
  const visibleTestimonials = useMemo(() => {
    const start = currentPage * pageSize;
    return testimonials.slice(start, start + pageSize);
  }, [currentPage, testimonials]);

  const nextTestimonial = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const prevTestimonial = () => setCurrentPage((p) => Math.max(p - 1, 0));

  const handleSmoothNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen text-gray-800`}>
      {showSplash && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className={`flex flex-col items-center transform transition-all duration-500 ${splashExit ? 'opacity-0 -translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
            <img src="/logo.png" alt="Al-Qur'an Kharisma" className="h-16 md:h-24 lg:h-32 w-auto animate-zoom-in drop-shadow-lg" />
            <p className="mt-3 text-emerald-700 font-semibold animate-fade-in">Al-Qur'an Kharisma</p>
            <p className="mt-1 text-sm text-emerald-700/80 animate-pulse" aria-live="polite">Loading...</p>
          </div>
        </div>
      )}
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-transparent'} `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3" aria-label="Beranda Al-Qur'an Kharisma">
              <img src="/logo.png" alt="Logo Al-Qur'an Kharisma" className="h-9 md:h-10 lg:h-12 w-auto transition-transform hover:animate-hover-bounce" />
              <span className="text-emerald-700 font-bold text-xl">Al-Qur'an Kharisma</span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSmoothNav(item.href)}
                  className="text-gray-700 hover:text-emerald-600 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <a
                href="#/wakaf"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  window.location.hash = '#/wakaf';
                }}
                className="text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Wakaf
              </a>
              <a
                href="#harga"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleSmoothNav('#harga');
                }}
                className="btn-primary !py-2"
              >
                Pesan Sekarang
              </a>
            </nav>
            <button className="md:hidden" aria-label="Toggle menu" onClick={() => setIsMenuOpen((v) => !v)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="text-left py-2 text-gray-700 hover:text-emerald-600"
                  onClick={() => handleSmoothNav(item.href)}
                >
                  {item.name}
                </button>
              ))}
              <a
                href="#/wakaf"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  window.location.hash = '#/wakaf';
                  setIsMenuOpen(false);
                }}
                className="text-left py-2 text-emerald-700 font-semibold"
              >
                Wakaf
              </a>
              <a
                href="#harga"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleSmoothNav('#harga');
                }}
                className="btn-primary text-center"
              >
                Pesan Sekarang
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {route.startsWith('#/wakaf') ? (
          <Wakaf />
        ) : (
        <>
        {/* Hero */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-emerald-50 to-teal-50">
          {/* Logo watermark */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <img
              src="/logo.png"
              alt=""
              className="hidden md:block absolute -right-20 -top-16 opacity-10 saturate-0 blur-[1px] w-[280px] lg:w-[360px] animate-float-slow"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Baca Al-Qur'an dengan Lebih Mudah dan Benar
                </h1>
                <p className="mt-5 text-lg text-gray-600">
                  Al-Qur'an Kharisma hadir dengan tajwid berwarna dan terjemahan yang memandu setiap langkah membaca Anda.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="#harga" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); handleSmoothNav('#harga'); }} className="btn-primary text-lg py-3 flex items-center justify-center transition-transform hover:animate-hover-bounce">
                    Pesan Sekarang
                    <ChevronRight className="ml-2" />
                  </a>
                  <a href="#fitur" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); handleSmoothNav('#fitur'); }} className="btn-secondary text-lg py-3 text-center transition-transform hover:animate-hover-bounce">
                    Lihat Detail Fitur
                  </a>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex -space-x-2" aria-hidden>
                    {['AF', 'SA', 'RM'].map((t) => (
                      <div key={t} className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-emerald-700 font-medium">
                        {t}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">50.000+ Pembaca</p>
                    <div className="flex items-center text-emerald-600">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                      4.9/5.0 (2.500+ ulasan)
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <div className="bg-white p-2 rounded-xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src="/cover.jpg"
                      alt="Gambar produk Al-Qur'an Kharisma"
                      loading="lazy"
                      className="w-full h-auto object-cover aspect-[3/4] animate-float-slow"
                    />
                  </div>
                </div>
                <div className="hidden md:block absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full mr-3" aria-hidden>
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-700">Best Seller <span className="text-gray-800">2023 - 2025</span></p>
                      <p className="text-sm text-gray-600">Terjual 50.000+ • Dipercaya santri se-Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Money-back guarantee banner */}
        <section className="py-6 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-emerald-100 bg-white p-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-emerald-800">
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <MessageCircle className="w-10 h-10 text-emerald-600" aria-hidden />,
                  title: 'Sulit membedakan hukum tajwid',
                  desc: 'Antara ghunnah, qalqalah, dan lainnya sering tertukar saat membaca.'
                },
                {
                  icon: <BookOpen className="w-10 h-10 text-emerald-600" aria-hidden />,
                  title: 'Khawatir salah pelafalan',
                  desc: 'Kurang yakin dengan makhraj dan sifat huruf saat tilawah.'
                },
                {
                  icon: <Clock className="w-10 h-10 text-emerald-600" aria-hidden />,
                  title: 'Memakan waktu untuk memahami',
                  desc: 'Butuh waktu lama untuk memahami makna ayat demi ayat.'
                },
                {
                  icon: <User className="w-10 h-10 text-emerald-600" aria-hidden />,
                  title: 'Tidak yakin bacaan sendiri',
                  desc: 'Tidak ada yang mengoreksi, sehingga ragu saat membaca.'
                },
              ].map((item, idx) => (
                <Reveal key={idx} delay={idx * 70}>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solusi" className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Solusi Terbaik
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Al-Qur'an Kharisma: Solusi Membaca dengan Benar dan Mudah
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Sistem tajwid warna memandu bacaan, terjemah per kata memperjelas makna, membuat proses belajar lebih cepat dan tepat.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Tajwid warna memudahkan identifikasi hukum bacaan',
                    'Terjemah 15 baris Kemenag RI',
                    'Panduan tajwid praktis untuk pemula hingga mahir',
                    'Kualitas cetak premium, nyaman untuk tilawah lama',
                    'Cover & kertas high quality',
                  ].map((t, i) => (
                    <div className="flex items-start" key={i}>
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 mr-2" />
                      <p className="text-gray-700">{t}</p>
                    </div>
                  ))}
                </div>
                <a href="#fitur" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); handleSmoothNav('#fitur'); }} className="btn-primary inline-flex items-center">
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Sebelum</span>
                  <span className="text-sm font-medium text-emerald-600">Sesudah</span>
                </div>
                <div className="relative grid grid-cols-2 gap-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <img
                      src="/before.jpeg"
                      alt="Contoh mushaf tanpa tajwid warna"
                      loading="lazy"
                      className="mx-auto rounded shadow-inner object-cover aspect-[3/4]"
                    />
                    <p className="mt-2 text-sm text-gray-500">Sulit membedakan hukum tajwid</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-center">
                    <img
                      src="/after.jpeg"
                      alt="Contoh mushaf dengan tajwid warna"
                      loading="lazy"
                      className="mx-auto rounded shadow-inner object-cover aspect-[3/4]"
                    />
                    <p className="mt-2 text-sm text-gray-600">Panduan warna memudahkan pelafalan</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section id="fitur" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="section-title">Fitur Unggulan</h2>
              <p className="section-subtitle">Dirancang untuk pengalaman membaca yang nyaman, akurat, dan bermakna.</p>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition hover:-translate-y-1">
                    <div className="bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4" aria-hidden>
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-gray-600">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimoni" className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="section-title">Apa Kata Mereka yang Sudah Merasakan Manfaatnya</h2>
              <p className="section-subtitle">Testimoni realistis dari berbagai kalangan pembaca.</p>
            </Reveal>
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {visibleTestimonials.map((t, idx) => (
                  <Reveal key={t.id} delay={idx * 80}>
                    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100`}>
                      <div className="flex items-center mb-4">
                        {t.avatarUrl ? (
                          <img
                            src={t.avatarUrl}
                            alt={`Foto ${t.name}`}
                            loading="lazy"
                            className="w-12 h-12 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold mr-3" aria-hidden>
                            {t.avatar}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{t.name}</p>
                          <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                      </div>
                      {renderStars(t.rating)}
                      <p className="mt-3 text-gray-700">“{t.content}”</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="flex justify-center items-center gap-3 md:gap-4 mt-4 md:mt-3">
                <button
                  onClick={prevTestimonial}
                  aria-label="Sebelumnya"
                  disabled={currentPage === 0}
                  aria-disabled={currentPage === 0}
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-full border shadow-sm focus:outline-none flex items-center justify-center transition ${
                    currentPage === 0
                      ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 active:bg-emerald-600 active:text-white'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    aria-label={`Halaman ${i + 1}`}
                    className={`min-w-[40px] h-10 px-3 rounded-full text-sm md:text-base font-medium border transition ${
                      i === currentPage
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={nextTestimonial}
                  aria-label="Berikutnya"
                  disabled={currentPage === totalPages - 1}
                  aria-disabled={currentPage === totalPages - 1}
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-full border shadow-sm focus:outline-none flex items-center justify-center transition ${
                    currentPage === totalPages - 1
                      ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 active:bg-emerald-600 active:text-white'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3 text-base md:text-lg flex items-center gap-2 transition-transform hover:animate-hover-bounce"
                >
                  Pesan Sekarang, Rasakan Perbedaannya!
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Credibility */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Reveal>
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition">
                  <div className="bg-emerald-50 p-2 rounded-lg" aria-hidden>
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">Rekomendasi Ulama</p>
                    <p className="text-xs text-gray-500">Saran dan dukungan praktisi</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition">
                  <div className="bg-emerald-50 p-2 rounded-lg" aria-hidden>
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">Sudah Dipercaya 5.000+ Pembaca</p>
                    <p className="text-xs text-gray-500">Respons positif dari berbagai kalangan</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition">
                  <div className="bg-emerald-50 p-2 rounded-lg" aria-hidden>
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">Garansi Kualitas Cetak</p>
                    <p className="text-xs text-gray-500">Cetak tajam, kertas premium</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition">
                  <div className="bg-emerald-50 p-2 rounded-lg" aria-hidden>
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-900">Standar Kemenag RI</p>
                    <p className="text-xs text-gray-500">Rasm Utsmani sesuai standar</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="harga" className="section-padding bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-center mb-3" aria-hidden>
                <img src="/logo.png" alt="" className="h-8 w-auto opacity-80" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">Mulai Perjalanan Membaca Al-Qur'an dengan Lebih Baik</h2>
              <div className="mt-2 flex items-center justify-center text-sm md:text-base">
                <div className="bg-white/15 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Promo berakhir dalam: {countdown.days}h {countdown.hours}j {countdown.minutes}m {countdown.seconds}d
                  </span>
                </div>
              </div>
              <p className="mt-3 text-center text-lg opacity-90">Dapatkan Al-Qur'an Kharisma hari ini dan rasakan perbedaannya.</p>
              <p className="mt-1 text-center text-sm opacity-90">
                Ingin berkontribusi? <a href="#/wakaf" className="underline font-semibold">Wakaf Al-Qur’an Kharisma →</a>
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-sm opacity-80">Harga Normal</p>
                    <p className="text-2xl font-bold line-through">Rp 350.000</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Harga Spesial</p>
                    <p className="text-4xl font-extrabold">Rp 297.000</p>
                    <span className="mt-1 inline-block bg-gold-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      Hemat Rp 53.000
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold mb-2">Bonus:</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start"><Check className="w-4 h-4 text-emerald-200 mr-2 mt-0.5" /> WA grup Indonesia Bisa Mengaji</li>
                      <li className="flex items-start"><Check className="w-4 h-4 text-emerald-200 mr-2 mt-0.5" /> Bimbingan mengaji 1 bulan</li>
                      <li className="flex items-start"><Check className="w-4 h-4 text-emerald-200 mr-2 mt-0.5" /> Buku saku dzikir</li>
                      <li className="flex items-start"><Check className="w-4 h-4 text-emerald-200 mr-2 mt-0.5" /> E-book premium</li>
                    </ul>
                    <p className="text-xs text-emerald-100 mt-2">Promo terbatas hingga akhir bulan</p>
                  </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  <div className="relative group">
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold py-3 px-4 rounded-full flex items-center justify-center transition-transform hover:animate-hover-bounce"
                      aria-label="Pesan via WhatsApp"
                    >
                      <Phone className="w-5 h-5 mr-2" /> Pesan via WhatsApp
                    </a>
                    <div role="tooltip" className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      Pesan Sekarang Disini!
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                  <div className="relative group">
                    <a
                      href="#"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                      aria-disabled="true"
                      title="Belum tersedia"
                      className="bg-emerald-50 text-emerald-900 font-semibold py-3 px-4 rounded-full flex items-center justify-center opacity-60 cursor-not-allowed"
                      aria-label="Shopee segera hadir"
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" /> Segera Hadir
                    </a>
                    <div role="tooltip" className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      Channel ini segera hadir
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                  <div className="relative group">
                    <a
                      href="#"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                      aria-disabled="true"
                      title="Belum tersedia"
                      className="bg-emerald-50 text-emerald-900 font-semibold py-3 px-4 rounded-full flex items-center justify-center opacity-60 cursor-not-allowed"
                      aria-label="Tokopedia segera hadir"
                    >
                      <Store className="w-5 h-5 mr-2" /> Segera Hadir
                    </a>
                    <div role="tooltip" className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition">
                      Channel ini segera hadir
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-emerald-100 text-sm">
                  <div className="flex items-center justify-center gap-2"><Shield className="w-4 h-4" /> Garansi uang kembali</div>
                  <div className="flex items-center justify-center gap-2"><Truck className="w-4 h-4" /> Pengiriman aman</div>
                  <div className="flex items-center justify-center gap-2"><Award className="w-4 h-4" /> Kualitas terbaik</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div>
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo Al-Qur'an Kharisma" className="h-10 md:h-12 w-auto" />
                  <p className="font-bold text-emerald-700 text-xl">Al-Qur'an Kharisma</p>
                </div>
                <p className="mt-3 text-sm text-gray-600">Tajwid berwarna & terjemahan untuk memudahkan Anda membaca Al-Qur'an dengan benar.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Kontak</p>
                <p className="text-sm text-gray-600">Email: pondokdigitalpreneur@gmail.com</p>
                <p className="text-sm text-gray-600">WhatsApp: 0878-7971-3808</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Ikuti Kami</p>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-600 hover:text-emerald-600" aria-label="Instagram">Instagram</a>
                  <a href="#" className="text-gray-600 hover:text-emerald-600" aria-label="TikTok">TikTok</a>
                  <a href="#" className="text-gray-600 hover:text-emerald-600" aria-label="YouTube">YouTube</a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-xs text-gray-500">© {new Date().getFullYear()} Kharisma Quran. All rights reserved.</div>
          </div>
        </footer>
        </>
        )}
      </main>

      {/* Sticky CTA */}
      {showStickyCta && !showSplash && (
        <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 z-50">
          <div className="bg-emerald-600 text-white rounded-full shadow-xl px-4 py-3 md:py-3.5 flex items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="hidden md:block h-6 w-auto opacity-90" aria-hidden />
              <span className="text-sm md:text-base font-semibold">Hanya 297rb, Bonus E-Book & Grup Belajar!</span>
            </div>
            <div className="flex items-center gap-2">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-700 font-semibold px-3 md:px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Pesan</a>
              <button onClick={() => setShowStickyCta(false)} aria-label="Tutup" className="bg-white/15 hover:bg-white/25 rounded-full p-1.5 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
