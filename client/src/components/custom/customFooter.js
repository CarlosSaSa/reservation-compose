import React from 'react';
import { TableCell, TableFooter, TablePagination, TableRow } from '@material-ui/core'

export const customFooter = ( count, page, rowsPerPage, changeRowsPerPage, changePage ) => {
    return (
        <TableFooter>
            <TableRow>
                <TableCell>
                    <TablePagination
                        component="div"
                        count={-1}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]}
                        onChangePage={(_, number) => changePage(number)}
                        labelRowsPerPage="Registros por página"
                        labelDisplayedRows={({ from, to, count, page }) => `Pagina: ${page + 1}`}
                    />
                </TableCell>
            </TableRow>
        </TableFooter>

    )
}
