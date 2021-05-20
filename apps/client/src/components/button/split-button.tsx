import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup, { ButtonGroupProps } from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { CircularProgress } from '@material-ui/core';

interface SplitButtonProps extends Pick<ButtonGroupProps, 'variant' | 'color'> {
  options: string[];
  icons: React.ReactNode[];
  selectedIndex: number;
  onOptionClick: (index: number) => void;
  disableOptions?: boolean;
  loading?: boolean;
  disableButton?: boolean;
}

function SplitButton({
  options,
  icons,
  selectedIndex,
  disableOptions,
  variant,
  color,
  onOptionClick,
  loading,
  disableButton,
}: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    onOptionClick(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant={variant} color={color} ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          onClick={() => onOptionClick(selectedIndex)}
          startIcon={loading ? <CircularProgress size="1em" /> : icons[selectedIndex]}
          disabled={disableButton}>
          {options[selectedIndex]}
        </Button>
        {!disableOptions && (
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}>
            <ArrowDropDownIcon />
          </Button>
        )}
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}>
                      <ListItemIcon>{icons[index]}</ListItemIcon>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
SplitButton.defaultProps = {
  disableOptions: false,
  loading: false,
  disableButton: false,
};

export default SplitButton;
