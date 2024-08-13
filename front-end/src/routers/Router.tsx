import Layout from '@components/common/Layout';
import VideoPageLayout from '@components/common/VideoPageLayout';
import ChattingPage from '@pages/ChattingPage';
import GroupVideoPage from '@pages/GroupVideoPage';
import IntroductionPage from '@pages/IntroductionPage';
import KakaoRedirectPage from '@pages/KaKaoRedirectPage';
import MainPage from '@pages/MainPage';
import CreateRoomPage from '@pages/CreateRoomPage';
import MyPage from '@pages/Mypage';
import NotFoundPage from '@pages/NotFoundPage';
import PersonalVideoPage from '@pages/PersonalVideoPage';
import SignupPage from '@pages/SignupPage';
import VideoWaitPage from '@pages/VideoWaitPage';
import { PATH } from '@routers/PathConstants';
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';

const Router = () => {
    const routes: RouteObject[] = [
        //header가 있는 페이지
        {
            path: PATH.ROOT,
            element: <Layout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: PATH.MAIN,
                    element: <MainPage />,
                },
                {
                    path: PATH.CREATE_ROOM,
                    element: <CreateRoomPage />,
                },
                {
                    path: PATH.INTRODUCTION,
                    element: <IntroductionPage />,
                },
                {
                    path: PATH.CHATTING,
                    element: <ChattingPage />,
                },
                {
                    path: PATH.MY_PAGE,
                    element: <MyPage />,
                },
            ],
        },

        //header가 없는 부분
        {
            path: PATH.ROOT,
            element: <VideoPageLayout />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: PATH.WAIT(':roomId'),
                    element: <VideoWaitPage />,
                },
                {
                    path: PATH.GROUP_VIDEO(':roomId'),
                    element: <GroupVideoPage />,
                },
                {
                    path: PATH.PERSONAL_VIDEO(':roomId'),
                    element: <PersonalVideoPage />,
                },
                {
                    path: PATH.SIGN_UP,
                    element: <SignupPage />,
                },
            ],
        },

        {
            path: 'auth/kakao',
            element: <KakaoRedirectPage />,
        },
    ];

    const router = createBrowserRouter([...routes]);
    return <RouterProvider router={router} />;
};

export default Router;
