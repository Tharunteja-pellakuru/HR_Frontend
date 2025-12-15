import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "./Routes/PublicRoute";

const App = () => {
    return (
        <Router>
            <PublicRoute />
        </Router>
    );
};

export default App;
