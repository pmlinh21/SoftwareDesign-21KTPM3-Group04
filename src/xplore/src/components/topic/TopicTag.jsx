import React from "react";
import "./TopicTag.css";
import { useNavigate   } from 'react-router-dom';
import {formatCapitalCase} from '../../util/formatText';

export default function TopicTag(props) {
    const {id_topic, topic} = props.topic;
    const navigate = useNavigate()

    function handleButtonClick(id_topic){
    
        navigate(`/topic/?id_topic=${id_topic}&topic_name=${topic}`)
    }
    
    return (
        <button className="col-auto topic button2 capitalize"
                onClick={() => {handleButtonClick(id_topic)}}>
            {topic}
        </button>
    )
}