import { InputArea } from "./InputArea";
import { TextArea } from "./TextArea";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import { fetchWords } from "../redux/wordsSlice";
import DialogDemo from "./Dialog/Dialog";

export const Container = () => {
  const words = useSelector((state) => state.words.words);
  const isGameOver = useSelector((state) => state.words.isGameOver);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWords());
  }, []);
  if (words.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (isGameOver) {
    return <DialogDemo />;
  }
  
  return (
    <div className="container">
      <h1 className="title">Type Speed Game</h1>
      <div className="game-container">
        <TextArea />
        <InputArea />
      </div>
    </div>
    
  )
}