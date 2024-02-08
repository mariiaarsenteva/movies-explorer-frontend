import './FilterCheckbox.css'
import { useLocation } from 'react-router-dom'

import React, { useState, useEffect } from 'react';

export default function FilterCheckbox({ onCheckboxChange, toggleFilterShort }) {
  const [checked, setChecked] = useState(false);

  const { pathname } = useLocation()

  useEffect(() => {
    // Восстанавливаем состояние чекбокса из localStorage при загрузке компонента
    const storageKey = `isFilterChecked_${pathname}`;
    const isFilterChecked = localStorage.getItem(storageKey);
    if (isFilterChecked !== null) {
      setChecked(isFilterChecked === 'true');
    }
  }, [pathname]);

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

