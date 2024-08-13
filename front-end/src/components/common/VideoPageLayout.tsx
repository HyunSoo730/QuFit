import { Outlet } from 'react-router-dom';

const VideoPageLayout = () => {
    return (
        <div className="h-screen bg-black">
            <Outlet />
        </div>
    );
};

export default VideoPageLayout;
