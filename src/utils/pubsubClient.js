import { PubSub } from "@google-cloud/pubsub";
import logger from "../utils/logger.js";

const pubSubClient = new PubSub({});

export const publishMessage = async (topicName, messageData) => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(messageData));
    logger.debug(
      `[PubSub] Publishing Message Data: ${dataBuffer} to Topic: ${topicName}.`
    );
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    logger.info(
      `[PubSub] Message: ${messageId} published to Topic: ${topicName}.`
    );
  } catch (error) {
    logger.error("[PubSub] Error publishing message:", error);
  }
};