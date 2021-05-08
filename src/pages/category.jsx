import React,{useState,useEffect,useContext} from 'react'
import Header from "../component/header"
import "./assets/styles/category.css"
import Context from "../context"


export default function Category() {
    let [article,setArticle] = useState([""])
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
        fetch("http://localhost:3001/api/category/"+globalID[0].id).then((res)=>{
            return res.json()
        }).then((data)=>{
            setArticle(data);
        })
    },[])

    if(!globalID[0]){
        return <h1 className="notfound">
            404 PAGE NOT FOUND!
        </h1>
    }else{
    
    return (
        <div>
            <Header />    
            <div className="section-show">
                <div className="navigation-section">
                    <p className="navigation">All categories   <span className="inside-navigation"> &#x232A;    {globalID[0].title}</span></p>
                </div>
            </div>
         
            <div className="section-show-category">
                <div className="detail-section-1">
                    <div className="section-show-details-1">
                        <img src={`./images/${globalID[0].icon}.png`} alt="picture.."/>
                        <h3>{globalID[0].title}</h3>
                        <p>Update {time_ago(globalID[0].updatedOn)}</p>
                    </div>
                    <div className="section-show-details-2">
                        <img src="./images/info.png" alt="info pic" />
                        <p>{globalID[0].description}</p>
                    </div>
                    
                </div>
                <div>
                   {
                       article.map((data)=>
                        data.status =="published"?  <div className="article" key={data.id}>
                        <div className="article-1">
                            <img src="./images/copy.png" alt="copy" width={18} height={22}/>
                            <div className="article-section-detail">
                                <h4>{data.title}</h4>
                                <p>Updated {data.updatedOn.toString().split("T")[0]}</p>
                            </div>
                        </div>
                        <img src="./images/next.png" alt="Next" width={11} height={20} />
                    </div>:'' 
                       )
                   }

                    
                </div>
            </div>   


        </div>

    )
}
}
