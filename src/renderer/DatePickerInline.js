import React, { useState, useEffect, useRef } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Chip, Box } from '@mui/material';
import { Item } from 'jstodotxt';
import { handleFilterSelect } from './Shared';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import 'dayjs/locale/cs';
import 'dayjs/locale/es';
import 'dayjs/locale/hu';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt';
import 'dayjs/locale/ru';
import 'dayjs/locale/tr';
import 'dayjs/locale/zh';

const userLocale = navigator.language || navigator.userLanguage;
const ipcRenderer = window.api.ipcRenderer;

const DatePickerInline = ({ 
  type,
  todoObject,
  date,
  filters
}) => {
	const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);
  const chipText = type === 'due' ? "due:" : type === 't' ? "t:" : null;

  const handleChange = (date) => {
    const updatedDate = dayjs(date).format('YYYY-MM-DD');
    const updatedTodoObject = new Item(todoObject.string || '');
    updatedTodoObject.setExtension(type, updatedDate);
    setOpen(false);
    ipcRenderer.send('writeTodoToFile', todoObject.id, updatedTodoObject.toString());
  };

  const DatePickerInline = ({ date, ...props }) => {

    const parsedDate = dayjs(date);
  
    const ButtonField = ({ date, ...props }) => {
      const { setOpen, disabled, InputProps: { ref } = {}, inputProps: { 'aria-label': ariaLabel } = {} } = props;

      return (
        <Button id={props.id} disabled={disabled} ref={ref} aria-label={ariaLabel}>
          <Chip onClick={() => handleFilterSelect(type, date, filters, false)} label={chipText} />
          <Box onClick={() => setOpen?.((prev) => !prev)}>{date}</Box>
        </Button>
      );
    };

    return (
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen, date } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={parsedDate}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={userLocale}>
      <DatePickerInline
        onChange={handleChange}
        date={date}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInline;
