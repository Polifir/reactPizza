import React, { useCallback, useContext,useRef, useState } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'

import {SearchContext } from '../../App'

export const Search = () => {
  const [value, setValue] = useState('')
  const {search,setSearch } = useContext(SearchContext)
  const inputRef = useRef() 
  const onClickClear =()=>{
    setSearch('')
    setValue('')
    inputRef.current.focus()
    
  }
  const updateSearchValue = useCallback(
    debounce((str)=>{
      setSearch(str)
    }, 250), []
)
  const onChangeInpit = event =>{
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }


  


  return (
    <div className={styles.container}>
      <svg width="18px" height="18px" viewBox="-0.58 0 58.719 58.719" xmlns="http://www.w3.org/2000/svg">
        <path id="Path_15" data-name="Path 15" d="M683.547,267.547l-18.838-17.8a22.476,22.476,0,1,0-2.274,1.978l19.051,18a1.5,1.5,0,0,0,2.061-2.181Zm-54.1-33.692a19.438,19.438,0,1,1,19.438,19.438A19.46,19.46,0,0,1,629.449,233.855Z" transform="translate(-626.449 -211.418)" fill="#D3D3D3"/>
      </svg>

      <input ref={inputRef} onChange={(e)=> onChangeInpit(e) }  type="text" value={value} placeholder="поиск" />

      {search && 
        <div onClick={()=>onClickClear()}>
          <svg width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill='#D3D3D3'>
            <path id="cancel" className="cls-1" d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z" transform="translate(-924 -96)"/>
          </svg>
        </div>}
    </div>

  )
}
