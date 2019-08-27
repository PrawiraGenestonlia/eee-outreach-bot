const commandArgs = () => (ctx, next) => {
  let bCheck = false;
  // console.log("middleware", ctx.update.message.text);
  if (ctx.update) {
    if (ctx.update.message) {
      if (ctx.update.message.text) {
        if (ctx.update.message.text.length > 4) {
          bCheck = true;
        }
      }
    }
  }


  if (ctx.updateType === 'message' && bCheck) {
    const text = ctx.update.message.text;
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/)
      let args = []
      let command
      let person
      let message = ""
      if (match !== null) {
        if (match[1]) {
          command = match[1]
        }
        if (match[2]) {
          args = match[2].split(' ')
        }
      }
      if (args.length) {
        person = args[0];
        message = text.replace('/' + command, '');
        message = message.replace(person, '');
        while (message.charAt(0) === ' ') {
          message = message.substr(1);
        }
      }
      ctx.state.command = {
        raw: text,
        command,
        person,
        message
      }
    }
  }
  return next()
}

module.exports = commandArgs;