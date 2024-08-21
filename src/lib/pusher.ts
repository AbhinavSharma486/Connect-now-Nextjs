import PusherServer from "pusher";
import PusherClient from "pusher-js";

// ^ In development this will create multiple instances of pusher,
// & which might cause you to hit the connection limit in free tier
// export const pusherServer = new PusherServer({
//   appId: process.env.PUSHER_APP_ID!,
//   key: process.env.PUSHER_APP_KEY!,
//   secret: process.env.PUSHER_APP_SECRET!,
//   cluster: "ap2",
//   useTLS: true,
// });

// export const pusherClient = new PusherClient(
//   process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
//   cluster: "ap2",
// });

declare global {
  var pusherServer: PusherServer | undefined;
  var pusherClient: PusherClient | undefined;
}

export const pusherServer = global.pusherServer || new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = global.pusherClient || new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, { cluster: "ap2" });