import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import SeeMore from "./SeeMore";

import { AnimatePresence } from "framer-motion";

const Pages = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>}/>
        <Route path="/see-more/:regionName" element={<SeeMore/>}/>
        <Route path="/country/:name" element={<Info/>} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages