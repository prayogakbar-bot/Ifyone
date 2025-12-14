import React, { useState } from "react";
import { AtSign, Phone, Send, KeyRound, Lock, MapPin, Tag, Rocket, UserPlus, CheckCircle } from "lucide-react";

const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    nama: "",
    namaToko: "",
    nomorWhatsapp: "",
    usernameTelegram: "",
    pinTransaksi: "",
    passwordTransaksi: "",
    confirmPasswordTransaksi: "",
    jabberXMPP: "",
    ipTransaksi: "",
    urlReport: "",
    alamat: "",
    agreement: false,
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);

    const newErrors = { ...errors, [id]: "" };
    if (id === 'passwordTransaksi' || id === 'confirmPasswordTransaksi') {
      if (newFormData.passwordTransaksi && newFormData.confirmPasswordTransaksi && newFormData.passwordTransaksi !== newFormData.confirmPasswordTransaksi) {
        newErrors.confirmPasswordTransaksi = "Konfirmasi kata sandi tidak cocok.";
      } else {
        newErrors.confirmPasswordTransaksi = "";
      }
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama) newErrors.nama = "Nama harus diisi.";
    if (!formData.namaToko) newErrors.namaToko = "Nama Toko harus diisi.";
    if (!formData.nomorWhatsapp) newErrors.nomorWhatsapp = "Nomor WhatsApp harus diisi.";
    if (!formData.usernameTelegram) newErrors.usernameTelegram = "Username Telegram harus diisi.";
    if (!formData.pinTransaksi) newErrors.pinTransaksi = "PIN Transaksi harus diisi.";
    if (!formData.passwordTransaksi) newErrors.passwordTransaksi = "Password Transaksi harus diisi.";
    if (formData.passwordTransaksi !== formData.confirmPasswordTransaksi) {
      newErrors.confirmPasswordTransaksi = "Konfirmasi kata sandi tidak cocok.";
    }
    if (!formData.alamat) newErrors.alamat = "Alamat harus diisi.";
    if (!formData.agreement) newErrors.agreement = "Anda harus menyetujui Syarat & Ketentuan.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    if (!validateForm()) {
      setStatus({
        type: 'error',
        title: 'Formulir Tidak Lengkap',
        message: 'Mohon periksa kembali formulir Anda. Ada beberapa kolom yang perlu diperbaiki.',
      });
      setLoading(false);
      return;
    }

    const message = `
Pendaftaran Akun Baru

Nama: ${formData.nama}
Nama Toko: ${formData.namaToko}
Nomor WhatsApp: ${formData.nomorWhatsapp}
Username Telegram: ${formData.usernameTelegram}
PIN Transaksi: ${formData.pinTransaksi}
Password Transaksi: ${formData.passwordTransaksi}
Jabber XMPP: ${formData.jabberXMPP || "-"}
IP Transaksi: ${formData.ipTransaksi || "-"}
URL Report: ${formData.urlReport || "-"}
Alamat: ${formData.alamat}
`;

    const botToken = "8451905230:AAFUjuSpWAPkf4xLnj7tY-QvP6G9SzQJHss";
    const chatId = "7819116811";
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus({
          type: 'success',
          title: 'Pendaftaran Akun Berhasil',
          message: `Terima kasih, ${formData.nama}! Data Anda telah berhasil kami terima.`,
          details: 'Tim kami akan segera memproses pendaftaran Anda. Informasi lebih lanjut terkait aktivasi akun akan kami kirimkan melalui Telegram atau WhatsApp dalam waktu 1x24 jam.'
        });
        setIsRegistered(true);
        setFormData({
            nama: "", namaToko: "", nomorWhatsapp: "", usernameTelegram: "",
            pinTransaksi: "", passwordTransaksi: "", confirmPasswordTransaksi: "", jabberXMPP: "", ipTransaksi: "",
            urlReport: "", alamat: "", agreement: false,
        });
      } else {
        setStatus({
          type: 'error',
          title: 'Pendaftaran Gagal',
          message: `Gagal mengirim data: ${data.description}`,
          details: 'Silakan coba kembali dalam beberapa saat, atau hubungi tim dukungan kami.'
        });
      }
    } catch (error) {
      console.error("Kesalahan saat mengirim pesan ke Telegram:", error);
      setStatus({
        type: 'error',
        title: 'Terjadi Kesalahan',
        message: 'Terjadi kesalahan saat mengirim data. Silakan coba lagi.',
      });
    } finally {
      setLoading(false);
    }
  };

  const SuccessMessage = () => (
    <div className="relative z-10 bg-gray-800 bg-opacity-90 p-10 rounded-xl shadow-2xl max-w-4xl w-full border border-gray-700 backdrop-blur-sm animate-fade-in-up text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-20 w-20 text-green-400" />
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-2">{status.title}</h2>
      <p className="text-lg text-gray-400 mb-4">{status.message}</p>
      {status.details && <p className="text-sm text-gray-300 italic">{status.details}</p>}
    </div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-linen-2.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 animate-pulse-slow"></div>
      </div>
      {isRegistered ? (
        <SuccessMessage />
      ) : (
        <div className="relative z-10 bg-gray-800 bg-opacity-90 p-10 rounded-xl shadow-2xl max-w-4xl w-full border border-gray-700 backdrop-blur-sm animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <Rocket className="h-16 w-16 text-orange-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white text-center mb-2">Buka Potensi Penuh Bisnis Anda.</h2>
          <p className="text-gray-400 text-center mb-8">
            Dapatkan akses ke semua fitur terbaik kami, hanya dengan satu langkah mudah.
          </p>
          <p className="text-gray-300 text-center mb-8 italic">
            Isi formulir di bawah ini untuk membuat akun dan mulai transaksi di IFYOne.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="nama" className="block text-gray-300 mb-2 text-sm font-medium">Nama</label>
                <div className="relative">
                  <input type="text" id="nama" value={formData.nama} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.nama && <p className="text-red-400 text-xs mt-1">{errors.nama}</p>}
              </div>
              <div className="relative">
                <label htmlFor="namaToko" className="block text-gray-300 mb-2 text-sm font-medium">Nama Toko</label>
                <div className="relative">
                  <input type="text" id="namaToko" value={formData.namaToko} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.namaToko && <p className="text-red-400 text-xs mt-1">{errors.namaToko}</p>}
              </div>
              <div className="relative">
                <label htmlFor="nomorWhatsapp" className="block text-gray-300 mb-2 text-sm font-medium">Nomor WhatsApp</label>
                <div className="relative">
                  <input type="tel" id="nomorWhatsapp" value={formData.nomorWhatsapp} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.nomorWhatsapp && <p className="text-red-400 text-xs mt-1">{errors.nomorWhatsapp}</p>}
              </div>
              <div className="relative">
                <label htmlFor="usernameTelegram" className="block text-gray-300 mb-2 text-sm font-medium">Username Telegram</label>
                <div className="relative">
                  <input type="text" id="usernameTelegram" value={formData.usernameTelegram} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.usernameTelegram && <p className="text-red-400 text-xs mt-1">{errors.usernameTelegram}</p>}
              </div>
              <div className="relative">
                <label htmlFor="alamat" className="block text-gray-300 mb-2 text-sm font-medium">Alamat</label>
                <div className="relative">
                  <textarea id="alamat" rows="3" value={formData.alamat} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300"></textarea>
                  <MapPin className="absolute left-4 top-4 text-gray-500" size={20} />
                </div>
                {errors.alamat && <p className="text-red-400 text-xs mt-1">{errors.alamat}</p>}
              </div>
              <div className="relative">
                <label htmlFor="pinTransaksi" className="block text-gray-300 mb-2 text-sm font-medium">PIN Transaksi</label>
                <div className="relative">
                  <input type="password" id="pinTransaksi" value={formData.pinTransaksi} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.pinTransaksi && <p className="text-red-400 text-xs mt-1">{errors.pinTransaksi}</p>}
              </div>
              <div className="relative">
                <label htmlFor="passwordTransaksi" className="block text-gray-300 mb-2 text-sm font-medium">Password Transaksi</label>
                <div className="relative">
                  <input type="password" id="passwordTransaksi" value={formData.passwordTransaksi} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.passwordTransaksi && <p className="text-red-400 text-xs mt-1">{errors.passwordTransaksi}</p>}
              </div>
              <div className="relative">
                <label htmlFor="confirmPasswordTransaksi" className="block text-gray-300 mb-2 text-sm font-medium">Konfirmasi Password Transaksi</label>
                <div className="relative">
                  <input type="password" id="confirmPasswordTransaksi" value={formData.confirmPasswordTransaksi} onChange={handleChange} required className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
                {errors.confirmPasswordTransaksi && <p className="text-red-400 text-xs mt-1">{errors.confirmPasswordTransaksi}</p>}
              </div>
            </div>

            <hr className="border-gray-700 my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="jabberXMPP" className="block text-gray-300 mb-2 text-sm font-medium">Jabber XMPP <span className="text-gray-500">(opsional)</span></label>
                <div className="relative">
                  <input type="text" id="jabberXMPP" value={formData.jabberXMPP} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="ipTransaksi" className="block text-gray-300 mb-2 text-sm font-medium">IP Transaksi <span className="text-gray-500">(opsional)</span></label>
                <div className="relative">
                  <input type="text" id="ipTransaksi" value={formData.ipTransaksi} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 relative">
                <label htmlFor="urlReport" className="block text-gray-300 mb-2 text-sm font-medium">URL Report <span className="text-gray-500">(opsional)</span></label>
                <div className="relative">
                  <input type="text" id="urlReport" value={formData.urlReport} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 text-white transition duration-300" />
                  <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                </div>
              </div>
            </div>

            <div className="flex items-start mt-6">
              <input type="checkbox" id="agreement" checked={formData.agreement} onChange={handleChange} required className="mt-1 mr-2 rounded-sm text-orange-400 focus:ring-orange-400 h-4 w-4" />
              <label htmlFor="agreement" className="text-sm text-gray-400">
                Saya setuju dengan <a href="#" className="underline text-orange-400 hover:text-orange-500">Syarat, Ketentuan, dan Kebijakan IFYone</a>
              </label>
            </div>
            {errors.agreement && <p className="text-red-400 text-xs mt-1">{errors.agreement}</p>}
            <button
              type="submit"
              className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-gray-900 font-bold rounded-full transition-all duration-300 hover:from-orange-600 hover:to-amber-500 hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 shadow-orange-500/50 hover:shadow-orange-400/80"
              disabled={loading}
            >
              {loading ? (
                  <>
                      <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Memproses...</span>
                  </>
              ) : (
                  <>
                      <Send className="h-5 w-5" />
                      <span>Daftar Sekarang</span>
                  </>
              )}
            </button>
            {status && (
              <div className={`mt-4 p-4 rounded-lg text-center ${status.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                  <h3 className="text-xl font-bold text-white">{status.title}</h3>
                  <p className={`mt-2 ${status.type === 'success' ? 'text-white' : 'text-gray-200'}`}>{status.message}</p>
                  {status.details && <p className="mt-1 text-sm text-gray-300 italic">{status.details}</p>}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default RegistrationSection;