import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const ConversationListItem = (props) => {
  const {
    conversation, styles, setActive, currentUser,
  } = props;

  const isLarge = useMediaQuery({
    query: '(min-width: 968px)',
  });

  const lastMessage = conversation.messages[conversation.messages.length - 1] || {};
  const previewText = lastMessage ? lastMessage.text : '';
  const time = lastMessage.created_at;
  const dateTime = time ? DateTime.fromISO(time).toLocal().c : '';
  const sender = conversation.users.find((user) => user.id !== currentUser.id);
  if (!sender) {
    return null;
  }
  return (
    <li className={styles.convText} onClick={() => { setActive(conversation.id); }} role="presentation">
      <figure>
        <Image cloudName="dfsniizqr" publicId={conversation.users[0].image}>
          <Transformation gravity="face" height="100" width="100" crop="fill" />
        </Image>
      </figure>
      <div className={styles.right}>
        <div className={styles.top}>
          <span>{sender.name}</span>
          {isLarge && dateTime && <span className={styles.secondaryInfo}>{`${dateTime.hour}:${dateTime.minute}`}</span>}
        </div>
        {isLarge && previewText
          && (
          <div className={`${styles.secondaryInfo} ${styles.previewText}`}>
            {previewText}
          </div>
          )}
      </div>
    </li>
  );
};

ConversationListItem.propTypes = {
  conversation: PropTypes.instanceOf(Object).isRequired,
  styles: PropTypes.instanceOf(Object).isRequired,
  setActive: PropTypes.func.isRequired,
  currentUser: PropTypes.instanceOf(Object).isRequired,
};

export default ConversationListItem;
