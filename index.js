const axios = require("axios");
const cron = require("node-cron");

// Ambil dari environment variable Railway
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

// Cek environment
if (!BOT_TOKEN || !CHANNEL_ID) {
  console.error("Environment BOT_TOKEN atau CHANNEL_ID belum diisi!");
  process.exit(1);
}

// Fungsi kirim broadcast
async function sendBroadcast() {
  try {
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHANNEL_ID,
        text: "Dear Mitra IFYOne,
Kami informasikan bahwa sistem akan memasuki waktu maintenance dan cutoff pada:

23:30 – 00:15 WIB
Selama periode tersebut, beberapa layanan mungkin tidak dapat diakses atau mengalami keterlambatan proses.

Layanan akan kembali normal setelah maintenance selesai.
Terima kasih atas pengertiannya."
      }
    );
    console.log("Broadcast terkirim");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

// Kirim sekali saat start
sendBroadcast();

// Cron schedule: tiap jam
cron.schedule("23* * * *", sendBroadcast);
