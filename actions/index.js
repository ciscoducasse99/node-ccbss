const { SyncSSToCCB } = require("./SyncSSToCCB");
const { RegisterTeams } = require("./RegisterTeams");
const { MailingList } = require("./MailingList");

module.exports = {
  SyncCommand: SyncSSToCCB,
  RegisterCommand: RegisterTeams,
  MailingCommand: MailingList,
};
