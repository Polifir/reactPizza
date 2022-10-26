import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './OrderSort.module.scss';
import {setOrderSort} from '../../redux/slices/filterSlice.js'

export const orderSortValue = [
  {name: 'A', sortOrderProperty: "asc"},
  {name: "Z", sortOrderProperty: "desc"}
 ] 

export const OrderSort = () => {
  const dispatch = useDispatch()
  const sortOrder = useSelector(state => state.filter.orderSort)

  return (
      <ul className={styles.container}>
        {orderSortValue.map((obj, index)=>
        <li key={index}>
          <button className={styles[obj.name === sortOrder.name ? 'active' : '']} 
          onClick={()=>dispatch(setOrderSort(obj))}>{obj.name}</button>
        </li>)}
      </ul>
  )
}
