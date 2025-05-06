import Btn from "./btn";

function MsgClient({
  id,
  firstName,
  phone,
  info,
  createdAt,
  deleteBtn = () => {},
}) {
  return (
    <div className="container book-frame d-flex flex-column flex justify-content-center align-items-center ">
      <h3>
        <span className="fw-bold">שם: </span> {firstName}
      </h3>
      <h3>
        {" "}
        <span className="fw-bold">נייד: </span> {phone}
      </h3>
      <p style={{ wordBreak: "break-word" }}>
        {" "}
        <span className="fw-bold">תגובת הלקוח: </span> {info}{" "}
      </p>
      <p className="rtl">
        <span className="fw-bold">נשלח בתאריך: </span> {createdAt}
      </p>
      <p>
        <Btn
          type={"button"}
          className="custom-bg-purple custom-purple-color fw-bold"
          description={"🗑️"}
          fn={deleteBtn}
        />
      </p>
    </div>
  );
}

export default MsgClient;
