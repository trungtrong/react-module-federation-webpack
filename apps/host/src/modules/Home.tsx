// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@host/environment';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
      console.log(environment, process.env,  process.env.TARGET_ENV)
    }, []);

    return (
        <div title="host">
            <h1 className="bg-primary-100 m-0.5 truncate container">
                Welcome Home { environment.name }
            </h1>

        </div>
    );
};

export default Home;
