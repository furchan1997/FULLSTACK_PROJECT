//  מציג מידע על מזלות בצורה אסתטית ומאורגנת עם כרטיסיות (cards) שמציגות את המידע תחת כותרות שונות. הרכיב מקבל כמה פרופס (props) ומציג את הערכים שלהם בתבנית HTML מובנית.

function Content({
  zodiac,
  basicContent,
  howYouThinkAndTalk,
  locationOnMap,
  sign,
  whoYouAre,
  backgroundImages,
}) {
  return (
    <div
      className="backgroundImages"
      style={{ backgroundImage: `url(${backgroundImages})` }}
    >
      <div className="overlay">
        <div className="container rtl py-5">
          <div className="row text-center mb-4">
            <div className="col">
              <h1 className="fw-bold text-light">{zodiac}</h1>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h2 className="text-light">{basicContent}</h2>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="text-light">{howYouThinkAndTalk}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="text-light">{locationOnMap}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="text-light">{sign}</h3>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3 className="text-light">{whoYouAre}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
