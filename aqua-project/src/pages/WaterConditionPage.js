import SideView from '../components/SideView';
import WaterCondition from '../components/WaterCondition';
import '../App.css';

function WaterConditionPage() {

    return(
     <>
      <div class='grid-div'>
          <SideView/>
          <WaterCondition/>
       </div>
     </>)
  }
  export default WaterConditionPage;