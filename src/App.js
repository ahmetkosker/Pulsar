import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Artist from "./pages/Artist";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Panel from "./pages/Panel";
import AddProject from "./pages/AddProject";
import AddBlog from "./pages/AddBlog";
import { getAboutTitle } from "./configs/simpleFunctions";
import PanelLogin from "./pages/PanelLogin";
import PanelHomepage from "./pages/PanelHomepage";

function App() {
  getAboutTitle();
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen max-h-full">
          <div className="flex-grow overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/panellogin" element={<PanelLogin />} />
              <Route path="/panelHomepage" element={<PanelHomepage />} />
              <Route path="/panel" element={<Panel />} />
              <Route path="/addProject" element={<AddProject />} />
              <Route path="/addBlog" element={<AddBlog />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
