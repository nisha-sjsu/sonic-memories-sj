import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Map from '../pages/Map';
import About from '../pages/About';
import Viz from '../pages/Viz';
import routes from './routes';

function RouterContent() {

    return (<Router>
        <Routes>
            <Route path={routes.map} element={<Map></Map>} />
            <Route path={routes.viz} element={<Viz></Viz>} />
            <Route path={routes.about} element={<About></About>} />
        </Routes>
    </Router>)

};

export default RouterContent;