const conversationExists = (conversations, sender_id, reciever_id) => {
  const conversation = conversations.find(
    (conversation) => (
      conversation.users[0].id === sender_id || conversation.users[0].id === reciever_id
    )
      && (
        conversation.users[1].id === sender_id || conversation.users[1].id === reciever_id
      ),
  );
  return conversation;
};

export default conversationExists;
