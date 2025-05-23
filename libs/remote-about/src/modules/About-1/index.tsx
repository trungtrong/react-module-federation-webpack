import { useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const AboutOne = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const backToHome = useCallback(() => {
        navigate('/');
    }, []);

    const backToAbout = useCallback(() => {
        navigate('/about');
    }, []);

    const showLocation = useCallback(() => {
        console.log('location', location)
    }, []);

    const showParams = useCallback(() => {
        console.log('showParams', params)
    }, []);

    return (
        <div className="flex flex-col pb-4 items-start">
            <h1>AboutOne 1</h1>

            <button onClick={backToHome}>Back to Home</button>
            <button onClick={backToAbout}>Back to About</button>
            <button onClick={showLocation}>Show Location</button>
            <button onClick={showParams}>Show Params</button>
        </div>
    );
}

export default AboutOne;
