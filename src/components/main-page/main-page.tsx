import { useState } from "react";
import Header from "../header/header";
import LessonsPanel from "../lesson-panel/lesson-panel";
import WordList from "../words/word-list";

const MainPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header onMenuClick={handleDrawerToggle} />
      <LessonsPanel open={drawerOpen} onClose={handleDrawerToggle} />
      <WordList />
    </>
  );
};

export default MainPage;
