const os = require('os')

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return bytes.toFixed(2) + ' ' + units[i]
}

module.exports.getMenu = (latensi = 0) => {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour12: true })
  const date = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
  const memUsed = formatBytes(os.totalmem() - os.freemem())

  return `┏──《 ${global.botname} 》━━━
𖨆 Creator: ${global.creator}
𖨆 Ping: ${latensi.toFixed(4)} ms
𖨆 Time: ${time}
𖨆 Date: ${date}
𖨆 Platform: ${os.type()}
𖨆 Memory: ${memUsed}
┗─────────────❐

┏── *『 Commander only 』*
┃${global.simbol} ${global.prefix}mode
┃${global.simbol} ${global.prefix}areact
┃${global.simbol} ${global.prefix}setbio
┃${global.simbol} ${global.prefix}restart
┃${global.simbol} ${global.prefix}advertise
┃${global.simbol} ${global.prefix}delete
┃${global.simbol} ${global.prefix}join
┃${global.simbol} ${global.prefix}leave
┃${global.simbol} ${global.prefix}getsession
┃${global.simbol} ${global.prefix}logout
┃${global.simbol} ${global.prefix}unblock
┃${global.simbol} ${global.prefix}block
┃${global.simbol} ${global.prefix}setsudo
┃${global.simbol} ${global.prefix}delsudo
┃${global.simbol} ${global.prefix}getsudo
┃${global.simbol} ${global.prefix}listblock
┃${global.simbol} ${global.prefix}listgroup
┃${global.simbol} ${global.prefix}clearchat
┃${global.simbol} ${global.prefix}joinch
┃${global.simbol} ${global.prefix}ban
┃${global.simbol} ${global.prefix}unban
┃${global.simbol} ${global.prefix}save
┗────────────────❐

┏── *『 ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}play
┃${global.simbol} ${global.prefix}video
┃${global.simbol} ${global.prefix}igdl
┃${global.simbol} ${global.prefix}fb
┃${global.simbol} ${global.prefix}tiktok
┃${global.simbol} ${global.prefix}tiktokmp3
┃${global.simbol} ${global.prefix}mediafire
┃${global.simbol} ${global.prefix}gitclone
┃${global.simbol} ${global.prefix}ytmp4
┃${global.simbol} ${global.prefix}ytmp3
┃${global.simbol} ${global.prefix}yts
┃${global.simbol} ${global.prefix}xvideodl
┃${global.simbol} ${global.prefix}twitter
┗────────────────❐

┏── *『 ғᴀᴋᴇ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}autostatus
┃${global.simbol} ${global.prefix}online
┃${global.simbol} ${global.prefix}autotyping
┃${global.simbol} ${global.prefix}autorecording
┃${global.simbol} ${global.prefix}autoread
┃${global.simbol} ${global.prefix}unavailable
┃${global.simbol} ${global.prefix}autobio
┗────────────────❐

┏── *『 ʙᴏᴛ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}ping
┃${global.simbol} ${global.prefix}runtime
┃${global.simbol} ${global.prefix}alive
┗────────────────❐

┏── *『 ɢʀᴏᴜᴘ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}hidetag
┃${global.simbol} ${global.prefix}tagall
┃${global.simbol} ${global.prefix}add
┃${global.simbol} ${global.prefix}kick
┃${global.simbol} ${global.prefix}promote
┃${global.simbol} ${global.prefix}demote
┃${global.simbol} ${global.prefix}antilink
┃${global.simbol} ${global.prefix}welcome
┃${global.simbol} ${global.prefix}goodbye
┗────────────────❐

┏── *『 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}sticker
┃${global.simbol} ${global.prefix}toimg
┃${global.simbol} ${global.prefix}tomp3
┃${global.simbol} ${global.prefix}bass
┃${global.simbol} ${global.prefix}nightcore
┃${global.simbol} ${global.prefix}reverse
┗────────────────❐

┏── *『 ᴏᴛʜᴇʀ ᴍᴇɴᴜ 』*
┃${global.simbol} ${global.prefix}owner
┃${global.simbol} ${global.prefix}support
┃${global.simbol} ${global.prefix}repo
┗────────────────❐`
}
