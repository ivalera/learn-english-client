import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWordsRequest } from "../api/get-words-request";
import { WordDataType } from "../components/words/type";

interface WordsState {
  wordsData: WordDataType[];
  loading: boolean;
  error: string | null;
  currentIndex: number;
  options: string[];
  selected: string | null;
  showAnswer: boolean;
  answerSelected: boolean;
  currentCategory: string;
  categories: string[];
}

const initialState: WordsState = {
  wordsData: [],
  loading: false,
  error: null,
  currentIndex: 0,
  options: [],
  selected: null,
  showAnswer: false,
  answerSelected: false,
  currentCategory: "",
  categories: [],
};

export const fetchWords = createAsyncThunk<WordDataType[], string>(
  "words/fetchWords",
  async (token: string) => {
    const storedWords = localStorage.getItem("wordsData");
    if (storedWords) {
      return JSON.parse(storedWords);
    }
    const response = await getWordsRequest(token);
    localStorage.setItem("wordsData", JSON.stringify(response));
    return response;
  },
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
    resetSelection(state) {
      state.selected = null;
      state.showAnswer = false;
      state.answerSelected = false;
    },
    setOptions(state, action) {
      state.options = action.payload;
    },
    setShowAnswer(state, action) {
      state.showAnswer = action.payload;
    },
    setAnswerSelected(state, action) {
      state.answerSelected = action.payload;
    },
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    clearWordsData(state) {
      state.wordsData = [];
      localStorage.removeItem("wordsData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.wordsData = action.payload;
        state.error = null;
        state.categories = Array.from(
          new Set(action.payload.map((word) => word.category)),
        );
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch words";
      });
  },
});

export const {
  setCurrentIndex,
  setSelected,
  resetSelection,
  setOptions,
  setShowAnswer,
  setAnswerSelected,
  setCurrentCategory,
  setCategories,
  clearWordsData,
} = wordsSlice.actions;

export default wordsSlice.reducer;
export type { WordsState };
