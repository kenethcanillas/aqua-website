import '../App.css';
import { Icon } from '@iconify/react';
import Header from '../components/Header';
import Dash from '../components/DashboardView';
import Side from '../components/SideView';

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