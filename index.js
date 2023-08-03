const contactsApi = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();
console.log(argv);

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsApi.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const currentContact = await contactsApi.getContactById(id);
      if (currentContact === null) {
        console.log("This contact was not found!");
      }
      console.log(currentContact);
      break;

    case "add":
      const newContact = await contactsApi.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactsApi.getContactById(id);
      if (deleteContact === null) {
        console.log("This contact was not found!");
      }
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Olga",
//   email: "ol@ukr.net",
//   phone: "098744566",
// });
// invokeAction({ action: "remove", id: "DjxLulQk5vaSkw8I1VX8e" });
invokeAction(argv);
