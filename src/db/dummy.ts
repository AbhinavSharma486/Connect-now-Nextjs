export interface Message {
  id: number;
  senderId: string;
  content: string;
  messageType: "text" | "image";
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const USERS = [
  {
    id: "2",
    image: "",
    name: "Abhinav Sharma",
    email: "johndoe@gmail.com",
  },
  {
    id: "3",
    image: "",
    name: "Deepti Sharma",
    email: "elizabeth@gmail.com",
  },
  {
    id: "4",
    image: "",
    name: "Ajay Kumar",
    email: "johnsmith@gmail.com",
  },
  {
    id: "5",
    image: "",
    name: "Anjali Sharma",
    email: "janedoe@gmail.com",
  },
];

export const messages = [
  {
    id: 1,
    senderId: USERS[0].id,
    content: "Hello",
    messageType: "text",
  },
  {
    id: 2,
    senderId: USERS[1].id,
    content: "Hi",
    messageType: "text",
  },
  {
    id: 3,
    senderId: USERS[0].id,
    content: "How are you?",
    messageType: "text",
  },
  {
    id: 4,
    senderId: USERS[1].id,
    content: "I'm good",
    messageType: "text",
  },
  {
    id: 5,
    senderId: USERS[0].id,
    content: "What are you doing?",
    messageType: "text",
  },
  {
    id: 6,
    senderId: USERS[1].id,
    content: "Nothing much",
    messageType: "text",
  },
  {
    id: 7,
    senderId: USERS[0].id,
    content: "Cool",
    messageType: "text",
  },
  {
    id: 8,
    senderId: USERS[1].id,
    content: "Yeah",
    messageType: "text",
  },
  {
    id: 9,
    senderId: USERS[0].id,
    content: "Bye",
    messageType: "text",
  },
  {
    id: 10,
    senderId: USERS[1].id,
    content: "Bye",
    messageType: "text",
  },
] as Message[];
