import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicLayout from "./layouts/public.jsx";
import Login from "./pages/auth/login.jsx";
import PostsCreate from "./pages/public/post/create.jsx";
import Dashboard from "./pages/public/index.jsx";
import InstagramPost from "./pages/public/home/index.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="user" element={<PublicLayout/>}>
             <Route index element={<Dashboard />}/>
            <Route path="create" element={<PostsCreate/>}/>
             <Route path="home" element={<InstagramPost/>}/>
         </Route>

            <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
