import { Nav } from './components';
import cn from './GlobalControlPanel.module.scss';

const GlobalControlPanel = () => {
    return (
        <div className={cn.container}>
            <Nav></Nav>
            
        </div>
    );
}

export default GlobalControlPanel;

