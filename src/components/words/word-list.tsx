import { useEffect } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  fetchWords,
  setCurrentIndex,
  setSelected,
  resetSelection,
  setOptions,
  setShowAnswer,
  setAnswerSelected,
  setCurrentCategory,
} from "../../store/words-slice";
import WordCard from "./word-card";
import { TEXT_CATEGORY, TEXT_UNLOGIN } from "./constants";

const WordList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    wordsData,
    loading,
    error,
    currentIndex,
    options,
    selected,
    showAnswer,
    answerSelected,
    currentCategory,
  } = useSelector((state: RootState) => state.words);
  const { isLoggedIn } = useSelector((state: RootState) => state.authorization);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (isLoggedIn && token) {
      dispatch(fetchWords(token));
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (!loading && wordsData.length > 0 && !currentCategory) {
      const firstCategory = wordsData[0].category;
      dispatch(setCurrentCategory(firstCategory));
    }
  }, [loading, wordsData, currentCategory, dispatch]);

  useEffect(() => {
    if (wordsData.length > 0 && currentCategory) {
      dispatch(setCurrentIndex(0));
      const filteredWords = wordsData.filter(
        (word) => word.category === currentCategory,
      );
      if (filteredWords.length > 0) {
        const currentWord = filteredWords[0];
        const otherOptions = filteredWords
          .filter((word) => word.id !== currentWord.id)
          .map((word) => word.translation)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const newOptions = [...otherOptions, currentWord.translation].sort(
          () => 0.5 - Math.random(),
        );
        dispatch(setOptions(newOptions));
        dispatch(setSelected(null));
        dispatch(resetSelection());
      }
    }
  }, [currentCategory, wordsData, dispatch]);

  useEffect(() => {
    if (wordsData.length > 0 && currentCategory) {
      const filteredWords = wordsData.filter(
        (word) => word.category === currentCategory,
      );
      const currentWord = filteredWords[currentIndex] || {
        id: "-1",
        word: "",
        translation: "",
        category: "",
      };
      if (filteredWords.length > 0) {
        const otherOptions = filteredWords
          .filter((_, index) => index !== currentIndex)
          .map((word) => word.translation)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        const newOptions = [...otherOptions, currentWord.translation].sort(
          () => 0.5 - Math.random(),
        );
        dispatch(setOptions(newOptions));
      }
    }
  }, [currentIndex, wordsData, currentCategory, dispatch]);

  const handlePrev = () => {
    dispatch(setCurrentIndex(Math.max(currentIndex - 1, 0)));
    dispatch(setSelected(null));
    dispatch(resetSelection());
  };

  const handleNext = () => {
    dispatch(setCurrentIndex(Math.min(currentIndex + 1, wordsData.length - 1)));
    dispatch(setSelected(null));
    dispatch(resetSelection());
  };

  const handleSelect = (selected: string) => {
    dispatch(setSelected(selected));
    dispatch(setShowAnswer(true));
    dispatch(setAnswerSelected(true));
  };

  const filteredWords = wordsData.filter(
    (word) => word.category === currentCategory,
  );
  const currentWord = filteredWords[currentIndex] || {
    id: "-1",
    word: "",
    translation: "",
    category: "",
  };

  const changeToRusNamingCategory = (category: string): string => {
    return TEXT_CATEGORY[category] || TEXT_CATEGORY.default;
  };

  if (!isLoggedIn) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h4" textAlign="center" gutterBottom mb="20px">
          {TEXT_UNLOGIN}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt="20px">
          <Skeleton variant="text" width={250} height={60} sx={{ mr: 1 }} />
        </Box>
      ) : (
        <Typography variant="h4" textAlign="center" gutterBottom mt="20px">
          {changeToRusNamingCategory(currentCategory)}
        </Typography>
      )}
      <WordCard
        word={loading ? null : currentWord}
        options={loading ? [] : options}
        correctOption={loading ? "" : currentWord.translation}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
        disablePrev={loading || currentIndex === 0}
        disableNext={
          loading ||
          currentIndex === filteredWords.length - 1 ||
          !answerSelected
        }
        loading={loading}
        selected={loading ? "" : selected}
        showAnswer={loading ? false : showAnswer}
      />
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default WordList;
