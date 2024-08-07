import { Outlet } from 'react-router-dom';

const VideoPageLayout = () => {
    return (
        <div className="h-screen bg-bluePurple">
            <Outlet />
        </div>
    );
};

export default VideoPageLayout;
