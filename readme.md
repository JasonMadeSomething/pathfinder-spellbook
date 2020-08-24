# Pathfinder Spellbook

This is a discord bot designed to augment the s20pfsrd by parsing links pasted in discord chat and returning a formatted version of the page posted.

### Installation

Install by first cloning the repository to the directory you want the bot to run out of. Then create a `.env` file in the root directory of the project. Run `npm install` at the root of the project. Next register a discord bot/application per the instructions on the discord js guide located [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Create a variable in the `.env` file named `DISCORD_TOKEN` and set it equal to your api key. Also add the following line to the `.env` file: `d20URL=https://www.d20pfsrd.com`. Run the bot from the command line with `NODE_ENV=production node spellbook.js` while in the project folder.

Alternatively, I produced [this](https://gist.github.com/JasonMadeSomething/4e557989e3b9fbd71a0bd21ec2168aac) running log of how I deployed the bot to a raspberry pi with some light automation. The principal of deploying it to a server is more or less the same as the pi. 

###### TODO:
- [ ] Add link parsing
- [x] Add magic page parsing
- [ ] Add discord embeds
- [ ] Improve Parser objects (Specific names for members)
- [x] Simplify response selection logic


### Examples
#### Feats
https://www.d20pfsrd.com/feats/combat-feats/focused-shot-combat

**Prerequisites**: Int 13, [Point Blank Shot](https://www.d20pfsrd.com/feats/combat-feats/focused-shot-combat/point-blank-shot-combat), [Precise Shot](https://www.d20pfsrd.com/feats/combat-feats/focused-shot-combat/precise-shot-combat).

**Benefit**: As a standard action, you may make an attack with a bow or crossbow and add your Intelligence modifier on the damage roll. You must be within 30 feet of your target to deal this extra damage.
Creatures immune to critical hits and sneak attacks are immune to this extra damage.

**Special**: Starting at 2nd level, a ranger with the archery combat style may select Focused Shot as a combat style feat.

#### Magic
https://www.d20pfsrd.com/magic/all-spells/i/illusory-crowd/


__**Eagle Eye**__

**School:** divination; **Level:** druid 2, psychic 2, ranger 2, shaman 2

**CASTING**

**Casting Time:** 1 minute **Components:** V, S, DF

**EFFECT**

**Range:** long (400 ft. + 40 ft./level) **Effect:** magical sensor
 **Duration:** 1 minute/level (D) **Saving Throw:** none; **Spell Resistance:** no

**DESCRIPTION**

You perceive with your normal visual senses. A caster using eagle eye can easily see for a considerable distance. The spell does not penetrate any solid surface, although it is unaffected by foliage and the like.
