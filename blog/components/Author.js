import React from 'react'
import '../static/style/components/author.css'
import {Avatar,Divider} from 'antd'

const Author =()=>{

  return (
      <div className="author-div comm-box">
          <div> <Avatar size={100} src={'../static/images/user.jpg'} /></div>
          <div className="author-introduction">
              憨憨程序员，专注于WEB和移动前端开发。
              <Divider>社交账号</Divider>
              <Avatar size={28} icon="github" className="account"  />
              <Avatar size={28} icon="qq"  className="account" />
              <Avatar size={28} icon="wechat"  className="account"  />
          </div>
      </div>
  )

}

export default Author