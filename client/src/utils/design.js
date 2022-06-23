import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
const defaultTheme = createMuiTheme();
export const tableStyles = makeStyles(
  (theme) => ({
    root: {
      border: 0,
      WebkitFontSmoothing: 'auto',
      letterSpacing: 'normal',
      '& .MuiDataGrid-columnsContainer': {
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {

      },
      '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: '1px solid gray',
      },
      '& .MuiPaginationItem-root': {
        borderRadius: 0,
      },
      '& .MuiDataGrid-cell': {
        paddingLeft: '15px',
      },
    },
  }),
  { defaultTheme },
);
