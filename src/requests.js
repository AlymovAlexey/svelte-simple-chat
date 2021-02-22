export function getDialogs(){
    return [
        {
          id: 0,
          last_message: "Второе сообщение.",
          date: "22:23:28 22.02.2021",
          from: "Сидоров Петя",
          avatar: "https://ptetutorials.com/images/user-profile.png",
          active: "active_chat",
        },
        {
          id: 1,
          last_message: "Первое сообщение.",
          date: "22:23:28 21.02.2021",
          from: "Иванов Иван",
          avatar: "https://ptetutorials.com/images/user-profile.png",
          active: "",
        }
      ];
}

export function getMessages(dialog_id){
    if (dialog_id === 0) {
        return [
          {
            id: 3,
            side: "incoming_msg",
            type: "received_msg",
            text: "Test, which is a new approach to have",
            date: "11:01 AM | June 9",
          },
        ];
      } else if (dialog_id === 1) {
        return [
          {
            id: 1,
            side: "incoming_msg",
            type: "received_msg",
            text: "Test which is a new approach to have all solutions",
            date: "11:01 AM | June 9",
          },
          {
            id: 2,
            side: "outgoing_msg",
            type: "send_msg",
            text: "Test which is a new approach to have all solutions",
            date: "11:01 AM | June 9",
          },
          {
            id: 3,
            side: "incoming_msg",
            type: "received_msg",
            text: "Test, which is a new approach to have",
            date: "11:01 AM | June 9",
          },
          {
            id: 4,
            side: "outgoing_msg",
            type: "send_msg",
            text: "Apollo University, Delhi, India Test",
            date: "11:01 AM | June 9",
          },
          {
            id: 5,
            side: "incoming_msg",
            type: "received_msg",
            text:
              "We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.",
            date: "11:01 AM | June 9",
          },
          {
            id: 6,
            side: "incoming_msg",
            type: "received_msg",
            text: "Test, which is a new approach to have",
            date: "11:01 AM | June 9",
          },
          {
            id: 7,
            side: "outgoing_msg",
            text: "Apollo University, Delhi, India Test",
            date: "11:01 AM | June 9",
          },
          {
            id: 8,
            side: "incoming_msg",
            type: "received_msg",
            text:
              "We work directly with our designers and suppliers, and sell direct to you, which means quality, exclusive products, at a price anyone can afford.",
            date: "11:01 AM | June 9",
          },
        ];
      }
}