import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import './MyTabs.css'

import { getTopicByUserAction } from '../redux/actions/UserAction';
import { topicService } from "../services/TopicService";

import {formatCapitalCase} from '../util/formatText'

import Loading from '../components/system-feedback/Loading';
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';

const MyTabs = () => {
  const dispatch = useDispatch();
  const [tabsData, setTabsData] = useState([]);
  const {topic, user_login} = useSelector(state => state.UserReducer);
  const {topics} = useSelector(state => state.TopicReducer);
  const {loading} = useSelector(state => state.LoadingReducer);

  useEffect(() => {

    // if followed topic === null, then get followed topic from database
    if (topic === null){
      dispatch(getTopicByUserAction(user_login?.id_user))
    } else {

      // if followed topic !== null, then get relevant posts
      const fetchPost = async () => {
        try {
          const result = await topicService.getPostByTopic(topic.join(","))

          const followedTopic = topics.filter(item => topic.includes(item.id_topic))
          const tabsData = followedTopic.map((item, index) => {
            return {
              id_topic: item.id_topic,
              title: formatCapitalCase(item.topic),
              post: result.data.content[index]
            }
          })
      
          setTabsData(tabsData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchPost(topic);
    }

  }, [topic]); 

  console.log(tabsData)
  return (
    loading 
    ? (
      <Loading/>
    ): (
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
                <BlogCardHorizontal post={post}/>
              ))
            }
          </TabPanel>
        ))}
      </Tabs>
    )
  );
};

export default MyTabs;
