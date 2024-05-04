import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './MyTabs.css'

import { getInvisibleUsers, getTopicByUserAction } from '../redux/actions/UserAction';
import { topicService } from "../services/TopicService";

import {formatCapitalCase} from '../util/formatText'
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';

const MyTabs = () => {
  const dispatch = useDispatch();
  const [tabsData, setTabsData] = useState([]);
  const {topic, user_login, user_invisible} = useSelector(state => state.UserReducer);
  const {topics} = useSelector(state => state.TopicReducer);
  

  useEffect(()=>{
    if (topic == null){
      dispatch(getTopicByUserAction(user_login?.id_user))
    }
    if (user_invisible == null){
      dispatch(getInvisibleUsers(user_login?.id_))
    }
  },[])

  useEffect(() => {

    // if followed topic === null, then get followed topic from database
    if (topic != null && user_invisible != null){

      // if followed topic !== null, then get relevant posts
      const fetchPost = async () => {
        try {
          const result = await topicService.getPostByTopic(topic.join(","))

          console.log(topic)
          const followedTopic = topic.map(id_topic => topics.find(item => item.id_topic == id_topic))

          console.log(followedTopic)
          const tabsData = followedTopic.map((item, index) => {

            const visiblePosts = result.data.content.map((listPost) =>{
              return listPost.filter(post => {
                const author = post.author;
                return !user_invisible.includes(author.id_user)
              })
            })
            
            return {
              id_topic: item.id_topic,
              title: formatCapitalCase(item.topic),
              post: visiblePosts[index]
            }
          })
      
          setTabsData(tabsData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

      fetchPost(topic);
    }
  }, [topic?.length, user_invisible?.length]); 

  return (
    
      <Tabs>
        <TabList >
          {tabsData.map((tab) => (
            <Tab key={tab.id_topic}>{tab.title}</Tab>
          ))}
        </TabList>

        {tabsData.map((tab) => (
          <TabPanel key={tab.id_topic}>
            {
              tab.post.map((post) => (
                <BlogCardHorizontal key={post.id_post} post={post}/>
              ))
            }
          </TabPanel>
        ))}
      </Tabs>
  );
};

export default MyTabs;
