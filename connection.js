const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const path = require("path");

const AUTH_FOLDER = path.join(__dirname, "auth_info");
const PHONE_NUMBER = "2347017520608"; // change if needed
const RECONNECT_DELAY = 12000;

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "fatal" }),
    printQRInTerminal: false,
    browser: ["Chrome", "Chrome", "128.0.0"],
    syncFullHistory: false,
    markOnlineOnConnect: global.online ?? false,
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log("✅ Connected");
      for (const jid of global.owner || []) {
        await sock.sendMessage(jid, { text: "Bot online" }).catch(() => {});
      }
      if (sock.user?.id) {
        await sock.sendMessage(sock.user.id, { text: "Session init" }).catch(() => {});
      }
    }

    if (connection === "close") {
      const status = lastDisconnect?.error?.output?.statusCode;
      console.log("Disconnected →", status || "unknown");

      if (status === 401) {
        console.log("401 → requesting new code");
        try {
          const code = await sock.requestPairingCode(PHONE_NUMBER);
          console.log("New code:", code);
        } catch {}
      }

      if (status !== DisconnectReason.loggedOut && state.creds.registered) {
        setTimeout(connectToWhatsApp, RECONNECT_DELAY);
      }
    }
  });

  if (!state.creds.registered) {
    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(PHONE_NUMBER);
        console.log("Pairing code:", code);
      } catch (e) {
        console.error("Pairing failed:", e.message);
      }
    }, 4000);
  }

  return sock;
}

module.exports = { connectToWhatsApp };
