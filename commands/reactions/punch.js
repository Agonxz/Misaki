const Social = require(`${process.cwd()}/base/Social.js`);
const { UsageError } = require("../../util/CustomError.js");

class Punch extends Social {
  constructor(client) {
    super(client, {
      name: "punch",
      description: "Someone needs a punch",
      usage: "punch <@mention>",
      category: "Reactions",
      cost: 5,
      loadingString: "<a:typing:397490442469376001> **{{displayName}}** wants to punch someone..."
    });
  }

  cmdVerify(message, args, loadingMessage) {
    const target = message.mentions.members;
    if (target.size === 0) return Promise.reject(new UsageError("You need to mention someone to punch them.", loadingMessage));
    if (message.member == target.first()) return Promise.reject(new UsageError("You cannot punch yourself!", loadingMessage));
    return Promise.resolve(target);
  }

  async run(message, args, level, loadingMessage) {
    const target = await this.cmdVerify(message, args, loadingMessage);
    const punch = await this.cmdWeeb("punch", "gif", message.channel.nsfw);
    await loadingMessage.edit({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": punch,
        "description": `**${target.first().displayName}**, you just got punched by **${message.member.displayName}**`,
        "color": message.guild.me.roles.highest.color || 5198940,
        "image": {
          "url": punch
        }
      }
    });
  }
}

module.exports = Punch;
