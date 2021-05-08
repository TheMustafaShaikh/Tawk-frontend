import React,{useState,useEffect,useContext} from 'react'
import "./assets/styles/home.css"
import {Link} from "react-router-dom"
import Header from "../component/header"
import Context from "../context"



export default function Home() {
    let [categoryData, setCategoryData] = useState([""]);
    let globalID = useContext(Context);

    function time_ago(time) {

        switch (typeof time) {
          case 'number':
            break;
          case 'string':
            time = +new Date(time);
            break;
          case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
          default:
            time = +new Date();
        }
        var time_formats = [
          [60, 'seconds', 1], 
          [120, '1 minute ago', '1 minute from now'], 
          [3600, 'minutes', 60], 
          [7200, '1 hour ago', '1 hour from now'], 
          [86400, 'hours', 3600], 
          [172800, 'Yesterday', 'Tomorrow'], 
          [604800, 'days', 86400],
          [1209600, 'Last week', 'Next week'], 
          [2419200, 'weeks', 604800], 
          [4838400, 'Last month', 'Next month'], 
          [29030400, 'months', 2419200], 
          [58060800, 'Last year', 'Next year'], 
          [2903040000, 'years', 29030400], 
          [5806080000, 'Last century', 'Next century'], 
          [58060800000, 'centuries', 2903040000] 
        ];
        var seconds = (+new Date() - time) / 1000,
          token = 'ago',
          list_choice = 1;
      
        if (seconds === 0) {
          return 'Just now'
        }
        if (seconds < 0) {
          seconds = Math.abs(seconds);
          token = 'from now';
          list_choice = 2;
        }
        var i = 0,
          format;
        while (format = time_formats[i++])
          if (seconds < format[0]) {
            if (typeof format[2] === 'string')
              return format[list_choice];
            else
              return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
          }
        return time;
      }
  
    
    useEffect(()=>{
        

        fetch("http://localhost:3001/api/categories").then((res)=>{
            return res.json()
        }).then((data)=>{
            data.sort((a, b)=>{
                if (a.order > b.order) return 1;
                if (b.order > a.order) return -1;
              
                return 0;
              })
            setCategoryData(data);
            
        })



    },[])


  
    
    return (
        <div>
             <Header />

            {/* section 2 */}

            <div className="section-2">
               {
                   categoryData?.map((data)=>
                   data.enabled?
                        <div className="section-category" key={data.id}>
                            <img src={`./images/${data.icon}.png`} alt="some"/>
                            <Link className="link" to="/category" onClick={()=>globalID[1](data)}><h3>{data.title}</h3></Link>
                            <p>{data.totalArticle} article</p>
                            <p>Last updated: {time_ago(data.updatedOn)}</p>
                        </div>:""
                )
               }
            </div>
            
        </div>
    )
}
