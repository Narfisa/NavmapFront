import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AlertDialog = (props) => {
  const [open, setOpen] = React.useState(props.open);
  const string = 'Установить здесь точку ' + (props.point ==='start' ? 'отправления?' : 'назначения?')
  
  const handleClose = () => {
    setOpen(false);
    props.showDialog(false)
  };
  const handleAccessClose = () => {
    setOpen(false);
    props.showDialog(false)
    props.setAccept(true)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{string}</DialogTitle>
        <DialogActions>
          <Button onClick={handleAccessClose} color="primary">
            Подтвердить
          </Button>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
