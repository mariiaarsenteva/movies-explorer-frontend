import './FilterCheckbox.css'

export default function FilterCheckbox({isCheck, filterShort}) {
  return (
    <label className="checkbox">
      <input className="checkbox__toggle" type="checkbox" name="searchCheckbox" id="searchCheckbox" onChange={()=> filterShort()}/>
      <span className="checkbox__switch" />
      <p className="checkbox__label">Короткометражки</p>
    </label>
  );
}

