import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './PriorityPicker.scss';

const alphabetArray = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

const priorities = [{ value: '-', label: '-' }, ...alphabetArray.map((letter) => ({ value: letter, label: letter }))];

const PriorityPicker = ({ currentPriority, onChange }) => {
  const [priority, setPriority] = useState(currentPriority || '-');

  const handleChange = (event) => {
    const selectedPriority = event.target.value;
    setPriority(selectedPriority)
    onChange(selectedPriority)
  };

  return (
      <FormControl id="priorityPicker" className="priorityPicker">
        <InputLabel>Priority</InputLabel>
        <Select
          labelId="priorityPicker"
          id="priorityPicker"
          label="Priority"
          value={priority}
          onChange={handleChange}
        >
          {priorities.map((priority) => (
            <MenuItem key={priority.value} value={priority.value}>
              {priority.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default PriorityPicker;