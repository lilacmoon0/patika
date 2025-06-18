import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchWords, setCurrentWordIndex, setCurrentWord, setInputValue, startGame } from "../../redux/wordsSlice";

const DialogDemo = () => {
  const score = useSelector((state) => state.words.score);
  const words = useSelector((state) => state.words.words);
  const dispatch = useDispatch();

  // Reset game when dialog closes
  const handleRestart = () => {
    dispatch(fetchWords());
    dispatch(setCurrentWordIndex(0));
    dispatch(setCurrentWord(words[0]));
    dispatch(setInputValue(""));
    dispatch(startGame());
  };

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>Your Results</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            <div style={{ marginBottom: 16 }}>
              <div><strong>Words Per Minute:</strong> {score.correctWord}</div>
              <div><strong>Incorrect Words:</strong> {score.falseWord}</div>
              <div><strong>Accuracy:</strong> {score.accuracy}%</div>
            </div>
          </Dialog.Description>
          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <button className={`${styles.Button} green`} onClick={handleRestart}>Restart</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;