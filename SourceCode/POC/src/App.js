import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
// Branch Imports
import Homepage from "./screens/branch/homepage";
import AddQuestion from "./screens/branch/addquestion";
import AllQuestions from "./screens/branch/allquestions";
// Headquaters Imports
import HqHomepage from "./screens/headquaters/head-homepage";

// Common Imports
import RoleSelectionPage from "./screens/mainpage";
import QuestionView from "./screens/questionview";
import ResponseView from "./screens/responseview";
import Selection from "./screens/selection";
import NewBranch from "./screens/newBranch";
import NewJob from "./screens/newJob";
// Filter Imports
import Clno from "./screens/filter/clno";
import Stage from "./screens/filter/stage";
import Sketch from "./screens/filter/sketch";
import HrdInitials from "./screens/filter/hrd_int";
import Seq from "./screens/filter/Seq";
import DesRef from "./screens/filter/des_ref";
import RFI from "./screens/filter/rfi";
import Open from "./screens/filter/open";
import Close from "./screens/filter/close";
import WorkDoneBy from "./screens/filter/workdoneby";
import Response from "./screens/filter/response";
import DateSent from "./screens/filter/datesent";
import ResDate from "./screens/filter/resdate";
import SelectQuestion from "./screens/headquaters/head-selectquestion";
import Watermark from "./screens/watermark";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<RoleSelectionPage />} />
            <Route path="/question/:clNo" element={<QuestionView />} />
            <Route path="/resquestion/:clNo" element={<ResponseView />} />
            <Route path="/selection" element={<Selection />} />
            {/* Routes from Branch*/}
            <Route path="/brhomepage" element={<Homepage />} />
            <Route path="/bradd-question" element={<AddQuestion />} />
            <Route path="/brview-all" element={<AllQuestions />} />
            {/* Routes for Headquaters*/}
            <Route path="/hqhomepage" element={<HqHomepage />} />
            <Route path="/hqselect-question" element={<SelectQuestion />} />
            {/* Routes for Filters*/}
            <Route path="/filter/clno" element={<Clno />} />
            <Route path="/filter/stage" element={<Stage />} />
            <Route path="/filter/sketch" element={<Sketch />} />
            <Route path="/filter/hrd-initials" element={<HrdInitials />} />
            <Route path="/filter/sequence" element={<Seq />} />
            <Route path="/filter/design-ref" element={<DesRef />} />
            <Route path="/filter/rfi-no" element={<RFI />} />
            <Route path="/filter/open" element={<Open />} />
            <Route path="/filter/close" element={<Close />} />
            <Route path="/filter/workdoneby" element={<WorkDoneBy />} />
            <Route path="/filter/Response" element={<Response />} />
            <Route path="/filter/datesent" element={<DateSent />} />
            <Route path="/filter/resdate" element={<ResDate />} />
            <Route path="/new-branch" element={<NewBranch />} />
            <Route path="/new-job" element={<NewJob />} />
          </Routes>
        </div>
        <Watermark />
      </div>
    </Router>
  );
}

export default App;
