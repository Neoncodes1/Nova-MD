require('./settings')
const { connectToWhatsApp } = require('./connection')
const fs = require('fs')
const path = require('path')

fs.readdirSync(path.join(__dirname, 'plugins'))
  .filter(f => f.endsWith('.js'))
  .forEach(f => require(path.join(__dirname, 'plugins', f)))

const commands = new Map()
fs.readdirSync(path.join(__dirname, 'commands'))
  .filter(f => f.endsWith('.js'))
  .forEach(f => {
    const exported = require(path.join(__dirname, 'commands', f))
    if (Array.isArray(exported)) {
      exported.forEach(cmd => {
        cmd.cmd.forEach(alias => commands.set(alias.toLowerCase(), cmd))
      })
    }
  })

async function start() {
  const sock = await connectToWhatsApp()

  sock.ev.on('messages.upsert', async m => {
    if (m.type !== 'notify') return
    const msg = m.messages[0]
    if (!msg?.message) return

    let text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
    text = text.trim()
    if (!text.startsWith(global.prefix)) return

    const args = text.slice(global.prefix.length).trim().split(/ +/)
    const cmdName = args.shift().toLowerCase()
    const from = msg.key.remoteJid

    if (global.mode === 'self' && !global.owner.includes(from)) return
    if (global.mode === 'private' && !global.owner.includes(from) && !global.sudo.includes(from)) return

    const cmd = commands.get(cmdName)
    if (cmd) {
      if (cmd.ownerOnly && !global.owner.includes(from)) {
        await sock.sendMessage(from, { text: 'Owner only' })
        return
      }
      try {
        await cmd.run(sock, msg, args, text)
      } catch {
        await sock.sendMessage(from, { text: 'Error' })
      }
    }
  })
}

start().catch(console.error)
