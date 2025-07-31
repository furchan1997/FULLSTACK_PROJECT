function NumerologyNum({
  number,
  description,
  positiveDescription,
  negativeDesription,
  womanDestiption,
  menDecription,
  relationshipsAPartnershipsDes,
  whyShouldDate,
  whyNoShouldDate,
  workAcareer,
}) {
  return (
    <div className="container my-4 text-end">
      <div className="card shadow rounded-4 p-2 bg-light">
        <h2 className="text-white fw-bold">מס' נומרולוגי: {number}</h2>

        <hr />

        <h4 className="mt-4 text-secondary">תיאור כללי על המספר:</h4>
        <p>{description}</p>

        <h4 className="mt-4 text-success">תכונות חיוביות של ה-{number} ✅</h4>
        <ul>
          {positiveDescription?.map((des, index) => (
            <li key={index}>{des}</li>
          ))}
        </ul>

        <h4 className="mt-4 text-danger">⚠ בפן הקצת פחות חיובי:</h4>
        <ul>
          {negativeDesription?.map((des, index) => (
            <li key={index}>{des}</li>
          ))}
        </ul>

        <h4 className="mt-4 text-info">נשים בספרה {number}:</h4>
        <p>{womanDestiption}</p>

        <h4 className="mt-4 text-info">גברים בספרה {number}:</h4>
        <p>{menDecription}</p>

        <h4 className="mt-4 text-warning">
          ♥ ה-{number} בזוגיות ומערכות יחסים:
        </h4>
        <p>{relationshipsAPartnershipsDes}</p>

        <h4 className="mt-4 text-success">למה כדאי לצאת עם אנשי ה-{number}:</h4>
        <p>{whyShouldDate}</p>

        <h4 className="mt-4 text-danger">
          למה לא כדאי לצאת עם אנשי ה-{number}:
        </h4>
        <p>{whyNoShouldDate}</p>

        <h4 className="mt-4 text-primary">בעבודה ובקריירה:</h4>
        <p>{workAcareer}</p>
      </div>
    </div>
  );
}

export default NumerologyNum;
