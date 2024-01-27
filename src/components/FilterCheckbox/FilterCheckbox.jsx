import './FilterCheckbox.css'

import React, { useState, useEffect } from 'react';

export default function FilterCheckbox({ onCheckboxChange, toggleFilterShort }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Восстанавливаем состояние чекбокса из localStorage при загрузке компонента
    const isFilterChecked = localStorage.getItem('isFilterChecked');
    if (isFilterChecked !== null) {
      setChecked(isFilterChecked === 'true');
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    localStorage.setItem('isFilterChecked', newValue); // Сохраняем состояние чекбокса в localStorage
    onCheckboxChange(newValue);
    toggleFilterShort(newValue); // Передаем новое значение чекбокса для фильтрации короткометражек
  };


  return (
    <label className="checkbox">
      <input      className="checkbox__toggle"
        type="checkbox"
        name="searchCheckbox"
        id="searchCheckbox"
        checked={checked}
        onChange={handleCheckboxChange} />
      <span className="checkbox__switch" />
      <p className="checkbox__label">Короткометражки</p>
    </label>
  );
}

