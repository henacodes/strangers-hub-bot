export const extractParams = (base64) => {
  let decoded = atob(encoded);
  return Object.fromEntries(new URLSearchParams(decoded));
};

export const initialState = () => {
  return {
    task: null,
    title: null,
    content: null,
    comment: null,
  };
};

export const postChannel = async (query) => {
  const channelId = "@hena_bot_test";
  const channel = await bot.api.getChat(channelId);
  await bot.api.sendMessage(channel.id, query);
};
