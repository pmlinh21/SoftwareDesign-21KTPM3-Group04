import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Avatar.css";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg"
import { userService } from "../../services/UserService";

export default function Avatar({avatar, id_user, check, size = "big"}) {

    const navigate = useNavigate();

    const handleAuthorClick = async (e) => {
        e.stopPropagation();

        if(check){
            try {
                const author = await userService.getUserByID(id_user);
                console.log(author)
                if (author.status === 200) {
                    navigate("/author-profile", { state: { author: author.data.content } });
                } else {
                    alert("Failed to block author");
                }
        
            } catch (error) {
                console.log("error", error);
                alert("An error occurred while navigating to author profile");
            }
        }
        
    };

    return (
        <img src={avatar || avatarPlaceholder} alt="user's avatar" className= {"avatar-container " + size} style={{cursor: "pointer"}} onClick={(e) => handleAuthorClick(e)}/>
    )
}
