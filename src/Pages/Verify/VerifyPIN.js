import './Verify.css'
import { useNavigate } from 'react-router'
import logo from '../../logo/netflix_acc.png';

function VerifyPIN() {

    let navigate = useNavigate();
    function handleClick() {
        navigate('/home')
    }
    return (
        <div className="user">
            <div className="logo-verify">
                <img className="logo" src="https://fontmeme.com/permalink/220212/2b79b3189fcc6673d3153dee728478eb.png" alt="netflix-font" border="0" />
            </div>

            <h1>Welcome to Notflex :3</h1>
            <div className="acccount">
                <img onClick={() => handleClick()} className="acc" src={logo} alt="account_logo" border="0" />
            </div>
        </div>
    )
}

export default VerifyPIN