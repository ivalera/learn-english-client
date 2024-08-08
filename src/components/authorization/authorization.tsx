import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "../../hooks/use-snackbar";
import {
  loginRequest,
  registrationRequest,
} from "../../api/authorization-service";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AuthorizationProps {
  open: boolean;
  handleClose: () => void;
}

const Authorization = ({ open, handleClose }: AuthorizationProps) => {
  const [state, setState] = useState({
    isLogin: true,
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      isLogin: newValue === 0,
      email: "",
      password: "",
      confirmPassword: "",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, confirmPassword, isLogin } = state;

    if (!email || !password || (!isLogin && !confirmPassword)) {
      showSnackbar("Заполните все поля!", "error");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      showSnackbar("Пароли не совпадают!", "error");
      return;
    }

    try {
      if (isLogin) {
        const response = await loginRequest(email, password);
        dispatch(login(response.token));
        showSnackbar("Вы вошли в аккаунт.", "success");
        handleClose();
      } else {
        await registrationRequest(email, password);
        showSnackbar("Вы зарегистрировались.", "success");
        handleClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Возникла ошибка, попробуйте ещё раз.";
      showSnackbar(errorMessage, "error");
    }
  };

  const resetForm = () => {
    setState({
      isLogin: true,
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          {state.isLogin ? "Войти в аккаунт" : "Регистрация"}
        </Typography>
        <Tabs value={state.isLogin ? 0 : 1} onChange={handleTabChange}>
          <Tab label="Войти" />
          <Tab label="Регистрация" />
        </Tabs>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            fullWidth
            margin="normal"
            label="Почта"
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Пароль"
            type={state.showPassword ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setState((prevState) => ({
                        ...prevState,
                        showPassword: !prevState.showPassword,
                      }))
                    }
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!state.isLogin && (
            <TextField
              required
              fullWidth
              margin="normal"
              label="Подтвердить пароль"
              type={state.showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          showConfirmPassword: !prevState.showConfirmPassword,
                        }))
                      }
                      edge="end"
                    >
                      {state.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            {state.isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Authorization;
