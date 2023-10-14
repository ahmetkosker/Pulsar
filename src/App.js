import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Artist from "./pages/Artist";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import AddBlog from "./pages/AdminPanel/PanelBlogs/AddBlog";
import PanelLogin from "./pages/AdminPanel/PanelMain/PanelLogin";
import PanelHomepage from "./pages/AdminPanel/PanelMain/PanelHomepage";
import ManageArtists from "./pages/AdminPanel/PanelArtists/ManageArtists";
import AddArtist from "./pages/AdminPanel/PanelArtists/AddArtist";
import DeleteArtists from "./pages/AdminPanel/PanelArtists/DeleteArtists";
import PanelUpdate from "./pages/AdminPanel/PanelArtists/PanelUpdate";
import ManageProjects from "./pages/AdminPanel/PanelProjects/ManageProjects";
import AddProject from "./pages/AdminPanel/PanelProjects/AddProject";
import DeleteProject from "./pages/AdminPanel/PanelProjects/DeleteProject";
import UpdateProject from "./pages/AdminPanel/PanelProjects/UpdateProject";
import ManageBlogs from "./pages/AdminPanel/PanelBlogs/ManageBlogs";
import DeleteBlog from "./pages/AdminPanel/PanelBlogs/DeleteBlog";
import UpdateBlog from "./pages/AdminPanel/PanelBlogs/UpdateBlog";

function App() {
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
              <Route path="/adminpanel" element={<PanelLogin />} />
              <Route path="/panelHomepage" element={<PanelHomepage />} />
              <Route path="/manage-artists" element={<ManageArtists />} />
              <Route path="/manage-artists/addArtist" element={<AddArtist />} />
              <Route path="/manage-artists/panelUpdate" element={<PanelUpdate />} />
              <Route path="/manage-artists/deleteArtist" element={<DeleteArtists />} />
              <Route path="/manage-projects" element={<ManageProjects />} />
              <Route path="/manage-projects/addProject" element={<AddProject />} />
              <Route path="/manage-projects/updateProject" element={<UpdateProject />} />
              <Route path="/manage-projects/deleteProject" element={<DeleteProject />} />
              <Route path="/manage-blogs" element={<ManageBlogs />} />
              <Route path="/manage-blogs/addBlog" element={<AddBlog />} />
              <Route path="/manage-blogs/updateBlog" element={<UpdateBlog />} />
              <Route path="/manage-blogs/deleteBlog" element={<DeleteBlog />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
