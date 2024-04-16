import React from "react";
import "./TopicTag.css";
import { useNavigate   } from 'react-router-dom';
import {formatCapitalCase} from '../../util/formatText';

export default function TopicTag({topic, id_topic}) {
    const navigate = useNavigate()

    function handleButtonClick(id_topic){
    
        navigate(`/topic/?id_topic=${id_topic}&topic_name=${topic}`)
    }
    
    return (
        <button className="topic col-auto btn btn-sm rounded-pill bg-neutral-50 title2  text-black"
                onClick={() => {handleButtonClick(id_topic)}}>
            {formatCapitalCase(topic)}
        </button>
    )
}