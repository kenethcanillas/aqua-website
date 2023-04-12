import '../App.css';
import { Icon } from '@iconify/react';
import Header from '../components/Header';
import Dash from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/DashboardView';
import Side from 'C:/Users/PC/Desktop/GIT/aqua-website/aqua-project/src/components/SideView';

function Homepage() {
    return(
<>
    <div>
        <Header/>
        <Dash/>
        <Side/>
    </div>
</>
    );
}
export default Homepage;