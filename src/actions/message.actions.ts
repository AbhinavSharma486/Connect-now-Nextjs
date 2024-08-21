"use server";

import { Message } from "@/db/dummy";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { pusherServer } from "@/lib/pusher";

type SendMessageActionArgs = {
  content: string;
  receiverId: string;
  messageType: "text" | "image";
};

export async function sendMessageAction({ content, messageType, receiverId }: SendMessageActionArgs) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return { success: false, message: "User not authenticated" };

  const senderId = user.id;

  const conversationId = `conversation:${[senderId, receiverId].sort().join(":")}`;

  // the issue with this has been explained in the tutorial, we need to sort the ids to make the conversation id is always tthe same
  // Abhinav , ajay
  // 6004    , 6005

  // Abhinav sends a message to ajay
  // senderId: 6004 , receiverId: 6005
  // `conversation:6004:6005`

  // Ajay sends a message to abhinav
  // senderId: 6005 , receiverId: 6004
  // `conversation:6005:6004`

  const conversationExists = await redis.exists(conversationId);

  if (!conversationExists) {
    await redis.hset(conversationId, {
      participant1: senderId,
      participant2: receiverId,
    });

    await redis.sadd(`user:${senderId}:converations`, conversationId);
    await redis.sadd(`user:${receiverId}:converations`, conversationId);
  }

  // Generating a unique message id
  const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = Date.now();

  // Creating the message hash
  await redis.hset(messageId, {
    senderId,
    content,
    timestamp,
    messageType,
  });

  await redis.zadd(`${conversationId}:messages`, { score: timestamp, member: JSON.stringify(messageId) });


  const channelName = `${senderId}__${receiverId}`.split("__").sort().join("__");

  await pusherServer?.trigger(channelName, "newMessage", {
    message: { senderId, content, timestamp, messageType }
  });

  return { success: true, conversationId, messageId };
}

export async function getMessages(selectedUserId: string, currentUserId: string) {
  const conversationId = `conversation:${[selectedUserId, currentUserId].sort().join(":")}`;

  const messageIds = await redis.zrange(`${conversationId}:messages`, 0, -1);

  if (messageIds.length === 0) return [];

  const pipeline = redis.pipeline();
  messageIds.forEach((messageId) => pipeline.hgetall(messageId as string));
  const messages = (await pipeline.exec()) as Message[];

  return messages;
}