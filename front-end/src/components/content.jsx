//  מציג מידע על מזלות בצורה אסתטית ומאורגנת עם כרטיסיות (cards) שמציגות את המידע תחת כותרות שונות. הרכיב מקבל כמה פרופס (props) ומציג את הערכים שלהם בתבנית HTML מובנית.

function Content({
  zodiac,
  basicContent,
  howYouThinkAndTalk,
  locationOnMap,
  sign,
  whoYouAre,
}) {
  return (
    <>
      <div className="container rtl py-5">
        <div className="row text-center mb-4">
          <div className="col">
            <h1 className="fw-bold custom-purple-color">{zodiac}</h1>
          </div>
        </div>

        <div className="card shadow-lg border-1 p-3 custom-bg-gold">
          <div className="row mb-3">
            <div className="col">
              <h2 className="custom-purple-color">{basicContent}</h2>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="custom-purple-color">{howYouThinkAndTalk}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="custom-purple-color">{locationOnMap}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="custom-purple-color">{sign}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="custom-purple-color">{whoYouAre}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
