import { useEffect, useState } from "react";
import userService from "../../services/userService";
import MsgClient from "../../components/msgClients";

function Inbox() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await userService.getMessages();
        console.log(response.data.messages);

        setMsgs(response?.data?.messages);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);
  console.log(msgs);
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center rtl">
      <h2>INBOX</h2>
      {msgs.map((msg) => (
        <MsgClient
          key={msg?._id}
          firstName={msg?.firstName}
          phone={msg?.phone}
          info={msg?.info}
          createdAt={msg?.createdAt}
        />
      ))}
    </div>
  );
}

export default Inbox;
