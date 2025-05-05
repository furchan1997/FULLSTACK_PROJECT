import LeadCleaning from "../pages/serviceType/leadCleaning";

function ServicesTypes({
  title, // כותרת ראשית
  subtitle, // תיאור כללי
  appropriate, // למי זה מתאים?
  recommended, // מתי מומלץ?
  method, // השיטה
  methodDescription, // תיאור השיטה
  description, //
  customerGuidance,
  remark,
  priceList,
  isOprningCards,
  service,
  isLeadCleaning,
}) {
  return (
    <div className="container book-frame d-flex flex-column align-items-center rtl p-1 w-75">
      <h1 className="fw-bold fs-1">{title}</h1>
      <h2 className="fw-bold fs-2">{subtitle}</h2>
      <h3 className="fs-3"> למי זה מתאים?</h3>
      <h3 className="fs-5">{appropriate}</h3>
      {isLeadCleaning && (
        <>
          <h3 className="fs-3">מה כולל השירות?</h3>
          <p className="fs-5">{service}</p>
        </>
      )}
      <h3 className="fs-3">
        מתי מומלץ? <br />
      </h3>

      <ul>
        {recommended.map((item, index) => (
          <li className="fs-5" key={index}>
            {item}
          </li>
        ))}
      </ul>

      <h3 className="fs-3">{methodDescription}</h3>
      <p className="fs-5">{description}</p>

      {!isLeadCleaning && (
        <>
          <h3 className="fs-3">
            איך זה עובד? <br />
          </h3>
        </>
      )}
      {isOprningCards && (
        <>
          <p>
            <strong>{customerGuidance}</strong>
          </p>
        </>
      )}
      {!isLeadCleaning && (
        <>
          <ul>
            {method.map((item, index) => (
              <li className="fs-5" key={index}>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      <>
        <p className="fs-3">
          <strong>{remark}</strong>
        </p>
      </>

      <h3 className="fs-3">מחירון:</h3>
      <ul>
        {priceList.map((item, index) => (
          <li className="fs-5" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesTypes;
