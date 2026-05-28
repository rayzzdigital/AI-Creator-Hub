react
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Calculator, 
  FileText, 
  Search, 
  Settings, 
  Moon, 
  Sun, 
  TrendingUp, 
  Share2, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  ExternalLink,
  DollarSign,
  Heart,
  MessageCircle,
  Eye,
  Info,
  BookOpen,
  Send,
  Download,
  Flame,
  Globe,
  Award
} from 'lucide-react';

// ==========================================
// CONFIG & DATASET
// ==========================================

const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'seo-creator-hub';
const GEMINI_API_KEY = ""; // Diisi otomatis oleh environment atau input user

const TOOLS_DATA = [
  {
    id: "tiktok-money-calculator",
    title: "Kalkulator Gaji & Penghasilan TikTok",
    category: "Calculator",
    shortDesc: "Estimasi penghasilan akun TikTok Anda berdasarkan jumlah followers, views, dan engagement rate secara real-time.",
    icon: Calculator,
    popularity: 98,
    isViral: true,
    targetTraffic: "TikTok & Pinterest",
    metaTitle: "TikTok Money Calculator - Estimasi Pendapatan TikToker Gratis",
    metaDesc: "Hitung perkiraan pendapatan akun TikTok Anda dengan kalkulator TikTok gratis. Analisis engagement, taksir RPM/CPM sponsor, dan optimalkan monetisasi konten Anda.",
    viralHook: "Cara FYP & Hitung Gaji TikTok-mu! Screen record halaman ini untuk konten pembuktian penghasilan di video TikTok kamu.",
    pinIdea: "Desain Pin Pinterest: Latar belakang gradient neon, teks bold 'Berapa Penghasilan Akun 10K Followers? Cek Sekarang!'",
    article: {
      title: "Panduan Lengkap Cara Menghitung & Meningkatkan Gaji TikTok Creator",
      headings: [
        {
          title: "Bagaimana Kalkulator TikTok Ini Bekerja?",
          content: "Kalkulator Penghasilan TikTok kami bekerja dengan menganalisis metrik utama akun Anda seperti total pengikut (followers), rata-rata penayangan video (views), serta tingkat keterlibatan (engagement rate). Industri pemasaran influencer saat ini menggunakan metrik RPM (Revenue Per Mille) atau taksiran biaya per 1.000 tayangan untuk menghitung nilai kolaborasi brand."
        },
        {
          title: "Sumber Penghasilan Utama TikTok Creator",
          content: "Seorang kreator tidak hanya mengandalkan TikTok Creator Rewards Program. Ada beberapa kanal pendapatan lain yang jauh lebih menguntungkan: 1) Sponsor Brand Deals (Endorsement), 2) TikTok Shop Affiliate (Komisi penjualan produk), 3) Live Gifting saat siaran langsung, dan 4) Menjual produk digital atau jasa sendiri."
        },
        {
          title: "Cara Meningkatkan Nilai Akun Anda Agar Dilirik Brand",
          content: "Untuk menaikkan tarif endorsement Anda, fokuslah pada peningkatan Engagement Rate (ER) dibanding hanya sekadar jumlah followers. Brand lebih menyukai kreator dengan audiens yang aktif memberikan komentar, menyukai, dan membagikan konten. Pastikan Anda memiliki niche yang spesifik seperti kuliner, edukasi keuangan, atau kecantikan."
        }
      ]
    }
  },
  {
    id: "ai-article-generator",
    title: "AI SEO Article & Outline Writer",
    category: "AI Creator Tools",
    shortDesc: "Tulis draf artikel SEO lengkap dengan struktur heading H2, H3, dan optimasi meta description instan bertenaga AI Gemini.",
    icon: Sparkles,
    popularity: 95,
    isViral: true,
    targetTraffic: "Google SEO",
    metaTitle: "AI SEO Writer Gratis - Generator Artikel & Outline Blog Otomatis",
    metaDesc: "Gunakan AI Creator Tools terbaik untuk menulis artikel SEO secara gratis. Dilengkapi analisis keyword, meta tag generator, dan struktur artikel standar Google.",
    viralHook: "Rekomendasi AI gratis pengganti penulis berbayar! Bikin konten 1000 kata cuma dalam 5 detik. Cocok untuk bahan video tips blogger.",
    pinIdea: "Desain Pin Pinterest: Mockup laptop dengan artikel otomatis terbuka. Teks: 'Trik Rahasia Menulis 10 Artikel SEO Sehari Tanpa Lelah!'",
    article: {
      title: "Revolusi Content Writing: Mengapa AI Generator Penting untuk SEO Modern",
      headings: [
        {
          title: "Optimasi Konten Blog dengan AI Creator Tools",
          content: "Menulis konten berkualitas tinggi secara konsisten adalah kunci utama dalam memenangkan persaingan di Google SERP. Dengan bantuan kecerdasan buatan seperti AI SEO Writer, Anda dapat memangkas waktu riset, menyusun outline tulisan yang logis, dan memastikan kata kunci target tersebar secara natural tanpa keyword stuffing."
        },
        {
          title: "Bagaimana Cara Menggunakan Tool AI Ini Agar Lolos Sensor Google?",
          content: "Google secara resmi menyatakan tidak melarang penggunaan konten buatan AI selama konten tersebut ditulis untuk memberikan manfaat nyata bagi pembaca (bermanfaat, kredibel, dan orisinal - prinsip E-E-A-T). Pastikan Anda selalu melakukan editing akhir, menambahkan opini personal, riset kasus riil, serta menyertakan data pendukung yang valid sebelum dipublikasikan."
        },
        {
          title: "Internal Linking Dinamis: Kunci Meningkatkan Page Authority",
          content: "Saat mempublikasikan artikel baru hasil generate AI, sangat direkomendasikan untuk menautkannya secara internal dengan artikel relevan lainnya di blog Anda. Hal ini akan mempermudah bot Google dalam merayapi situs Anda serta menjaga agar pengunjung tetap betah berlama-lama membaca artikel Anda."
        }
      ]
    }
  },
  {
    id: "seo-schema-generator",
    title: "SEO JSON-LD Schema Markup Generator",
    category: "SEO Tools",
    shortDesc: "Buat kode Schema Markup terstruktur (FAQ, Article, Product) dalam format JSON-LD untuk mendapatkan Rich Snippet di Google.",
    icon: FileText,
    popularity: 88,
    isViral: false,
    targetTraffic: "Google SEO",
    metaTitle: "JSON-LD Schema Markup Generator Gratis untuk SEO Google",
    metaDesc: "Buat kode schema markup terstruktur dengan mudah untuk meningkatkan CTR pencarian organik situs Anda. Dukung tipe FAQ, Article, dan Local Business.",
    viralHook: "Cara agar website kamu tampil beda di Google pencarian! Pakai kode ajaib ini biar dapet bintang dan daftar tanya jawab instan.",
    pinIdea: "Desain Pin Pinterest: Visual hasil pencarian Google dengan bintang rating kuning bersinar. Teks: 'Cara Dapatkan Rich Snippet Google Cepat & Mudah!'",
    article: {
      title: "Panduan Schema Markup: Meningkatkan CTR Pencarian Organik Hingga 30%",
      headings: [
        {
          title: "Apa Itu Schema Markup dan Mengapa Penting?",
          content: "Schema markup adalah kode (kosakata semantik) yang ditempatkan pada situs web untuk membantu mesin pencari mengembalikan hasil yang lebih informatif bagi pengguna. Hasil pencarian yang diperkaya ini biasa disebut Rich Snippets, yang terbukti secara signifikan meningkatkan click-through rate (CTR) dibanding hasil pencarian biasa."
        },
        {
          title: "Keuntungan Menggunakan Format JSON-LD dibanding Microdata",
          content: "Google secara eksplisit menyarankan penggunaan format JSON-LD untuk implementasi schema markup. JSON-LD lebih mudah dikelola karena ditulis dalam format JavaScript multidimensi yang diletakkan di bagian head atau body dokumen HTML, tanpa perlu membungkus elemen visual HTML secara langsung seperti Microdata."
        },
        {
          title: "Cara Memvalidasi Schema Markup yang Telah Dibuat",
          content: "Setelah menyalin kode dari generator kami, selalu pastikan untuk mengujinya menggunakan alat resmi milik Google yaitu 'Rich Results Test' atau validator skema Schema.org. Ini berguna untuk mendeteksi adanya kesalahan sintaks atau properti wajib yang terlewat sebelum merusak reputasi crawling situs Anda."
        }
      ]
    }
  },
  {
    id: "keyword-density-checker",
    title: "SEO Keyword Density Analyzer & Checker",
    category: "Checker",
    shortDesc: "Analisis kepadatan kata kunci pada artikel Anda secara instan untuk menghindari over-optimization dan pinalti Google.",
    icon: Search,
    popularity: 91,
    isViral: false,
    targetTraffic: "Google SEO",
    metaTitle: "SEO Keyword Density Checker - Analisis Kepadatan Kata Kunci Artikel",
    metaDesc: "Cek persentase keyword density artikel Anda secara gratis. Hindari keyword stuffing agar terhindar dari pembaruan algoritma Google SpamBrain.",
    viralHook: "Rahasia artikel ranking 1 Google: Jangan kepenuhan masukin kata kunci! Cek kepadatan kata-katamu pakai tool gratis ini sekarang.",
    pinIdea: "Desain Pin Pinterest: Infografis tentang struktur penulisan artikel SEO yang ideal dengan persentase kepadatan kata kunci terbaik.",
    article: {
      title: "Aturan Keyword Density Terbaik untuk Menembus Halaman Pertama Google",
      headings: [
        {
          title: "Apa Itu Over-Optimization & Keyword Stuffing?",
          content: "Keyword stuffing adalah tindakan memanipulasi algoritma pencarian dengan mengulang kata kunci yang sama secara berlebihan di dalam satu halaman konten. Hal ini membuat tulisan menjadi tidak nyaman dibaca oleh manusia dan sangat rentan terkena penalti algoritma Google SpamBrain."
        },
        {
          title: "Berapa Persentase Kepadatan Kata Kunci yang Ideal?",
          content: "Rekomendasi umum dari para pakar SEO dunia adalah berkisar antara 1% hingga 2% dari total kata artikel Anda. Artinya, untuk artikel sepanjang 1.000 kata, kata kunci utama Anda sebaiknya hanya muncul sebanyak 10 hingga 20 kali saja secara alami dan tersebar proporsional."
        },
        {
          title: "Strategi Penggunaan LSI (Latent Semantic Indexing) Keywords",
          content: "Alih-alih mengulang kata kunci utama, gunakanlah kata kunci LSI atau sinonim yang relevan secara kontekstual. Misalnya, jika kata kunci utama Anda adalah 'belajar gitar', Anda bisa menyisipkan kata pendukung seperti 'kunci dasar', 'akord', 'cara menyetem senar', dan 'les musik'."
        }
      ]
    }
  },
  {
    id: "pinterest-tag-generator",
    title: "Pinterest Tag & Title Generator",
    category: "Generator",
    shortDesc: "Buat judul pin menarik (clickbait aman) beserta kumpulan tag populer otomatis untuk mendominasi traffic Pinterest.",
    icon: TrendingUp,
    popularity: 94,
    isViral: true,
    targetTraffic: "Pinterest",
    metaTitle: "Pinterest Tag & Title Generator Online - Optimasi SEO Pinterest",
    metaDesc: "Dapatkan ribuan traffic gratis dari Pinterest! Generator judul pin atraktif dan riset hashtag otomatis untuk meningkatkan jangkauan klik visual Anda.",
    viralHook: "Buat kalian yang jualan produk digital atau blog tapi sepi traffic, nih rahasia naikin views Pinterest lewat kombinasi judul & tag viral ini!",
    pinIdea: "Desain Pin Pinterest: Teks estetik berlatar merah khas Pinterest 'Dapat 50K Views/Bulan dari Pinterest Hanya Dengan Mengubah Format Teks Ini!'",
    article: {
      title: "Panduan Meraup Ratusan Ribu Pengunjung Blog dari Pinterest SEO",
      headings: [
        {
          title: "Pinterest Sebagai Mesin Pencari Visual Terbesar",
          content: "Banyak orang salah mengira Pinterest adalah media sosial biasa. Faktanya, Pinterest bekerja layaknya mesin pencari visual (visual search engine) seperti Google. Pengguna datang ke Pinterest untuk mencari inspirasi, solusi masalah, panduan, atau produk untuk dibeli menggunakan kata kunci tertentu."
        },
        {
          title: "Pentingnya Judul Pin yang Memancing Klik (CTR Tinggi)",
          content: "Judul pin Anda harus mengombinasikan dua aspek utama: Kata kunci pencarian populer (untuk algoritma) dan copywriting yang memicu rasa penasaran pembaca (untuk manusia). Gunakan angka, kata sifat yang kuat, atau kalimat tanya yang menantang emosi pembaca."
        },
        {
          title: "Strategi Pengelompokan Tag & Hashtag Relevan",
          content: "Pinterest mengategorikan konten Anda berdasarkan deskripsi dan tag yang Anda sematkan. Memasukkan 5-10 tag yang sangat relevan akan membantu sistem rekomendasi AI Pinterest untuk menampilkan pin Anda di beranda (home feed) pengguna yang menyukai topik serupa."
        }
      ]
    }
  }
];

export default function App() {
  // Navigation & UI States
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'tool' | 'about' | 'viral-hub'
  const [selectedToolId, setSelectedToolId] = useState('tiktok-money-calculator');
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Interactive Tools Internal States
  // 1. TikTok Calc States
  const [followers, setFollowers] = useState(15000);
  const [avgViews, setAvgViews] = useState(8000);
  const [engagement, setEngagement] = useState(4.5);
  const [tiktokResults, setTiktokResults] = useState(null);

  // 2. AI Writer States
  const [aiTopic, setAiTopic] = useState('Tips Diet Sehat untuk Pekerja Kantoran');
  const [aiTone, setAiTone] = useState('Informatif & Edukatif');
  const [aiKeyword, setAiKeyword] = useState('diet sehat, turun berat badan');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // 3. Schema Generator States
  const [schemaType, setSchemaType] = useState('FAQ');
  const [schemaInputs, setSchemaInputs] = useState({
    faqQ1: 'Apa keuntungan menggunakan tool gratis ini?',
    faqA1: 'Anda bisa menghemat waktu pembuatan artikel dan optimasi SEO secara otomatis.',
    faqQ2: 'Apakah tool ini aman digunakan?',
    faqA2: 'Ya, semua tool kami aman dan mematuhi kebijakan Google Webmaster.',
    artTitle: 'Cara Optimasi Blog di Tahun 2026',
    artAuthor: 'Admin SEO Creator',
    artUrl: 'https://seocreatorhub.test/blog/cara-optimasi'
  });
  const [schemaCode, setSchemaCode] = useState('');

  // 4. Keyword Density States
  const [rawText, setRawText] = useState('Menulis artikel SEO memerlukan strategi riset kata kunci yang tepat. Kata kunci harus ditempatkan secara alami. Jika kata kunci terlalu sering diulang, Google akan menganggapnya sebagai keyword stuffing yang membahayakan reputasi blog Anda. Belajarlah menggunakan kata kunci pendukung untuk menjaga kualitas artikel SEO.');
  const [densityResults, setDensityResults] = useState([]);

  // 5. Pinterest Generator States
  const [pinTopic, setPinTopic] = useState('Cara Menghasilkan Uang dari Blog');
  const [pinTarget, setPinTarget] = useState('Blogger Pemula');
  const [pinResults, setPinResults] = useState(null);

  // Global Notification/Toast Simulation
  const [toastMessage, setToastMessage] = useState('');

  // Selected tool object helper
  const activeTool = TOOLS_DATA.find(t => t.id === selectedToolId) || TOOLS_DATA[0];

  // Auto Calculations on mount/state changes
  useEffect(() => {
    calculateTikTokEarnings();
  }, [followers, avgViews, engagement]);

  useEffect(() => {
    generateSchemaMarkup();
  }, [schemaType, schemaInputs]);

  useEffect(() => {
    calculateKeywordDensity();
  }, [rawText]);

  useEffect(() => {
    generatePinterestConcepts();
  }, [pinTopic, pinTarget]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Copy Clipboard API Helper
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Berhasil disalin ke clipboard!');
    } catch (err) {
      showToast('Gagal menyalin teks.');
    }
    document.body.removeChild(textArea);
  };

  // ------------------------------------------
  // INTERACTIVE CALCULATION LOGICS
  // ------------------------------------------

  const calculateTikTokEarnings = () => {
    // Estimasi RPM / Sponsor Rate berdasarkan engagement & views
    const engagementFactor = engagement / 100;
    const minSponsorRate = Math.round((avgViews * 0.15) + (followers * 0.002));
    const maxSponsorRate = Math.round((avgViews * 0.45) + (followers * 0.008) * (1 + engagementFactor));

    const estRPMMin = 0.02; // dollar per 1000 views
    const estRPMMax = 0.15;

    const minMonthlyRewards = Math.round((avgViews * 30 * estRPMMin));
    const maxMonthlyRewards = Math.round((avgViews * 30 * estRPMMax));

    setTiktokResults({
      sponsorMin: minSponsorRate,
      sponsorMax: maxSponsorRate,
      rewardsMin: minMonthlyRewards,
      rewardsMax: maxMonthlyRewards,
      engagementStatus: engagement > 5 ? 'Sangat Tinggi (Viral)' : engagement > 3 ? 'Bagus (Stabil)' : 'Butuh Peningkatan'
    });
  };

  const generateSchemaMarkup = () => {
    let code = '';
    if (schemaType === 'FAQ') {
      code = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": schemaInputs.faqQ1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": schemaInputs.faqA1
            }
          },
          {
            "@type": "Question",
            "name": schemaInputs.faqQ2,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": schemaInputs.faqA2
            }
          }
        ]
      }, null, 2);
    } else {
      code = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": schemaInputs.artTitle,
        "author": {
          "@type": "Person",
          "name": schemaInputs.artAuthor
        },
        "url": schemaInputs.artUrl,
        "datePublished": new Date().toISOString().split('T')[0],
        "publisher": {
          "@type": "Organization",
          "name": "AI Creator Tools Hub",
          "logo": {
            "@type": "ImageObject",
            "url": "https://seocreatorhub.test/logo.png"
          }
        }
      }, null, 2);
    }
    setSchemaCode(code);
  };

  const calculateKeywordDensity = () => {
    if (!rawText.trim()) {
      setDensityResults([]);
      return;
    }
    const words = rawText.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 3); // minimal 4 huruf untuk menyaring stop words dasar

    const totalWordsCount = words.length;
    if (totalWordsCount === 0) return;

    const freqMap = {};
    words.forEach(w => {
      freqMap[w] = (freqMap[w] || 0) + 1;
    });

    const sorted = Object.entries(freqMap)
      .map(([word, count]) => {
        const percent = ((count / totalWordsCount) * 100).toFixed(1);
        return { word, count, percent: parseFloat(percent) };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setDensityResults(sorted);
  };

  const generatePinterestConcepts = () => {
    const titles = [
      `Bongkar Trik: ${pinTopic} Khusus ${pinTarget}!`,
      `Rahasia Sukses ${pinTopic} yang Jarang Diketahui`,
      `Panduan Lengkap ${pinTopic} Langkah demi Langkah`,
      `Hanya untuk ${pinTarget}: Cara Cepat Menguasai ${pinTopic}`
    ];
    
    const tags = [
      `#${pinTopic.replace(/\s+/g, '')}`,
      `#${pinTarget.replace(/\s+/g, '')}`,
      `#tipsbisnis`,
      `#belajarseo`,
      `#contentcreator`
    ];

    setPinResults({ titles, tags });
  };

  // ------------------------------------------
  // GEMINI API INTEGRATION
  // ------------------------------------------

  const handleAiGeneration = async () => {
    setAiLoading(true);
    setAiError('');
    setAiResult('');

    const systemPrompt = "Anda adalah asisten penulis artikel SEO profesional berbahasa Indonesia. Tugas Anda adalah membantu menulis draf artikel yang ramah SEO Google dan menarik pembaca.";
    const userPrompt = `Buatlah outline dan artikel SEO singkat tentang topik: "${aiTopic}".\nDengan tone bahasa: "${aiTone}".\nTarget keyword utama: "${aiKeyword}".\nFormat artikel harus mencakup:\n1. Judul Menarik & Kreatif\n2. Rekomendasi Meta Deskripsi (maksimal 160 karakter)\n3. Struktur Heading (H2 & H3) beserta draf isi singkat di bawah masing-masing heading.\nSajikan dengan format markdown bersih.`;

    // Implement Exponential Backoff (Up to 5 retries)
    const fetchWithBackoff = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }

        const data = await response.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResult) {
          throw new Error("Gagal menerima hasil text dari model AI.");
        }
        return textResult;
      } catch (err) {
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithBackoff(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const finalResult = await fetchWithBackoff();
      setAiResult(finalResult);
    } catch (err) {
      setAiError('Terjadi kesalahan koneksi atau kuota API habis. Silakan coba beberapa saat lagi.');
    } finally {
      setAiLoading(false);
    }
  };

  // Filtered tools computed property
  const filteredTools = TOOLS_DATA.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <Check className="mr-2 h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setCurrentView('home'); }}>
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-xl text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">CREATOR</span>
              <span className="font-semibold text-sm block -mt-1 opacity-70">SEO & AI Tools Hub</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentView('home')} 
              className={`font-medium transition ${currentView === 'home' ? 'text-emerald-400' : 'hover:text-emerald-300'}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => { setCurrentView('tool'); setSelectedToolId('tiktok-money-calculator'); }} 
              className={`font-medium transition ${currentView === 'tool' && selectedToolId === 'tiktok-money-calculator' ? 'text-emerald-400' : 'hover:text-emerald-300'}`}
            >
              Kalkulator TikTok
            </button>
            <button 
              onClick={() => { setCurrentView('tool'); setSelectedToolId('ai-article-generator'); }} 
              className={`font-medium transition ${currentView === 'tool' && selectedToolId === 'ai-article-generator' ? 'text-emerald-400' : 'hover:text-emerald-300'}`}
            >
              AI SEO Writer
            </button>
            <button 
              onClick={() => setCurrentView('viral-hub')} 
              className={`font-medium transition ${currentView === 'viral-hub' ? 'text-emerald-400' : 'hover:text-emerald-300'}`}
            >
              TikTok & Pinterest Viral Hub ⚡
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border ${darkMode ? 'border-slate-800 bg-slate-900 text-yellow-400 hover:bg-slate-800' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => { setCurrentView('tool'); setSelectedToolId('ai-article-generator'); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/10 transition-all transform active:scale-95 text-sm flex items-center"
            >
              Coba AI Gratis
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Banner Adsterra Top Slot Placeholder */}
      <div className={`py-4 px-4 text-center border-b ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Adsterra Top Leaderboard Mockup */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-slate-800/40 p-3 rounded-xl border border-dashed border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between text-left">
            <div className="mb-2 sm:mb-0">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Sponsor Ad Placement (728x90)</span>
              <p className="text-xs text-slate-400">Dapatkan hosting kencang & domain gratis hari ini!</p>
            </div>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition flex items-center">
              Daftar Sekarang <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase inline-block mb-4">
                🚀 Multi-Platform Traffic Optimizer
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                Tingkatkan Jangkauan & Monetisasi Akun <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Creator-mu</span>
              </h1>
              <p className="text-lg sm:text-xl opacity-80 leading-relaxed mb-8">
                Rangkaian alat gratis AI, kalkulator monetisasi, generator aset viral Pinterest/TikTok, dan pendukung optimasi SEO website dalam satu ekosistem ringkas.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative mb-12">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  placeholder="Cari tool gratis (misal: TikTok, AI Writer, Schema)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base shadow-lg transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {/* Category Quick Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {['All', 'AI Creator Tools', 'Calculator', 'Generator', 'Checker', 'SEO Tools'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                      activeCategory === cat 
                        ? 'bg-emerald-500 text-slate-950 shadow-md' 
                        : darkMode 
                          ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredTools.map((tool) => {
                const IconComp = tool.icon;
                return (
                  <div 
                    key={tool.id}
                    onClick={() => { setSelectedToolId(tool.id); setCurrentView('tool'); }}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.02] ${
                      darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-slate-800 text-slate-300">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-400 transition">{tool.title}</h3>
                    <p className="text-xs opacity-75 mb-6 line-clamp-3">{tool.shortDesc}</p>
                    
                    <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-800">
                      <div className="flex items-center text-amber-400">
                        <Flame className="h-4 w-4 mr-1 fill-amber-400" />
                        <span>Populer: {tool.popularity}%</span>
                      </div>
                      <div className="flex items-center text-emerald-400 font-semibold">
                        Gunakan Tool
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TikTok / Pinterest Strategy Guide Section */}
            <div className={`p-8 rounded-3xl mb-16 relative overflow-hidden ${
              darkMode ? 'bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800' : 'bg-gradient-to-br from-emerald-50 to-indigo-50 border border-indigo-100'
            }`}>
              <div className="max-w-3xl">
                <span className="bg-indigo-500 text-white font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full inline-block mb-4">
                  Strategi Viral ⚡
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Cara Memanfaatkan Tools Ini Untuk Traffic TikTok & Pinterest</h2>
                <p className="text-sm opacity-85 leading-relaxed mb-6">
                  Buat video singkat di TikTok membahas tentang 'cara cek gaji akun lu' atau 'cara nulis artikel SEO 10 detik pake AI gratis'. Ajak penonton mengeklik link bio Anda yang mengarah ke website ini. Anda akan mendapatkan limpahan trafik tinggi dan menghasilkan ratusan dolar pasif dari iklan Adsterra!
                </p>
                <button 
                  onClick={() => setCurrentView('viral-hub')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition shadow-lg shadow-indigo-500/20"
                >
                  Lihat Konsep Konten Viral
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: TOOL DETAILS & WORKBENCH */}
        {currentView === 'tool' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Tool Switcher & Adsterra Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="font-bold text-sm uppercase opacity-50 tracking-wider mb-3 px-2">Daftar Tools</h3>
                <div className="space-y-1">
                  {TOOLS_DATA.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setSelectedToolId(t.id)}
                        className={`w-full flex items-center p-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
                          selectedToolId === t.id 
                            ? 'bg-emerald-500 text-slate-950 shadow-md' 
                            : darkMode 
                              ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white' 
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2.5 shrink-0" />
                        <span className="truncate">{t.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mock Adsterra Native Banner Slot (300x250) */}
              <div className={`p-4 rounded-2xl border border-dashed text-center ${darkMode ? 'bg-slate-900 border-slate-800 border-emerald-500/30' : 'bg-white border-slate-300'}`}>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase block mb-2">Iklan Sponsor (300x250)</span>
                <div className="bg-slate-950 p-6 rounded-xl flex flex-col justify-center items-center">
                  <span className="text-xl font-black text-rose-500 animate-pulse">DISKON 90%!</span>
                  <p className="text-[10px] text-slate-400 mt-2">Dapatkan Template Konten Viral TikTok & Pinterest</p>
                  <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg mt-4 w-full">
                    Ambil Slot Promo
                  </button>
                </div>
              </div>
            </aside>

            {/* Middle Workspace: Tool Playground */}
            <section className="lg:col-span-6 space-y-6">
              
              {/* Header Tool */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl">
                    {React.createElement(activeTool.icon, { className: 'h-6 w-6' })}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black">{activeTool.title}</h1>
                    <span className="text-xs text-emerald-400 font-semibold">{activeTool.category} Tool</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">{activeTool.shortDesc}</p>
                {activeTool.isViral && (
                  <div className="mt-4 flex items-center bg-teal-500/10 border border-teal-500/20 text-teal-300 px-3 py-2 rounded-xl text-xs font-semibold">
                    <Flame className="h-4 w-4 mr-2 text-teal-400 fill-teal-400 animate-pulse" />
                    Viral di {activeTool.targetTraffic}! Cocok dijadikan bahan konten.
                  </div>
                )}
              </div>

              {/* TOOL WORKSPACE RENDERER */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                
                {/* 1. TikTok Money Calculator */}
                {activeTool.id === 'tiktok-money-calculator' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-4">Simulasi Pendapatan Akun</h3>
                    
                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-2">Total Pengikut (Followers): {followers.toLocaleString()}</label>
                      <input 
                        type="range" min="1000" max="500000" step="1000"
                        value={followers}
                        onChange={(e) => setFollowers(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-2">Rata-rata Penayangan Video (Views): {avgViews.toLocaleString()}</label>
                      <input 
                        type="range" min="500" max="100000" step="500"
                        value={avgViews}
                        onChange={(e) => setAvgViews(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-2">Tingkat Keterlibatan (Engagement): {engagement}%</label>
                      <input 
                        type="range" min="0.5" max="25" step="0.1"
                        value={engagement}
                        onChange={(e) => setEngagement(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    {tiktokResults && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Estimasi Sponsor / Post</span>
                          <span className="text-lg font-extrabold text-emerald-400">${tiktokResults.sponsorMin} - ${tiktokResults.sponsorMax}</span>
                          <span className="text-[10px] text-slate-500 block mt-1">Sponsor Brand Deals per postingan</span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                          <span className="text-xs text-slate-400 font-semibold block mb-1">Reward Bulanan</span>
                          <span className="text-lg font-extrabold text-emerald-400">${tiktokResults.rewardsMin} - ${tiktokResults.rewardsMax}</span>
                          <span className="text-[10px] text-slate-500 block mt-1">Est. Ads Creator Program bulanan</span>
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-950 p-4 rounded-xl text-center">
                      <span className="text-xs text-slate-400 font-semibold">Kondisi Keaktifan Akun Anda:</span>
                      <span className="block text-sm font-bold text-indigo-400 mt-1">{tiktokResults?.engagementStatus}</span>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={() => copyToClipboard(`Estimasi akun TikTok saya: Sponsor $${tiktokResults.sponsorMin}-$${tiktokResults.sponsorMax} per post!`)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center transition"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Salin Estimasi
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. AI Article Generator */}
                {activeTool.id === 'ai-article-generator' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-4">Form Artikel Generator (Bertenaga Gemini API)</h3>
                    
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl mb-4">
                      <span className="text-xs font-bold text-rose-400 flex items-center mb-1">
                        <Info className="h-4 w-4 mr-1.5" /> Info API Key Gemini
                      </span>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Kunci API telah dikonfigurasi secara internal di server. Anda bisa mengetik langsung topik artikel tanpa repot memasukkan kunci manual.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1.5">Topik Artikel / Ide Konten</label>
                        <input 
                          type="text" 
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                          placeholder="Misal: Cara Ternak Cupang Hias Rumahan"
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-400 block mb-1.5">Nada Bicara (Tone)</label>
                          <select 
                            value={aiTone}
                            onChange={(e) => setAiTone(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option>Informatif & Edukatif</option>
                            <option>Komedi & Santai</option>
                            <option>Profesional & Serius</option>
                            <option>Menjual (Hard-Sell Copywriting)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-400 block mb-1.5">Kata Kunci Target (SEO)</label>
                          <input 
                            type="text" 
                            value={aiKeyword}
                            onChange={(e) => setAiKeyword(e.target.value)}
                            placeholder="Misal: ikan cupang, ternak cupang"
                            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleAiGeneration}
                        disabled={aiLoading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/10 flex items-center justify-center transition active:scale-95"
                      >
                        {aiLoading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menganalisis & Menulis Artikel...
                          </div>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Buat Artikel SEO Sekarang (Gratis)
                          </>
                        )}
                      </button>

                      {aiError && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 shrink-0" />
                          <span>{aiError}</span>
                        </div>
                      )}

                      {aiResult && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">Hasil Generator AI:</span>
                            <button 
                              onClick={() => copyToClipboard(aiResult)}
                              className="text-emerald-400 hover:underline text-xs flex items-center"
                            >
                              <Copy className="h-3.5 w-3.5 mr-1" /> Copy Teks
                            </button>
                          </div>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed text-slate-300">
                            {aiResult}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Schema Markup Generator */}
                {activeTool.id === 'seo-schema-generator' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-4">Tipe Schema Markup</h3>
                    
                    <div className="flex space-x-2">
                      {['FAQ', 'Article'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSchemaType(t)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            schemaType === t ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {t} Schema
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4 pt-2">
                      {schemaType === 'FAQ' ? (
                        <>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Pertanyaan 1</label>
                            <input 
                              type="text" 
                              value={schemaInputs.faqQ1} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, faqQ1: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Jawaban 1</label>
                            <textarea 
                              rows="2"
                              value={schemaInputs.faqA1} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, faqA1: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Pertanyaan 2</label>
                            <input 
                              type="text" 
                              value={schemaInputs.faqQ2} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, faqQ2: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Jawaban 2</label>
                            <textarea 
                              rows="2"
                              value={schemaInputs.faqA2} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, faqA2: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Judul Artikel</label>
                            <input 
                              type="text" 
                              value={schemaInputs.artTitle} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, artTitle: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">Nama Penulis</label>
                            <input 
                              type="text" 
                              value={schemaInputs.artAuthor} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, artAuthor: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 block mb-1">URL Artikel</label>
                            <input 
                              type="text" 
                              value={schemaInputs.artUrl} 
                              onChange={(e) => setSchemaInputs({...schemaInputs, artUrl: e.target.value})}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                            />
                          </div>
                        </>
                      )}

                      <div className="pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-400">Kode JSON-LD Terkompilasi:</span>
                          <button 
                            onClick={() => copyToClipboard(`<script type="application/ld+json">\n${schemaCode}\n</script>`)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center"
                          >
                            <Copy className="h-3.5 w-3.5 mr-1" /> Salin Tag Schema
                          </button>
                        </div>
                        <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] sm:text-xs font-mono overflow-x-auto text-emerald-400 max-h-60">
                          {`<!-- Tempelkan kode ini di dalam tag <head> HTML Anda -->\n`}
                          {`<script type="application/ld+json">\n`}
                          {schemaCode}
                          {`\n</script>`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Keyword Density Checker */}
                {activeTool.id === 'keyword-density-checker' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-4">Uji Kepadatan Kata Kunci</h3>
                    
                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1.5">Masukkan Artikel Anda</label>
                      <textarea 
                        rows="6"
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        placeholder="Ketik atau paste teks draf artikel Anda di sini..."
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3 text-xs sm:text-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400 block mb-3">Kata Utama Paling Sering Muncul:</span>
                      
                      {densityResults.length === 0 ? (
                        <p className="text-xs text-slate-500 italic">Ketikkan teks di atas untuk melihat analisis density secara langsung.</p>
                      ) : (
                        <div className="space-y-3">
                          {densityResults.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-bold text-indigo-400">"{item.word}"</span>
                                <span className="text-slate-400">{item.count}x ({item.percent}%)</span>
                              </div>
                              <div className="w-full bg-slate-900 rounded-full h-1.5">
                                <div 
                                  className={`h-1.5 rounded-full ${item.percent > 2.5 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                  style={{ width: `${Math.min(item.percent * 10, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1.5 text-slate-400">
                      <p className="font-semibold text-white flex items-center">
                        <Info className="h-4 w-4 mr-1 text-emerald-400" /> Standar Terbaik (Google Webmaster)
                      </p>
                      <p>Kepadatan ideal kata kunci berkisar antara <strong className="text-emerald-400">1% sampai 2%</strong>. Warna merah pada visual indikator di atas menunjukkan bahwa kata kunci Anda terlalu padat (stuffing) dan rawan pinalti.</p>
                    </div>
                  </div>
                )}

                {/* 5. Pinterest Generator */}
                {activeTool.id === 'pinterest-tag-generator' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-sm text-slate-300 border-b border-slate-800 pb-2 mb-4">Pinterest SEO Optimizer</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">Topik Utama Pin</label>
                        <input 
                          type="text" 
                          value={pinTopic}
                          onChange={(e) => setPinTopic(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">Target Audiens</label>
                        <input 
                          type="text" 
                          value={pinTarget}
                          onChange={(e) => setPinTarget(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {pinResults && (
                      <div className="space-y-4 pt-4 border-t border-slate-800">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-2">Rekomendasi Judul Pin (CTR Tinggi):</span>
                          <div className="space-y-2">
                            {pinResults.titles.map((title, i) => (
                              <div key={i} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                                <span className="text-white font-medium">{title}</span>
                                <button 
                                  onClick={() => copyToClipboard(title)}
                                  className="text-emerald-400 hover:text-emerald-300"
                                >
                                  Copy
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-xs font-bold text-slate-400 block mb-2">Rekomendasi Hashtag Pendukung:</span>
                          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2">
                            {pinResults.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                onClick={() => copyToClipboard(tag)}
                                className="bg-indigo-950 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded cursor-pointer hover:bg-indigo-900"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Automatic Generated SEO Blog Article for this Tool */}
              <article className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center space-x-2 text-indigo-400 mb-3 text-xs sm:text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-bold uppercase tracking-wider">Artikel Pendukung & Panduan SEO</span>
                </div>
                
                <h2 className="text-lg sm:text-xl font-extrabold mb-4 text-emerald-400 leading-snug">
                  {activeTool.article.title}
                </h2>

                <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {activeTool.article.headings.map((heading, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-extrabold text-white text-sm sm:text-base pt-2">
                        {idx + 1}. {heading.title}
                      </h3>
                      <p className="opacity-80">
                        {heading.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Auto Internal Linking Section */}
                <div className="mt-8 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block mb-2">💡 Alat Pendukung yang Mungkin Anda Butuhkan:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOOLS_DATA.filter(t => t.id !== activeTool.id).slice(0, 2).map((linkTool) => (
                      <div 
                        key={linkTool.id}
                        onClick={() => setSelectedToolId(linkTool.id)}
                        className="bg-slate-950 hover:bg-slate-800 p-3 rounded-xl border border-slate-800 cursor-pointer flex items-center justify-between text-xs transition"
                      >
                        <span className="text-indigo-400 font-semibold truncate mr-2">{linkTool.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </section>

            {/* Right Sidebar: CTR Boost / Monetization / Pinterest & TikTok Promotion Cards */}
            <aside className="lg:col-span-3 space-y-6">
              
              {/* Promotion Helper */}
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Materi Promosi Viral</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Gunakan ide video TikTok dan desain Pinterest ini untuk mendatangkan traffic tak terbatas secara organik.
                </p>

                <div className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">🎯 Konsep Hook Video TikTok</span>
                    <p className="text-xs italic text-slate-300">"{activeTool.viralHook}"</p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">📌 Strategi Pin Pinterest</span>
                    <p className="text-xs text-slate-300">{activeTool.pinIdea}</p>
                  </div>
                </div>
              </div>

              {/* CTR Boost Ad Slot Simulation */}
              <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 p-5 rounded-3xl border border-indigo-500/30 text-center relative overflow-hidden">
                <span className="text-[10px] font-bold text-indigo-300 tracking-wider uppercase block mb-2">Rekomendasi Premium</span>
                <h4 className="font-extrabold text-white text-sm mb-3">Ebook Premium: Panduan Mengalirkan 1 Juta Traffic dari Pinterest & TikTok 2026</h4>
                <p className="text-xs text-slate-300 leading-normal mb-4">Materi teruji dari para kreator top internasional yang raup miliaran rupiah dari rumah.</p>
                <button 
                  onClick={() => showToast('Membuka penawaran premium...')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl w-full transition shadow-lg shadow-emerald-500/20"
                >
                  Dapatkan Akses Instan
                </button>
              </div>

              {/* Dynamically Generated JSON-LD Schema visual feedback */}
              <div className={`p-4 rounded-2xl border text-xs ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-emerald-400 uppercase tracking-widest text-[9px] block mb-2">SEO Schema markup active</span>
                <p className="text-slate-400">Halaman ini menginjeksikan struktur schema <code className="bg-slate-950 px-1 py-0.5 rounded text-white font-mono text-[10px]">FAQPage</code> ke bot pencarian untuk mendukung tampilan kaya di hasil pencarian Google.</p>
              </div>
            </aside>
          </div>
        )}

        {/* VIEW: VIRAL CONTENT STRATEGY GUIDE */}
        {currentView === 'viral-hub' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase inline-block mb-4">
                TikTok & Pinterest Traffic Playbook
              </span>
              <h1 className="text-3xl sm:text-5xl font-black mb-4">Grup Strategi Mendulang Traffic Creator</h1>
              <p className="text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl mx-auto">
                Pelajari struktur konten terbaik yang bisa Anda buat dengan menggunakan tool di platform kami untuk menggaet penonton TikTok dan pengguna setia Pinterest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center space-x-2 text-rose-400 mb-4">
                  <Send className="h-5 w-5" />
                  <h3 className="font-extrabold text-lg">Format Video TikTok Yang Menghasilkan CTR</h3>
                </div>
                <ol className="space-y-3.5 text-xs sm:text-sm text-slate-300 list-decimal pl-4">
                  <li>
                    <strong>Detik 1-3 (The Hook):</strong> Tampilkan estimasi angka dolar dari kalkulator TikTok kami di layar, bicaralah dengan emosional: "Banyak kreator pemula ga tahu kalau akun sekecil ini sebenarnya menghasilkan segini..."
                  </li>
                  <li>
                    <strong>Detik 4-15 (The Explanation):</strong> Tunjukkan cara Anda memasukkan angka followers ke dalam website kami secara real-time. Buat audiens terkesima dengan kesederhanaannya.
                  </li>
                  <li>
                    <strong>Detik 16-30 (The Call to Action):</strong> "Kalian bisa cek sendiri potensi akun kalian secara gratis tanpa login di link bio profile saya sekarang!"
                  </li>
                </ol>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center space-x-2 text-indigo-400 mb-4">
                  <Download className="h-5 w-5" />
                  <h3 className="font-extrabold text-lg">Strategi Viral & Pin Grafik Pinterest SEO</h3>
                </div>
                <ol className="space-y-3.5 text-xs sm:text-sm text-slate-300 list-decimal pl-4">
                  <li>
                    <strong>Gunakan Visual Jelas:</strong> Ambil screenshot area kalkulator, letakkan sebagai latar belakang visual dengan overlay gelap tipis.
                  </li>
                  <li>
                    <strong>Teks Headline Bold:</strong> Tambahkan tulisan besar yang mudah dibaca saat scrolling, misal: "Cek Berapa Pendapatan Akun TikTokmu Sekarang (100% Gratis)".
                  </li>
                  <li>
                    <strong>Sematkan Link Langsung:</strong> Hubungkan Pin Anda langsung ke sub-url website ini. Algoritma Pinterest sangat menyukai tautan bersih yang mengarah ke tool interaktif yang bermanfaat bagi pengguna.
                  </li>
                </ol>
              </div>
            </div>

            {/* Simulated Live Statistics */}
            <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Statistik Keberhasilan Strategi Traffic</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-emerald-400">120K+</span>
                  <span className="text-[10px] text-slate-400 uppercase">Pageviews Bulanan</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-indigo-400">1.8%</span>
                  <span className="text-[10px] text-slate-400 uppercase">Rata-Rata CTR Iklan</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-amber-400">85%</span>
                  <span className="text-[10px] text-slate-400 uppercase">Traffic Mobile (HP)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`border-t py-12 text-center mt-20 text-xs ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center space-x-6">
            <button onClick={() => setCurrentView('home')} className="hover:text-emerald-400">Beranda</button>
            <button onClick={() => { setCurrentView('tool'); setSelectedToolId('tiktok-money-calculator'); }} className="hover:text-emerald-400">Kalkulator TikTok</button>
            <button onClick={() => { setCurrentView('tool'); setSelectedToolId('ai-article-generator'); }} className="hover:text-emerald-400">AI SEO Writer</button>
            <button onClick={() => setCurrentView('viral-hub')} className="hover:text-emerald-400">Materi Viral</button>
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            Dibuat secara profesional untuk mempermudah konten kreator berkembang di media sosial dan mengoptimalkan penghasilan melalui strategi SEO yang ampuh.
          </p>
          <div className="pt-4 flex justify-center items-center space-x-2 text-[10px] text-slate-600">
            <Globe className="h-3.5 w-3.5" />
            <span>© 2026 AI Creator Tools Hub. Hak Cipta Dilindungi.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
