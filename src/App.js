import {Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Example from "./pages/Example";
import Example2 from "./pages/Example2";
import Example3 from "./pages/Example3";
import Example4 from "./pages/Example4";
import Datepicker from "./pages/Datepicker";



function App() {

  const light = {
    colors : {
      Primary : "#f8d3d3",
      Secondary : "#f1a7a7",
      BgColor : "#e9f1f6",
      Color : "#000",
      ContentBg : "#fff"
    }
  }
  
  const dark = {
    colors : {
      Primary : "#272929",
      Secondary : "e9e9e9",
      BgColor : "#333",
      Color : "#e9e9e9",
      ContentBg : "#272929"
    }
  }
  
  const [themeConfig,setThemeConfig] = useState("light")
  
  const DarkMode = themeConfig === 'light' ? light : dark;

  const ThemeSelect = ()=>{
    setThemeConfig(themeConfig === 'light' ? 'dark' : 'light')
  }

  return (
  <>

    <ThemeProvider theme={DarkMode}>

      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/ex" element={<Example />}></Route>
        <Route path="/ex2" element={<Example2 />}></Route>
        <Route path="/ex3" element={<Example3 />}></Route>
        <Route path="/ex4" element={<Example4 />}></Route>
        <Route path="/datepicker" element={<Datepicker />}></Route>
        <Route path="/detail/:seq" element={<Detail />}></Route>
        {/* 홈페이지 접속하자마자 먼저 보여줄 페이지 */}
        {/* 고정할려면 Routes밖에 써야함(header,footer,aside,nav) */}
      </Routes>
      <Aside ThemeSelect={ThemeSelect} themeConfig={themeConfig}/>
      {/* app.js에서 aside로 넘기고싶으면 이렇게 작성 */}
    </ThemeProvider>
  </>
  );
}

export default App;
