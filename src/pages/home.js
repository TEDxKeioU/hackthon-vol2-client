import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LoginIcon from '@mui/icons-material/Login';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThermostatIcon from '@mui/icons-material/Thermostat';

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcc00',
    },
    secondary: {
      main: '#665C43',
    },
    background: {
      default: '#fff9db',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Hiragino Maru Gothic Pro", "ヒラギノ丸ゴ Pro W4", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default function Home() {
  const [submitText, setSubmitText] = useState("");
  const [inputText, setInputText] = useState("");
  const [avoidIngredient, setAvoidIngredient] = useState("");
  const [avoidIngredientList, setAvoidIngredientList] = useState([]);
  const [wantIngredient, setWantIngredient] = useState("");
  const [wantIngredientList, setWantIngredientList] = useState([]);
  const [temp, setTemp] = useState(21);
  const [selectedMode, setSelectedMode] = useState(null);
  const modes = ["お手軽", "ひと工夫", "じっくり"];
  const cookingTimelist = ["10分以内", "10分から25分", "25分以上"];

  const [cookingTime, setCookingTime] = useState("10分以内");
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "5357ea3fecf3393c86c63b1fbe28fac0";

  useEffect(() => {
    async function postData() {
      if (submitText === "" && !submitText) {
        console.log("submitText is empty && null");
        return;
      }
      try {
        fetch("http://localhost:8000/cook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: submitText,
        })
        console.log("success posts. submitText: ", submitText);
      }
      catch (error) {
        console.error("Failed to post:", error);
      }
    }
    postData();
  }, [submitText]);

  useEffect(() => {
    function combineText() {
      const modeKey = selectedMode ? modes.indexOf(selectedMode) : 0;
      setCookingTime(cookingTimelist[modeKey]);
      const conbinedObj = {
        ingredients: {
          avoid: avoidIngredientList,
          want: wantIngredientList,
        },
        temp: temp,
        cookingTime: cookingTime,
      };
      const conbinedText = JSON.stringify(conbinedObj);
      console.log("combinedText: ", conbinedText);
      setInputText(conbinedText);
    }
    combineText();
  }, [wantIngredientList, avoidIngredientList, temp, cookingTime, selectedMode]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("位置情報の取得に失敗しました:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocationはこのブラウザでサポートされていません");
      setLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setTemp(data.main.temp);
    } catch (error) {
      console.error("天気情報の取得に失敗しました:", error);
    }
    setLoading(false);
  };

  const getTemperatureFeeling = (temp) => {
    if (temp <= 5) return "🥶 めっちゃ寒い！";
    if (temp <= 15) return "🧥 肌寒い";
    if (temp <= 25) return "😌 ちょうどいい";
    if (temp <= 30) return "🌞 ちょっと暑い";
    return "🥵 めっちゃ暑い！";
  };

  const getTemperatureIcon = (temp) => {
    if (temp <= 15) return <AcUnitIcon fontSize="small" />;
    if (temp <= 25) return <ThermostatIcon fontSize="small" />;
    return <WbSunnyIcon fontSize="small" />;
  };

  const handleModeChange = (event, newMode) => {
    setSelectedMode(newMode);
  };

  const addWantIngredient = () => {
    if (wantIngredient.trim() !== "") {
      setWantIngredientList(prev => [...prev, wantIngredient]);
      setWantIngredient("");
    }
  };

  const addAvoidIngredient = () => {
    if (avoidIngredient.trim() !== "") {
      setAvoidIngredientList(prev => [...prev, avoidIngredient]);
      setAvoidIngredient("");
    }
  };

  const handleFindRecipe = () => {
    setSubmitText(inputText);
    setInputText(""); 
    setAvoidIngredient(""); 
    setWantIngredient(""); 
    setTemp(21); 
    setCookingTime("10分以内");
    navigate('/recipe');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="contained"
            startIcon={<CalendarMonthIcon />}
            onClick={() => navigate('/calender')}
            sx={{ flex: 1, mr: 1 }}
          >
            カレンダー
          </Button>
          <Button 
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')}
            sx={{ flex: 1, ml: 1 }}
          >
            ログイン
          </Button>
        </Box>

        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="secondary" align="left" gutterBottom>
            今日の天気
          </Typography>
          {loading ? (
            <Typography>取得中だよ！</Typography>
          ) : weather ? (
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                {weather && weather.weather && (
                  <>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="天気アイコン"
                      width="40" height="40"
                    />
                    <Typography variant="body2">{weather.weather[0].description}</Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Chip 
                  icon={getTemperatureIcon(temp)}
                  label={`${temp}° ${getTemperatureFeeling(temp)}`}
                  size="small"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ) : (
            <Typography>天気情報を取得できませんでした。</Typography>
          )}
        </Paper>

        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="secondary" align="left" gutterBottom>
            モード
          </Typography>
          <ToggleButtonGroup
            value={selectedMode}
            exclusive
            onChange={handleModeChange}
            aria-label="cooking mode"
            fullWidth
            size="small"
          >
            {modes.map((mode) => (
              <ToggleButton key={mode} value={mode}>
                {mode}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Paper>

        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="secondary" align="left" gutterBottom>
              使いたい食材
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="使いたい食材を入れてね"
                  value={wantIngredient}
                  onChange={(e) => setWantIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addWantIngredient()}
                />
              </Grid>
              <Grid item xs={4}>
                <Button 
                  variant="contained"
                  onClick={addWantIngredient}
                  fullWidth
                >
                  追加
                </Button>
              </Grid>
            </Grid>
            <List dense>
              {wantIngredientList.map((item, index) => (
                <ListItem 
                  key={index}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => setWantIngredientList(prev => prev.filter((_, i) => i !== index))}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="secondary" align="left" gutterBottom>
              避けたい食材
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="避けたい食材を入れてね"
                  value={avoidIngredient}
                  onChange={(e) => setAvoidIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addAvoidIngredient()}
                />
              </Grid>
              <Grid item xs={4}>
                <Button 
                  variant="contained"
                  onClick={addAvoidIngredient}
                  fullWidth
                >
                  追加
                </Button>
              </Grid>
            </Grid>
            <List dense>
              {avoidIngredientList.map((item, index) => (
                <ListItem 
                  key={index}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => setAvoidIngredientList(prev => prev.filter((_, i) => i !== index))}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>

        <Button 
          variant="contained" 
          size="large"
          startIcon={<RestaurantMenuIcon />}
          onClick={handleFindRecipe}
          sx={{ mb: 2, py: 1 }}
          fullWidth
        >
          ポチッとレシピ！
        </Button>

        <Paper elevation={1} sx={{ p: 1, mb: 2, bgcolor: 'rgba(255,255,255,0.7)' }}>
          <Typography variant="caption" component="div" align="left">
            現在の選択肢: {inputText}
          </Typography>
          <Typography variant="caption" component="div" align="left">
            送信するテキスト: {submitText}
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
