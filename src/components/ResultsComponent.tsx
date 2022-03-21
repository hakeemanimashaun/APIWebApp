import React, { MouseEventHandler, ReactNode, useCallback, useState } from 'react'
import { SortedArray } from 'typescript';
import { PostData } from '../Types';
import "./componentStyles.css"

type sortkey = keyof PostData
type sortOrder = "ascn" | "desc"
//controls data sorting dynamically
function sortData({tableData, sortKey, reverse}:{tableData: PostData[],
  sortKey: sortkey,reverse: boolean}){
    if(!sortKey)return tableData

    const sortedData = tableData.sort((a,b)=>{
     return  a[sortKey] > b[sortKey] ? 1 : -1
    })
    if (reverse){
      return sortedData.reverse()
    }
    return sortedData
  }


function ResultsComponent({items, render}: {items: PostData[], render:(item: PostData) => ReactNode }) {
    const [sortOrder,setSortOrder] = useState<sortOrder>("ascn")
    const [sortKey, setSortKey] = useState<sortkey>("login")
   
     
    const headers: {key: sortkey, label: string}[] = [
      {key: "id", label: "id" },
      {key: "login", label: "login" },
      {key: "type", label: "type" },
      {key: "avatar_url", label: "avartar_url" },
    ]
    //calls the function that controls data sorting
    const sortedData = useCallback(()=> sortData({tableData: items, sortKey, reverse: sortOrder === "desc"}),[items, sortKey, sortOrder])
     
    // handles sorting effect 
    function SortButton({order,columnKey, sortKey, onClick}:{
      order: sortOrder
      columnKey: sortkey
      sortKey: sortkey
      onClick: MouseEventHandler<HTMLButtonElement>
    }){
      return <button onClick={onClick}
      className={`${sortKey === columnKey && sortOrder === "desc" ? "sort-button sort-reverse" : "sort-button"}`}
      >
        ^
      </button>
    }
    // toggels sort mode
    function changeSort(key: sortkey){
      setSortOrder(sortOrder === "ascn" ? "desc" : "ascn")
      setSortKey(key)
    }

  return (
    <div className = "container">
    <table className='table table-bordered'>
      <thead >
        <tr>
         { headers.map((row)=>{
           return <td key={row.key}>{row.label}
           <SortButton 
           columnKey={row.key}
           onClick={()=>changeSort(row.key)}
           sortKey={sortKey}
           order={sortOrder}
           />
           </td>
         })}
        </tr>
       
      </thead>
      <tbody>
      {sortedData().map((item) => (
    
        <tr key={item.id} className="post">
          <td>
            {item.id}
          </td>
          <td>
             {item.login}
          </td>
            <td>
            {item.type}
            </td>
          <td>
            {item.avatar_url}
            </td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
  )
}

export default ResultsComponent