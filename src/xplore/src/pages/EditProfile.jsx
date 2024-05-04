import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import "../styles/commons.css";
import "./EditProfile.css";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import Avatar from '../components/avatar/Avatar';
import avatarPlaceholder from "../assets/images/avatar-placeholder.jpg"
import BlogCardHorizontal from '../components/blog-card/BlogCardHorizontal';
import AuthorHorizontal from '../components/author-card/AuthorHorizontal';
import { formatToDate, formatToYMD } from '../util/formatDate.js';

import { commonService } from "../services/CommonService";
import { updateUserDetailAction, updateUserProfileAction } from "../redux/actions/UserAction";
import Loading from '../components/system-feedback/Loading.jsx';

export default function EditProfile() {
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [tippingLink, setTippingLink] = useState('');
    const [bio, setBio] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [gender, setGender] = useState('');

    const [isFullNameEditable, setIsFullNameEditable] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [isDetailChange, setIsDetailChange] = useState(false);
    const [isProfilelChange, setIsProfilelChange] = useState(false);

    const [loading, setLoading] = useState(null);

    const user_info = useSelector(state => state.UserReducer.user_login);

    console.log("user_info: ", user_info)

    useEffect(() => {
        setFullName(user_info.fullname)
        setEmail(user_info.email)
        setPhoto(user_info.avatar)
        setTippingLink(user_info.tipping_link)
        setBio(user_info.bio)
        setBirthdate(user_info.birthdate)
        setGender(user_info.gender)
        setAvatar(user_info.avatar)
    }, [user_info]);

    const isDetailDisabled = !isDetailChange;
    const isProfileDisabled = !isProfilelChange;

    const handleFullNameEdit = () => {
        setIsFullNameEditable(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tippingLink === user_info.tipping_link && bio === user_info.bio){
            alert("Nothing change!")
            setIsProfilelChange(false);
            return
        }

        const formData = {
            tipping_link: tippingLink,
            bio: bio
        }
        try {         
            console.log("Form data:", formData);
            dispatch(updateUserProfileAction(user_info.id_user, formData))
            setIsProfilelChange(false);
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        console.log("file: ", file)

        setAvatarFile(file);
        console.log("avatarFile: ", avatarFile)
        setIsDetailChange(true);

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar(reader.result); 
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading({
            type: "full"
        })
        var imageUrl;
        if (avatarFile) {
            try {
                imageUrl = await commonService.uploadImgToCloudinary(avatarFile);

                if (imageUrl) {
                    console.log('imageUrl:', imageUrl);
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        if(fullName === user_info.fullname && gender === user_info.gender && birthdate === user_info.birthdate && avatarFile === null){
            alert("Nothing change!")
            setIsDetailChange(false);
            return
        }

        const formData = {
            fullname: fullName,
            gender: gender,
            birthdate: birthdate,
            avatar: imageUrl
        }
        
        console.log("Form data:", formData);
        try {         
            dispatch(updateUserDetailAction(user_info.id_user, formData))
            setIsDetailChange(false);
            setIsFullNameEditable(false);
            setLoading(null)
        } catch (error) {
            console.error('Error saving detail data:', error);
        }
        

    };

    const handleCancelDetail = () => {
        setFullName(user_info.fullname)
        setPhoto(user_info.avatar)
        setBirthdate(user_info.birthdate)
        setGender(user_info.gender)
        setAvatar(user_info.avatar)
        setIsDetailChange(false);
        setIsFullNameEditable(false);
    };

    const handleCancelProfile = () => {
        setTippingLink(user_info.tipping_link)
        setBio(user_info.bio)
        setIsProfilelChange(false);     
    };

    const navigate = useNavigate();
    const navigateToMyProfile = () => {
        navigate("/my-profile");
    };

    return (
        <div className='container-fluid profile'>
        {
            loading && <Loading type={loading.type}/>
        }
            <div className="profile-background"></div>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row justify-content-start align-items-center gap-3">
                    <img src={photo || avatarPlaceholder} alt="user's avatar" className="avatar-ctn"/>
                    <div>
                        <h5 className="fullname">{user_info.fullname}</h5>
                        <p className="p2 email">{user_info.email}</p>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center gap-2">
                    <button className="btn-nm tert-btn button1" onClick={() => navigateToMyProfile()}>
                        Cancel
                    </button>
                </div>
            </div>

            <div className="container">
                <div className=" row mt-5 d-flex flex-row justify-content-center">
                    <div className="col-4 d-flex flex-column gap-2">
                        <h6>Personal info</h6>
                        <p>Update your photo and personal details.</p>
                    </div>
                    <div className="col-8 d-flex flex-column gap-2 p-4 form-info rounded-3 shadow-sm">
                        <form onSubmit={handleSave}>
                            <div className="mb-3 position-relative">
                                <div className="col">
                                    <label htmlFor="fullName" className="form-label">Full name</label>
                                    <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) =>{
                                        setFullName(e.target.value); setIsDetailChange(true);}} readOnly={!isFullNameEditable}/>
                                </div>
                                {!isFullNameEditable && <i className="fa-regular fa-pen-to-square position-absolute top-50 translate-middle-y end-0 me-2 mt-3" onClick={handleFullNameEdit}></i>}
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} readOnly/>
                            </div>
                            <div className="row mb-3">
                                <div className="col-3 position-relative">
                                    <i class="fa-regular fa-calendar-plus position-absolute translate-middle-y end-1 top-50 ms-3 mt-3" style={{zIndex: 1}}></i>
                                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                                    
                                    <DatePicker
                                        selected={birthdate}
                                        onChange={date => {setBirthdate(date); setIsDetailChange(true);}}
                                        dateFormat="dd-MM-yyyy"
                                        className="form-control"
                                        id="birthdate"
                                    />
                                </div>
                    
                                <div className="col">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <div className='row select-gender'>
                                        <div className="col-2 form-check">
                                            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={gender === "Male"} onChange={(e) => {setGender(e.target.value); setIsDetailChange(true);}} />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="col form-check">
                                            <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={gender === "Female"} onChange={(e) => {setGender(e.target.value); setIsDetailChange(true);}}/>
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3 mt-4 pe-3">
                                <div className="col-2">
                                    <img src={avatar || avatarPlaceholder} alt="user's avatar" className="avatar-form"/>
                                </div>
                                <div className="col-10 d-flex rounded-3 shadow-sm justify-content-center">
                                    <label htmlFor="photo" className="form-label upload-label">
                                        <input type="file" className="form-control visually-hidden" id="photo" accept="image/*" onChange={handleAvatarChange} />
                                        <div className="upload-icon">
                                            <i className="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <div className="upload-text">
                                            <span><span className='upload-text-1'>Click to upload</span> or drag and drop</span>
                                            <span>(SVG, PNG, JPG or GIF max. 800x400px)</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </form>
                        <hr className='space'></hr>
                        <div className="btn-info d-flex flex-row justify-content-end align-items-center gap-2">
                        
                            <button className={`btn-nm tert-btn button1 ${isDetailDisabled ? 'disabled' : ''}`} disabled={isDetailDisabled} onClick={handleCancelDetail}>
                                Cancel
                            </button>
                            <button className={`btn-nm prim-btn button1 ${isDetailDisabled ? 'disabled' : ''}`} disabled={isDetailDisabled} onClick={handleSave}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" row mt-5 d-flex flex-row justify-content-between">
                    <div className="col-4 d-flex flex-column gap-2">
                        <h6>Profile</h6>
                        <p>Update your portfolio and bio.</p>
                    </div>
                    <div className="col-8 d-flex flex-column gap-2 p-4 form-info rounded-3 shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 position-relative">
                                <label htmlFor="tipping-link" className="form-label">Tipping link</label>
                                <div className="input-group">
                                    {/* <span className="input-group-text">http://</span> */}
                                    <input type="text" className="form-control" id="tippingLink" value={tippingLink} onChange={(e) => {setTippingLink(e.target.value); setIsProfilelChange(true);}} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <textarea className="form-control" id="bio" rows="3" value={bio} onChange={(e) => {setBio(e.target.value); setIsProfilelChange(true);}}></textarea>
                            </div>
                        </form>
                        <hr className='space'></hr>
                        <div className="btn-info d-flex flex-row justify-content-end align-items-center gap-2">
                            <button className={`btn-nm tert-btn button1 ${isProfileDisabled ? 'disabled' : ''}`} disabled={isProfileDisabled} onClick={handleCancelProfile}>Cancel</button>
                            
                            <button className={`btn-nm prim-btn button1 ${isProfileDisabled ? 'disabled' : ''}`} disabled={isProfileDisabled} onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}