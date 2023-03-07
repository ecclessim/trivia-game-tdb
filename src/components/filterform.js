import React from 'react';
import trivia_categories from '../constants/categories.json';

export default function FilterForm(props) {
  const handleOnSubmit = () => {
    console.log('Hello');
  };
  const handleChangeCategory = (e) => {
    props.setCategory(e.target.value);
  };
  const handleChangeDifficulty = (e) => {
    props.setDifficulty(e.target.value);
  };
  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <select name="category" onChange={handleChangeCategory}>
          {trivia_categories.trivia_categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <select name="difficulty" onChange={handleChangeDifficulty}>
          <option value={''}>-- select difficulty --</option>
          <option value={'easy'}>easy</option>
          <option value={'medium'}>medium</option>
          <option value={'hard'}>hard</option>
        </select>
      </form>
    </div>
  );
}
