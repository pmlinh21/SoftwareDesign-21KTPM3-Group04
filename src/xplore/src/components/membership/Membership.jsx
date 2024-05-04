import {formatCapitalFirstLetter} from '../../util/formatText'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';

export default function Membership({membership}){
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate(`/checkout?id_membership=${membership.id_membership}`)
    }

    const user_info = useSelector(state => state.UserReducer.user_login);

    console.log("user_info: ", user_info)

    return (
        <div className='col-4 membership-ctn justify-content-between' style={{ display: 'flex', flexDirection: 'column', marginRight: '24px' }}>
            <div className="d-flex flex-column">
                {/* Membership type */}
                <div style={{ alignSelf: 'center' }}>
                    <img src="/imgs/Featured icon.png" style={{ width: '40px' }}/>
                </div>
                <p className='title2 capitalize' id='membership-type'>{membership?.type} Membership</p>
                {/* Membership price */}
                <h4 id='membership-price'>$ {membership?.price}</h4>
                {/* Membership description */}
                {membership?.description?.map((desc, i) => (
                    <div key={i} className='flex-row' style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <img src="/imgs/Check icon.png" style={{ width: '24px', height: 'auto' }} />
                        <p style={{ marginLeft: '8px', color: 'var(--neutral-700' }}>{formatCapitalFirstLetter(desc)}</p>
                    </div>
                ))}
            </div>
            {!user_info.is_member && (
                <button className='prim-btn btn-md' onClick={handleButtonClick}>Get Started</button>
            )}
        </div>
    )
}