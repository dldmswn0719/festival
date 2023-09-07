import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import dataList from './../data/data'
import { NavLink } from 'react-router-dom'

const Content = styled.div`
    background-color: ${(props)=> props.theme.colors.BgColor};
    width: 100%;
    padding: 120px 2% 50px 2%;
    overflow: hidden;
`

const ContentWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 1.2%;
`

const ContentItem = styled.div`
  background-color: ${(props)=> props.theme.colors.CotentBg};
  flex-basis: 32.5%;
  border: 1px solid #ddd;
  border-radius: 5px; padding: 20px;
  box-sizing: border-box; cursor: pointer;
  white-space: break-spaces; //줄이 길어지면 자동으로 줄바꿈
  img{width: 100%; display: block; margin-bottom: 24px;}
  h3{margin-bottom: 24px; color: ${(props)=> props.theme.colors.Color};}
  li{line-height: 2; margin-bottom: 2px; color: ${(props)=> props.theme.colors.Color};}
  @media screen and (max-width: 1200px) {
    flex-basis: 49%;
  }
  @media screen and (max-width: 640px) {
    flex-basis: 100%;
  }
`

// https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=yRNDRWiJjGZ1GBkhKjRNe7ffpJAuDx5T5VsqMTe%2FKGBnfDxeibjTEal69wO1y8DZJ8BirG%2FTmPHH4GusA6gVEQ%3D%3D&pageNo=1&numOfRows=10&resultType=json

const Category = styled.div`
  width: 100%;
  margin-bottom: 1.2%;
  ul{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      border: 1px solid #ddd;
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
      background-color: ${(props)=> props.theme.colors.CotentBg};
      color: ${(props)=> props.theme.colors.Color};
      &.on{
        background-color: pink;
        font-weight: bold;
        color: #fff;
      }
    }
  }
`
const Pagination = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  ul{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: center;
    align-items: center;
    li{
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
      background-color: #fff;
      &.on{
        background-color: pink;
        font-weight: bold;
        color: #fff;
      }
      &.on a{
        color: #fff;
      }
      a{
        display: inline-block;
        width: 100%;
        padding: 5px 20px;
      }
    }
  }
`

function Main() {

  const [data,setData] = useState();

  const list = 10; //화면에 보이는갯수
  const [page,setPage] = useState(1); //페이지 숫자, 처음이 1페이지니까
  const [totalCnt,setTotalCnt] = useState(0); //만약에 1000개라면 현재 페이지12개하면 1000나누니 12해야기때문에 총갯수 넣어줌
  const [gugun,setGugun] = useState("전체");
  const pagination = 5; //5개씩 보일거임
  const totalPage = Math.floor(totalCnt / list);

  const PageList = [];
  for(let i = 0; i < totalPage; i++){
    PageList.push(
      <li key={i} className={(page === i+1 ? "on" : "")} >
        <NavLink to='/'onClick={()=>{setPage(i+1)}}>{i+1}</NavLink>
      </li>
      //실제 데이터는 3개가 돈다. 총30개,10개 나누기 / 1,2,3페이지
    )
  }

  useEffect(()=>{
    // // axios.get(`https://apis.data.go.kr/6260000/FestivalService/getFestivalKr?serviceKey=${process.env.REACT_APP_APIKEY}&pageNo=${page}&numOfRows=10&resultType=json`)
    // .then(function(res){
    //   setData(res.data.getFestivalKr.item);
    //   setTotalCnt(res.data.getFestivalKr.totalCount);
    //   console.log(res)
    // })
    // console.log(data)
  },[page])

  const FilterData = data && data.filter(e=>{
    return gugun === "전체" || gugun === e.GUGUN_NM
  })

  const FilterGugun = [...new Set(data && data.map(e=>e.GUGUN_NM))];
  console.log(FilterGugun)
  const [isActive,setIsActive] = useState(-1)

  return (
    <>
        <Content>
          <Category>
          {/* <div className={isActive === -1 ? 'on' : ''} onClick={()=>{setIsActive(-1)}}>인덱스번호 : -1{isActive}</div>
            {
              Array(5).fill().map((e,i)=>{
                return(
                  <div className={isActive === i ? 'on' : ''} onClick={()=>{setIsActive(i)}} key={i}>{`인덱스번호 : ${i}`}</div>
                )
              })
            } */}
            <ul>
              <li className={isActive === -1 ? 'on' : ''} onClick={()=>{setIsActive(-1); setGugun("전체");}}>전체</li>
              {
                data && FilterGugun.map((e,i)=>{
                  return(
                    <li className={isActive === i ? 'on' : ''} onClick={()=>{setIsActive(i); setGugun(e)}} key={i}>{e} {i}</li>
                  )
                })
              }
            </ul>
          </Category>
          <ContentWrap>
              {
                data && FilterData.map((e,i)=>{
                  return(
                    <ContentItem key={i}>
                      <NavLink to ={`detail/${e.UC_SEQ}`} state={e}>
                        <h3>{e.TITLE}</h3>
                        <img src={e.MAIN_IMG_THUMB} alt={e.MAIN_TITLE} />
                        <ul>
                          <li>구군 : {e.GUGUN_NM}</li>
                          <li>운영 및 시간 : {e.USAGE_DAY_WEEK_AND_TIME}</li>
                          {
                            e.MIDDLE_SIZE_RM1 !== "" &&
                          <li>편의시설 : {e.MIDDLE_SIZE_RM1}</li>
                          }
                          {/* 비어있지않다면 출력해주세요 */}
                          {
                            e.USAGE_AMOUNT !== "" &&
                          <li>이용요금 :{e.USAGE_AMOUNT}</li>
                          }
                          <li>교통편 : {e.TRFC_INFO}</li>
                          <li>주요장소 : {e.MAIN_PLACE}</li>
                        </ul>
                      </NavLink>
                    </ContentItem>
                  )
                })
              }
          </ContentWrap>
        </Content>
        <Pagination>
          <ul>
            <li onClick={()=>{
              (page === 1 ? alert("더 이상 데이터가 없습니다.") : setPage(page-1))
            }}><NavLink to="/">이전</NavLink></li>
            {
              PageList.map(e=>{
                return e
              })
            }
            <li onClick={()=>{
              (page === totalPage ? alert("더 이상 데이터가 없습니다.") : setPage(page+1))
              }}><NavLink to="/">다음</NavLink></li>
          </ul>
        </Pagination>
    </>
  )
}

export default Main