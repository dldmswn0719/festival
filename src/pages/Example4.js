import React, { useState } from 'react'
import { Navigation, Pagination} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './../index.css'

function Example4() {
    const [isActive,setIsActive] = useState("close");

  return (
    <>
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        {
            Array(50).fill().map((e,i)=>{
                return(
                    <SwiperSlide key={i}>Slide {i+1}</SwiperSlide>
                ) //배열을 임의로50개 만든다
            })
        }
    </Swiper>
    <button onClick={()=>{setIsActive(isActive === "open" ? "close" : "open")}}>클릭</button>
    {/* 토글형식으로 할려면 무조건 삼항 연산자가 들어가야함 */}
    <span>{isActive}</span>
    {/* <p className={`text-center font-bold border ${isActive === "open" ? "active" : ""}`} style={{display : isActive === "open" ? "block" : "none"}}>Lorem ipsum dolor sit amet.</p> */}
    {
        isActive === "open" && //open이 참일때만 보여진다
        <p className={`text-center font-bold border ${isActive === "open" ? "on" : ""}`}>Lorem ipsum dolor sit amet.</p>
    }
    {/* 모든변수에는 삼항연산자 쓸수있다 */}
    {/* open과 같다면 block으로 보이고 아니라면 none으로 처리, 클릭과 동시에 open이니까 조건과 부합한다 */}
    </>
  )
}

export default Example4