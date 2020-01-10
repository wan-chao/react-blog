import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row,Col,List,Icon } from 'antd'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import axios from 'axios'
import '../static/style/pages/index.css'
import servicePath from '../config/apiUrl'


const Home = (list) => {

  const listReverse = [...list.data].reverse() 

  const [mylist,setMylist] = useState(listReverse)

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })

  return (
    <div>
      <Head>
        <title>首页 | 人比黄瓜胖-憨憨程序员，专注于WEB和移动前端开发</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <List 
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item=>(
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a target="_blank">{item.title}</a>
                    </Link>
                    {/* <a href={'/detailed?id='+item.id} target="_blank">{item.title}</a> */}
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html:item.introduce}}>
                  </div>  
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author></Author>
            <Advert></Advert>
          </Col>
      </Row>

      <Footer></Footer>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        // console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
