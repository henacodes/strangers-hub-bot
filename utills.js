export const extractParams = (base64) => {
  let decoded = atob(encoded);
  return Object.fromEntries(new URLSearchParams(decoded));
};

export const initialState = () => {
  return {
    task: null,
    title: null,
    content: null,
    tags: null,
    comment: null,
    postToReply: null,
  };
};

export const postChannel = async (query) => {
  const channelId = "@hena_bot_test";
  const channel = await bot.api.getChat(channelId);
  await bot.api.sendMessage(channel.id, query);
};

export const generateTags = (str) => {
  const array = str.replace(/\s+/g, "").split(",");
  let tag = "";
  array.forEach((e) => {
    let removeSpace = e.replace(" ", "");
    tag = tag + ` #${e} `;
  });
  return tag;
};
