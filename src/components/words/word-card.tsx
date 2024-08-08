import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { WordDataType } from "./type";
import { Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import HelpIcon from "@mui/icons-material/Help";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface WordCardProps {
  word: WordDataType | null;
  options: string[];
  correctOption: string | null;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (selected: string) => void;
  disablePrev: boolean;
  disableNext: boolean;
  loading: boolean;
  selected: string | null;
  showAnswer: boolean;
}

export default function WordCard({
  word,
  options,
  correctOption,
  onPrev,
  onNext,
  onSelect,
  disablePrev,
  disableNext,
  loading,
  selected,
  showAnswer,
}: WordCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handlePronounce = () => {
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      speechSynthesis.speak(utterance);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mt: 2 }}>
      <CardContent>
        {loading ? (
          <>
            <Skeleton
              variant="text"
              height={60}
              width="60%"
              sx={{ margin: "auto" }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                justifyItems: "center",
              }}
            >
              <Skeleton
                variant="rectangular"
                height={40}
                width="100%"
                sx={{ marginTop: 1 }}
              />
              <Skeleton
                variant="rectangular"
                height={40}
                width="100%"
                sx={{ marginTop: 1 }}
              />
              <Skeleton
                variant="rectangular"
                height={40}
                width="100%"
                sx={{ marginTop: 1 }}
              />
              <Skeleton
                variant="rectangular"
                height={40}
                width="100%"
                sx={{ marginTop: 1 }}
              />
            </Box>
          </>
        ) : (
          <>
            {flipped ? (
              <Typography gutterBottom variant="h4" textAlign="center">
                {word?.translation}
              </Typography>
            ) : (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h3"
                    textAlign="center"
                    sx={{ m: 0, mr: 1 }}
                  >
                    {word?.word}
                  </Typography>
                  <IconButton onClick={handlePronounce}>
                    <MicIcon />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    justifyItems: "center",
                    mt: 4,
                  }}
                >
                  {options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => onSelect(option)}
                      disabled={showAnswer}
                      sx={{
                        width: "100%",
                        backgroundColor: showAnswer
                          ? option === correctOption
                            ? "green"
                            : option === selected
                              ? "red"
                              : "inherit"
                          : "inherit",
                        color:
                          showAnswer && option === correctOption
                            ? "white"
                            : "inherit",
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button size="small" onClick={onPrev} disabled={disablePrev}>
          Предыдущее
        </Button>
        <IconButton onClick={handleFlip}>
          {flipped ? <ArrowBackIcon /> : <HelpIcon />}
        </IconButton>
        <Button size="small" onClick={onNext} disabled={disableNext}>
          Следующее
        </Button>
      </CardActions>
    </Card>
  );
}
