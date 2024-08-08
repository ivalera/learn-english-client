import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setCurrentCategory } from "../../store/words-slice";
import { TEXT_CATEGORY } from "../words/constants";

interface LessonsPanelProps {
  open: boolean;
  onClose: () => void;
}

const LessonsPanel = ({ open, onClose }: LessonsPanelProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.words);

  const handleCategorySelect = (category: string) => {
    dispatch(setCurrentCategory(category));
    onClose();
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
      <List>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleCategorySelect(category)}>
                {TEXT_CATEGORY[category] || category}
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemButton disabled>Нет категорий</ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "white",
          top: 64,
          height: "calc(100% - 64px)",
          width: 250,
          overflow: "auto",
          boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
      BackdropProps={{
        invisible: true,
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default LessonsPanel;
