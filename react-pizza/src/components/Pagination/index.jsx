import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

export const Pagination = ({ value ,onChangePage}) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e)=> onChangePage(e.selected+1)}
    pageRangeDisplayed={8}
    pageCount={3}
    forcePage={value-1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}
 