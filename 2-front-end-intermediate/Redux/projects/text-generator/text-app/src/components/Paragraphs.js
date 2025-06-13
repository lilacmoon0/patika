import { useDispatch, useSelector } from 'react-redux';
import { setParas, setIncludeHtml, fetchParagraphs } from '../redux/paraSlice';
import {useEffect} from 'react';

export const Paragraphs = () => {
  const paragraphs = useSelector((state) => state.para.paragraphs);
  const paras = useSelector((state) => state.para.paras);
  const includeHtml = useSelector((state) => state.para.includeHtml);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value === "true"; // convert string to boolean
    dispatch(setIncludeHtml(value));
    dispatch(fetchParagraphs());
  };

  const handleChangeParas = (e) => {
    const value = Number(e.target.value);
    dispatch(setParas(value));
    dispatch(fetchParagraphs());

  };

  useEffect(() => {
    dispatch(fetchParagraphs());
  }, []);

  return (
    <>
      <label className="label">Paragraphs</label>
      <input
        min={1}
        value={paras? paras : ""}
        className="input"
        onChange={handleChangeParas}
        type="number"
      />
      <select className='select'
        value={includeHtml ? "true" : "false"}
        onChange={handleChange}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <p className='parag'>{paragraphs}</p>
    </>
  );
}