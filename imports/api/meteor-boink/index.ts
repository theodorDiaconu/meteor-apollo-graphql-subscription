let observers = {}; // {id: handler}

export function wrapPubSub(pubsub) {
  const oldAsyncIterator = pubsub.asyncIterator;

  pubsub.cursorAsyncIterator = function(fn) {
    const { cursorId, cursor } = getCursorInfo(fn);

    if (!observers[cursorId]) {
      pubsub.ee.on('removeListener', eventName => {
        if (pubsub.ee.listenerCount() === 1) {
          if (observers[cursorId]) {
            observers[cursorId].stop();
            delete observers[cursorId];
          }
        }
      });

      pubsub.ee.on('newListener', eventName => {
        if (pubsub.ee.listenerCount() === 0) {
          if (!observers[cursorId]) {
            observers[cursorId] = registerCursorObserver(
              cursor,
              cursorId,
              pubsub
            );
          }
        }
      });
    }

    return oldAsyncIterator.call(this, cursorId);
  }.bind(pubsub);
}

function registerCursorObserver(cursor, cursorId, pubsub) {
  return cursor.observeChanges({
    added(_id, doc) {
      pubsub.publish(cursorId, {
        type: 'added',
        _id,
        doc
      });
    },
    changed(_id, doc) {
      pubsub.publish(cursorId, {
        type: 'changed',
        _id,
        doc
      });
    },
    removed(_id) {
      pubsub.publish(cursorId, {
        type: 'removed',
        _id
      });
    }
  });
}

function getCursorInfo(fn) {
  const cursor = fn();
  const cursorId = getCursorId(cursor);

  return {
    cursor,
    cursorId
  };
}

/**
 * Gets an unique id based on the cursor's selector and options
 * @param cursor
 * @returns {string}
 */
function getCursorId(cursor) {
  const description = cursor._cursorDescription;
  const collectionName = getCollectionName(cursor);

  const { selector, options } = description;

  // because of some compatibility stuff
  return (
    collectionName + '::' + JSON.stringify(selector) + JSON.stringify(options)
  );
}

/**
 * @param cursor
 * @returns {*|string}
 * @private
 */
function getCollectionName(cursor) {
  const description = cursor._cursorDescription;

  // because of some compatibility stuff
  let collectionName = description.collectionName;
  if (!collectionName) {
    return description.collection.name;
  }

  return collectionName;
}
