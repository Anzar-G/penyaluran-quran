import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Check, Users, Award, Shield, BookOpen, Star, ChevronLeft, User, Phone, Mail, Wallet } from 'lucide-react';

type Testi = { id:number; name:string; role:string; rating:number; content:string };

const renderStars = (rating:number) => {
  const clamped = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex" aria-label={`Rating ${clamped} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, clamped - i));
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

const formatNumber = (n:number) => n.toLocaleString('id-ID');

const Counter: React.FC<{ target:number; label:string }> = ({ target, label }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (t:number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(target * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return (
    <div className="text-center p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
      <p className="text-2xl md:text-3xl font-extrabold text-emerald-700">{formatNumber(val)}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

const Wakaf: React.FC = () => {
  const testi: Testi[] = useMemo(() => ([
    { id:1, name:'Siti Nurhaliza', role:'Ibu Rumah Tangga, Jakarta', rating:5, content:'Saya wakafkan 5 mushaf untuk pesantren di Aceh. Alhamdulillah, saya dapat notifikasi foto santri yang menerimanya. Rasanya senang sekali bisa berkontribusi.' },
    { id:2, name:'Muhammad Faisal', role:'Mahasiswa, Bandung', rating:4.5, content:'Saya wakafkan 1 mushaf tiap bulan. Ini cara saya beramal rutin tanpa harus keluar rumah. Semoga jadi amal jariyah yang tak putus.' },
    { id:3, name:'Ustaz Arifin', role:"Guru Qur'an, Surabaya", rating:5, content:'Wakaf Quran Kharisma sangat membantu kami di pesantren. Santri jadi lebih semangat belajar tajwid karena mushafnya jelas dan nyaman.' },
  ]), []);
  const [page, setPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [notes, setNotes] = useState('');
  const pageSize = 1;
  const total = Math.ceil(testi.length / pageSize);
  const visible = testi.slice(page * pageSize, page * pageSize + pageSize);
  const buildWaMessage = () => {
    const lines = [
      "Assalamu'alaikum, saya ingin konfirmasi wakaf Al-Qur'an.",
      fullName ? `Nama: ${fullName}` : undefined,
      whatsapp ? `WhatsApp: ${whatsapp}` : undefined,
      email ? `Email: ${email}` : undefined,
      amount ? `Nominal: Rp ${amount}` : undefined,
      notes ? `Catatan: ${notes}` : undefined,
      '',
      'Saya telah transfer ke BSI 7777 177 995 a.n. Pondok Abdurrahman bin Auf.',
    ].filter(Boolean).join('\n');
    return `https://wa.me/6287879713808?text=${encodeURIComponent(lines)}`;
  };
  const waLink = buildWaMessage();
  const handleConfirm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setFullName('');
    setEmail('');
    setWhatsapp('');
    setAmount('');
    setNotes('');
    window.open(waLink, '_blank');
  };
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-12 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Jangan Tunda, Sebarkan Cahaya Tilawah Hari Ini!</h1>
            <p className="mt-4 text-lg text-gray-700">Setiap detik yang Anda tunda, bisa jadi peluang hilang bagi santri yang menanti mushaf ini. Dengan satu klik, Anda sudah membuka pintu kebaikan yang tak terbatas.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#" onClick={(e)=>{e.preventDefault(); scrollToId('wakaf-form');}} className="btn-primary text-base py-3 inline-flex items-center justify-center">Mulai Wakaf Sekarang <ChevronRight className="ml-2 w-5 h-5"/></a>
              <a href="#" onClick={(e)=>{e.preventDefault(); scrollToId('wakaf-cara');}} className="btn-secondary text-base py-3 inline-flex items-center justify-center">Lihat Cara Kerja Wakaf</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Counter target={12487} label="Mushaf Terwakafkan"/>
              <Counter target={217} label="Pesantren & Masjid"/>
              <Counter target={3892} label="Santri Terbantu"/>
            </div>
          </div>
          <div>
            <div className="rounded-xl overflow-hidden shadow-xl border bg-white">
              <img src="https://placehold.co/800x600?text=Wakaf+Hero" alt="Penyerahan mushaf ke santri" className="w-full h-auto object-cover aspect-[4/3]"/>
            </div>
          </div>
        </div>
      </section>

      {/* Pengumuman Penyaluran */}
      <section className="py-6 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl bg-white border border-emerald-100 p-5 md:p-6 shadow-sm">
            <p className="text-emerald-800 font-semibold">Alhamdulillah…</p>
            <p className="text-gray-700 mt-1">Jazakumullahu khairan katsīran kepada seluruh Bapak/Ibu Donatur yang telah berpartisipasi dalam Program Wakaf Al-Qur’an.</p>
            <p className="mt-3 text-gray-900 font-semibold">Sebanyak <span className="text-emerald-700">110 mushaf Al-Qur’an</span> telah tersalurkan ke beberapa tempat di wilayah Cirebon.</p>
            <p className="mt-2 text-gray-600 text-sm">Semoga setiap huruf yang dibaca menjadi amal jariyah yang terus mengalir hingga hari akhir. Aamiin 🤲🏻😊</p>
          </div>
        </div>
      </section>

      {/* Mengapa */}
      <section id="wakaf-mengapa" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Bukan Hanya Donasi — Ini Investasi Akhirat yang Nyata</h2>
          <p className="section-subtitle">Al-Qur’an Kharisma dirancang agar mudah dibaca, dipahami, dan dihafal — efektif untuk pemula hingga mahir.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
              <div className="bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4"><MessageCircleIcon/></div>
              <h3 className="font-semibold text-gray-900 mb-1">Tajwid 15 Warna</h3>
              <p className="text-gray-600 text-sm">Mudah bedakan hukum bacaan</p>
            </div>
            <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
              <div className="bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4"><BookOpen className="w-7 h-7 text-emerald-700"/></div>
              <h3 className="font-semibold text-gray-900 mb-1">Terjemah Per Kata</h3>
              <p className="text-gray-600 text-sm">Pahami makna tanpa kehilangan konteks</p>
            </div>
            <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
              <div className="bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4"><Shield className="w-7 h-7 text-emerald-700"/></div>
              <h3 className="font-semibold text-gray-900 mb-1">Kertas Premium HVS</h3>
              <p className="text-gray-600 text-sm">Nyaman dibaca lama, tidak tembus</p>
            </div>
            <div className="bg-white p-6 rounded-xl border hover:shadow-md transition">
              <div className="bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4"><Award className="w-7 h-7 text-emerald-700"/></div>
              <h3 className="font-semibold text-gray-900 mb-1">Cover Hardcover Eksklusif</h3>
              <p className="text-gray-600 text-sm">Tahan lama, elegan, dan berkelas</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <a href="#fitur" className="btn-primary inline-flex items-center">Pelajari Lebih Lanjut <ChevronRight className="ml-2 w-5 h-5"/></a>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section id="wakaf-cara" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Setiap Rupiah Anda, Langsung Sampai ke Tangan Santri</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title:'Anda Berwakaf', desc:'Donasi Anda dikumpulkan dan dikelola secara transparan.', icon:<Users className="w-7 h-7 text-emerald-700"/> },
              { title:'Kami Distribusikan', desc:'Mushaf dikirim ke pesantren, TPQ, atau masjid mitra di seluruh Indonesia.', icon:<TruckIcon/> },
              { title:'Santri Menerima & Belajar', desc:'Santri menggunakan Al-Qur’an Kharisma untuk tilawah, hafalan, dan memperbaiki tajwid.', icon:<BookOpen className="w-7 h-7 text-emerald-700"/> },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-3" aria-hidden>{s.icon}</div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">Dari 1 Mushaf = 1 Santri bisa tilawah dengan benar selama ±5 tahun</div>
          <div className="mt-6 max-w-2xl mx-auto bg-white border rounded-xl p-4 italic text-emerald-900/90">
            “Alhamdulillah, sejak dapat wakaf Quran Kharisma, santri kami lebih percaya diri baca Al-Qur’an di depan guru.” — <b>Ustaz Ahmad</b>, Pesantren Darul Falah, Jawa Tengah
          </div>
        </div>
      </section>

      {/* Dampak */}
      <section id="wakaf-dampak" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Lihat Sendiri, Bagaimana Wakaf Anda Mengubah Hidup Santri</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Counter target={12487} label="Mushaf Terwakafkan"/>
            <Counter target={217} label="Pesantren & Masjid"/>
            <Counter target={3892} label="Santri Pemula Terbantu"/>
          </div>
          <div className="mt-8">
            <div className="rounded-xl overflow-hidden border bg-white">
              <img src="https://placehold.co/1280x720?text=Galeri+Wakaf" alt="Penyaluran wakaf" className="w-full h-auto object-cover aspect-[16/9]"/>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">Santri di Pondok Modern Gresik menerima wakaf Quran Kharisma minggu lalu.</p>
            <div className="text-center mt-4">
              <a href="#wakaf-galeri" className="btn-secondary">Lihat Galeri Penyaluran Wakaf</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Wakif */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title">Testimoni Wakif: “Saya Merasa Ikut Menyebarkan Cahaya Ilmu”</h2>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            {visible.map((t) => (
              <div key={t.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                  {renderStars(t.rating)}
                </div>
                <p className="mt-3 text-gray-700">“{t.content}”</p>
              </div>
            ))}
            <div className="flex justify-center items-center gap-3 mt-5">
              <button onClick={() => setPage((p)=>Math.max(0,p-1))} disabled={page===0} className={`w-10 h-10 rounded-full border shadow-sm ${page===0?'text-gray-300 cursor-not-allowed':'text-gray-600 hover:bg-gray-50 active:bg-emerald-600 active:text-white'}`} aria-label="Sebelumnya">
                <ChevronLeft className="w-5 h-5"/>
              </button>
              {Array.from({length: total}).map((_,i)=>(
                <button key={i} onClick={()=>setPage(i)} className={`min-w-[36px] h-9 px-3 rounded-full text-sm font-medium border ${i===page?'bg-emerald-600 text-white border-emerald-600':'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'}`}>{i+1}</button>
              ))}
              <button onClick={() => setPage((p)=>Math.min(total-1,p+1))} disabled={page===total-1} className={`w-10 h-10 rounded-full border shadow-sm ${page===total-1?'text-gray-300 cursor-not-allowed':'text-gray-600 hover:bg-gray-50 active:bg-emerald-600 active:text-white'}`} aria-label="Berikutnya">
                <ChevronRight className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Paket Wakaf */}
      <section id="wakaf-paket" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Pilih Nominal Sesuai Kemampuan — Semua Bernilai Sama di Sisi Allah</h2>
          <div className="grid md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title:'Paket Santri', price:'Rp 297.000', desc:'1 Mushaf untuk 1 Santri' },
              { title:'Paket Kelas', price:'Rp 1.485.000', desc:'5 Mushaf untuk 1 Kelas Tilawah' },
              { title:'Paket Pesantren', price:'Rp 5.940.000', desc:'20 Mushaf untuk 1 Pesantren Kecil' },
              { title:'Paket Bebas', price:'Sesuai Keinginan', desc:'Tulis nominal sendiri' },
            ].map((p, i) => (
              <div key={i} className={`rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition ${i===1?'ring-2 ring-emerald-500/20':''}`}>
                <p className="font-semibold text-gray-900">{p.title}</p>
                <p className="text-2xl font-extrabold text-emerald-700 mt-1">{p.price}</p>
                <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
                <ul className="text-sm text-gray-700 mt-3 space-y-1">
                  <li className="flex"><Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5"/> Sertifikat Wakaf Digital</li>
                  <li className="flex"><Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5"/> Nama dicantumkan di halaman Para Wakif</li>
                  <li className="flex"><Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5"/> Notifikasi foto penyaluran via WhatsApp</li>
                </ul>
                <a href="#wakaf-form" className="btn-primary mt-4 inline-flex items-center">Wakaf Sekarang <ChevronRight className="ml-2 w-5 h-5"/></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparansi */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Kami Komitmen Transparan — Setiap Donasi Dilaporkan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border p-5 flex items-center gap-3"><Award className="w-6 h-6 text-emerald-700"/><div><p className="font-semibold">Rekomendasi Ulama</p><p className="text-sm text-gray-600">Dukungan tim ulama internal</p></div></div>
            <div className="bg-white rounded-xl border p-5 flex items-center gap-3"><BookOpen className="w-6 h-6 text-emerald-700"/><div><p className="font-semibold">Standar Kemenag RI</p><p className="text-sm text-gray-600">Rasm Utsmani sesuai standar</p></div></div>
            <div className="bg-white rounded-xl border p-5 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-700"/><div><p className="font-semibold">Laporan Bulanan</p><p className="text-sm text-gray-600">Dipublikasi di website & grup WA</p></div></div>
            <div className="bg-white rounded-xl border p-5 flex items-center gap-3"><Users className="w-6 h-6 text-emerald-700"/><div><p className="font-semibold">Garansi</p><p className="text-sm text-gray-600">Uang kembali jika tidak sampai</p></div></div>
          </div>
        </div>
      </section>

      {/* Form Donasi */}
      <section id="wakaf-form" className="section-padding bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-title">Silakan Isi Data Diri Anda — Kami Akan Proses Wakaf Anda dengan Cepat & Aman</h2>
          <form className="bg-white rounded-2xl border p-5 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                <div className="mt-1 relative">
                  <User className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Muhammad Faisal (untuk sertifikat wakaf)"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email Aktif</label>
                <div className="mt-1 relative">
                  <Mail className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="faisal@gmail.com (untuk notifikasi & e-sertifikat)"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Nomor WhatsApp</label>
                <div className="mt-1 relative">
                  <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <input value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} className="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="081234567890 (untuk konfirmasi & update penyaluran)"/>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Nominal Wakaf</label>
                <div className="mt-1 relative">
                  <Wallet className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Pilih atau tulis sendiri (minimal Rp297.000)"/>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">Catatan (opsional)</label>
              <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-emerald-300" placeholder="Contoh: ‘Untuk santri di Aceh’, ‘Doakan keluarga saya’, dll"></textarea>
            </div>
            <div className="mt-4 border rounded-xl p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700">Transfer ke Rekening Resmi Pondok Digital Quran Aba</p>
              <div className="mt-2 grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border bg-white p-3">
                  <p className="text-xs text-gray-500">🏦 BANK</p>
                  <p className="font-semibold text-gray-900">BSI</p>
                </div>
                <div className="rounded-xl border bg-white p-3">
                  <p className="text-xs text-gray-500">🔢 Nomor Rekening</p>
                  <p className="font-semibold text-gray-900">7777 177 995</p>
                </div>
                <div className="rounded-xl border bg-white p-3">
                  <p className="text-xs text-gray-500">👤 Atas Nama</p>
                  <p className="font-semibold text-gray-900">Pondok Abdurrahman bin Auf</p>
                </div>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-600">Tombol Aksi</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard.writeText('BSI 7777 177 995 a.n. Pondok Abdurrahman bin Auf'); setCopied(true); setTimeout(()=>setCopied(false), 1500); }}
                    className="btn-secondary"
                  >
                    {copied ? 'Tersalin ✓' : '📋 Salin Nomor Rekening'}
                  </button>
                </div>
              </div>
              <ul className="mt-3 text-xs text-gray-600 space-y-1">
                <li className="flex"><Check className="w-4 h-4 text-emerald-600 mr-2"/> Pembayaran akan diproses maksimal 24 jam setelah konfirmasi.</li>
                <li className="flex"><Check className="w-4 h-4 text-emerald-600 mr-2"/> Semua transaksi tercatat dan dilaporkan secara transparan.</li>
              </ul>
            </div>
            <a href={waLink} onClick={handleConfirm} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full py-3 text-lg text-center inline-block">🌿 Konfirmasi Pembayaran via WhatsApp — Proses Cepat & Aman</a>
            <p className="text-xs text-gray-600 text-center mt-2">Silakan transfer ke rekening di atas, lalu klik tombol untuk konfirmasi agar tim kami memproses penyaluran.</p>
          </form>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-white border rounded-xl p-3"><Award className="w-4 h-4 text-emerald-700"/> Rekomendasi Ulama</div>
            <div className="flex items-center gap-2 bg-white border rounded-xl p-3"><BookOpen className="w-4 h-4 text-emerald-700"/> Standar Kemenag RI</div>
            <div className="flex items-center gap-2 bg-white border rounded-xl p-3"><Shield className="w-4 h-4 text-emerald-700"/> Garansi Uang Kembali</div>
            <div className="flex items-center gap-2 bg-white border rounded-xl p-3"><Users className="w-4 h-4 text-emerald-700"/> Transparansi Laporan</div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6 italic">“Barangsiapa yang menunjuki kepada kebaikan, maka dia akan mendapatkan pahala seperti pahala orang yang mengerjakannya.” — HR. Muslim</p>
        </div>
      </section>

      

      {/* Sticky CTA di-nonaktifkan agar tidak duplikat tombol konfirmasi */}
    </div>
  );
};

const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-700"><path d="M7 7h10v2H7zm0 4h7v2H7z"/><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
);
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-700"><path d="M3 4h13v10H3z"/><path d="M16 8h4l1 3v3h-5z"/><circle cx="7" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg>
);

export default Wakaf;
