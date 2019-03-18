const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "%";
 


client.on('ready', () => {
   console.log(`----------------`);
      console.log(`KillerPalesTine`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : ArabGames ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`%help | ArabGames`,"http://twitch.tv/Death Shop")
client.user.setStatus("online")
});
 
 
client.on('guildMemberAdd', member => {
    var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`عضو جديد`)
    .setDescription(`اهلا بك في السيرفر`)
    .addField(' 👤  انت رقم',`**[ ${member.guild.memberCount} ]**`,true)
    .setColor('GREEN')
    .setFooter('ArabGames Bot', 'https://cdn.discordapp.com/icons/390551815072251904/418fa2788d8115808951c9881ba8f190.jpg')
 
var channel =member.guild.channels.find('name', 'welcome') //دا اسم روم الولكم
if (!channel) return;
channel.send({embed : embed});
});
 
 
client.on('guildMemberRemove', member => {
    var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`خرج عضو`)
    .setDescription(`الى اللقاء...`)
    .addField('👤   تبقي',`**[ ${member.guild.memberCount} ]**`,true)
    .setColor('RED')
    .setFooter('ArabGames Bot' , 'https://cdn.discordapp.com/icons/390551815072251904/418fa2788d8115808951c9881ba8f190.jpg')
 
var channel =member.guild.channels.find('name', 'welcome') //دا اسم روم الولكم
if (!channel) return;
channel.send({embed : embed});
});
 
 
client.on('message', message => {  //RayGamerMC ChatClear Code
    var prefix = "%"; //البريفكس الي تبيه
    if (message.author.bot) return;
if (message.content.startsWith(prefix + 'clear')) {
    if(!message.channel.guild) return message.reply('هذا الأمر شغال في السيرفرات فقط');
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | ! انت لا تحمل خاصية **MANAGE_MESSAGES**');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ |! البوت لا يحمل خاصية **MANAGE_MESSAGES**');
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args); //Snow Codes RayGamerMC
    if (args > 99) return message.reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**").then(messages => messages.delete(5000))
    if(!messagecount) args = '100'; //Snow Codes
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`\`${args}\` : __عدد الرسائل التي تم مسحها __ `).then(messages => messages.delete(5000));
  }
  });  //كود مسح الشات

var requestHelp = async function(type, user, message) {
    switch(type) {
        case "games":
            var gamesHelp = await new Discord.RichEmbed()
                .addField("صراحه", "لعبة صراحه")
                .addField("حب", "لعبة حب")
            user.send(gamesHelp);
        break;
        case "general":
            var generalHelp = await new Discord.RichEmbed()
                .addField("id", "ايديك")
                .addField("avatar", "افتارك")
            user.send(generalHelp);
        break;
        case "admin":
        if(message.member.hasPermission("ADMINISTRATOR")) {
            var adminHelp = await new Discord.RichEmbed()
                .addField("clear", "مسح الشات")
                .addField("bc", "بروكاست")
            user.send(adminHelp);
        } else {
            return;
        }
        break;
    }
}
 
 
 
 
 
 
var reactForGamesHelp = {
    messageId: null,
    reaction: null
},
reactForGeneralHelp = {
    messageId: null,
    reaction: null
},
reactForAdminHelp = {
    messageId: null,
    reaction: null
};
 
 
 
function define(identify) {
    var data = {}
    data["user"] = client.users.find("id", identify.user_id)
    data["channel"] = client.channels.find("id", identify.channel_id);
    data["emoji"] = identify.emoji.id ? `${identify.emoji.name}:${identify.emoji.id}` : identify.emoji.name;
    data["member"] = data["channel"].guild.members.find("id", identify.user_id)
    data["message"] = data["channel"].messages.find("id", identify.message_id);
    data["reaction"] = data["message"].reactions.get(data.emoji)
    return data;
}
 
 
client.on('raw',  packet  => {
    if(packet.t == "MESSAGE_REACTION_ADD") {
        var data = define(packet.d)
        if(data.user.id == client.user.id) return;
            switch (packet.d.message_id) {
            case reactForGamesHelp.messageId:
                if(reactForGamesHelp.reaction === data.emoji) {
                    requestHelp("games", data.member, data.message)
                    data.reaction.remove(data.member)
                } else {
                    data.reaction.remove(data.member)
                }
                break;
 
            case reactForGeneralHelp.messageId:
                if(reactForGeneralHelp.reaction === data.emoji) {
                    requestHelp("general", data.member, data.message)
                    data.reaction.remove(data.member)
                } else {
                    data.reaction.remove(data.member)
                }
                break;
 
 
            case reactForAdminHelp.messageId:
                if(reactForAdminHelp.reaction === data.emoji) {
                    requestHelp("admin", data.member, data.message)
                    data.reaction.remove(data.member)
                } else {
                    data.reaction.remove(data.member)
                }
                break;
        }
    }
});
 
 
 
 
 
 
client.on("message", message => {
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(message.content == prefix + `set ${args[1]} help`) {
        if(args[1] == "games" || args[1] == "general" || args[1] == "admin") {
            var  filter = m => m.author.id === message.author.id
            message.channel.send("give me the channel id now !");        
            message.channel.awaitMessages(filter, { max: 1, time: 40000, errors: ['time'] })
            .then(collected => {
                var toSetChannel = collected.first();
                var channel = message.guild.channels.find("id", toSetChannel.content);
                if(channel) {
                    message.channel.send("give me the message id now !")
                    var  filter = m => m.author.id === message.author.id
                    message.channel.awaitMessages(filter, { max: 1, time: 40000, errors: ['time'] })
                    .then(collected => {
                        var ToSetMessage = collected.first();
                        channel.fetchMessages().then(messages => {
                            var defined =  messages.filter(message => message.id == ToSetMessage.content);
                            var msg = defined.first()
                            if(defined) {
                                message.channel.send("send the emoji now!")
                                message.channel.awaitMessages(filter, { max: 1, time: 40000, errors: ['time'] })
                                .then(collected => {
                                    msg.react(collected.first().content)
                                    var rect = collected.first().content
                                    setReactionData(channel, msg, rect, args[1])
                                })
                            }
                        })
                        .catch(console.error)
                    });
                } else {
                    message.channel.send("sorry i can't find this channel")
                }
            })
        }
    }
})
var setReactionData = function(channel, message, reaction, identify) {
    if(identify == "games") {
        reactForGamesHelp = {
            channel: channel,
            messageId: message.id,
            reaction: reaction
        }
    } else if(identify == "general") {
        reactForGeneralHelp = {
            channel: channel,
            messageId: message.id,
            reaction: reaction
        }
    } else if(identify == "admin") {
        reactForAdminHelp = {
            channel: channel,
            messageId: message.id,
            reaction: reaction
        }
    }
}  
 
 
client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='%member')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle('🌷| Members info')
      .addBlankField(true)
      .addField('📗| Online',
      `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
      .addField('📕| DND',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
      .addField('📙| Idle',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
      .addField('📓| Offline',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
      .addField('➡| Server Members',`${message.guild.memberCount}`)
      message.channel.send(IzRo); // كود الأعضاء الأونلاين و الأوفلاين و الخ
   
    });
 
 
client.on("message", (message) => {
 
   if (message.content.startsWith("%new")) {  
        const reason = message.content.split(" ").slice(1).join(" ");  
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`لازم تسوي رتبة اسمها \`Support Team\` وتنطي البوت ادمنيتر حتا يقدر يسوي الرومات ويعدل برمشنات`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });  
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: تم انشاء تذكرتك, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `:white_check_mark:  تم انشاء تذكرتك, #ticket`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    } // كود التيكت كامل
 
  if (message.content.startsWith("%close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
      message.channel.send(`هل انت متأكد من اقفالك للتذكرة اذا متأكد اكتب.confirm`)
          .then((m) => {
              message.channel.awaitMessages(response => response.content === '$close', {
                      max: 1,
                      time: 10000,
                      errors: ['time'],
                  })  
                  .then((collected) => {
                      message.channel.delete();
                  })  
                  .catch(() => {
                      m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                          m2.delete();
                      }, 3000);
                  });
          });
  }
 
});

client.on('message', message => { //RayGamerMC MuteChannel Code
    var prefix = "%";
           if(message.content === prefix + "mutechannel") {
                               if(!message.channel.guild) return message.reply('** هذا الأمر شغال فقط في السيرفرات **');
     //Snow Codes RayGamerMC
       if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **أنت ليس لديك خواص كافية**');
                  message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
     //Snow Codes
                  }).then(() => {
                      message.reply("**:white_check_mark: تم اغلاق الروم بنجاح **")
                  });
                    } // كود اغلاق روم أي منع الجميع عن التحدث في الروم المعين
        if(message.content === prefix + "unmutechannel") { //RayGamerMC UnMuteChannel Code
                            if(!message.channel.guild) return message.reply('** هذا الأمر شغال فقط في السيرفرات**');
     //Snow Codes RayGamerMC
       if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**أنت ليس لديك خواص كافية**');
                  message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: true
     //Snow Codes
                  }).then(() => {
                      message.reply("**:white_check_mark: تم فتح الروم بنجاح**")
                  });
        }
           
    }); // كود فتح الروم أي جعل الاخرين قادرين على الكلام في الروم المعين في حالة كان مغلق


          client.on('message', message => {
            var prefix = "%"; //Snow Codes
                  if(!message.channel.guild) return;
        if(message.content.startsWith(prefix + 'bc')) {
        if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط ل السيرفرات**').then(m => m.delete(5000));
      if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**`ADMINISTRATOR`أنت لا تملك خاصية **' );
        let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
        let copy = "ArabGames Bot";
        let request = `Requested By ${message.author.username}`;
        if (!args) return message.reply('**اكتب رسالة البرودكاست**');message.channel.send(`**هل أنت متأكد من ارسال البرودكاست؟ \nالبرودكاست: ** \` ${args}\``).then(msg => { //Snow Codes
        msg.react('✅')
        .then(() => msg.react('❌'))
        .then(() =>msg.react('✅'))
       
        let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
       
        let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
        let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
     reaction1.on("collect", r => {
        message.channel.send(`**☑ | عضو  __${message.guild.members.size}__ تم ارسال البرودكاست ل **`).then(m => m.delete(5000));
        message.guild.members.forEach(m => {
     
      var bc = new
           Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle('Broadcast')
           .addField('🔰السيرفر🔰', message.guild.name) //Snow Codes
           .addField('🚩صاحب الرسالة🚩', message.author.username) //Snow Codes
           .addField('📜الرسالة📜', args)  //Snow Codes
           .setThumbnail(message.author.avatarURL)
           .setFooter(copy, client.user.avatarURL);
        m.send({ embed: bc })
        msg.delete();
        })
        })
        reaction2.on("collect", r => {
        message.channel.send(`**تم الغاء البرودكاست :x:**`).then(m => m.delete(5000));
        msg.delete();
        })
        })
        }
        }); //Snow Codes


client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('%msgall')){ // هو البريفكس و يمكنك تغييره في أي وقت +
 if(!message.author.id === '518816831734022154') return; // حط الايدي حقك عشان تكون الوحيد الي يقدر يستخدم الأمر
message.channel.sendMessage(' جار ارسال الرسالة | ✅')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});

client.on("guildMemberAdd", async member => {
  let moment2 = require('moment-duration-format'),
      moment = require("moment"),
      date = moment.duration(new Date() - member.user.createdAt).format("d");
 
  if(date < 6) {
    member.ban("Member account age is lower than 6 days.")
  }
});


client.on("message", message => {
  if (message.channel.type === "dm") {
 
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
   
  }
});


client.on('message', message => { //RayGamerMC BotInfo Code
    if (message.content.startsWith("%bot")) { // "+bot" هو البريفكس ب إمكانك تغييره في أي وقت في +
    message.channel.send({ //Snow Codes RayGamerMC
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM') //Snow Codes
            .setTitle('``Informations Of [ArabGames]`` ')
            .addField('``My Ping``' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true) //البنق
            .addField('``RAM Usage``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true) //الرام المستخدمة
            .addField('``servers``', [client.guilds.size], true) //عدد السيرفرات الي البوت موجود فيها
            .addField('``Users``' ,`[ ${client.users.size} ]` , true) //عدد مستخدمي البوت
            .addField('``My Name``' , `[ ${client.user.tag} ]` , true) //اسم البوت
            .addField('``My ID``' , `[ ${client.user.id} ]` , true) // ايدي البوت
                  .addField('``My Prefix``' , `[ % ]` , true) //بريفكس البوت
                  .addField('``My Language``' , `[ Java Script ]` , true) //لغة البوت
                  .setFooter('By | KillerPalesTine') //اسم الي صنع البوت
    })
}
}); //كود معلومات البوت مطور






client.on('message', message => {
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);

  if(!message.content.toLowerCase().startsWith(prefix)) return;
  if(command == "sugg") {
    if(!args.join(" ")) return message.channel.send(`**يرجي كتابة الاقتراح **`);
    let channel = message.guild.channels.find(c => c.name == "suggestions");
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setTitle(``)
    .setFooter(`Select a reaction below to vote on suggestion`)
    .setDescription(args.join(" "));
    channel.send(embed).then(msg => {
      msg.react("✅").then(() => msg.react("❌"));
      message.delete()
      message.channel.send(`**يرجي كتابة اقتراح لكي يتم ارساله الي روم الاقتراحات ❎ **`);
    });
  }
});


client.on('message', message => {
    if (message.author.bot) return;
     if (message.content ==="%help") {
         message.channel.send('**تم ارسالك في الخاص**');
            
    
         


 message.author.sendMessage(`
 **
%bc  //لارسال برودكاست للاعضاء
%new  //لعمل تيكيت يلزم رتبة Support Team
%clear  //مسح الشات
%mutechannel  //تقفيل الشات
%unmutechannel  //فتح الشات
%bot  //معلومات عن البوت
%sugg //لارسال اقتراح يلزم روم suggestions
%member  //معرفة حالة الاعضاء
%inv  //لاضافة البوت
%shop //يجب تكون رتبة Seller وروم shop
%myinvites  //لمعرفة كم عضو جبت
**
`);

    }
});

client.on("message", msg => {//Alpha Codes 
    var Alpha = '%';//البرفكس
    if(msg.content.startsWith(Alpha + "inv")){//Alpha Codes 
        let e = new Discord.RichEmbed()//Alpha Codes 
        .setTitle("**اضافه البوت لسيرفرك**")//Alpha Codes 
       .setDescription(`**📬 | اذا تريد البوت يرسلك الرابط بخاصك
       📇 | اذا تريد البوت يرسلك الرابط هنا بالشات**`)
        msg.channel.send(e).then(b => {
            b.react('📇')
            .then(() => b.react('📬'))
            .then(() =>b.react('📇'))
            let reaction1Filter = (reaction, user) => reaction.emoji.name === '📇' && user.id === msg.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '📬' && user.id === msg.author.id;

let reaction1 = b.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = b.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
msg.reply(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
b.delete(2000)
})
reaction2.on("collect", r => {
    msg.author.send(`${msg.author} https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
    b.delete(2000)
    msg.reply("**تم ارسال الرابط في خاصك 📬**").then(d => {
        d.delete(2000)
    })
    })
        })
    }
});


client.on("message",async message => {
if(message.content === '%shop'){//الامر
let staff = message.guild.member(message.author).roles.find('name' ,"Seller");
      if(!staff) return message.reply(`**Only Sellers | :x:**`)
var shopc = message.guild.channels.find("name","shop")
  if(!shopc) return message.reply("لا اجد الروم المخصص للبيع")
    let shop = '';
      let fillter = m => m.author.id === message.author.id
      
     

      await message.channel.send("اكتب الاشياء الذي سوف تبيعها").then(e => {
           message.channel.awaitMessages(fillter, { time: 60000, max: 1                                    
})
     .then(co => {
       shop = co.first().content;
        co.first().delete();
     
let desc = '';
        
e.edit("اكتب الدفع عند مين؟").then(e => {
  message.channel.awaitMessages(fillter, { time: 60000, max: 1 })

     .then(co => {
       desc = co.first().content;
        co.first().delete();
e.edit("Done").then(e => {
  shopc.send(`@everyone <$> @here
${message.guild.name}:tm: Shop :arrow_down:
======================
${shop}
=================
**الدفع عند:** **${desc}**

**تم الارسال بواسطة:** ${message.author}
@everyone </> @here`)
  })
})
  })
})
  })
           
      
  
     
  
      
           
}
});


client.on('message', message => {
   if(message.content.startsWith("%myinvites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} has **${inviteCount}** invites.`);
});
  }
});


 
 
 
 
 
client.login(process.env.BOT_TOKEN);
