module.exports = function ArunBreathFix(mod) {
  const arunBreath = 702012
  const targets = new Set()

  mod.game.me.on('change_zone', () => { targets.clear() })

  mod.hook('S_ABNORMALITY_BEGIN', 3, event => {
    if (event.id === arunBreath && !mod.game.me.is(event.target))
      targets.add(event.target)
  })

  mod.hook('S_ABNORMALITY_END', 1, event => {
    if (event.id === arunBreath)
      targets.delete(event.target)
  })

  mod.hook('S_EACH_SKILL_RESULT', 13, event => {
    if (mod.game.me.class === 'elementalist') {
      if (mod.game.me.is(event.source) || mod.game.me.is(event.owner)) {
        const skillGroup = Math.floor(event.skill.id / 10000)
        if ([5, 42].includes(skillGroup) && targets.has(event.target)) {
          event.damage = 15000
          event.crit = false
          mod.send('S_EACH_SKILL_RESULT', 13, event)
        }
      }
    }
  })
}