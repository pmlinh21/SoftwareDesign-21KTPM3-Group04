import React from "react";
import { useNavigate } from 'react-router-dom'

import "./BlogPostCard.css";
import Avatar from "../avatar/Avatar";
import BookmarkIcon from "../icon/BookmarkIcon"
import { formatToMDY } from "../../util/formatDate";
import { sanitizeContent } from "../../util/formatText";

const LONG_PASSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."+
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."

export default function BlogPostCard(props) {
    /*
        content: "<p>How to Be Beach Body Ready without Buying Anything</p><p><img src=\"https://miro.medium.com/v2/resize:fit:763/1*Qj2fGbMggxZvB6aOweDgig.jpeg\" alt=\"\" width=\"636\" height=\"358\"></p><p>A Protein World poster has been defaced by activists</p><p>The collective anger of body conscious Britons was directed at supplement company “Protein World” after they launched an offensive ad campaign earlier this year. The ads depicted beautiful, thin people in swim wear with the provocative question “are you beach body ready?”</p><p>Over 44,000 people signed a petition in April to have all the adverts removed from London underground stations while others participated in a protest in Hyde Park.</p><blockquote><p><i>The online petition said: “Protein World is directly targeting individuals, aiming to make them feel physically inferior to the unrealistic body image of the bronzed model, in order to sell their product.</i></p><p><i>“Perhaps not everyone’s priority is having a ‘beach body’ (by the way, what is that?), and making somebody feel guilty for not prioritising it by questioning their personal choices is a step too far.</i></p><p><i>“A body’s function is far more intricate and important than looking ‘beach ready’, so in fact it is Protein World who have confused their priorities, if anyone”.</i></p></blockquote><p>But Protein World did not back down in the face of this reaction. They released the following statement:</p><blockquote><p><i>“Ultimately we want to encourage a healthier, fitter nation. We want to encourage everybody to be the very best version of themselves. It’s been quite odd how many people we’ve found who are far quicker to fit shame then fat shame. And, you know, if that makes us bad, then so be it.”</i></p></blockquote><p>But there are actually valid perspectives to each side of the argument. On the one hand, semi naked images of “ideal” bodies plastered across public spaces is not only vulgar, it is dehumanising, reducing bodies to the level of commodity. On the other hand, people should take pride in their health and fitness, especially when you consider that the UK is currently facing an obesity crisis. Experts predict that two thirds of British women and three quarters of all British men will be overweight by 2030.</p><p>I’m all for body positivity and loving the skin you’re in, but people also need to be realistic. There is nothing positive about diabetes or cardiovascular disease. One of the worst things about fat shaming is that it prevents people from trying to improve themselves. If people feel too self conscious then they won’t go jogging or hit the gym. The culture associated with health and fitness needs to be as inclusive as possible in order to help as many people as possible to be healthier.</p><p>There are also socioeconomic factors with exclude people. It is often the most disadvantaged members of society who suffer from obesity. This is due to the fact that preparing healthy food requires time, money and knowledge, which unfortunately not everyone has. Gym memberships can be astoundingly expensive too but there are also cheap ways to get in shape.</p><p>Jogging is probably the cheapest and easiest form of exercise. All you really need is a pair of decent shoes and you’re set to go. But running on tarmac can really damage your joints, particularly if you are new to the sport and have bad form. Swimming is a fantastic alternative because it benefits the respiratory system and increases the metabolism, working the whole body without any impact stress. Many councils offer free swimming to the unemployed and they should also offer free <a href=\"https://www.zswim.com/\"><u>swimming lessons</u></a> to the economically disadvantaged.</p><p>There is no one perfect “beach body” as implied by the Protein World ads, but there are many healthy bodies, none of which can be achieved without exercise. A real body positive movement needs to campaign for fair and equal access to things like swimming lessons in order prevent obesity and promote physical health and well-being.</p>"
        creation_time: "2023-06-03T07:45:21.000Z"
        id_post: 4
        is_member_only: true
        likeCount: "3"
        list_topic: Array(2)
            0: {topic: 'self improvement '}
            1: {topic: 'world'}
        publish_time: "2023-06-13T07:45:21.000Z"
        responseCount: "1"
        status: null
        thumbnail: null
        title: "How to Be Beach Body Ready without Buying Anything"
    */
    const {id_post, title, content, thumbnail, list_topic, publish_time, author} = props.post;

    console.log("props.post: ", props.post)

    const navigate = useNavigate();
    const handleBlogCardClicked = () =>{
        navigate("/post?id_post=" + id_post)
    }
    return (
        <div className="blog-post-card d-flex flex-column p-0 m-0"
            onClick={handleBlogCardClicked}>

            <div className="thumbnail-container bg-white p-0 m-0 position-relative">
                <BookmarkIcon id_post={id_post} set_absolute={true}/>
                <img src={thumbnail || "https://picsum.photos/id/2/600/600"} alt=""  />
            </div>
            
            {
                list_topic?.length > 0 ?
                (
                    <div className="row col-12 m-0 mt-4 mb-2">
                        <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                            {list_topic[0]?.topic || "None"}
                        </p>
                    </div>
                ) : 
                (
                    <div className="row col-12 m-0 mt-4 mb-2">
                        <p className="col-auto title3 text-black m-0 p-2 rounded-1 bg-blue-100 post-topic">
                            None
                        </p>
                    </div>
                )
            }
            <div className="col-12 title-block">
                <div className="row col-12 m-0 ">
                    <h6 className="col-auto text-black m-0 p-0 title-text long-text mb-2">
                        {title || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </h6>
                </div>

                <div className="row col-12 m-0 mb-3 p-0">
                    <p className="p2 col-auto text-scheme-sub-text m-0 p-0 content-text long-text"
                    dangerouslySetInnerHTML={{ __html: sanitizeContent(content) || "" }}>
                    </p>
                </div>
            </div>
            
 
            <div className="row col-12 d-flex align-items-center justify-content-between p-0 m-0 mt-2">
                <div className="col-8 d-flex align-items-center p-0">
                    <div className="col-3">
                        <Avatar avatar={author?.avatar} size="small"/>
                    </div>

                    <div className="col-9 row d-flex flex-column align-items-start gap-1 ">
                        <p className="col-auto title2 text-black m-0 p-0">
                            {author?.fullname || "Author name"}
                        </p>
                        <p className="col-auto support text-scheme-sub-text m-0 p-0">
                            {(publish_time && formatToMDY(publish_time)) || "Aug 6, 2024"}
                        </p>
                    </div>
                </div>

                <div className="col-4 link-sm m-0 p-0 d-flex justify-content-end">
                    <a href={`/post?id_post=${id_post}`}>Read post <i className="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    )
}