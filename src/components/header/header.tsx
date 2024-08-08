import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/auth-slice";
import Authorization from "../authorization/authorization";

interface HeaderProps {
  	onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state: RootState) => state.authorization.isLoggedIn);

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);
	const handleLogout = () => {
		dispatch(logout());
		handleCloseModal();
	};

  	return (
    	<>
			<AppBar position="fixed">
				<Toolbar>
					{isLoggedIn && 
						<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={onMenuClick}
					>
						<MenuIcon />
					</IconButton>
					}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Изучение Анлийских Слов
					</Typography>
					{isLoggedIn ? (
						<Button color="inherit" onClick={handleLogout}>
							Выйти
						</Button>
					) : (
						<Button color="inherit" onClick={handleOpenModal}>
							Войти
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Authorization open={modalOpen} handleClose={handleCloseModal} />
    	</>
  	);
}
