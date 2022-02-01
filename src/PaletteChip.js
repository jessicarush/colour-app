import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './css/PaletteChip.css';


function PaletteChip(props) {
  const { palette, deletePalette } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = () => {
    deletePalette(palette);
    // Normally we wouldn't need this as the component will re-render
    // with the default false state, but we are triggering a fade-out
    // transition first using setTimeout in deletePalette. As a result
    // we close the dialog right away so we can see the fadeout.
    setDialogOpen(false);
  };

  const gotoPalette = () => {
    navigate(`/palette/${palette.id}`);
  };

  const colors = palette.colors.map(c => (
    <div
      key={uuid()}
      className="PaletteChip-color"
      style={{ background: c.value }}
    >
    </div>
  ));

  return (
    <div className="PaletteChip" id={palette.id}>
      <div className="PaletteChip-colors" onClick={gotoPalette}>
        {colors}
      </div>
      <div className="PaletteChip-info">
        <h2 className="PaletteChip-name truncate">{palette.paletteName}</h2>
        <button className="btn" title="Delete palette" onClick={handleDialogOpen}>
          <DeleteIcon className="PaletteChip-trash-btn" />
        </button>
      </div>

      {/* Are you sure you want to delete palette dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete <strong>{palette.paletteName}</strong>.
            This action can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn--exit" onClick={handleDialogClose}>
            Shit no, cancel!
          </button>
          <button className="btn btn--delete" onClick={handleDelete}>
            Yes, delete muthafukka!
          </button>
        </DialogActions>
      </Dialog>

    </div>
  );
}


export default PaletteChip;