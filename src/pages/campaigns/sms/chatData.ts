import avatar1 from "../../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../../assets/img/avatars/avatar-4.jpg";
import { ChatUser } from "../../../types/sms/chat";

//-do a research on how to create the font-avator. We want to use the first letter of the name
//- isOnline shows a green. we may not needed.
//- unreadMessages should be not a counter instead we are going to see the last messages. if they don't matched our devices phone number it will be consider a unread
export const userList1: ChatUser[] = [
  {
    id: 1,
    name: "conversation name",
    avatar: avatar1,
    isOnline: true,
    unreadMessages: 5,
    content: [
      {
        id: 1, //messageId
        position: "right", //this should be a front-end change depending on the number that you are talking form
        name: "You",  //you will flag if the number [msgFrom] is part of any of our number
        avatar: avatar1, //your avatar if you or name (font avator) if not you
        time: "2:33 am", //we need to group the date and then time for each of the chats. divided by <hr/> following the next. Need to add a date.
        content:
          "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
      },
      {
        id: 2,
        position: "left",
        name: "Bertha Martin",
        avatar: avatar3,
        time: "2:34 am",
        content:
          "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
      },
      {
        id: 3,
        position: "right",
        name: "You",
        avatar: avatar1,
        time: "2:35 am",
        content: "Cum ea graeci tractatos.",
      },
    ],
  },
  {
    id: 2,
    name: "Bertha Martin",
    avatar: avatar2,
    isOnline: true,
    unreadMessages: 2,
    content: [
      {
        id: 1,
        position: "right",
        name: "You",
        avatar: avatar2,
        time: "2:33 am",
        content:
          "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
      },
      {
        id: 2,
        position: "left",
        name: "Bertha Martin",
        avatar: avatar4,
        time: "2:34 am",
        content:
          "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
      },
    ],
  },
];

export const userList2: ChatUser[] = [
  {
    id: 1,
    name: "John Martin",
    avatar: avatar2,
    isOnline: true,
    unreadMessages: 4,
    content: [
      {
        id: 1,
        position: "right",
        name: "You",
        avatar: avatar2,
        time: "2:33 am",
        content:
          "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
      },
      {
        id: 2,
        position: "left",
        name: "Bertha Martin",
        avatar: avatar4,
        time: "2:34 am",
        content:
          "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
      },
      {
        id: 3,
        position: "right",
        name: "You",
        avatar: avatar4,
        time: "2:35 am",
        content: "Cum ea graeci tractatos.",
      },
    ],
  },
  {
    id: 2,
    name: "Bertha Doe",
    avatar: avatar3,
    isOnline: true,
    unreadMessages: 3,
    content: [
      {
        id: 1,
        position: "right",
        name: "You",
        avatar: avatar2,
        time: "2:33 am",
        content:
          "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
      },
      {
        id: 2,
        position: "left",
        name: "Bertha Doe",
        avatar: avatar4,
        time: "2:34 am",
        content:
          "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
      },
    ],
  },
];