import React, { useState } from 'react'
import Example_3 from './../components/Example3'
import { styled } from 'styled-components'

const Content = styled.div`
    
    border: 1px solid #ddd;
`

const ContentItem = styled.div`
    border: 1px solid #ddd;
    
`
function Example3() {

    let [data,setData] = useState(Example_3)
    let [animal,setAnimal] = useState("전체");

    const dataFilter = data.filter(e =>{
        if(animal === "전체"){
            return e.animal
        }else{
            return e.animal === animal
        }
    })

    const FilterAnimal = [...new Set(data.map(e => e.animal))]
    console.log(FilterAnimal)

  return (
    <Content>
        <ul>
            <li onClick={()=>{setAnimal("전체")}}>전체</li>
            {
                FilterAnimal.map((e,i)=>{
                    return(
                        <ContentItem key={i} onClick={()=>{setAnimal(e)}}>{e}</ContentItem>
                    )
                })
            }
        </ul>
        {
            dataFilter.map((el,i)=>{
                return(
                    <p key={i}>품종 : {el.animal} 성별 : {el.gender}</p>
                )
            })
        }
    </Content>

  )
}

export default Example3