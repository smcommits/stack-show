const conversationExists = (conversations, senderId, recieverId) => {
  const conversation = conversations.find(
    (conversation) => (
      conversation.users[0].id === senderId || conversation.users[0].id === recieverId
    )
      && (
        conversation.users[1].id === senderId || conversation.users[1].id === recieverId
      ),
  );
  return conversation;
};

export default conversationExists;
