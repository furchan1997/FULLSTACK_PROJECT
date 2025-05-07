import { useEffect, useState } from "react";
import userService from "../../services/userService";
import MsgClient from "../../components/msgClients";
import Btn from "../../components/btn";
import { useAuth } from "../../context/auth.context";
import { alertDeleting } from "../../components/common/alertDeleting";

function Inbox() {
  const { getAllMsgs, msgs, deletedAllMsgs, deleteMsgByID, loading, error } =
    useAuth();

  const handleDeletedAllClick = () => {
    alertDeleting(() => deletedAllMsgs());
  };

  const handleDeletedByIdClick = (ID) => {
    alertDeleting(() => deleteMsgByID(ID));
  };

  useEffect(() => {
    getAllMsgs();
  }, [error]);

  if (loading) {
    return (
      <div className="container book-frame d-flex flex-column flex justify-content-center align-items-center rtl">
        אנא המתיני...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container book-frame d-flex flex-column flex justify-content-center align-items-center">
        ERROR: {error}
      </div>
    );
  }

  if (msgs?.length === 0) {
    return (
      <>
        <div className="container book-frame d-flex flex-column flex justify-content-center align-items-center rtl fw-bold fs-3">
          אין הודעות מלקוחות כרגע, נסי שוב מאוחר יותר...
        </div>
      </>
    );
  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center rtl">
      <div className="d-flex flex-column">
        <h2>INBOX</h2>
        <Btn
          type={"button"}
          className="custom-bg-gold custom-purple-color fw-bold"
          description={"מחקי הכל"}
          fn={handleDeletedAllClick}
        />
      </div>

      {msgs.map((msg) => (
        <MsgClient
          key={msg?._id}
          firstName={msg?.firstName}
          phone={msg?.phone}
          info={msg?.info}
          createdAt={msg?.createdAt}
          deleteBtn={() => handleDeletedByIdClick(msg?._id)}
        />
      ))}
    </div>
  );
}

export default Inbox;
