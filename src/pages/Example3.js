import React, { useState } from 'react'
import Example_3 from './../components/Example3'


function Example3() {

    const [data,setData] = useState(Example_3)
    const [animal,setAnimal] = useState("전체");
    const [gender, setGender] = useState("전체");

    const FilterAnimal = data.filter(e =>{

        let isAnimal = animal === "전체" || e.animal === animal;
        let isGender = gender === "전체" || e.gender === gender;
        return isAnimal && isGender

        // return(animal === "전체" ? e.animal : e.animal === animal);

        // if(animal === "전체"){
        //     return e.animal
        // }else{
        //     return e.animal === animal
        // }
    })

    const filterCate = [...new Set(data.map(e => e.animal))]
    const filterGender = [...new Set(data.map(e => e.gender))]

  return (
    <>
        <div>
            <ul>
                <li>전체</li>
                {/* 쓰기전용의 animal을 변경해서 전체누르면 전체나오게하기 */}
                {
                    filterCate.map((e,i)=>{
                        return(
                            <li key={i} onClick={()=>{setAnimal(e)}}>{e}</li>
                        )
                    })
                }
            </ul>           
            <ul>
                <li>전체</li>
                {/* 쓰기전용의 animal을 변경해서 전체누르면 전체나오게하기 */}
                {
                    filterGender.map((e,i)=>{
                        return(
                            <li key={i} onClick={()=>{setGender(e)}}>{e}</li>
                        )
                    })
                }
            </ul>
        </div>
        {/* {gender}*/}
        <div>
            <ul>
                {
                    FilterAnimal.map((e,i)=>{
                        return(
                            <li key={i}>{e.animal} - {e.gender} - {e.height}</li>
                        )
                    }) //기본문법
                }
            </ul>
        </div>
    </>
  )
}

export default Example3